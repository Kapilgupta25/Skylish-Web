import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getAuthConfigError } from "@/lib/auth/config";
import {
  attachGoogleStateCookies,
  getGoogleRedirectUri,
  getSafeCallbackUrl,
} from "@/lib/auth/session";


export async function GET(request) {
  const configError = getAuthConfigError("google");

  if (configError) {
    return NextResponse.redirect(new URL("/login?error=google_not_configured", request.url));
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;

  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const callbackUrl = getSafeCallbackUrl(
    origin,
    requestUrl.searchParams.get("callbackUrl")
  );
  const state = randomBytes(32).toString("hex");
  const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  googleAuthUrl.searchParams.set("client_id", clientId);
  googleAuthUrl.searchParams.set("redirect_uri", getGoogleRedirectUri(origin));
  googleAuthUrl.searchParams.set("response_type", "code");
  googleAuthUrl.searchParams.set("scope", "openid email profile");
  googleAuthUrl.searchParams.set("state", state);
  googleAuthUrl.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(googleAuthUrl);

  return attachGoogleStateCookies(response, state, callbackUrl);
}
