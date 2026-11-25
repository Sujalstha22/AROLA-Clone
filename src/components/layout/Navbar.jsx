import React, { useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import Lightlogo from '../../assets/lightLogo.png';

const Navbar = ({ navbarRef }) => {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const menuTimeline = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };

  useGSAP(() => {
    gsap.set(menuRef.current, {
      xPercent: 100,
    });

    gsap.set(menuItemsRef.current, {
      opacity: 0,
      x: 40,
    });

    menuTimeline.current = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power3.out',
      },
    });

    menuTimeline.current
      .to(menuRef.current, {
        xPercent: 0,
        duration: 0.7,
      })
      .to(
        menuItemsRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
        },
        '-=0.35',
      );
  });

  const openMenu = () => {
    setOpen(true);
    menuTimeline.current.play();
  };

  const closeMenu = () => {
    menuTimeline.current.reverse();

    setTimeout(() => {
      setOpen(false);
    }, 700);
  };

  return (
    <>
      <header ref={navbarRef} className="fixed top-0 left-0 z-[100] w-full">
        <nav className="w-full bg-white px-6 py-5 lg:px-12">
          <div className="hidden w-full items-center justify-center gap-10 lg:flex">
            <a
              href="/"
              className={`transition ${
                isActive('/')
                  ? 'font-semibold text-[#002685]'
                  : 'hover:text-blue-500'
              }`}
            >
              Home
            </a>

            <a
              href="/about"
              className={`transition ${
                isActive('/our-story')
                  ? 'font-semibold text-[#002685]'
                  : 'hover:text-blue-500'
              }`}
            >
              Our Story
            </a>

            <a href="/">
              <img src={Lightlogo} alt="Arola" className="w-20" />
            </a>

            <a
              href="/product"
              className={`transition ${
                isActive('/product')
                  ? 'font-semibold text-[#002685]'
                  : 'hover:text-blue-500'
              }`}
            >
              Products
            </a>

            <a
              href="/contact"
              className={`transition ${
                isActive('/contact')
                  ? 'font-semibold text-[#002685]'
                  : 'hover:text-blue-500'
              }`}
            >
              Contact
            </a>
          </div>

          <div className="flex items-center justify-between lg:hidden">
            <a href="/">
              <img src={Lightlogo} alt="Arola" className="w-20" />
            </a>

            {!open && (
              <button
                onClick={openMenu}
                className="flex items-center justify-center"
                aria-label="Open menu"
              >
                <Menu size={28} />
              </button>
            )}
          </div>
        </nav>
      </header>

      <div ref={menuRef} className="fixed inset-0 z-[110] bg-white lg:hidden">
        <div className="absolute top-0 left-0 flex w-full items-center justify-between px-6 py-5">
          <a href="/" onClick={closeMenu}>
            <img src={Lightlogo} alt="Arola" className="w-20" />
          </a>

          {/* CLOSE BUTTON */}
          <button
            onClick={closeMenu}
            className="flex items-center justify-center p-1 transition-transform duration-300 hover:rotate-90"
            aria-label="Close menu"
          >
            <X size={30} />
          </button>
        </div>

        {/* ================= MENU LINKS ================= */}

        <div className="flex h-full flex-col items-center justify-center gap-8">
          {[
            {
              label: 'Home',
              href: '/',
            },
            {
              label: 'Our Story',
              href: '/about',
            },
            {
              label: 'Products',
              href: '/product',
            },
            {
              label: 'Contact',
              href: '/contact',
            },
          ].map((item, index) => {
            const active = isActive(item.href);

            return (
              <a
                key={item.label}
                ref={(el) => {
                  menuItemsRef.current[index] = el;
                }}
                href={item.href}
                onClick={closeMenu}
                className={`text-4xl transition-all duration-300 ${
                  active
                    ? 'font-semibold text-[#002685]'
                    : 'text-zinc-800 hover:text-[#002685]'
                } `}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
