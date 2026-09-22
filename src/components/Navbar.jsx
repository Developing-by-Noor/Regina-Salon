
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Signatures", href: "#signature" },
    { name: "Services", href: "#services" },
    { name: "Deals", href: "#deals" },
    { name: "Blog", href: "/blog" },
    { name: "Location", href: "#location" },
    { name: "Menu", href: "#menu" },
  ];

  const isOtherPage =
    window.location.pathname === "/blog" ||
    window.location.pathname === "/book-appointment" ||
    window.location.pathname === "/deals" ||
    window.location.pathname === "/menu";

  // Hide Navbar completely on Admin Dashboard
  if (window.location.pathname === "/admin") {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.querySelector("#hero");

      if (hero) {
        const triggerPoint = hero.offsetTop + hero.offsetHeight * 0.1;

        setIsScrolled(window.scrollY >= triggerPoint);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation Click
  const handleClick = (href, name) => {
    setIsOpen(false);

    // Deals - Separate Page
    if (name === "Deals") {
      window.location.href = "/deals";
      return;
    }

    // Blog - Separate Page
    if (name === "Blog") {
      window.location.href = "/blog";
      return;
    }

    // Menu - Scroll to Menu section, NOT next page
    if (name === "Menu") {
      if (window.location.pathname !== "/") {
        window.location.href = "/#menu";
        return;
      }

      const section = document.querySelector("#menu");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    // If user is on another page
    if (window.location.pathname !== "/") {
      if (href.startsWith("#")) {
        window.location.href = `/${href}`;
      }

      return;
    }

    // Homepage section
    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Book Appointment Page
  const handleAppointment = () => {
    setIsOpen(false);
    window.location.href = "/book-appointment";
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      {/* Top Carmine Line */}
      <div
        className={`h-1 w-full transition-all duration-300 ${
          isScrolled || isOtherPage
            ? "bg-[#960018]"
            : "bg-transparent"
        }`}
      />

      <nav
        className={`w-full transition-all duration-500 ${
          isScrolled || isOtherPage
            ? "border-b border-gray-200 bg-white shadow-sm"
            : "border-b border-white/10 bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[70px] max-w-[1350px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-2">
            <h1
              className={`text-[18px] font-semibold tracking-[0.12em] transition-colors duration-500 sm:text-[20px] ${
                isScrolled || isOtherPage
                  ? "text-[#960018]"
                  : "text-white"
              }`}
            >
              REGINA
            </h1>

            <span
              className={`hidden text-[9px] font-medium uppercase tracking-[0.3em] transition-colors duration-500 sm:block ${
                isScrolled || isOtherPage
                  ? "text-gray-500"
                  : "text-white/80"
              }`}
            >
              SALON
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() =>
                  handleClick(link.href, link.name)
                }
                className={`relative whitespace-nowrap py-2 text-[12px] font-medium transition-colors duration-300 xl:text-[13px] ${
                  isScrolled || isOtherPage
                    ? "text-black hover:text-[#960018]"
                    : "text-white hover:text-white/70"
                }`}
              >
                {link.name}

                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#960018] transition-all duration-300 hover:w-full" />
              </button>
            ))}

            {/* Appointment */}
            <button
              onClick={handleAppointment}
              className={`ml-1 whitespace-nowrap px-4 py-3 text-[11px] font-medium transition-all duration-300 xl:ml-2 xl:px-5 xl:text-[12px] ${
                isScrolled || isOtherPage
                  ? "bg-[#960018] text-white hover:bg-black"
                  : "bg-white text-[#960018] hover:bg-[#960018] hover:text-white"
              }`}
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300 lg:hidden ${
              isScrolled || isOtherPage
                ? "border-gray-300 text-black hover:border-[#960018] hover:text-[#960018]"
                : "border-white/50 text-white hover:border-white"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={21} strokeWidth={1.7} />
            ) : (
              <Menu size={21} strokeWidth={1.7} />
            )}
          </button>
        </div>

        {/* Mobile + Tablet Menu */}
        <div
          className={`border-t transition-all duration-300 lg:hidden ${
            isOpen
              ? "max-h-[600px] border-gray-200 bg-white opacity-100"
              : "max-h-0 overflow-hidden border-transparent opacity-0"
          }`}
        >
          <div className="mx-auto max-w-[1350px] px-4 py-2 sm:px-6 sm:py-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() =>
                  handleClick(link.href, link.name)
                }
                className="flex w-full items-center justify-between border-b border-gray-100 py-3.5 text-left text-[13px] font-medium text-black transition hover:text-[#960018] sm:py-4"
              >
                <span>{link.name}</span>

                <span className="text-[#960018]">+</span>
              </button>
            ))}

            {/* Mobile Appointment */}
            <button
              onClick={handleAppointment}
              className="mt-3 w-full bg-[#960018] px-5 py-3.5 text-[13px] font-medium text-white transition hover:bg-black sm:mt-4"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

