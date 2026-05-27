import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (

  <div className="relative min-h-screen">
    <div
      className="fixed inset-0 -z-10 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: "url('/bgSkylish.jpeg')" }}
    />

    <main className="relative z-10">
    
      {/* ================= HERO ================= */}
      <section className="text-black">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              SKYLISH <br/> Your Style, Your Rules
            </h2>
            <p className="mt-6 text-xl text-gray-900">
              Create custom T-shirts that speak your personality.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="border bg-gray-400 border-white px-6 py-3 rounded-md">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="bg-white rounded-full p-10">
              <Image
                src="/skylish.png"
                alt="Skylish"
                width={220}
                height={220}
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl text-black font-bold text-center mb-10">
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
              <h4 className="font-semibold">t-Shirts</h4>
              <p className="text-sm text-gray-500">₹499</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="text-white">
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

    </main>
  </div>
  );
}
