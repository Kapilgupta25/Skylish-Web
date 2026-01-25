import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-[#f6f8f5]">

      {/* ================= HERO ================= */}
      <section className="bg-[#123c2a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Bring The Nature <br /> Close To You
            </h2>
            <p className="mt-6 text-gray-200">
              Discover beautiful indoor plants to make your life greener and healthier.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-[#e07a3f] px-6 py-3 rounded-md">
                Explore Plants
              </button>
              <button className="border border-white px-6 py-3 rounded-md">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-full p-10">
              <Image
                src="/plant.png"
                alt="Plant"
                width={220}
                height={220}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-center mb-10">
          Our Products
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-sm p-4 text-center">
              <div className="bg-[#e6efe9] rounded-lg p-6 mb-4">
                <Image
                  src="/plant.png"
                  alt="Plant"
                  width={120}
                  height={120}
                  className="mx-auto"
                />
              </div>
              <h4 className="font-semibold">Indoor Plant</h4>
              <p className="text-sm text-gray-500">₹499</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="bg-[#123c2a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h3 className="text-3xl font-bold">
            Grow Plants for a Better Life
          </h3>
          <p className="mt-4 text-gray-200">
            Start your green journey today with our best indoor plants.
          </p>
          <button className="mt-6 bg-[#e07a3f] px-8 py-3 rounded-md">
            Get Started
          </button>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8">
        {[
          "Healthy Plants",
          "Fast Delivery",
          "Easy Maintenance",
        ].map((feature) => (
          <div key={feature} className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="w-14 h-14 bg-[#e6efe9] rounded-full mx-auto mb-4"></div>
            <h4 className="font-semibold">{feature}</h4>
            <p className="text-sm text-gray-500 mt-2">
              Carefully selected plants for your home and office.
            </p>
          </div>
        ))}
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#123c2a] text-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

          <div>
            <h4 className="text-white font-bold text-lg mb-4">GreenStore</h4>
            <p className="text-sm">
              Bringing nature closer to your home.
            </p>
          </div>

          <div>
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="text-sm space-y-2">
              <li>Home</li>
              <li>Products</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white mb-3">Support</h5>
            <ul className="text-sm space-y-2">
              <li>FAQs</li>
              <li>Privacy Policy</li>
              <li>Terms</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white mb-3">Subscribe</h5>
            <input
              placeholder="Your email"
              className="w-full px-3 py-2 rounded-md text-black"
            />
          </div>

        </div>

        <div className="text-center text-sm py-4 border-t border-white/10">
          © 2026 GreenStore. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
