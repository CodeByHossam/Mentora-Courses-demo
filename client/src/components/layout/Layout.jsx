import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-700 focus:shadow-lg"
      >
        Skip to content
      </a>

      <header className="nav-shell fixed inset-x-0 top-8 z-50 h-16">
        <Navbar />
      </header>

      <main id="main-content" className="mt-24 w-full flex-grow overflow-x-hidden">
        <Outlet />
      </main>

      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
}
