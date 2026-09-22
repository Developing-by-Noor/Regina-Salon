
import React from "react";

const Services = () => {
  const services = [
    {
      number: "01",
  
      title: "Makeup",
      subtitle: "Beauty & Glamour",
      text: "From soft natural looks to elegant bridal glam, our makeup services are designed to enhance your natural beauty and make every moment unforgettable.",
      items: [
        "Bridal Makeup",
        "Party Makeup",
        "Engagement Makeup",
        "Soft Glam",
      ],
    },
    {
      number: "02",

      title: "Hair Styling",
      subtitle: "Hair & Styling",
      text: "Beautiful hairstyles created around your personality, outfit, and occasion — from effortless waves to sophisticated bridal hairstyles.",
      items: [
        "Bridal Hairstyles",
        "Hair Waves",
        "Hair Updos",
        "Event Styling",
      ],
    },
    {
      number: "03",

      title: "Skin Care",
      subtitle: "Skin & Glow",
      text: "Give your skin the care it deserves with relaxing treatments focused on freshness, hydration, smoothness, and a naturally radiant glow.",
      items: [
        "Facials",
        "Skin Hydration",
        "Glow Treatments",
        "Skin Preparation",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="w-full bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* ================= HEADER ================= */}
        <div className="mb-12 border-b border-black/10 pb-7 sm:mb-16 sm:pb-8">
          <div>
            <p className="mb-3 text-sm font-normal text-black">
              Our Services
            </p>

            <h2 className="max-w-3xl text-3xl font-light leading-[1.05] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
              Beauty designed for your{" "}
              <span className="font-normal italic text-[#780014]">
                moment.
              </span>
            </h2>
          </div>
        </div>

        {/* ================= 3 SERVICE BOXES ================= */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-7">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.number}
                className="
                  group
                  relative
                  min-h-[500px]
                  overflow-hidden
                  border
                  border-black/10
                  bg-white
                  p-7
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#780014]/30
                  hover:shadow-[0_25px_70px_rgba(0,0,0,0.08)]
                  sm:min-h-[530px]
                  sm:p-9
                  lg:p-10
                "
              >
                {/* ================= TOP ================= */}
                <div className="flex items-start justify-between">
                 

                  <span className="text-sm font-normal text-black">
                    {service.number}
                  </span>
                </div>

                {/* ================= MAIN CONTENT ================= */}
                <div className="mt-14">
                  <p className="text-sm font-normal text-black">
                    {service.subtitle}
                  </p>

                  <h3 className="mt-3 text-3xl font-light tracking-tight text-black sm:text-4xl">
                    {service.title}
                  </h3>

                  <p className="mt-6 text-sm font-normal leading-7 text-black">
                    {service.text}
                  </p>
                </div>

                {/* ================= SERVICE LIST ================= */}
                <div className="absolute bottom-10 left-7 right-7 sm:left-9 sm:right-9 lg:left-10 lg:right-10">
                  <div className="mb-5 h-px w-full bg-black/10" />

                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {service.items.map((item) => (
                      <div
                        key={item}
                        className="
                          flex
                          items-center
                          gap-2
                          text-sm
                          font-normal
                          text-black
                        "
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#780014]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ================= BOTTOM ACCENT ================= */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-[#780014]
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

