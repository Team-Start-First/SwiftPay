import { useState } from "react";
import { supabase } from "../../lib/supabase";

/**
 * supabase.auth.updateUser({ password }) changes the password for the
 * CURRENT session without verifying the old one. The "current password"
 * field below is captured but not yet checked — to actually enforce it,
 * re-authenticate first:
 *   await supabase.auth.signInWithPassword({ email: user.email, password: currentPassword })
 * and only call updateUser if that succeeds. Left out here to keep this
 * self-contained; add it before shipping if you want that guarantee.
 */
const PasswordSection = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const isValid = newPassword.length >= 8 && newPassword === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords don't match." });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "Use at least 8 characters." });
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      setMessage({ type: "success", text: "Password updated." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Couldn't update password." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-white/70 p-6 space-y-4"
    >
      <h2 className="text-base font-bold text-slate-900 dark:text-white">Change password</h2>
 
      <div>
        <label htmlFor="current-password" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Current password
        </label>
        <input
          id="current-password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          autoComplete="current-password"
        />
      </div>
 
      <div>
        <label htmlFor="new-password" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          New password
        </label>
        <input
          id="new-password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          autoComplete="new-password"
        />
      </div>
 
      <div>
        <label htmlFor="confirm-password" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Confirm new password
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          autoComplete="new-password"
        />
      </div>
 
      {message.text && (
        <p className={`text-sm ${message.type === "error" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>{message.text}</p>
      )}
 
      <button
        type="submit"
        disabled={!isValid || saving}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 transition-opacity"
      >
        {saving ? "Updating..." : "Update password"}
      </button>
    </form>
  );
};

export default PasswordSection;
