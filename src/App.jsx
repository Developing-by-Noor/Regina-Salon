
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Services from "./components/Services";
import SignatureSection from "./components/SignatureSection";
import Marquee from "./components/Marquee";
import Blog from "./components/Blog";
import Menu from "./components/Menu";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import ContactUs from "./components/ContactUs";
import BookAppointment from "./components/BookAppointment";
import AdminDashboard from "./components/AdminDashboard";
import ReginaStory from "./components/ReginaStory";
import DealsPage from "./components/DealsPage";
import FAQs from "./components/FAQs";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const path = window.location.pathname;

  // Admin Dashboard
  if (path === "/admin") {
    return <AdminDashboard />;
  }

  return (
    <>
      <Navbar onMenuClick={() => setShowMenu(true)} />

      {path === "/deals" ? (
        <DealsPage />
      ) : path === "/blog" ? (
        <Blog />
      ) : path === "/book-appointment" ? (
        <BookAppointment />
      ) : showMenu ? (
        <Menu onClose={() => setShowMenu(false)} />
      ) : (
        <>
          <Hero />
          <AboutSection />
          <SignatureSection />
          <Services />
          <Marquee />
          <Menu />
          <ReginaStory />
          <Testimonials />
          <FAQs />
          <ContactUs />
          <Location />
        </>
      )}

      {/* Footer on every page except Admin Dashboard */}
      <Footer />
    </>
  );
}

export default App;

