import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/transfers", label: "Transfers" },
  { to: "/wallets", label: "Wallets" },
  { to: "/cards", label: "Cards" },
  { to: "/settings", label: "Settings" },
];

const menuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 },
  },
  exit: { opacity: 0, x: "100%", transition: { duration: 0.25 } },
};

const itemVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.25 } },
};

const desktopLinkClasses = ({ isActive }) =>
  `px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
    isActive
      ? "text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 shadow-md shadow-indigo-500/30"
      : "text-slate-700 hover:text-pink-600"
  }`;

const mobileLinkClasses = ({ isActive }) =>
  `block w-full px-4 py-3 rounded-xl text-lg font-semibold transition-colors ${
    isActive
      ? "text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500"
      : "text-slate-800 hover:bg-slate-100"
  }`;

/**
 * Dashboard header. Nav links live in ONE data array (NAV_LINKS) so the
 * desktop pill bar and the mobile menu never fall out of sync — this is
 * what was missing before: the desktop nav was just hidden below md with
 * no mobile equivalent, so those links became unreachable on small screens.
 */
const DashboardNav = ({ user = { name: "Alex", initials: "AO" } }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-sm shrink-0"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </span>
          <span className="font-semibold text-slate-900">SwiftPay</span>
        </Link>

        {/* Desktop nav — hidden below md, replaced by the mobile menu below */}
        <nav className="hidden md:flex items-center gap-1 bg-white/40 backdrop-blur-lg border border-white/40 rounded-full p-1.5 shadow-sm">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={desktopLinkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="hidden md:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-sm"
        >
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
            {user.initials}
          </span>
          <span className="text-sm font-semibold text-slate-700">{user.name}</span>
        </button>

        {/* Mobile trigger — this is what was missing */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/50 backdrop-blur-xl border border-white/40 shadow-sm text-slate-900"
        >
          <FiMenu size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 md:hidden bg-white/95 backdrop-blur-lg"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </span>
                <span className="font-semibold text-slate-900">SwiftPay</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-900"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex flex-col items-start px-6 mt-4 gap-1">
              {NAV_LINKS.map((link) => (
                <motion.div key={link.to} variants={itemVariants} className="w-full">
                  <NavLink to={link.to} onClick={() => setIsOpen(false)} className={mobileLinkClasses}>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="w-full pt-4 mt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 px-4 py-3">
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.initials}
                  </span>
                  <span className="font-semibold text-slate-800">{user.name}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardNav;
