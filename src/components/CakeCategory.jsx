import React from 'react';

export default function CakeCategory({ title, cakes }) {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-serif text-rose-900 mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cakes.map((cake) => (
          <div key={cake.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${cake.image})` }}></div>
            <div className="p-6">
              <h3 className="font-medium text-lg mb-2">{cake.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{cake.description}</p>
              <p className="text-rose-600 font-medium">Starting at ₱{cake.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}