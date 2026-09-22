
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Menu = () => {
  return (
    <section
      id="menu"
      className="flex items-center justify-center bg-white px-5 py-14 sm:px-6 sm:py-16 md:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-5xl text-center"
      >
        {/* Small Heading */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-3 text-[11px] uppercase text-[#780014] sm:text-xs"
        >
          Explore Our Services
        </motion.p>

        {/* Main Heading */}
        <h1
          className="
            font-serif
            text-4xl
            font-medium
            leading-tight
            text-black
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          Our Menu
        </h1>

        {/* Line */}
        <div className="mt-4 flex items-center justify-center">
          <div className="h-[1px] w-14 bg-[#780014] sm:w-20" />
        </div>

        {/* Description */}
        <p
          className="
            mx-auto
            mt-4
            max-w-xl
            text-xs
            leading-6
            text-black/60
            sm:text-sm
            md:text-base
          "
        >
          Discover our complete range of beauty, hair, skincare and
          bridal services. View our full menu for detailed services.
        </p>

        {/* View Menu */}
        <motion.a
          href="/menu.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            group
            mt-7
            inline-flex
            items-center
            justify-center
            gap-2.5
            rounded-full
            border
            border-[#900119]
            bg-black
            px-7
            py-3.5
            text-xs
            font-medium
            text-white
            transition-all
            duration-300
            hover:border-black
            hover:bg-black
            sm:px-8
            sm:text-sm
          "
        >
          View Full Menu

          <ArrowUpRight
            size={17}
            className="
              transition-transform
              duration-300
              group-hover:-translate-y-1
              group-hover:translate-x-1
            "
          />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Menu;
