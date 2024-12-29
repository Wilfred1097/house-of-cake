import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CakeCategory from './components/CakeCategory';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { cakeCategories } from './data/cakes';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section id="menu" className="py-16">
          {cakeCategories.map((category) => (
            <CakeCategory
              key={category.title}
              title={category.title}
              cakes={category.cakes}
            />
          ))}
        </section>
      </main>

      <About />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}

export default App;