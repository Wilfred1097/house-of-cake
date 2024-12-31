import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-16 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif text-rose-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Since 1973, Our famliy has been crafting memorable celebrations with our handmade cakes. 
              What started as a small family bakery has grown into a beloved local institution, 
              thanks to our commitment to quality and creativity.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="text-rose-600 mr-2">✓</span>
                Fresh, locally-sourced ingredients
              </li>
              <li className="flex items-center">
                <span className="text-rose-600 mr-2">✓</span>
                Custom designs for every occasion
              </li>
              {/* <li className="flex items-center">
                <span className="text-rose-600 mr-2">✓</span>
                Award-winning pastry chefs
              </li> */}
            </ul>
          </div>
          <div className="relative h-64 md:h-96">
            <div className="absolute inset-0 bg-[url('/src/data/img/about.png')] bg-cover bg-center rounded-lg shadow-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}