import React from 'react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import Logo from './Logo';

const navigation = [
  // { name: 'Home', href: '#' },
  { name: 'Menu', href: '#menu' },
  { name: 'About Us', href: '#about' },
  { name: 'Contact', href: '#footer' },
];

export default function Header() {
  return (
    <header className="bg-brand-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between">
          <Logo className="text-brand-500" />
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-brand-700 hover:text-brand-900 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://www.instagram.com/auresanchezhouseofcakes/" target="_blank" className="text-brand-700 hover:text-brand-900">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://web.facebook.com/MolaveUbeCake" target="_blank" className="text-brand-700 hover:text-brand-900">
              <FaFacebook className="h-6 w-6" />
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}