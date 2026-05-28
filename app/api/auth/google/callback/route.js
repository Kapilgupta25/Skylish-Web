import { NextResponse } from "next/server";
import { getAuthConfigError } from "@/lib/auth/config";
import {
  GOOGLE_CALLBACK_COOKIE_NAME,
  GOOGLE_STATE_COOKIE_NAME,
  attachSessionCookie,
  clearGoogleStateCookies,
  createSession,
  getGoogleRedirectUri,
  getSafeCallbackUrl,
} from "@/lib/auth/session";
import { upsertGoogleUser } from "@/lib/auth/users";

function redirectWithError(request, errorCode) {
  return NextResponse.redirect(new URL(`/login?error=${errorCode}`, request.url));
}

export async function GET(request) {
  const configError = getAuthConfigError("google");

  if (configError) {
    return redirectWithError(request, "google_not_configured");
  }

  const requestUrl = new URL(request.url);
  const state = requestUrl.searchParams.get("state");
  const code = requestUrl.searchParams.get("code");
  const oauthError = requestUrl.searchParams.get("error");
  const storedState = request.cookies.get(GOOGLE_STATE_COOKIE_NAME)?.value;
  const storedCallbackUrl = request.cookies.get(GOOGLE_CALLBACK_COOKIE_NAME)?.value;

  if (oauthError) {
    const response = redirectWithError(request, "google_access_denied");

    return clearGoogleStateCookies(response);
  }

  if (!code || !state || !storedState || state !== storedState) {
    const response = redirectWithError(request, "google_state_invalid");

    return clearGoogleStateCookies(response);
  }

  try {
    const origin = requestUrl.origin;
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing Google OAuth environment variables.");
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: getGoogleRedirectUri(origin),
        grant_type: "authorization_code",
      }),
      cache: "no-store",
    });

    if (!tokenResponse.ok) {
      throw new Error("Google token exchange failed.");
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error("Google token response was missing an access token.");
    }

    const profileResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!profileResponse.ok) {
      throw new Error("Failed to fetch Google user profile.");
    }

    const profile = await profileResponse.json();
    const user = await upsertGoogleUser(profile);
    const { sessionToken, expiresAt } = await createSession(user.id);
    const redirectUrl = getSafeCallbackUrl(origin, storedCallbackUrl);
    const response = NextResponse.redirect(new URL(redirectUrl, origin));

    clearGoogleStateCookies(response);

    return attachSessionCookie(response, sessionToken, expiresAt);
  } catch (error) {
    console.error("Google OAuth callback error:", error);

    const response = redirectWithError(request, "google_sign_in_failed");

    return clearGoogleStateCookies(response);
  }
}
