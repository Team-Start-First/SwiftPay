import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";
import { RiSecurePaymentLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiHelpCircle, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { getDisplayName, getInitials } from "../../utils/userDisplay";
import ProfileDropdown from "./ProfileDropdown";
import AOS from "aos";
import "aos/dist/aos.css";
import BottomNav from "./BottomNav";
 
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
  `px-5 py-2 text-sm font-semibold rounded-full transition-all duration-700 ${
    isActive
      ? "text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 shadow-md shadow-indigo-500/30 opacity-90 animate-pulse"
      : "text-slate-700 hover:text-pink-600"
  }`;
 
/**
 * Dashboard header. Nav links live in ONE data array (NAV_LINKS) so the
 * desktop pill bar and the mobile menu never fall out of sync.
 *
 * Mobile menu notes:
 * - Uses `h-[100dvh]` (falls back to `h-screen` for older browsers) instead
 *   of `h-screen` alone, so it isn't cut short by mobile browser address
 *   bars that shrink/grow the viewport.
 * - `overflow-y-auto` on the inner list so it never clips content on short
 *   viewports (e.g. landscape phones).
 * - z-50, above the sticky header's z-30, so there's no stacking ambiguity.
 * - Closes on Escape for accessibility, in addition to the X button,
 *   backdrop tap, and link clicks.
 */
const DashboardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const name = getDisplayName(user);
  const initials = getInitials(name);
 
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
 
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);
 
  const displayName = loading ? "" : name;
 
  const handleMobileSignOut = async () => {
    setIsOpen(false);
    await signOut();
  };

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
    <header className="sticky top-3 z-30 ">
      <div className="flex items-center justify-between gap-3 max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <Link
          to="/dashboard"
          className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white/30 dark:bg-slate-900/50 backdrop-blur-xl border border-white/30 shadow-md shrink-0 "
        >
         <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex items-center justify-center">
  {/* White disc sits on top of the gradient — gradient only shows in the ring around it */}
  <span className="w-6 h-6 rounded-full bg-white dark:bg-slate-400 flex items-center justify-center">
    <RiSecurePaymentLine className="size-6 text-purple-600" />
  </span>
</span>
          <span className="font-semibold text-slate-900 dark:text-white  fold">SwiftPay</span>
        </Link>
 
        {/* Desktop nav — hidden below md, replaced by the mobile menu below */}
        <nav className="hidden md:flex items-center gap-1 bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/20 rounded-full px-3 py-2 shadow-lg">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={desktopLinkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>
         
        <div className="hidden md:flex items-center gap-2">
            <div
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/20 dark:border-slate-700 shadow-lg text-slate-900 dark:text-slate-100 transition-colors"
            >
              {theme === "dark" ? (
                <FiMoon className="size-{17}" />
              ) : (
                <FiSun className="size-{17} " />
              )}
            </div>
        <div className="block">
          <ProfileDropdown />
        </div>
        </div>
 

       <div className="md:hidden flex items-center gap-2">
        <div
              onClick={toggleTheme}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/20 dark:border-slate-700 shadow-lg text-slate-900 dark:text-slate-100 transition-colors"
            >
              {theme === "dark" ? (
                <FiMoon className="size-{17}" />
              ) : (
                <FiSun className="size-{17} " />
              )}
            </div>

       <ProfileDropdown />
      </div>
      </div>
 
    </header>
    <BottomNav/>
    </>
  );
};
 
export default DashboardNav;