import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Sparkles,
  Heart,
  Droplets,
} from "lucide-react";

const ReginaStory = () => {
  return (
    <main className="w-full overflow-hidden">

      {/* =====================================================
          SECTION 1 — HAIR
      ====================================================== */}
      <section className=" bg-[#7c0015] text-white py-14 sm:py-18 md:py-22 lg:py-22">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* VIDEO */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] sm:h-[650px] md:h-[600px] lg:h-[660px] rounded-[28px] overflow-hidden">

                <video
                  src="/hair.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute top-6 left-6">
                  
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  

                  <p className="mt-2 text-lg sm:text-xl font-light">
                    Beauty starts with healthy hair.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:pl-4"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-px bg-white/50" />

                <span className="text-xs uppercase tracking-[0.28em] text-white/65">
                  Hair Care
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-light leading-[0.98] tracking-tight">
                Love your
                <span className="block italic font-serif mt-2">
                  natural beauty.
                </span>
              </h2>

              <p className="mt-7 text-sm sm:text-base md:text-lg leading-7 text-white/70 max-w-xl">
                Your hair deserves more than just a beautiful style.
                Discover professional care, nourishing treatments and
                thoughtful rituals that keep your hair looking healthy,
                soft and naturally beautiful.
              </p>

              <div className="grid grid-cols-2 gap-6 mt-10 max-w-md">

                <div className="border-t border-white/20 pt-5">
                  <p className="text-2xl sm:text-3xl font-light">
                    01
                  </p>

                  <p className="text-xs sm:text-sm text-white/60 mt-2">
                    Nourish
                  </p>
                </div>

                <div className="border-t border-white/20 pt-5">
                  <p className="text-2xl sm:text-3xl font-light">
                    02
                  </p>

                  <p className="text-xs sm:text-sm text-white/60 mt-2">
                    Style
                  </p>
                </div>

              </div>

              <button className="mt-10 inline-flex items-center gap-4 group">
                <span className="text-sm uppercase tracking-[0.15em]">
                  Discover more
                </span>

                <span className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#5b1820]">
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </button>
            </motion.div>

          </div>
        </div>
      </section>


      {/* =====================================================
          SECTION 2 — BRIDAL
      ====================================================== */}
      <section className="bg-white text-[#241b1b] py-14 sm:py-18 md:py-22 lg:py-22">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1 lg:pr-8"
            >
              

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-light leading-[0.98]">
                Your most
                <span className="block  font-serif mt-2">
                  beautiful moment.
                </span>
              </h2>

              <p className="mt-7 text-sm sm:text-base md:text-lg text-black/55 leading-7 max-w-xl">
                Every bride deserves to feel confident, elegant and
                completely herself. From timeless bridal looks to
                delicate finishing touches, every detail is created
                with care for your special day.
              </p>

              {/* FEATURE */}
              <div className="mt-9 space-y-5">

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#f5e9e9] flex items-center justify-center">
                    <Heart
                      size={17}
                      strokeWidth={1.5}
                      className="text-[#7a3a42]"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-medium">
                      Timeless bridal looks
                    </h4>

                    <p className="text-xs sm:text-sm text-black/50 mt-1 leading-6">
                      Elegant styles designed around your personality.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                 
              

                  <div>
                    <h4 className="text-sm sm:text-base font-medium">
                      Every detail matters
                    </h4>

                    <p className="text-xs sm:text-sm text-black/50 mt-1 leading-6">
                      Professional finishing for a flawless bridal look.
                    </p>
                  </div>
                </div>

              </div>

             
            </motion.div>


            {/* VIDEO */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <div className="relative h-[490px] sm:h-[490px] md:h-[600px] lg:h-[660px] rounded-[28px] overflow-hidden group">

                <video
                  src="/skin-care.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute top-6 right-6">
                  
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                 

                  <h3 className="text-2xl sm:text-3xl font-light mt-2">
                    Elegance in every detail.
                  </h3>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>


    </main>
  );
};

export default ReginaStory;