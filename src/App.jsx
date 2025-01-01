import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CakeCategory from './components/CakeCategory';
import About from './components/About';
import Footer from './components/Footer';
import CrmDashboard from './components/CrmDashboard';
import Login from './components/Login';
import { cakeCategories } from './data/cakes';
import { isAuthenticated } from './utils/auth';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/crm"
          element={
            <ProtectedRoute>
              <CrmDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
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
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;