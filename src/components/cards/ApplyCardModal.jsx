import { useState } from "react";
import Modal from "../ui/Modal";

const CURRENCIES = ["USD", "EUR", "GBP", "NGN"];

/**
 * UI-only: onSubmit receives a plain card object and the parent (Cards.jsx)
 * adds it to local state with status "pending". Replace with a real
 * card-issuing API call (Stripe Issuing, Marqeta, etc.) when ready —
 * that submission would create the card in "pending" status server-side
 * and you'd sync real status via webhook instead of local state.
 */
const ApplyCardModal = ({ isOpen, onClose, onSubmit }) => {
  const [label, setLabel] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [limit, setLimit] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isValid = label.trim().length > 0;

  const resetAndClose = () => {
    setLabel("");
    setCurrency("USD");
    setLimit("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit({ label, currency, limit });
      resetAndClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Apply for a virtual card">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="card-label" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Card name
          </label>
          <input
            id="card-label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Subscriptions"
            className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="card-limit" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Spending limit (optional)
            </label>
            <input
              id="card-limit"
              type="number"
              min="0"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="0.00"
              className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label htmlFor="card-currency" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Currency
            </label>
            <select
              id="card-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {CURRENCIES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 transition-opacity"
        >
          {submitting ? "Submitting..." : "Submit application"}
        </button>
      </form>
    </Modal>
  );
};

export default ApplyCardModal;
