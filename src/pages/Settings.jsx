import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardNav from "../components/dashboard/DashboardNav";
import AccountIdCard from "../components/settings/AccountIdCard";
import ProfileSection from "../components/settings/ProfileSection";
import PasswordSection from "../components/settings/PasswordSection";
import TransactionPinSection from "../components/settings/TransactionPinSection";
import HelpSupportCard from "../components/settings/HelpSupportCard";
 
const Settings = () => {
  const location = useLocation();
 
  // Scrolls to the Help & Support card when arriving via /settings#help-support
  // (used by the profile dropdown and mobile menu links).
  useEffect(() => {
    if (location.hash === "#help-support") {
      const el = document.getElementById("help-support");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);
 
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav />
 
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-600 mt-1">Manage your profile, security, and account details.</p>
        </div>
 
        <AccountIdCard />
        <ProfileSection />
        <PasswordSection />
        <TransactionPinSection />
 
        <div id="help-support">
          <HelpSupportCard />
        </div>
      </main>
    </div>
  );
};
 
export default Settings;
