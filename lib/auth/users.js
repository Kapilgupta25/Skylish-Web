import { ObjectId } from "mongodb";
import { hashPassword, verifyPassword } from "@/lib/auth/passwords";
import {
  ensureAuthIndexes,
  normalizeEmail,
  sanitizeName,
  serializeUser,
  validateEmail,
} from "@/lib/auth/session";

function getDefaultName(email) {
  return email.split("@")[0];
}

function mergeProviders(currentProviders = [], provider) {
  return Array.from(new Set([...(currentProviders || []), provider]));
}

export async function findUserByEmail(email) {
  const db = await ensureAuthIndexes();

  return db.collection("users").findOne({ email: normalizeEmail(email) });
}

export async function createOrEnableCredentialsUser({ name, email, password }) {
  const db = await ensureAuthIndexes();
  const normalizedEmail = normalizeEmail(email);
  const trimmedName = sanitizeName(name, getDefaultName(normalizedEmail));

  if (!validateEmail(normalizedEmail)) {
    return { error: "Please enter a valid email address.", status: 400 };
  }

  const existingUser = await db.collection("users").findOne({ email: normalizedEmail });

  if (existingUser?.passwordHash) {
    return { error: "An account with this email already exists.", status: 409 };
  }

  const passwordRecord = await hashPassword(password);
  const now = new Date();

  if (existingUser) {
    await db.collection("users").updateOne(
      { _id: existingUser._id },
      {
        $set: {
          name: existingUser.name || trimmedName,
          passwordHash: passwordRecord.hash,
          passwordSalt: passwordRecord.salt,
          updatedAt: now,
        },
        $addToSet: {
          authProviders: "credentials",
        },
      }
    );

    const user = await db.collection("users").findOne({ _id: existingUser._id });

    return { user: serializeUser(user) };
  }

  const result = await db.collection("users").insertOne({
    email: normalizedEmail,
    name: trimmedName,
    passwordHash: passwordRecord.hash,
    passwordSalt: passwordRecord.salt,
    authProviders: ["credentials"],
    image: null,
    createdAt: now,
    updatedAt: now,
  });

  const user = {
    _id: result.insertedId,
    email: normalizedEmail,
    name: trimmedName,
    authProviders: ["credentials"],
    image: null,
  };

  return { user: serializeUser(user) };
}

export async function authenticateCredentialsUser({ email, password }) {
  const db = await ensureAuthIndexes();
  const normalizedEmail = normalizeEmail(email);
  const user = await db.collection("users").findOne({ email: normalizedEmail });

  if (!user) {
    return {
      error: "No account was found for that email address.",
      status: 404,
    };
  }

  if (!user.passwordHash || !user.passwordSalt) {
    return {
      error: "This account uses Google sign-in. Continue with Google instead.",
      status: 400,
    };
  }

  const passwordMatches = await verifyPassword(
    password,
    user.passwordSalt,
    user.passwordHash
  );

  if (!passwordMatches) {
    return { error: "Incorrect password.", status: 401 };
  }

  await db.collection("users").updateOne(
    { _id: user._id },
    {
      $set: {
        updatedAt: new Date(),
      },
    }
  );

  return { user: serializeUser(user) };
}

export async function upsertGoogleUser(profile) {
  const db = await ensureAuthIndexes();
  const email = normalizeEmail(profile.email);
  const now = new Date();

  if (!validateEmail(email) || !profile.sub) {
    throw new Error("Google account data was incomplete.");
  }

  const existingUser = await db.collection("users").findOne({
    $or: [{ googleId: profile.sub }, { email }],
  });

  const nextName = sanitizeName(
    profile.name,
    existingUser?.name || getDefaultName(email)
  );
  const nextImage = profile.picture || existingUser?.image || null;

  if (existingUser) {
    await db.collection("users").updateOne(
      { _id: existingUser._id },
      {
        $set: {
          email,
          googleId: profile.sub,
          name: nextName,
          image: nextImage,
          updatedAt: now,
          emailVerifiedAt: now,
        },
        $addToSet: {
          authProviders: "google",
        },
      }
    );

    const user = await db.collection("users").findOne({ _id: existingUser._id });

    return serializeUser(user);
  }

  const result = await db.collection("users").insertOne({
    email,
    googleId: profile.sub,
    name: nextName,
    image: nextImage,
    authProviders: ["google"],
    emailVerifiedAt: now,
    createdAt: now,
    updatedAt: now,
  });

  return {
    id: result.insertedId.toString(),
    email,
    name: nextName,
    image: nextImage,
    authProviders: ["google"],
  };
}

export function toObjectId(id) {
  return typeof id === "string" ? new ObjectId(id) : id;
}
