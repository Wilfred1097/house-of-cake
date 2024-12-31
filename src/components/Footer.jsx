import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer id="footer" className="bg-brand-900 text-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo className="text-white mb-4" />
            <p className="text-sm">Creating sweet memories since 1973</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Home</a></li>
              <li><a href="#menu" className="hover:text-white">Menu</a></li>
              <li><a href="#about" className="hover:text-white">About Us</a></li>
              {/* <li><a href="#contact" className="hover:text-white">Contact</a></li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>09083400302 | 09562061627</li>
              {/* <li>hello@auresanchez.com</li> */}
              <li>Legarda Street, Molave, Zamboanga del Sur (Beside Potter’s Young Friends Learning Center)</li>
              {/* <li>Beside Potter’s Young Friends Learning Center</li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/auresanchezhouseofcakes/" target="_blank" className="hover:text-white">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="https://web.facebook.com/MolaveUbeCake" target="_blank" className="hover:text-white">
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-800 text-center text-sm">
          <p>© {new Date().getFullYear()} Aure Sanchez House of Cakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}