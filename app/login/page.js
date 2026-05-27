import { redirect } from "next/navigation";
import AuthForm from "@/components/auth/AuthForm";
import { getCurrentSession } from "@/lib/auth/session";

export default async function LoginPage() {
  const session = await getCurrentSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[radial-gradient(circle_at_top,#ecfdf5,transparent_45%)] px-4">
      <AuthForm mode="login" />
    </div>
  );
}
