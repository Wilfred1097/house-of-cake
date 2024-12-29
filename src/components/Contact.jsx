import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-serif text-rose-900 mb-6">Contact Us</h2>
            <div className="space-y-4 mb-8">
              <div>
                <h3 className="font-medium mb-2">Business Hours</h3>
                <p>Open Daily: 7:00 AM - 7:00 PM</p>
                {/* <p>Sunday: 10:00 AM - 4:00 PM</p> */}
              </div>
              <div>
                <h3 className="font-medium mb-2">Contact Information</h3>
                <p>Phone: 09083400302</p>
                {/* <p>Email: hello@sweetdelights.com</p> */}
                <p>Legarda Street, Molave, Zamboanga del Sur (Beside Potter’s Young Friends Learning Center)</p>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-rose-600 text-white px-6 py-2 rounded-md hover:bg-rose-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}