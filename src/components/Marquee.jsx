
import React from "react";

const Marquee = () => {
  const firstRow = [
    "BEAUTY",
    "ELEGANCE",
    "CONFIDENCE",
    "BRIDAL",
    "GLAMOUR",
  ];

  const secondRow = [
    "YOUR MOMENT",
    "YOUR STYLE",
    "YOUR BEAUTY",
    "YOUR SIGNATURE",
    "YOUR STORY",
  ];

  return (
    <section className="w-full overflow-hidden bg-white py-8 sm:py-10 lg:py-12">
      {/* ================= FIRST ROW ================= */}
      <div className="mb-4 flex w-full overflow-hidden sm:mb-5">
        <div className="marquee-track marquee-left flex min-w-max items-center">
          {[...firstRow, ...firstRow].map((text, index) => (
            <React.Fragment key={`first-${index}`}>
              <span
                className="
                  mx-4
                  shrink-0
                  text-3xl
                  font-light
                  tracking-tight
                  text-black
                  sm:mx-6
                  sm:text-4xl
                  md:text-5xl
                  lg:mx-8
                  lg:text-6xl
                "
              >
                {text}
              </span>

              <span
                className="
                  mx-1
                  shrink-0
                  text-xl
                  font-normal
                  text-[#780014]
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ================= SECOND ROW ================= */}
      <div className="flex w-full overflow-hidden">
        <div className="marquee-track marquee-right flex min-w-max items-center">
          {[...secondRow, ...secondRow].map((text, index) => (
            <React.Fragment key={`second-${index}`}>
              <span
                className="
                  mx-4
                  shrink-0
                  text-3xl
                  font-normal
                  italic
                  tracking-tight
                  text-[#780014]
                  sm:mx-6
                  sm:text-4xl
                  md:text-5xl
                  lg:mx-8
                  lg:text-6xl
                "
              >
                {text}
              </span>

              <span
                className="
                  mx-1
                  shrink-0
                  text-xl
                  font-normal
                  text-black/30
                  sm:text-2xl
                  lg:text-3xl
                "
              >
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ================= MARQUEE CSS ================= */}
      <style>{`
        .marquee-track {
          width: max-content;
          will-change: transform;
        }

        .marquee-left {
          animation: marqueeLeft 25s linear infinite;
        }

        .marquee-right {
          animation: marqueeRight 28s linear infinite;
        }

        @keyframes marqueeLeft {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }

          100% {
            transform: translateX(0);
          }
        }

        @media (max-width: 640px) {
          .marquee-left {
            animation-duration: 18s;
          }

          .marquee-right {
            animation-duration: 20s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-left,
          .marquee-right {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Marquee;

