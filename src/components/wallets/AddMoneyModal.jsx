import { useState } from "react";
import Modal from "../ui/Modal";

/**
 * UI-only: on submit this increases the wallet's balance in local state
 * (see Wallets.jsx). Replace with a real funding call (card charge, bank
 * transfer instructions, etc.) before this goes live.
 */
const AddMoneyModal = ({ isOpen, onClose, wallet, onSubmit }) => {
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isValid = Number(amount) > 0;

  const resetAndClose = () => {
    setAmount("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSubmit(Number(amount));
      resetAndClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!wallet) return null;

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title={`Add money to ${wallet.code}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="add-money-amount" className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Amount ({wallet.code})
          </label>
          <div className="mt-1.5 flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-400">
            <span className="text-slate-500 dark:text-slate-400 font-semibold">{wallet.symbol}</span>
            <input
              id="add-money-amount"
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
        </div>

        <button
          type="submit"
          disabled={!isValid || submitting}
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 transition-opacity"
        >
          {submitting ? "Adding..." : `Add ${wallet.symbol}${amount || "0.00"}`}
        </button>
      </form>
    </Modal>
  );
};

export default AddMoneyModal;
