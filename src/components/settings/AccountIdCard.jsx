import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

/**
 * Derived from the Supabase user id, so there's no extra DB write needed
 * to have a unique identifier. If you'd rather have a clean sequential
 * ID (e.g. SP-000482) instead of one derived from a UUID, generate and
 * store one in a `profiles` table at signup and read it from there instead.
 */
const deriveAccountId = (user) => {
  if (!user?.id) return "";
  return `SP-${user.id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
};

const AccountIdCard = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const accountId = deriveAccountId(user);

  const handleCopy = async () => {
    if (!accountId) return;
    await navigator.clipboard.writeText(accountId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
   <div className="rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-white/70 p-5 flex items-center justify-between gap-4 flex-wrap">
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Your SwiftPay ID</p>
        <p className="text-lg font-bold text-slate-900 dark:text-white tabular-nums mt-1">{accountId || "—"}</p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        disabled={!accountId}
        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 transition-opacity"
      >
        {copied ? <FiCheck size={15} /> : <FiCopy size={15} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
};

export default AccountIdCard;
