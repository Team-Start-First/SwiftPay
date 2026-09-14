import { useState } from "react";
import Modal from "../ui/Modal";

const CURRENCIES = ["USD", "EUR", "GBP", "NGN"];
const METHODS = [
  { id: "card", label: "Debit / credit card" },
  { id: "bank", label: "Bank transfer" },
];

/**
 * UI-only — hook handleSubmit up to your real funding flow (Stripe/Paystack/
 * bank transfer instructions, whatever SwiftPay uses for deposits).
 */
const AddFundsModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [method, setMethod] = useState("card");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isValid = Number(amount) > 0;

  const resetAndClose = () => {
    setAmount("");
    setCurrency("USD");
    setMethod("card");
    setDone(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    try {
      // TODO: replace with your real funding call, e.g. redirect to a
      // Stripe/Paystack checkout session or show bank transfer details.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Add funds">
      {done ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-2xl">
            ✓
          </div>
          <p className="font-semibold text-slate-900">
            Adding {amount} {currency} via {METHODS.find((m) => m.id === method)?.label}
          </p>
          <p className="text-sm text-slate-500 mt-1">This is a UI-only confirmation — wire up the real call above.</p>
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
          <div className="flex gap-2">
            <div className="flex-1">
              <label htmlFor="af-amount" className="text-xs font-semibold text-slate-600">
                Amount
              </label>
              <input
                id="af-amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="mt-1.5 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
            <div>
              <label htmlFor="af-currency" className="text-xs font-semibold text-slate-600">
                Currency
              </label>
              <select
                id="af-currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="mt-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {CURRENCIES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <fieldset>
            <legend className="text-xs font-semibold text-slate-600 mb-2">Funding method</legend>
            <div className="space-y-2">
              {METHODS.map((m) => (
                <label
                  key={m.id}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                    method === m.id ? "border-purple-400 bg-purple-50" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="funding-method"
                    value={m.id}
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                    className="accent-purple-500"
                  />
                  <span className="text-sm font-medium text-slate-800">{m.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {submitting ? "Processing..." : "Add funds"}
          </button>
        </form>
      )}
    </Modal>
  );
};

export default AddFundsModal;
