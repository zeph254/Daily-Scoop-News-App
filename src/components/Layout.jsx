import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewsletterSignup from './NewsletterSignup'; // Add this import

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-900 text-blue-50">
      {/* Sticky Header with darker blue */}
      <header className="sticky top-0 z-50 bg-blue-950 shadow-lg">
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-grow bg-gradient-to-b from-blue-900 to-blue-800">
        {/* Container with max-width */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main content area */}
            <div className="lg:col-span-9 space-y-6">
              <Outlet />
            </div>
            
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-6">
              {/* Trending News Section */}
              <div className="bg-blue-800 p-5 rounded-xl shadow-lg border border-blue-700">
                <h3 className="font-bold text-xl mb-4 text-blue-100">Trending Now</h3>
                <div className="space-y-4">
                  {/* Example trending item */}
                  <div className="border-b border-blue-700 pb-3 last:border-0 last:pb-0">
                    <p className="text-blue-300 text-sm">Politics</p>
                    <h4 className="font-medium text-blue-50 hover:text-blue-200 cursor-pointer">
                      Election polls show surprising results
                    </h4>
                  </div>
                  {/* Add more trending items here */}
                </div>
              </div>

              {/* Newsletter Signup - Replaced with the NewsletterSignup component */}
              <NewsletterSignup />
            </aside>
          </div>
        </div>
        
        <ToastContainer 
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-blue-800 text-blue-50"
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}