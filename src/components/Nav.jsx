import React, { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState("home");

  const links = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ];

  return (
      <nav className="fixed top-6 z-50 md:w-auto">
      <div className=" md:flex items-center justify-between 
      px-6 py-3   space-x-55">

        {/* Left Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex
          items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="font-semibold text-lg tracking-wide">SwiftPay</span>
        </div>

      {/* Glassy Nav Container */}
      <div className="hidden md:flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-3 py-2 shadow-lg">
              {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={() => setActive(link.id)}
            className={`relative px-5 py-2 text-sm font-semibold transition-all duration-500 rounded-full
              ${
                active === link.id
                  ? "text-white"
                  : "text-gray-800 hover:text-red-500"
              }`}
          >
            {/* Active background bubble */}
            {active === link.id && (
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 opacity-90 blur-[0.5px] animate-pulse"></span>
            )}
            <span className="relative z-10">{link.label}</span>
          </a>
        ))}
        </div>

        {/* Button */}
        <button className="md:relative overflow-hidden text-sm font-semibold text-white px-8 py-3 rounded-full bg-gradient-to-r
         from-blue-500 via-indigo-500 to bg-pink-500 shadow-md transition-all duration-500 hover:scale-105
         hover:shadow-[0_0_20px_rgba(255, 255, 255, 0.4)]">
          <span className="relative z-10">Get Started</span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to bg-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
        </button>

        </div>
    </nav>
  );
};

export default Navbar;
