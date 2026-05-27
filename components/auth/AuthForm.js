"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const AUTH_ERRORS = {
  google_not_configured: "Google sign-in is not configured yet.",
  google_access_denied: "Google sign-in was canceled.",
  google_state_invalid: "The Google sign-in session expired. Please try again.",
  google_sign_in_failed: "Google sign-in failed. Please try again.",
};

const FORM_COPY = {
  login: {
    title: "Welcome back",
    subtitle: "Sign in with your email and password or continue with Google.",
    button: "Login",
    alternateLabel: "Need an account?",
    alternateHref: "/register",
    alternateText: "Create one",
    endpoint: "/api/auth/login",
  },
  register: {
    title: "Create your account",
    subtitle: "Register with email and password, or use Google to get started faster.",
    button: "Register",
    alternateLabel: "Already have an account?",
    alternateHref: "/login",
    alternateText: "Login",
    endpoint: "/api/auth/register",
  },
};

export default function AuthForm({ mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = FORM_COPY[mode];
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const oauthError = searchParams.get("error");
  const googleHref = `/api/auth/google?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(copy.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Unable to reach the server right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 shadow-[0_24px_80px_rgba(8,48,38,0.08)]">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-[#123c2a]">{copy.title}</h1>
        <p className="mt-3 text-sm leading-6 text-gray-600">{copy.subtitle}</p>
      </div>

      <a
        href={googleHref}
        className="flex w-full items-center justify-center rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition hover:border-[#123c2a] hover:text-[#123c2a]"
      >
        Continue with Google
      </a>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-gray-400">
        <span className="h-px flex-1 bg-gray-200" />
        Or
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {mode === "register" ? (
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#123c2a]"
              placeholder="Your name"
              autoComplete="name"
            />
          </label>
        ) : null}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#123c2a]"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#123c2a]"
            placeholder="At least 8 characters"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
          />
        </label>

        {error || oauthError ? (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error || AUTH_ERRORS[oauthError] || "Authentication failed. Please try again."}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-[#123c2a] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0e2f22] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Please wait..." : copy.button}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        {copy.alternateLabel}{" "}
        <Link
          href={`${copy.alternateHref}?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="font-medium text-[#123c2a]"
        >
          {copy.alternateText}
        </Link>
      </p>
    </div>
  );
}
