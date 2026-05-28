import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#123c2a] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white text-lg font-bold mb-3">
            SKYLISH
          </h4>
          <p className="text-sm">
            Bring your own style closer to you.
          </p>
        </div>

        <div>
          <h5 className="text-white mb-4 font-semibold">Links</h5>
          <ul className="space-y-2 text-sm">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/cart">Cart</Link></li>
          <li><Link href="/orders">Orders</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
        </div>


        <div>
          <h5 className="text-white mb-4 font-semibold">Connect with us</h5>

          <ul className="space-y-3 text-sm text-gray-300">

            <li className="flex items-center gap-3 hover:text-white transition">
              <Instagram size={18} />
              <Link
                href="https://www.instagram.com/skylish.fashion/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skylish Instagram"
              >
                Instagram
              </Link>
            </li>

            <li className="flex items-center gap-3 hover:text-white transition">
              <Twitter size={18} />
              <Link
                href="https://twitter.com/skylishfashion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skylish Twitter"
              >
                Twitter
              </Link>
            </li>

            <li className="flex items-center gap-3 hover:text-white transition">
              <Facebook size={18} />
              <Link
                href="https://www.facebook.com/skylishfashion"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skylish Facebook"
              >
                Facebook
              </Link>
            </li>

            <li className="flex items-center gap-3 hover:text-white transition">
              <Mail size={18} />
              <a
                href="mailto:support@skylishfashion.com"
                aria-label="Email Skylish support"
              >
                support@skylishfashion.com
              </a>
            </li>

            <li className="flex items-center gap-3 hover:text-white transition">
              <Phone size={18} />
              <a
                href="tel:+919876543210"
                aria-label="Call Skylish support"
              >
                +91 98765 43210
              </a>
            </li>

          </ul>
        </div>

      </div>
      <div className="text-center text-sm py-4 border-t border-white/10">
        © 2026 SkylishStore. All rights reserved.
      </div>
    </footer>
  );
}
