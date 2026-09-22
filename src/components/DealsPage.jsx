import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
} from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import Navbar from "../components/Navbar";

const demoDeals = [
  {
    id: "demo-1",
    title: "Bridal Glow Package",
    category: "Bridal Makeup",
    description:
      "Complete bridal makeup look designed to make your special day unforgettable.",
    originalPrice: "25000",
    dealPrice: "19999",
  },
  {
    id: "demo-2",
    title: "Hair Transformation",
    category: "Hair Styling",
    description:
      "Refresh your look with professional hair styling and salon care.",
    originalPrice: "12000",
    dealPrice: "8999",
  },
  {
    id: "demo-3",
    title: "Skin Glow Treatment",
    category: "Skin Care",
    description:
      "Give your skin a fresh, radiant look with our exclusive skincare treatment.",
    originalPrice: "8000",
    dealPrice: "5999",
  },
];

const DealsPage = () => {
  const [deals, setDeals] = useState(demoDeals);
  const [loading, setLoading] = useState(false);

  // ================= FIREBASE DEALS =================
  useEffect(() => {
    const dealsRef = collection(fireDB, "deals");

    const unsubscribe = onSnapshot(
      dealsRef,
      (snapshot) => {
        const firebaseDeals = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Firebase Deals:", firebaseDeals);

        if (firebaseDeals.length > 0) {
          setDeals(firebaseDeals);
        } else {
          setDeals(demoDeals);
        }

        setLoading(false);
      },
      (error) => {
        console.error("Error loading deals:", error);

        // Firebase error ki surat mein demo deals show hongi
        setDeals(demoDeals);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ================= BOOK DEAL =================
  const handleBookDeal = (deal) => {
    localStorage.setItem(
      "selectedDeal",
      JSON.stringify(deal)
    );

    window.location.href = "/book-appointment";
  };

  // ================= BACK =================
  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen w-full bg-white">

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="px-5 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
        <div className="mx-auto max-w-[1500px]">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-5 flex items-center justify-center gap-3">

              <span className="h-px w-8 bg-[#780014] sm:w-12" />

              <div className="flex items-center gap-2 text-[#780014]">

                <span className="text-[10px] uppercase tracking-[0.3em] sm:text-xs">
                  Regina Exclusive
                </span>

              </div>

              <span className="h-px w-8 bg-[#780014] sm:w-12" />

            </div>

            <h1 className="text-4xl font-light leading-[0.95] text-[#201919] sm:text-5xl md:text-6xl lg:text-7xl">
              Beauty

              <span className="mt-2 block font-serif text-[#000000]">
                Deals
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-black/50 sm:text-base">
              Discover our exclusive salon offers,
              created especially for your beauty and
              self-care moments.
            </p>

          </motion.div>

        </div>
      </section>

      {/* ================= DEALS ================= */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-10 lg:pb-28">

        <div className="mx-auto max-w-[1500px]">

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-[365px] animate-pulse rounded-[24px] border border-[#e9e2df] bg-gray-50"
                />
              ))}

            </div>
          )}

          {/* Deals */}
          {!loading && deals.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {deals.map((deal, index) => {

                const originalPrice = Number(
                  deal.originalPrice || 0
                );

                const price = Number(
                  deal.dealPrice || 0
                );

                const discount =
                  originalPrice > price &&
                  price > 0
                    ? Math.round(
                        ((originalPrice - price) /
                          originalPrice) *
                          100
                      )
                    : 0;

                return (
                  <motion.article
                    key={deal.id}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: (index % 4) * 0.06,
                    }}
                    className="group flex min-h-[365px] flex-col rounded-[24px] border border-[#e9e2df] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#780014]/35 hover:shadow-[0_20px_60px_rgba(120,0,20,0.10)] sm:p-6"
                  >

                    {/* TOP */}
                    <div className="flex items-start justify-end">

                      {discount > 0 && (
                        <span className="rounded-full bg-[#f0f0f0] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-black">
                          {discount}% OFF
                        </span>
                      )}

                    </div>

                    {/* CATEGORY */}
                    {deal.category && (
                      <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#780014]">
                        {deal.category}
                      </p>
                    )}

                    {/* TITLE */}
                    <h2 className="mt-2 text-xl leading-tight text-[#211b1b] sm:text-[23px]">
                      {deal.title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="mt-4 min-h-[60px] text-xs leading-5 text-black/65 sm:text-[13px]">
                      {deal.description}
                    </p>

                    {/* DIVIDER */}
                    <div className="my-5 h-px w-full bg-[#eee7e3]" />

                    {/* PRICE */}
                    <div className="flex flex-wrap items-baseline gap-2">

                      {price > 0 && (
                        <span className="text-2xl font-medium -translate-y-4 text-black">
                          Rs.{" "}
                          {price.toLocaleString()}
                        </span>
                      )}

                      {originalPrice > price && (
                        <span className="text-xs text-black/50 -translate-y-4 line-through">
                          Rs.{" "}
                          {originalPrice.toLocaleString()}
                        </span>
                      )}

                    </div>

                    {/* BOOK BUTTON */}
                    <button
                      onClick={() =>
                        handleBookDeal(deal)
                      }
                      className="
                        group/btn
                        mt-auto
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        border
                        border-[#9e001a]
                        bg-transparent
                        py-3.5
                        text-xs
                        font-medium
                        text-[#8b051b]
                        transition-all
                        duration-300
                        hover:bg-[#9c0000]
                        hover:text-white
                        sm:text-sm
                      "
                    >
                      Book Deal

                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      />

                    </button>

                  </motion.article>
                );
              })}

            </div>
          )}

          {/* NO DEALS */}
          {!loading && deals.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center rounded-[24px] border border-dashed border-[#e9e2df] px-5 text-center">

              <div>

                <h2 className="mt-5 text-2xl font-light text-black">
                  No Deals Available
                </h2>

                <p className="mt-2 text-sm text-black/50">
                  New exclusive offers will appear here soon.
                </p>

                <button
                  onClick={handleBack}
                  className="mt-6 rounded-full border border-[#780014] bg-transparent px-6 py-3 text-xs font-medium text-[#780014] transition hover:bg-[#780014] hover:text-white"
                >
                  Back to Website
                </button>

              </div>

            </div>
          )}

        </div>
      </section>

    </main>
  );
};

export default DealsPage;