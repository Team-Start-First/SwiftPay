import React, { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";


const Navbar = () => {
  const [active, setActive] = useState("home");
 const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
  ];

  const closeButtonVariants = {
  hidden: { rotate: -90, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.25 },
  },
};


  const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    x: "100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: { duration: 0.25 },
  },
};

const mobileItemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.25 },
  },
};


  return (
      <nav className="fixed top-6 z-50 inset-x-0">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">

        {/* Left Logo */}
        <div
  className="flex items-center space-x-3 px-4 py-2 rounded-full
  bg-white/30 backdrop-blur-xl border border-white/30
  shadow-lg shadow-black/5"
>
  <div
    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-pink-500
    flex items-center justify-center shadow-md"
  >
    <span className="text-white font-bold text-lg">S</span>
  </div>
<span className="font-semibold text-lg tracking-wide text-gray-900">
    SwiftPay
  </span>
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
        <Link
  to="/signup" className="md:flex hidden  overflow-hidden text-sm font-semibold text-white px-8 py-3 rounded-full bg-gradient-to-r
         from-blue-500 via-indigo-500 to bg-pink-500 shadow-md transition-all duration-500 hover:scale-105
         hover:shadow-[0_0_20px_rgba(255, 255, 255, 0.4)]">
          <span className="relative z-10">Get Started</span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to bg-pink-500 opacity-0 hover:opacity-100 transition-opacity duration-500"></span>
        </Link>
        

          {/* Hamburger Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex relative w-10 h-10 md:hidden flex-col items-center justify-center space-y-1.5 focus:outline-none cursor-pointer rounded-full
        bg-white/30 backdrop-blur-xl border border-white/30
  shadow-lg shadow-black/5"
    aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={{
                                rotate: isOpen ? 45 : 0,
                                y: isOpen ? 8 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-6 h-0.5 bg-gray-900 block"
                        />
                        <motion.span
                            animate={{
                                opacity: isOpen ? 0 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className="w-6 h-0.5 bg-gray-900 block"
                        />
                        <motion.span
                            animate={{
                                rotate: isOpen ? -45 : 0,
                                y: isOpen ? -8 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="w-6 h-0.5 bg-gray-900 block"
                        />
        </button>
        
       {/* Mobile Menu */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      variants={mobileMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 md:hidden bg-white/60 backdrop-blur-md border-l border-white/30 shadow-2xl"
    >
      {/* Close Button */}
      <motion.button
        variants={closeButtonVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={() => setIsOpen(false)}
        aria-label="Close menu"
        className="absolute top-6 right-6 w-10 h-10 rounded-full
        bg-white/70 backdrop-blur-lg flex items-center justify-center
        shadow-md hover:scale-110 transition-transform"
      >
        <span className="block w-5 h-0.5 bg-gray-900 rotate-45 absolute" />
        <span className="block w-5 h-0.5 bg-gray-900 -rotate-45 absolute" />
      </motion.button>

      {/* Menu Content */}
      <div className="flex flex-col h-full justify-center items-end px-6 space-y-6">
        {links.map((link) => (
          <motion.a
            key={link.id}
            href={`#${link.id}`}
            variants={mobileItemVariants}
            onClick={() => {
              setActive(link.id);
              setIsOpen(false);
            }}
            className="text-2xl font-semibold text-gray-900 hover:text-blue-500 transition-colors"
          >
            {link.label}
          </motion.a>
        ))}

        {/* CTA */}
        <motion.div variants={mobileItemVariants} className="pt-8 w-full">
          <Link
  to="/signup"
            onClick={() => setIsOpen(false)}
            className="block w-full text-sm font-semibold text-white px-8 py-4 rounded-full
            bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 shadow-lg
            transition-all hover:scale-105"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>



        </div>
    </nav>
  );
};

export default Navbar;
