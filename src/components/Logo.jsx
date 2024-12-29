import React from 'react';

export default function Logo({ className = "" }) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <span className="font-script text-3xl leading-tight">Aure Sanchez</span>
      <span className="text-sm font-sans tracking-widest uppercase">House of Cakes</span>
    </div>
  );
}