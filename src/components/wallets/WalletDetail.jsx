import { FiPlus, FiArrowUp, FiRepeat, FiStar } from "react-icons/fi";
import CountUpNumber from "./CountUpNumber";
import Sparkline from "./Sparkline";

const WalletDetail = ({ wallet, onAddMoney, onWithdraw, onConvert, onSetDefault }) => (
  <div className="rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg border border-white/70 dark:border-slate-800 p-6">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
          <span className="text-lg leading-none">{wallet.flag}</span>
          {wallet.code} wallet
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tabular-nums mt-2">
          {wallet.symbol}
          <CountUpNumber
            value={wallet.balance}
            formatter={(n) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          />
        </div>
      </div>

      <div className="text-purple-500 dark:text-purple-400">
        <Sparkline data={wallet.history} width={140} height={40} />
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
      <button
        type="button"
        onClick={onAddMoney}
        className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:-translate-y-0.5 transition-transform"
      >
        <FiPlus size={15} />
        Add money
      </button>
      <button
        type="button"
        onClick={onWithdraw}
        className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        <FiArrowUp size={15} />
        Withdraw
      </button>
      <button
        type="button"
        onClick={onConvert}
        className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      >
        <FiRepeat size={15} />
        Convert
      </button>
      <button
        type="button"
        onClick={onSetDefault}
        disabled={wallet.isDefault}
        className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
      >
        <FiStar size={15} />
        {wallet.isDefault ? "Default" : "Set default"}
      </button>
    </div>
  </div>
);

export default WalletDetail;
