import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiSend, FiCreditCard, FiSettings } from "react-icons/fi";
import { HiOutlineWallet } from "react-icons/hi2";

const TABS = [
  { to: "/dashboard", label: "Home", icon: FiHome },
  { to: "/transfers", label: "Transfer", icon: FiSend },
  { to: "/wallets", label: "Wallets", icon: HiOutlineWallet },
  { to: "/cards", label: "Cards", icon: FiCreditCard },
  { to: "/settings", label: "Settings", icon: FiSettings },
];

/**
 * App-style bottom tab bar, mobile only (md:hidden). The active tab's
 * icon sits on a small gradient pill that pops in on mount; Profile
 * settings/Help & support/Sign out live in ProfileDropdown instead
 * (now shown on every screen size), so this bar stays focused on the
 * five main sections.
 */
const BottomNav = () => (
  <nav
    className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white/85 dark:bg-slate-950/85 backdrop-blur-sm border-t rounded-2xl border-slate-200 dark:border-slate-800"
    style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
  >
    <div className="grid grid-cols-5">
      {TABS.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} className="flex flex-col items-center justify-center gap-1 py-2.5">
          {({ isActive }) => (
            <>
              <span
                className={`relative flex items-center justify-center w-15 h-8 rounded-2xl ${
                  isActive ? "text-purple-600/60" : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {isActive && (
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute inset-0 rounded-2xl bg-purple-300/60 shadow-lg shadow-purple-500/30"
                  />
                )}
                <Icon size={20} className="relative z-10" />
              </span>
              <span
                className={`text-[11px] font-medium ${
                  isActive ? "text-purple-600/60 dark:text-purple-400" : "text-slate-500 dark:text-slate-500"
                }`}
              >
                {label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default BottomNav;
