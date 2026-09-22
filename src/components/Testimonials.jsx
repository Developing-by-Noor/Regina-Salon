
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Testimonials = () => {
  const reviewsTop = [
    {
      name: "Ayesha Khan",
      review:
        "I absolutely loved my experience here. The staff was so welcoming and my hair turned out exactly the way I wanted.",
    },
    {
      name: "Sana Malik",
      review:
        "Such a beautiful salon with amazing service. Everyone was professional, friendly and really listened to what I wanted.",
    },
    {
      name: "Maham Raza",
      review:
        "I had my makeup done for an event and received so many compliments. Everything looked elegant and natural.",
    },
    {
      name: "Hira Ahmed",
      review:
        "The service was excellent from start to finish. I loved the attention to detail and will definitely visit again.",
    },
    {
      name: "Fatima Noor",
      review:
        "One of the best salon experiences I have had. The atmosphere was relaxing and the results were beautiful.",
    },
  ];

  const reviewsBottom = [
    {
      name: "Zoya Ali",
      review:
        "I came for a facial and the results were amazing. My skin felt fresh, soft and beautifully cared for.",
    },
    {
      name: "Maryam Shah",
      review:
        "The team is incredibly talented and professional. My hairstyle looked perfect and lasted throughout the event.",
    },
    {
      name: "Iqra Hassan",
      review:
        "Absolutely loved the bridal makeup. It was exactly the look I wanted and everything felt so well organized.",
    },
    {
      name: "Anum Tariq",
      review:
        "Beautiful experience and lovely staff. They made me feel comfortable and took their time to get everything right.",
    },
    {
      name: "Nimra Asif",
      review:
        "I am genuinely impressed with the quality of service. The results were even better than I expected.",
    },
  ];

  const ReviewCard = ({ item }) => {
    return (
      <div
        className="
          w-[245px]
          sm:w-[285px]
          md:w-[310px]
          lg:w-[325px]
          shrink-0
               bg-[#920119]
          text-white
          rounded-xl
          px-4 py-4
          sm:px-5 sm:py-5
          shadow-md
        "
      >
        {/* Stars */}
        <div className="flex gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={13}
              fill="currentColor"
              strokeWidth={1.5}
              className="text-white"
            />
          ))}
        </div>

        {/* Review */}
        <p
          className="
            text-[12px]
            sm:text-[13px]
            md:text-sm
            leading-5
            sm:leading-6
            text-white/95
            font-light
          "
        >
          “{item.review}”
        </p>

        {/* Name */}
        <div className="mt-4 pt-3 border-t border-white/20">
          <p className="font-medium text-xs sm:text-sm">
            {item.name}
          </p>

          <p className="text-[10px] sm:text-[11px] text-white/55 mt-1">
            Verified Client
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      className="
        w-full
        bg-white
        text-black
        py-16
        sm:py-20
        md:py-24
        overflow-hidden
      "
    >
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center px-5 mb-10 sm:mb-12 md:mb-14">

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            text-[#780014]
            text-[11px]
            sm:text-xs
            uppercase
            tracking-[0.3em]
            mb-3
          "
        >
          Testimonials
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-light
            tracking-tight
          "
        >
          Loved by Our Clients
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="
            mt-4
            text-gray-500
            text-xs
            sm:text-sm
            md:text-base
          "
        >
          Real experiences from clients who trust our beauty services.
        </motion.p>
      </div>

      {/* ================= TOP ROW ================= */}
      <div className="w-full overflow-hidden mb-4 sm:mb-5">
        <motion.div
          className="flex gap-3 sm:gap-4 w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...reviewsTop, ...reviewsTop].map((item, index) => (
            <ReviewCard
              key={`top-${index}`}
              item={item}
            />
          ))}
        </motion.div>
      </div>

      {/* ================= BOTTOM ROW ================= */}
      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-3 sm:gap-4 w-max"
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...reviewsBottom, ...reviewsBottom].map((item, index) => (
            <ReviewCard
              key={`bottom-${index}`}
              item={item}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

