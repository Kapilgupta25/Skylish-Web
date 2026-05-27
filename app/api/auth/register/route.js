import { NextResponse } from "next/server";
import { createSession, attachSessionCookie } from "@/lib/auth/session";
import { createOrEnableCredentialsUser } from "@/lib/auth/users";
import { validatePassword } from "@/lib/auth/passwords";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body?.name || "";
    const email = body?.email || "";
    const password = body?.password || "";
    const passwordError = validatePassword(password);

    if (passwordError) {
      return NextResponse.json({ error: passwordError }, { status: 400 });
    }

    const result = await createOrEnableCredentialsUser({ name, email, password });

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status || 400 }
      );
    }

    const { sessionToken, expiresAt } = await createSession(result.user.id);
    const response = NextResponse.json(
      {
        message: "Registration successful.",
        user: result.user,
      },
      { status: 201 }
    );

    return attachSessionCookie(response, sessionToken, expiresAt);
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json(
      { error: "We couldn't complete registration right now." },
      { status: 500 }
    );
  }
}
