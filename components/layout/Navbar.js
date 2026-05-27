import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import { getCurrentSession } from "@/lib/auth/session";

export default async function Navbar() {
  const session = await getCurrentSession();

  return (
    <nav className="bg-[#123c2a] text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          SKYLISH
        </Link>

        <ul className="hidden gap-8 text-sm md:flex">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          <li><Link href="/orders">Orders</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="relative hidden lg:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-52 rounded-md bg-[#1a5d42] px-3 py-2 text-sm text-white placeholder:text-white/70"
            />
          </div>

          {session?.user ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium">{session.user.name || "Signed in"}</p>
                <p className="text-xs text-white/70">{session.user.email}</p>
              </div>
              <LogoutButton />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/register"
                className="rounded-md border border-white/30 px-4 py-2 text-sm transition hover:bg-white/10"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="rounded-md bg-[#e07a3f] px-4 py-2 text-sm"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
