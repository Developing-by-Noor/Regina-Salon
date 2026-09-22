
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Blog = () => {
  const sections = [
    {
      image: "/glow.png",
      title: "Beauty begins with feeling like yourself.",
      paragraphs: [
        "Regina Salon was created with a simple belief — every woman deserves a beauty experience that feels personal, comfortable, and beautifully her own.",
        "From elegant makeup and refined hair styling to thoughtful skincare, every detail is created with care, precision, and attention to individuality.",
      ],
      button: "Discover Our Story",
      imageFirst: true,
    },
    {
      image: "/Facial.jpg",
      title: "Where beauty meets confidence.",
      paragraphs: [
        "At Regina, beauty is more than a service. It is a moment to slow down, take care of yourself, and leave feeling confident in your own skin.",
        "Our team focuses on creating an experience that feels effortless, welcoming, and tailored to you — whether it is your everyday look or your most special occasion.",
      ],
      button: "Explore Services",
      imageFirst: false,
    },
    {
      image: "/hair.png",
      title: "Beautiful hair starts with the right care.",
      paragraphs: [
        "Healthy, beautiful hair is all about understanding what your hair needs. At Regina Salon, every styling experience is designed to enhance your natural beauty while keeping your hair looking healthy and polished.",
        "From fresh haircuts and effortless styling to occasion-ready looks, our team focuses on creating styles that suit your personality, features, and everyday lifestyle.",
      ],
      button: "Explore Hair Services",
      imageFirst: true,
    },
  ];

  return (
    <section id="blog" className="w-full bg-white pt-[71px]">
      {sections.map((item, index) => (
        <div
          key={index}
          className="grid w-full grid-cols-1 lg:grid-cols-2"
        >
          {/* IMAGE */}
          {item.imageFirst && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative order-1 h-[380px] overflow-hidden sm:h-[480px] md:h-[540px] lg:h-[620px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
            </motion.div>
          )}

          {/* CONTENT */}
          <motion.div
            initial={{
              opacity: 0,
              x: item.imageFirst ? 30 : -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`flex min-h-[380px] items-center bg-[#8a041a] px-6 py-12 sm:min-h-[480px] sm:px-10 sm:py-16 md:min-h-[540px] md:px-12 md:py-20 lg:min-h-[620px] lg:px-16 xl:px-24 ${
              item.imageFirst
                ? "order-2 lg:order-2"
                : "order-2 lg:order-1"
            }`}
          >
            <div className="w-full max-w-xl">

              {/* TITLE */}
              <h2 className="text-3xl font-light leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[54px]">
                {item.title}
              </h2>

              {/* PARAGRAPHS */}
              <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5">
                {item.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className="max-w-lg text-[13px] leading-6 text-white/85 sm:text-sm sm:leading-7 md:text-base md:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* BUTTON */}
              <a
                href="#services"
                className="group mt-7 inline-flex items-center gap-3 border-b border-white pb-2 text-xs font-semibold text-white sm:mt-9 sm:text-sm"
              >
                {item.button}

                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </motion.div>

          {/* SECOND IMAGE */}
          {!item.imageFirst && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative order-1 h-[380px] overflow-hidden sm:h-[480px] md:h-[540px] lg:order-2 lg:h-[620px]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
            </motion.div>
          )}
        </div>
      ))}
    </section>
  );
};

export default Blog;

