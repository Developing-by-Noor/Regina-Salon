import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const SignatureSection = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    let targetX = 0;
    let currentX = 0;
    let animationFrame;

    // Cursor section ke andar hai ya nahi
    let isCursorInside = false;

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;

      if (Math.abs(targetX - currentX) < 0.1) {
        currentX = targetX;
      }

      track.style.transform = `translate3d(${-currentX}px, 0, 0)`;

      animationFrame = requestAnimationFrame(animate);
    };

    // ================= CURSOR ENTER =================
    const handleMouseEnter = () => {
      isCursorInside = true;
    };

    // ================= CURSOR LEAVE =================
    const handleMouseLeave = () => {
      isCursorInside = false;
    };

    // ================= WHEEL =================
    const handleWheel = (e) => {
      // Cursor section ke andar nahi hai
      // to normal page scroll hone do
      if (!isCursorInside) return;

      const maxMove = Math.max(
        track.scrollWidth - section.clientWidth,
        0
      );

      if (maxMove <= 0) return;

      const previousX = targetX;

      targetX += e.deltaY;

      targetX = Math.max(
        0,
        Math.min(targetX, maxMove)
      );

      // Cards abhi horizontally move kar sakte hain
      const canMoveForward =
        e.deltaY > 0 && previousX < maxMove;

      const canMoveBackward =
        e.deltaY < 0 && previousX > 0;

      // Sirf horizontal movement ke waqt
      // normal vertical page scroll ko stop karo
      if (canMoveForward || canMoveBackward) {
        e.preventDefault();
      }
    };

    // ================= RESIZE =================
    const handleResize = () => {
      const maxMove = Math.max(
        track.scrollWidth - section.clientWidth,
        0
      );

      targetX = Math.max(
        0,
        Math.min(targetX, maxMove)
      );
    };

    section.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    section.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    window.addEventListener(
      "resize",
      handleResize
    );

    animationFrame = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      section.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const bridalImages = [
    {
      src: "/Bride1.jpeg",
      title: "The Bride",
      number: "01",
    },
    {
      src: "/Bride2.jpeg",
      title: "Bridal Glow",
      number: "02",
    },
    {
      src: "/Bride3.jpeg",
      title: "Timeless Beauty",
      number: "03",
    },
    {
      src: "/Bride4.jpeg",
      title: "The Celebration",
      number: "04",
    },
    {
      src: "/Bride5.jpeg",
      title: "Elegant Moments",
      number: "05",
    },
    {
      src: "/Bride6.jpeg",
      title: "Forever Beautiful",
      number: "06",
    },
  ];

  const handleAppointment = () => {
    const section = document.querySelector(
      "#appointment"
    );

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="signature"
      className="
        relative
        h-[68vh]
        sm:h-[78vh]
        md:h-[82vh]
        lg:h-[91vh]
        overflow-hidden
        bg-[#780014]
      "
    >
      <div className="sticky top-0 flex h-full flex-col justify-center overflow-hidden">

        {/* ================= HEADER ================= */}
        <div
          className="
            absolute
            left-0
            right-0
            top-0
            z-20
            px-5
            pt-5
            sm:px-8
            sm:pt-7
            lg:px-12
            xl:px-16
          "
        >
          <div
            className="
              mx-auto
              flex
              max-w-[1500px]
              flex-col
              gap-6
              border-b
              border-white/20
              pb-4
              sm:flex-row
              sm:items-end
              sm:justify-between
              sm:pb-5
            "
          >
            <div>
              <p
                className="
                  mb-1.5
                  text-[10px]
                  font-semibold
                  translate-y-2
                  uppercase
                  tracking-[0.35em]
                  text-white/90
                  sm:text-[9px]
                "
              >
                Regina Signature
              </p>

              <h2
                className="
                  max-w-2xl
                  translate-y-3
                  text-3xl
                  font-light
                  leading-[1.05]
                  tracking-tight
                  text-white
                  whitespace-nowrap
                  sm:translate-y-4
                  sm:text-4xl
                  md:text-4xl
                  translate-y-5
                  lg:text-6xl
                "
              >
                Moments made{" "}
                <span className="font-normal">
                  unforgettable.
                </span>
              </h2>
            </div>
          </div>
        </div>

        {/* ================= HORIZONTAL GALLERY ================= */}
        <div
          ref={trackRef}
          className="
            flex
            w-max
            items-center
            gap-3
            px-5
            pt-16
            will-change-transform
            sm:gap-6
            sm:px-8
            sm:pt-20
            lg:gap-8
            lg:px-12
            lg:pt-24
            xl:px-16
          "
        >
          {bridalImages.map((image, index) => (
            <div
              key={image.number}
              className={`
                group
                relative
                shrink-0
                overflow-hidden
                ${
                  index % 2 === 0
                    ? `
                      h-[42vh]
                      w-[72vw]

                      sm:h-[48vh]
                      sm:w-[42vw]

                      md:h-[52vh]
                      md:w-[34vw]

                      lg:h-[58vh]
                      lg:w-[28vw]
                    `
                    : `
                      h-[35vh]
                      w-[62vw]

                      sm:h-[41vh]
                      sm:w-[36vw]

                      md:h-[45vh]
                      md:w-[30vw]

                      lg:h-[50vh]
                      lg:w-[25vw]
                    `
                }
              `}
            >
              {/* IMAGE */}
              <img
                src={image.src}
                alt={image.title}
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
                loading="lazy"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

              {/* NUMBER */}
              <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                <span className="text-[9px] font-medium tracking-[0.25em] text-white/80">
                  {image.number}
                </span>
              </div>

              {/* CONTENT */}
              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  right-4
                  flex
                  items-end
                  justify-between
                  sm:bottom-6
                  sm:left-6
                  sm:right-6
                "
              >
                <div>
                  <p className="text-[7px] uppercase tracking-[0.25em] text-white/60 sm:text-[8px]">
                    Regina Bridal
                  </p>

                  <h3 className="mt-1.5 text-lg font-light text-white sm:text-xl lg:text-2xl">
                    {image.title}
                  </h3>
                </div>

                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/40
                    text-white
                    transition-all
                    duration-300
                    group-hover:border-white
                    group-hover:bg-white
                    group-hover:text-[#780014]
                    sm:h-9
                    sm:w-9
                  "
                >
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.4}
                    className="
                      transition-transform
                      duration-300
                      group-hover:rotate-45
                    "
                  />
                </div>
              </div>
            </div>
          ))}

          {/* ================= FINAL CARD ================= */}
          <div
            className="
              flex
              h-[35vh]
              w-[75vw]
              shrink-0
              flex-col
              justify-between
              border
              border-white/20
              p-5

              sm:h-[41vh]
              sm:w-[40vw]
              sm:p-7

              md:h-[45vh]
              md:w-[30vw]

              lg:h-[50vh]
              lg:w-[27vw]
            "
          >
            <div>
              <span className="text-[8px] uppercase tracking-[0.3em] text-white/50">
                Your Moment
              </span>

              <h3
                className="
                  mt-4
                  max-w-sm
                  text-xl
                  font-light
                  leading-tight
                  text-white
                  sm:text-2xl
                  lg:text-4xl
                "
              >
                Your beauty deserves its own signature.
              </h3>
            </div>

            <button
              onClick={handleAppointment}
              className="
                group
                flex
                w-fit
                items-center
                gap-3
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-white
                sm:text-[9px]
              "
            >
              Book Your Appointment

              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/40
                  transition-all
                  duration-300
                  group-hover:bg-white
                  group-hover:text-[#780014]
                "
              >
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="
                    transition-transform
                    duration-300
                    group-hover:rotate-45
                  "
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignatureSection;