import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Lightlogo from "../../assets/lightLogo.png";

const Navbar = ({ navbarRef }) => {
  const [open, setOpen] = useState(false);

  return (
    <header ref={navbarRef} className="fixed top-0 left-0 w-full z-[100]">
      <nav className="bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-10">
          {/* Mobile Logo */}
          <a href="/" className="lg:hidden">
            <img src={Lightlogo} alt="Logo" className="w-16" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex w-full items-center justify-center gap-10">
            <a
              href="/"
              className="font-semibold text-[#002685] hover:text-blue-500 transition"
            >
              Home
            </a>

            <a href="/" className="hover:text-blue-500 transition">
              Our Story
            </a>

            <a href="/">
              <img src={Lightlogo} alt="Logo" className="w-20" />
            </a>

            <a href="/" className="hover:text-blue-500 transition">
              Products
            </a>

            <a href="/" className="hover:text-blue-500 transition">
              Contact
            </a>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            open ? "max-h-72" : "max-h-0"
          }`}
        >
          <div className="flex flex-col items-center gap-6 py-6 bg-white">
            <a href="/" onClick={() => setOpen(false)}>
              Home
            </a>

            <a href="/" onClick={() => setOpen(false)}>
              Our Story
            </a>

            <a href="/" onClick={() => setOpen(false)}>
              Products
            </a>

            <a href="/" onClick={() => setOpen(false)}>
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
