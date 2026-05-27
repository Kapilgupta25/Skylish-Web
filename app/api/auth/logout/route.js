import { NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  clearSessionCookie,
  deleteSession,
} from "@/lib/auth/session";

export async function POST(request) {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (sessionToken) {
    await deleteSession(sessionToken);
  }

  const response = NextResponse.json({ success: true });

  return clearSessionCookie(response);
}
