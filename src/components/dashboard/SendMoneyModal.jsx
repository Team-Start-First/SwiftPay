import { useState } from "react";
import Modal from "../ui/Modal";

const CURRENCIES = ["USD", "EUR", "GBP", "NGN"];

/**
 * UI is fully wired (validation, submitting state, success screen) —
 * only the actual submit call is a placeholder. Replace the body of
 * handleSubmit with your real transfer API/Supabase call.
 */
const SendMoneyModal = ({ isOpen, onClose }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const isValid = recipient.trim().length > 0 && Number(amount) > 0;

  const resetAndClose = () => {
    setRecipient("");
    setAmount("");
    setCurrency("USD");
    setNote("");
    setSent(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    try {
      // TODO: replace with your real transfer call, e.g.
      // await supabase.functions.invoke("send-money", { body: { recipient, amount, currency, note } });
      await new Promise((resolve) => setTimeout(resolve, 700));
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Send money">
      {sent ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-2xl">
            ✓
          </div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {amount} {currency} sent to {recipient}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">This is a UI-only confirmation — wire up the real call above.</p>
          <button
            type="button"
            onClick={resetAndClose}
            className="mt-5 w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sm-recipient" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Recipient (name or email)
            </label>
            <input
              id="sm-recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. michael@company.com"
              className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
 
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="sm-amount" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Amount
              </label>
              <input
                id="sm-amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label htmlFor="sm-currency" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Currency
              </label>
              <select
                id="sm-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {CURRENCIES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>
 
          <div>
            <label htmlFor="sm-note" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Note (optional)
            </label>
            <input
              id="sm-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's this for?"
              className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
 
          <button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {submitting ? "Sending..." : "Send money"}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default SendMoneyModal;
