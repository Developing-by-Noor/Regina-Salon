
import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  const menuPdf = "/menu.pdf";

  const mapLink =
    "https://www.google.com/maps/place/30%C2%B014'04.6%22N+71%C2%B029'37.3%22E/@30.2346191,71.491108,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.2346191!4d71.4936829";

  return (
    <footer className="bg-[#fafafa] text-black">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-16 xl:px-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">

          {/* Brand */}
          <div>
            <a href="/" className="inline-block">
              <h2 className="font-serif text-3xl tracking-[0.18em] text-[#000000] sm:text-4xl">
                REGINA
              </h2>

              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.38em] text-black/60 sm:text-[11px]">
                Salon & Beauty
              </p>
            </a>

            <p className="mt-6 max-w-sm text-sm leading-7 text-black/60 sm:text-base">
              Beauty is personal. At Regina, every detail is designed to make
              you feel confident, elegant, and completely yourself.
            </p>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-all duration-300 hover:border-[#780014] hover:bg-[#780014] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[19px] w-[19px]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4.2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <circle
                    cx="17.5"
                    cy="6.8"
                    r="1.1"
                    fill="currentColor"
                  />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-black transition-all duration-300 hover:border-[#780014] hover:bg-[#780014] hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[19px] w-[19px]"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.5 21v-7h2.35l.35-2.8H13.5V9.4c0-.81.22-1.36 1.4-1.36h1.5V5.53c-.26-.04-1.15-.11-2.19-.11-2.17 0-3.66 1.33-3.66 3.78v2H8v2.8h2.55v7h2.95Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-black">
              Explore
            </h3>

            <div className="mt-6 space-y-3">
              <a
                href="/#about"
                className="block w-fit text-sm text-black/60 transition-colors duration-300 hover:text-[#780014]"
              >
                About
              </a>

              <a
                href="/#signature"
                className="block w-fit text-sm text-black/60 transition-colors duration-300 hover:text-[#780014]"
              >
                Signatures
              </a>

              <a
                href="/#services"
                className="block w-fit text-sm text-black/60 transition-colors duration-300 hover:text-[#780014]"
              >
                Services
              </a>

              <a
                href="/deals"
                className="block w-fit text-sm text-black/60 transition-colors duration-300 hover:text-[#780014]"
              >
                Deals
              </a>

              <a
                href="/blog"
                className="block w-fit text-sm text-black/60 transition-colors duration-300 hover:text-[#780014]"
              >
                Blog
              </a>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-black">
              Discover
            </h3>

            <div className="mt-6 space-y-3">
              <a
                href="/#location"
                className="block w-fit text-sm text-black/60 transition-colors duration-300 hover:text-[#780014]"
              >
                Location
              </a>

              <a
                href={menuPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-fit items-center gap-1 text-sm text-black/60 transition-colors duration-300 hover:text-[#780014]"
              >
                Menu

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="/#contact"
                className="block w-fit text-sm text-black/60 transition-colors duration-300 hover:text-[#780014]"
              >
                Contact Us
              </a>

              <a
                href="/book-appointment"
                className="block w-fit text-sm text-black/60 transition-colors duration-300 hover:text-[#780014]"
              >
                Book Appointment
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-black">
              Visit Regina
            </h3>

            <div className="mt-6 space-y-5">

              {/* Location */}
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <MapPin
                  size={19}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-[#780014]"
                />

                <span className="text-sm leading-6 text-black/60 transition-colors duration-300 group-hover:text-[#780014]">
                  Multan, Pakistan
                </span>
              </a>

              {/* Phone */}
              <a
                href="tel:+923005588398"
                className="group flex items-center gap-3"
              >
                <Phone
                  size={18}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#780014]"
                />

                <span className="text-sm text-black/60 transition-colors duration-300 group-hover:text-[#780014]">
                  +92 300 5588398
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@reginasalon.com"
                className="group flex items-start gap-3"
              >
                <Mail
                  size={18}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-[#780014]"
                />

                <span className="break-all text-sm text-black/60 transition-colors duration-300 group-hover:text-[#780014]">
                  hello@reginasalon.com
                </span>
              </a>
            </div>

            {/* Booking CTA */}
            <a
              href="/book-appointment"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-[#201616] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#030303]"
            >
              Book Appointment

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 border-t border-black/10 pt-6 sm:mt-14 sm:pt-7">
          <div className="flex flex-col gap-3 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p>
              © {new Date().getFullYear()} Regina Salon. All rights reserved.
            </p>

            <p className="text-left sm:text-right">
              Crafted with elegance.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

