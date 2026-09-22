
import React from "react";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section id="about" className="bg-white text-black py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* SMALL HEADING */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[#780014] text-sm md:text-base tracking-[0.3em] uppercase mb-8"
        >
          About Regina
        </motion.p>

        {/* MAIN HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight max-w-5xl"
        >
          Be beautiful.
          <br />
          Feel confident.
          <br />
          <span className="text-[#780014]">Just you.</span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 md:mt-16 max-w-2xl ml-auto"
        >
          <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed">
            Welcome to Regina Salon, a space created for women who believe
            beauty is about feeling confident, comfortable, and completely
            yourself. From beautiful hair and flawless makeup to relaxing
            skincare and bridal beauty, every experience is thoughtfully
            designed around you.
          </p>

          <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed mt-6">
            At Regina, we believe your beauty should never hide who you are.
            Our goal is simple — to bring out the best version of you while
            making every visit feel special.
          </p>

          {/* BUTTON */}
          <motion.button
            whileHover={{ x: 6 }}
            transition={{ duration: 0.3 }}
            className="mt-10 text-sm tracking-[0.2em] uppercase text-[#780014] border-b border-[#780014] pb-2"
          >
            Discover Regina
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;

