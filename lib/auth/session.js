import { cookies } from "next/headers";
import { ObjectId } from "mongodb";
import { createHash, randomBytes } from "node:crypto";
import { getDatabase } from "@/lib/mongodb";

export const SESSION_COOKIE_NAME = "skylish_session";
export const GOOGLE_STATE_COOKIE_NAME = "skylish_google_state";
export const GOOGLE_CALLBACK_COOKIE_NAME = "skylish_google_callback";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;
const GOOGLE_STATE_TTL_MS = 1000 * 60 * 10;

let authIndexesPromise;

function getSessionSecret() {
  const secret = process.env.AUTH_SESSION_SECRET;

  if (!secret) {
    throw new Error("Missing AUTH_SESSION_SECRET environment variable.");
  }

  return secret;
}

function hashSessionToken(token) {
  return createHash("sha256")
    .update(`${token}:${getSessionSecret()}`)
    .digest("hex");
}

function getCookieConfig(expires) {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  };
}

function normalizeObjectId(value) {
  return typeof value === "string" ? new ObjectId(value) : value;
}

export function normalizeEmail(email) {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function sanitizeName(name, fallback = "") {
  return typeof name === "string" ? name.trim().slice(0, 80) : fallback;
}

export function serializeUser(user) {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name || "",
    image: user.image || null,
    authProviders: Array.isArray(user.authProviders) ? user.authProviders : [],
  };
}

export function getGoogleRedirectUri(origin) {
  return process.env.GOOGLE_REDIRECT_URI || `${origin}/api/auth/google/callback`;
}

export function getSafeCallbackUrl(origin, callbackUrl) {
  try {
    const parsedUrl = new URL(callbackUrl || "/", origin);

    if (parsedUrl.origin !== origin) {
      return "/";
    }

    return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
  } catch {
    return "/";
  }
}

export async function ensureAuthIndexes() {
  if (!authIndexesPromise) {
    authIndexesPromise = (async () => {
      const db = await getDatabase();

      await Promise.all([
        db.collection("users").createIndex({ email: 1 }, { unique: true }),
        db.collection("users").createIndex(
          { googleId: 1 },
          { unique: true, sparse: true }
        ),
        db.collection("sessions").createIndex(
          { sessionTokenHash: 1 },
          { unique: true }
        ),
        db.collection("sessions").createIndex(
          { expiresAt: 1 },
          { expireAfterSeconds: 0 }
        ),
      ]);

      return db;
    })();
  }

  return authIndexesPromise;
}

export async function createSession(userId) {
  const db = await ensureAuthIndexes();
  const sessionToken = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.collection("sessions").insertOne({
    userId: normalizeObjectId(userId),
    sessionTokenHash: hashSessionToken(sessionToken),
    createdAt: new Date(),
    expiresAt,
  });

  return { sessionToken, expiresAt };
}

export function attachSessionCookie(response, sessionToken, expiresAt) {
  response.cookies.set(
    SESSION_COOKIE_NAME,
    sessionToken,
    getCookieConfig(expiresAt)
  );

  return response;
}

export function clearSessionCookie(response) {
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    ...getCookieConfig(new Date(0)),
    maxAge: 0,
  });

  return response;
}

export function attachGoogleStateCookies(response, state, callbackUrl) {
  const expires = new Date(Date.now() + GOOGLE_STATE_TTL_MS);

  response.cookies.set(
    GOOGLE_STATE_COOKIE_NAME,
    state,
    getCookieConfig(expires)
  );
  response.cookies.set(
    GOOGLE_CALLBACK_COOKIE_NAME,
    callbackUrl,
    getCookieConfig(expires)
  );

  return response;
}

export function clearGoogleStateCookies(response) {
  response.cookies.set(GOOGLE_STATE_COOKIE_NAME, "", {
    ...getCookieConfig(new Date(0)),
    maxAge: 0,
  });
  response.cookies.set(GOOGLE_CALLBACK_COOKIE_NAME, "", {
    ...getCookieConfig(new Date(0)),
    maxAge: 0,
  });

  return response;
}

export async function getSessionFromToken(sessionToken) {
  if (!sessionToken) {
    return null;
  }

  const db = await ensureAuthIndexes();
  const session = await db.collection("sessions").findOne({
    sessionTokenHash: hashSessionToken(sessionToken),
    expiresAt: { $gt: new Date() },
  });

  if (!session) {
    return null;
  }

  const user = await db.collection("users").findOne({ _id: session.userId });

  if (!user) {
    return null;
  }

  return {
    user: serializeUser(user),
    expiresAt: session.expiresAt,
  };
}

export async function getCurrentSession() {
  if (!process.env.MONGODB_URI || !process.env.AUTH_SESSION_SECRET) {
    return null;
  }

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  return getSessionFromToken(sessionToken);
}

export async function deleteSession(sessionToken) {
  if (!sessionToken) {
    return;
  }

  const db = await ensureAuthIndexes();

  await db.collection("sessions").deleteOne({
    sessionTokenHash: hashSessionToken(sessionToken),
  });
}
