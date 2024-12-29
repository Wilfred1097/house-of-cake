import React from 'react';

export default function Hero() {
  return (
    <div className="relative bg-brand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-serif tracking-tight font-bold text-brand-900 sm:text-5xl md:text-6xl">
              Handcrafted Cakes for Special Moments
            </h1>
            <p className="mt-3 text-base text-brand-700 sm:mt-5 sm:text-lg">
              Made-to-order homemade cakes in the town of Molave, Zamboanga del Sur since 1973.
            </p>
            <div className="mt-8">
              <a
                href="#footer"
                className="inline-block bg-brand-600 px-8 py-3 text-white font-medium rounded-md hover:bg-brand-700 transition-colors"
              >
                Order Now
              </a>
            </div>
          </div>
          <div className="relative h-64 md:h-96">
            <div className="absolute inset-0 bg-[url('/src/data/img/main.png')] bg-cover bg-center rounded-lg shadow-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}