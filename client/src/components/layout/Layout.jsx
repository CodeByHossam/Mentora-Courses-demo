import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-primary font-body">
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 h-16 w-full border-b border-line bg-white shadow-sm md:h-20">
          <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full overflow-x-hidden mt-20 pt-8">
          <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto border-t border-gray-100">
          <Footer />
      </footer>
    </div>
  );
}
