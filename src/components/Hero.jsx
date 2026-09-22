
import React from "react";
import { CalendarDays, ArrowRight } from "lucide-react";
import Video from "/public/Video.mp4";

const Hero = () => {
  const handleAppointment = () => {
    window.location.href = "/book-appointment";
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[650px] w-full overflow-hidden"
    >
      {/* =====================================================
          FULL SCREEN BRIDAL MAKEUP VIDEO
      ===================================================== */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source
          src="Video.mp4"
          type="video/mp4"
        />
      </video>

      {/* =====================================================
          DARK LUXURY OVERLAY
      ===================================================== */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/60" />

      {/* =====================================================
          CENTER CONTENT
      ===================================================== */}
      <div className="relative z-10 flex h-full items-center justify-center px-5 text-center sm:px-8">

        <div className="mx-auto flex max-w-[800px] flex-col items-center">

          {/* Small Line */}
          <div className="mb-6 flex items-center gap-4">
            <span className="h-[1px] w-10 bg-white/80" />

            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white sm:text-[11px]">
              REGINA SALON
            </span>

            <span className="h-[1px] w-10 bg-white/80" />
          </div>

          {/* Main Heading */}
          <h1 className="text-[46px] font-medium leading-[1.05] tracking-[-0.025em] text-white sm:text-[60px] md:text-[72px] lg:text-[86px]">
            Bridal Beauty
            <br />

            <span className="font-light">
              Made Timeless.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[560px] text-sm leading-7 text-white/90 sm:text-[15px] sm:leading-8">
            Elegant bridal makeup, refined beauty and
            unforgettable moments crafted exclusively
            for you.
          </p>

          {/* Appointment Button */}
          <button
            onClick={handleAppointment}
            className="group mt-8 flex items-center gap-3 bg-[#960018] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-[#960018] sm:px-9 sm:py-4"
          >
            <CalendarDays
              size={16}
              strokeWidth={1.5}
            />

            Book Appointment

            <ArrowRight
              size={15}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </div>
      </div>
    </section>
  );
};

export default Hero;
