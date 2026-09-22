import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { CalendarDays, Clock, Send, ArrowLeft } from "lucide-react";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const services = {
    Facial: [
      "Simple Facial",
      "Jansen Facial",
      "Fruit Facial",
      "Coffee Facial",
      "Rice Facial",
      "Clean & Glow Facial",
      "Gluta Whitening Facial",
      "Oxy Glow Gold",
      "Oxy Glow Whitening",
      "Oxy Glow Zafrani",
      "Silky Cool Whitening",
      "Silky Cool Gold",
    ],

    "Mani-Pedi": [
      "Simple Mani-Pedi",
      "Attraction Mani-Pedi",
      "Beauty On",
      "Derma Shine",
      "Jessica Mani Pedi",
      "Mani-Pedi SPA",
      "Herbal Mani Pedi",
    ],

    "Hair Repair": [
      "Protein Treatment",
      "Keratin / Botox Treatment",
      "Herbal Care",
      "Hair Fall Treatment",
      "Split Ends Treatment",
      "Re-Growth & Length",
    ],

    "Hair Straightening": [
      "Rebonding",
      "Keratin Treatment",
      "Protein Treatment",
    ],

    "Hair Dye / Color": [
      "Root Touch-Up",
      "One Color Dye",
      "Highlights",
      "Ombre / Sombre",
      "Lowlights / Streaks",
      "Balayage",
    ],

    "Hair Styling": [
      "Blow Dry",
      "Hair Straightening",
      "Hair Curling",
      "Braids",
      "Buns / Extensions",
    ],

    "Wax / Threading": [
      "Forehead Wax",
      "Side Wax",
      "Chin Wax",
      "Eyebrows",
      "Upper Lips",
      "Full Face",
      "Under Legs Wax",
      "Under Arms Wax",
      "Half Arms Wax",
      "Half Legs Wax",
      "Half Arms / Legs",
      "Full Arms Wax",
      "Full Legs Wax",
      "Full Arms / Legs",
    ],

    Makeup: [
      "Party Makeup",
      "Nude Makeup",
      "Eyebrows & Upper Lips",
    ],

    "Bridal Package": [
      "Bridal Package - Rs. 50,000",
      "Bridal Package - Rs. 70,000",
    ],

    "Waleema Package": [
      "Waleema Makeup Package",
    ],

    "Nikkah Makeup": [
      "Nikkah Makeup",
    ],

    "Mehndi Makeup": [
      "Mehndi Makeup",
    ],

    "Hair Cutting": [
      "One Length Cut",
      "Front Flick / Bangs",
      "U / V Cut",
      "Bob Cut",
      "Wolf Cut",
      "Layers",
      "Step Cutting",
      "Diamond Cut",
      "Butterfly Cuts",
    ],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,

      ...(name === "category" && {
        service: "",
      }),
    }));

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      await addDoc(collection(fireDB, "appointments"), {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        category: formData.category,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        message: formData.message.trim(),
        status: "Pending",
        createdAt: serverTimestamp(),
      });

      setSuccess(
        "Your appointment request has been submitted successfully."
      );

      setFormData({
        name: "",
        phone: "",
        email: "",
        category: "",
        service: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong while booking your appointment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="book-appointment"
      className="min-h-screen w-full bg-[#ffffff] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">

        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
          className="group mb-10 inline-flex items-center gap-2 bg-transparent p-0 text-sm font-medium text-black transition-colors duration-300 hover:text-[#780014] focus:outline-none"
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span>Back to Home</span>
        </button>

        {/* HEADING */}
        <div className="mb-12 text-center sm:mb-16">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#780014]" />

            <span className="text-md font-semibold uppercase tracking-[0.3em] text-[#9e041e]">
              Book An Appointment
            </span>

            <span className="h-px w-10 bg-[#780014]" />
          </div>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            Choose your service, select your preferred date and time, and
            send us your appointment request.
          </p>
        </div>

        {/* FORM */}
        <div className="bg-white p-7 shadow-[0_20px_70px_rgba(0,0,0,0.06)] sm:p-10 lg:p-14">
          <form onSubmit={handleSubmit} className="space-y-7">

            {/* NAME + PHONE */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#780014]"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=""
                  required
                  className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#780014]"
                />
              </div>

            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#780014]"
              />
            </div>

            {/* CATEGORY + SERVICE */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black"
                >
                  Service Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-300 bg-white px-0 py-3 text-sm outline-none transition focus:border-[#780014]"
                >
                  <option value="">Select category</option>

                  {Object.keys(services).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black"
                >
                  Select Service
                </label>

                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  disabled={!formData.category}
                  className="w-full border-b border-gray-300 bg-white px-0 py-3 text-sm outline-none transition focus:border-[#780014] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    {formData.category
                      ? "Select service"
                      : "Choose category first"}
                  </option>

                  {formData.category &&
                    services[formData.category]?.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                </select>
              </div>

            </div>

            {/* DATE + TIME */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="date"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black"
                >
                  Preferred Date
                </label>

                <div className="relative">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 bg-transparent px-0 py-3 pr-8 text-sm outline-none transition focus:border-[#780014]"
                  />

                </div>
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black"
                >
                  Preferred Time
                </label>

                <div className="relative">
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 bg-transparent px-0 py-3 pr-8 text-sm outline-none transition focus:border-[#780014]"
                  />

                
                </div>
              </div>

            </div>

            {/* MESSAGE */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black"
              >
                Additional Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Anything you'd like us to know..."
                className="w-full resize-none border-b border-gray-300 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#780014]"
              />
            </div>

            {/* SUCCESS */}
            {success && (
              <div className="border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="group inline-flex w-full rounded-2xl items-center justify-center gap-3 bg-[#a70520] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#9b0000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Booking..." : "Book Appointment"}

              {!loading && (
                <Send
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              )}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;