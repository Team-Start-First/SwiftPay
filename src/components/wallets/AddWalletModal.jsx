import { useState } from "react";
import Modal from "../ui/Modal";
import { AVAILABLE_CURRENCIES } from "../../data/walletsMock";

const AddWalletModal = ({ isOpen, onClose, existingCodes, onSubmit }) => {
  const options = AVAILABLE_CURRENCIES.filter((c) => !existingCodes.includes(c.code));
  const [selected, setSelected] = useState(options[0]?.code || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const currency = options.find((c) => c.code === selected);
    if (!currency) return;
    onSubmit(currency);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add a wallet">
      {options.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">
          You already have a wallet in every supported currency.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {options.map((c) => (
              <label
                key={c.code}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                  selected === c.code
                    ? "border-purple-400 bg-purple-50 dark:bg-purple-950/30"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                }`}
              >
                <input
                  type="radio"
                  name="new-wallet-currency"
                  value={c.code}
                  checked={selected === c.code}
                  onChange={() => setSelected(c.code)}
                  className="accent-purple-500"
                />
                <span className="text-lg leading-none">{c.flag}</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">{c.code}</span>
              </label>
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600"
          >
            Create wallet
          </button>
        </form>
      )}
    </Modal>
  );
};

export default AddWalletModal;
