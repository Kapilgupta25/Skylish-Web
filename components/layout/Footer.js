export default function Footer() {
  return (
    <footer className="bg-[#123c2a] text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white text-lg font-bold mb-3">
            SKYLISH
          </h4>
          <p className="text-sm">
            Bringing nature closer to your home.
          </p>
        </div>

        <div>
          <h5 className="text-white mb-3">Links</h5>
          <ul className="space-y-2 text-sm">
            <li>Home</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h5 className="text-white mb-3">Support</h5>
          <ul className="space-y-2 text-sm">
            <li>FAQs</li>
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>

        <div>
          <h5 className="text-white mb-3">Newsletter</h5>
          <input
            placeholder="Email"
            className="w-full px-3 py-2 rounded text-black"
          />
        </div>
      </div>

      <div className="text-center text-sm py-4 border-t border-white/10">
        © 2026 GreenStore
      </div>
    </footer>
  );
}
