
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How can I book an appointment?",
    answer:
      "You can easily book your appointment through our website. Select your preferred service, choose your date and time, and submit your booking request.",
  },
  {
    question: "Do I need to book an appointment in advance?",
    answer:
      "We recommend booking in advance to secure your preferred date and time, especially for bridal and special occasion services.",
  },
  {
    question: "What beauty services does Regina Salon offer?",
    answer:
      "Regina Salon offers professional makeup, bridal makeup, hair styling, hair care, skincare, and other beauty services designed for your individual needs.",
  },
  {
    question: "Do you offer bridal makeup packages?",
    answer:
      "Yes. We offer bridal beauty services tailored to your wedding day, including makeup and hair styling. You can contact us for package details and availability.",
  },
  {
    question: "Can I reschedule my appointment?",
    answer:
      "Yes, appointments can be rescheduled depending on availability. We recommend contacting the salon as early as possible if you need to change your appointment.",
  },
  {
    question: "How early should I arrive for my appointment?",
    answer:
      "We recommend arriving around 10 minutes before your scheduled appointment so you can comfortably prepare for your service.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="w-full bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-12 text-center sm:mb-16">

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#780014]" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#780014] sm:text-xs">
              FAQs
            </span>

            <span className="h-px w-10 bg-[#780014]" />
          </div>

          <h2 className="text-3xl font-light tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
            Frequently Asked
            <span className="block text-[#000000]">
              Questions
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
            Everything you need to know before your Regina Salon
            experience.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mx-auto max-w-4xl border-t border-gray-200">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border-b border-gray-200"
              >
                {/* QUESTION */}
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6 md:py-7"
                >
                  <div className="flex items-start gap-4 sm:gap-6">

                    <span className="pt-0.5 text-[10px] font-semibold tracking-[0.15em] text-[#780014] sm:text-xs">
                      0{index + 1}
                    </span>

                    <span
                      className={`text-sm font-medium leading-6 transition-colors duration-300 sm:text-base md:text-lg ${
                        isOpen
                          ? "text-[#000000]"
                          : "text-black"
                      }`}
                    >
                      {faq.question}
                    </span>

                  </div>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300 sm:h-9 sm:w-9 ${
                      isOpen
                        ? "border-[#a8001c] bg-[#a7001c] text-white"
                        : "border-gray-200 text-black"
                    }`}
                  >
                    {isOpen ? (
                      <Minus size={16} strokeWidth={1.7} />
                    ) : (
                      <Plus size={16} strokeWidth={1.7} />
                    )}
                  </span>
                </button>

                {/* ANSWER */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pl-9 pr-2 sm:pb-7 sm:pl-[58px] md:pr-12">
                        <p className="max-w-3xl text-sm leading-7 text-gray-500 sm:text-[15px] sm:leading-7">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

        </div>


      </div>
    </section>
  );
};

export default Faqs;

