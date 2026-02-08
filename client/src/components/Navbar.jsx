import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="border-b border-neutral-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Logo className="w-9 h-9 text-primary-600" />
          <div className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
            >
              How it works
            </a>
            <a
              href="#"
              className="text-sm font-medium text-neutral-600 hover:text-primary-600 transition-colors"
            >
              Analytics
            </a>
          </div>
          <button className="bg-primary-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-all shadow-sm shadow-primary-200">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
