
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";

const Contact = () => {
  const whatsappNumber = "923005588398";

  const mapLink =
    "https://www.google.com/maps/place/30%C2%B014'04.6%22N+71%C2%B029'37.3%22E/@30.2346191,71.491108,17z/data=!3m1!4b1!4m4!3m3!8m2!3d30.2346191!4d71.4936829?hl=en&entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D";

  const mapEmbed =
    "https://www.google.com/maps?q=30.2346191,71.4936829&z=17&output=embed";

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${whatsappNumber}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const service = e.target.service.value;
    const message = e.target.message.value;

    const whatsappMessage = encodeURIComponent(
      `Hello Regina Salon,

Name: ${name}
Email: ${email}
Service: ${service || "Not selected"}

Message:
${message}`
    );

    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      "_blank",
      "noopener,noreferrer"
    );

    e.target.reset();
  };

  return (
    <section
      id="location"
      className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16 xl:px-20"
    >
      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#960018]/5 blur-3xl sm:h-72 sm:w-72" />

      <div className="pointer-events-none absolute -right-24 bottom-20 h-64 w-64 rounded-full bg-[#960018]/5 blur-3xl sm:h-80 sm:w-80" />

      <div className="relative mx-auto w-full max-w-4xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-9 text-center sm:mb-12"
        >
          

          <h2 className="text-4xl font-light leading-tight text-black sm:text-5xl md:text-6xl">
            Get In <span className="font-medium">Touch</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
            We're here to make your beauty experience special.
            <br className="hidden sm:block" />
            Tell us what you need and we'll be happy to help.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-[1.5rem] border border-gray-100 bg-[#fafafa] p-5 shadow-sm sm:rounded-[2rem] sm:p-8 md:p-10 lg:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#960018] focus:ring-2 focus:ring-[#960018]/10 sm:py-4"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-black"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#960018] focus:ring-2 focus:ring-[#960018]/10 sm:py-4"
                />
              </div>
            </div>

            {/* Service */}
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-medium text-black"
              >
                Service
              </label>

              <select
                id="service"
                name="service"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-[#960018] focus:ring-2 focus:ring-[#960018]/10 sm:py-4"
              >
                <option value="">Select a service</option>
                <option value="Bridal Makeup">Bridal Makeup</option>
                <option value="Makeup">Makeup</option>
                <option value="Hair Styling">Hair Styling</option>
                <option value="Skin Care">Skin Care</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-black"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                required
                rows="5"
                placeholder="Tell us how we can help..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm text-black outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#960018] focus:ring-2 focus:ring-[#960018]/10 sm:py-4"
              />
            </div>

            {/* Submit Button */}
           <motion.button
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.98 }}
  type="submit"
  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#ffffff] border border-[#94081f] px-5 py-3.5 text-sm font-semibold text-[#780014] transition-all duration-300 hover:bg-[#fffefe] sm:py-4"
>
  Send Message

  <ArrowUpRight
    size={18}
    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
  />
</motion.button>
          </form>
        </motion.div>

        {/* Location Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 mb-5 sm:mt-16 sm:mb-6"
        >
          <div className="flex items-center gap-3">
           
            
          </div>
        </motion.div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-[1.5rem] border border-gray-200 bg-gray-100 shadow-sm sm:rounded-[2rem]"
        >
          <div className="h-[280px] w-full sm:h-[360px] md:h-[420px] lg:h-[450px]">
            <iframe
              title="Regina Salon Location"
              src={mapEmbed}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Open Google Maps */}
        <div className="mt-4 flex justify-end">
          <motion.a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-2 rounded-xl border border-[#070505] px-5 py-3 text-sm font-semibold text-[#050405] transition-all duration-300 hover:bg-[#000000] hover:text-white"
          >
            Open in Google Maps

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </motion.a>
        </div>

        {/* WhatsApp - Bottom Right */}
      <div className="mt-5 flex w-full justify-end sm:mt-6 lg:translate-x-90 lg:-translate-y-10">
  <motion.button
    type="button"
    onClick={handleWhatsApp}
    aria-label="Contact Regina Salon on WhatsApp"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.94 }}
    transition={{ duration: 0.4 }}
    className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/15 sm:h-16 sm:w-16"
  >
    {/* WhatsApp SVG */}
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8 sm:h-9 sm:w-9"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16.002 3C8.82 3 3 8.82 3 16c0 2.294.598 4.448 1.644 6.319L3.05 29l6.85-1.558A12.94 12.94 0 0 0 16.002 29C23.18 29 29 23.18 29 16S23.18 3 16.002 3Z"
        fill="white"
      />

      <path
        d="M21.48 18.72c-.3-.15-1.78-.878-2.055-.978-.275-.1-.475-.15-.675.15-.2.3-.775.978-.95 1.178-.175.2-.35.225-.65.075-.3-.15-1.265-.466-2.408-1.487-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.462.132-.612.136-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.585-.492-.506-.675-.515l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.115 3.23 5.122 4.53.716.309 1.275.493 1.71.631.718.229 1.371.197 1.888.12.576-.086 1.78-.728 2.03-1.428.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35Z"
        fill="#25D366"
      />
    </svg>
  </motion.button>
</div>
      </div>
    </section>
  );
};

export default Contact;
