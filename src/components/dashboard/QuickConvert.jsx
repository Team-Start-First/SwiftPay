import { useState } from "react";
import { FiRepeat } from "react-icons/fi";

// In production, wire this to the same rate source as Currency.jsx
// (e.g. lift the fetch into a shared useExchangeRates hook). Kept static
// here so this widget has no external dependency of its own.
const RATES = { USD: 1, EUR: 0.92, GBP: 0.79, NGN: 1520, JPY: 149.5 };
const SYMBOLS = { USD: "$", EUR: "€", GBP: "£", NGN: "₦", JPY: "¥" };

const QuickConvert = () => {
  const [amount, setAmount] = useState(1000);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");

  const numericAmount = Number(amount) || 0;
  const converted = (numericAmount / RATES[from]) * RATES[to];
  const rate = RATES[to] / RATES[from];

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-5">
      <h3 className="text-sm font-bold text-slate-900 mb-3">Quick convert</h3>

      <label htmlFor="qc-amount" className="text-xs font-semibold text-slate-600">
        You send
      </label>
      <div className="flex gap-2 mt-1.5 mb-3">
        <input
          id="qc-amount"
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 min-w-0 bg-white/70 border border-white rounded-xl px-3 py-2 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <select
          aria-label="Send currency"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="bg-white/70 border border-white rounded-xl px-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {Object.keys(RATES).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center my-1">
        <button
          type="button"
          onClick={swap}
          aria-label="Swap currencies"
          className="w-8 h-8 rounded-full bg-purple-500/15 text-purple-600 flex items-center justify-center hover:bg-purple-500/25 transition-colors"
        >
          <FiRepeat size={14} />
        </button>
      </div>

      <label className="text-xs font-semibold text-slate-600">Recipient gets</label>
      <div className="flex gap-2 mt-1.5">
        <div className="flex-1 min-w-0 bg-white/70 border border-white rounded-xl px-3 py-2 text-lg font-bold text-slate-900 tabular-nums">
          {SYMBOLS[to]}
          {converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
        <select
          aria-label="Receive currency"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="bg-white/70 border border-white rounded-xl px-2 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          {Object.keys(RATES).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-slate-500 mt-3">
        1 {from} ≈ {rate.toFixed(4)} {to} &middot; No fee
      </p>
    </div>
  );
};

export default QuickConvert;
