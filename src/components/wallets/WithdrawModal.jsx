import { useState } from "react";
import Modal from "../ui/Modal";

/**
 * UI-only: on submit this decreases the wallet's balance in local state.
 * Replace with a real payout call (bank transfer, mobile money, etc.)
 * before this goes live — and re-validate the balance server-side too,
 * since the client-side check here is only a UX convenience.
 */
const WithdrawModal = ({ isOpen, onClose, wallet, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [destination, setDestination] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const numericAmount = Number(amount);
  const isValid = numericAmount > 0 && destination.trim().length > 0;

  const resetAndClose = () => {
    setAmount("");
    setDestination("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isValid) return;
    if (wallet && numericAmount > wallet.balance) {
      setError(`You only have ${wallet.symbol}${wallet.balance.toLocaleString()} available.`);
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(numericAmount);
      resetAndClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!wallet) return null;

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title={`Withdraw from ${wallet.code}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="withdraw-amount" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Amount ({wallet.code})
          </label>
          <div className="mt-1.5 flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-400">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">{wallet.symbol}</span>
            <input
              id="withdraw-amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
              required
              autoFocus
            />
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Available: {wallet.symbol}
            {wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        <div>
          <label htmlFor="withdraw-destination" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Withdraw to
          </label>
          <input
            id="withdraw-destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Bank account or mobile money number"
            className="mt-1.5 w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 transition-opacity"
        >
          {submitting ? "Processing..." : "Withdraw"}
        </button>
      </form>
    </Modal>
  );
};

export default WithdrawModal;
