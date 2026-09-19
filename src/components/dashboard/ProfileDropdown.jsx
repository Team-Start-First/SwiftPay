import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiSettings, FiHelpCircle, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { getDisplayName, getInitials } from "../../utils/userDisplay";
 
/**
 * Desktop profile trigger + dropdown. Closes on outside click, Escape,
 * or picking an item. "Help & support" links to the section on the
 * Settings page (id="help-support") rather than a separate route.
 */
const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { user, signOut } = useAuth();
 
  const name = getDisplayName(user);
  const initials = getInitials(name);
  const avatarUrl = user?.user_metadata?.avatar_url;
 
  useEffect(() => {
    if (!open) return;
 
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
 
    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);
 
  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
  };
 
  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-white/40 shadow-sm"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
        ) : (
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </span>
        )}
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 max-w-[120px] truncate">{name}</span>
        <FiChevronDown size={14} className={`text-slate-500 dark:text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
 
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            role="menu"
            className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border border-white/60 shadow-xl overflow-hidden z-40"
          >
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
            </div>
 
            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <FiSettings size={16} />
              Profile settings
            </Link>
 
            <Link
              to="/settings#help-support"
              onClick={() => setOpen(false)}
              role="menuitem"
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <FiHelpCircle size={16} />
              Help &amp; support
            </Link>
 
            <button
              type="button"
              onClick={handleSignOut}
              role="menuitem"
              className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors border-t border-slate-100 dark:border-slate-800"
            >
              <FiLogOut size={16} />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
 
export default ProfileDropdown;