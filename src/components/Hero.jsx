import React from "react";
import { FaArrowRight, FaShieldAlt, FaRegCreditCard } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";
import { LuZap } from "react-icons/lu";
import { FiGlobe } from "react-icons/fi";
import { MdSupportAgent } from "react-icons/md";
import { Link } from "react-router-dom";
import FeaturedCard from "./FeaturedCard";
import Nav from "./Nav";

const Hero = () => {
  return (
    <>
      <Nav />

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-background via-indigo-500/50 to-pink-400 px-6 sm:px-10 md:px-16 py-28 md:py-36"
      >
        {/* Floating Background Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <FaRegCreditCard className="absolute top-1/4 left-[10%] w-8 h-8 text-pink-400/30 animate-[float_6s_ease-in-out_infinite]" />
          <FaShieldAlt className="absolute bottom-[30%] left-[8%] w-6 h-6 text-pink-400/30 animate-[float_7s_ease-in-out_infinite_2s]" />
          <BiSolidZap className="absolute bottom-[12%] right-[10%] w-7 h-7 text-pink-400/30 animate-[float_5s_ease-in-out_infinite_0.5s]" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16">
          {/* ================= LEFT CONTENT ================= */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 md:w-1/2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-400/30 backdrop-blur-lg border border-pink-400/20 shadow-md">
              <BiSolidZap className="text-pink-500" />
              <span className="text-sm font-medium text-gray-700">
                Lightning-fast payments
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-700 leading-tight fold">
              Payments <br className="hidden md:block" /> Made Swift & Simple
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-md">
              Send and receive money instantly. Secure, fast, and trusted by
              millions worldwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 transition-all hover:scale-105 hover:shadow-lg"
              >
                Get Started Free
                <FaArrowRight />
              </Link>

              <button className="px-8 py-3 rounded-xl font-semibold text-blue-600 border border-blue-400/60 hover:bg-blue-50/60 transition">
                Learn More
              </button>
            </div>

            {/* Meta Info */}
            <div className="flex gap-6 text-sm text-gray-600 mt-6">
              <span>• No setup fees</span>
              <span>• 24/7 support</span>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="relative md:w-1/2 w-full flex justify-center">
            <div className="relative w-full sm:max-w-lg">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-300 rounded-2xl blur-3xl opacity-40" />

              {/* Image */}
              <img
                src="/hero-payment.png"
                alt="SwiftPay App Preview"
                className="relative w-full rounded-2xl shadow-2xl object-contain hover:scale-[1.03] transition-transform"
              />

              {/* Speed Badge */}
              <div className="absolute top-[8%] right-[-5%] bg-white/30 backdrop-blur-lg border border-white/20 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-[float_4s_ease-in-out_infinite_1s]">
                <span className="p-2 bg-pink-400/60 rounded-full text-pink-700">
                  <LuZap />
                </span>
                <span className="text-xs text-gray-700">
                  Avg. Speed <br />
                  <span className="text-lg font-bold">2.3s</span>
                </span>
              </div>

              {/* Users Badge */}
              <div className="absolute bottom-[10%] left-[-5%] w-[8.5rem] h-[4.5rem] bg-blue-600/30 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-xl flex flex-col items-center justify-center">
                <p className="text-sm">Trusted by</p>
                <p className="text-xl font-bold">2M+ users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="bg-white py-20">
        <h2 className="text-4xl font-bold text-pink-700 text-center">
          Why Choose SwiftPay
        </h2>
        <p className="text-gray-700 text-lg text-center mt-2">
          Everything you need to manage payments efficiently and securely
        </p>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mt-16 px-6">
          <FeaturedCard
            icon={<BiSolidZap />}
            title="Fast Transfers"
            description="Send money in seconds, not days."
          />
          <FeaturedCard
            icon={<FaShieldAlt />}
            title="Secure Payments"
            description="End-to-end encrypted transactions."
          />
          <FeaturedCard
            icon={<FiGlobe />}
            title="Global Reach"
            description="Send payments to 150+ countries."
          />
          <FeaturedCard
            icon={<MdSupportAgent />}
            title="24/7 Support"
            description="Always here when you need help."
          />
        </div>
      </section>

      <section id="pricing"></section>

      <section id="contact"></section>
    </>
  );
};

export default Hero;
