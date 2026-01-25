import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#123c2a] text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          SKYLISH
        </Link>

        <ul className="hidden md:flex gap-8 text-sm">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          <li><Link href="/orders">Orders</Link></li>
        </ul>

        <Link
          href="/login"
          className="bg-[#e07a3f] px-4 py-2 rounded-md text-sm"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
