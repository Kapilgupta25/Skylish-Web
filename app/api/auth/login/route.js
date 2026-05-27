import { NextResponse } from "next/server";
import { attachSessionCookie, createSession } from "@/lib/auth/session";
import { authenticateCredentialsUser } from "@/lib/auth/users";

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body?.email || "";
    const password = body?.password || "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are both required." },
        { status: 400 }
      );
    }

    const result = await authenticateCredentialsUser({ email, password });

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 400 }
      );
    }

    const { sessionToken, expiresAt } = await createSession(result.user.id);
    const response = NextResponse.json({
      message: "Login successful.",
      user: result.user,
    });

    return attachSessionCookie(response, sessionToken, expiresAt);
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "We couldn't sign you in right now." },
      { status: 500 }
    );
  }
}
