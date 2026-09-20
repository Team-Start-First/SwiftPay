import { useState } from "react";

const PIN_LENGTH = 4;

/**
 * SECURITY NOTE — read before wiring this to a real backend:
 * a transaction PIN authorizes moving money, so it must never be stored
 * in plain text in user_metadata (readable by anyone holding the user's
 * JWT, and visible in the Supabase dashboard). The right place for this
 * is a hashed value (bcrypt/argon2) in a protected table, written via a
 * Supabase Edge Function that hashes it server-side — never the client SDK.
 * savePinPlaceholder below is a stand-in so the UI/UX flow works end to
 * end; replace it with a call to that edge function before this ships.
 */
const savePinPlaceholder = async (_pin) => {
  // TODO: supabase.functions.invoke("set-transaction-pin", { body: { pin: _pin } })
  await new Promise((resolve) => setTimeout(resolve, 600));
};

const TransactionPinSection = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const isValid = new RegExp(`^\\d{${PIN_LENGTH}}$`).test(pin) && pin === confirmPin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!/^\d+$/.test(pin)) {
      setMessage({ type: "error", text: "PIN must be numbers only." });
      return;
    }
    if (pin.length !== PIN_LENGTH) {
      setMessage({ type: "error", text: `PIN must be ${PIN_LENGTH} digits.` });
      return;
    }
    if (pin !== confirmPin) {
      setMessage({ type: "error", text: "PINs don't match." });
      return;
    }

    setSaving(true);
    try {
      await savePinPlaceholder(pin);
      setMessage({ type: "success", text: "Transaction PIN set." });
      setPin("");
      setConfirmPin("");
    } catch (err) {
      setMessage({ type: "error", text: "Couldn't set PIN. Try again." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border border-white/70 p-6 space-y-4"
    >
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Transaction PIN</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Used to authorize sends and withdrawals. {PIN_LENGTH} digits.</p>
      </div>
 
      <div className="flex gap-4">
        <div>
          <label htmlFor="pin" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            New PIN
          </label>
          <input
            id="pin"
            type="password"
            inputMode="numeric"
            maxLength={PIN_LENGTH}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            className="mt-1.5 w-28 tracking-[0.5em] text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label htmlFor="confirm-pin" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Confirm PIN
          </label>
          <input
            id="confirm-pin"
            type="password"
            inputMode="numeric"
            maxLength={PIN_LENGTH}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
            className="mt-1.5 w-28 tracking-[0.5em] text-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>
 
      {message.text && (
        <p className={`text-sm ${message.type === "error" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}>{message.text}</p>
      )}
 
      <button
        type="submit"
        disabled={!isValid || saving}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 transition-opacity"
      >
        {saving ? "Saving..." : "Set PIN"}
      </button>
    </form>
  );
};

export default TransactionPinSection;
