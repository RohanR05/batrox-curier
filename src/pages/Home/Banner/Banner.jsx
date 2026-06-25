import React from "react";

const Banner = () => {
  return (
    <section className="bg-primary text-secondary py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Fast & Reliable Delivery with 3 Curier
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Delivering your packages safely and on time across the country.
          Trusted by thousands of customers for personal and business
          deliveries.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="bg-secondary text-primary px-6 py-3 rounded-lg font-semibold w-full sm:w-auto">
            Send a Parcel
          </button>

          <button className="border border-secondary px-6 py-3 rounded-lg font-semibold w-full sm:w-auto hover:bg-white/10 transition">
            Track Shipment
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold">50K+</h3>
            <p className="mt-2">Packages Delivered</p>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold">64</h3>
            <p className="mt-2">District Coverage</p>
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold">24/7</h3>
            <p className="mt-2">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;