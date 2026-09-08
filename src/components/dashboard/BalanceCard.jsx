import { FiTrendingUp, FiZap } from "react-icons/fi";

const BalanceCard = ({ totalBalance = "$12,480.50", monthlyChange = "+$1,240", wallets = [] }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-blue-100 via-pink-100 to-pink-50 p-6 sm:p-9">
      <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/40 to-pink-400/30 blur-3xl" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
            <FiTrendingUp className="text-slate-500" />
            Total balance
          </div>
          <div className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 tabular-nums">
            {totalBalance}
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-600">
            <FiTrendingUp size={14} />
            {monthlyChange} this month
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/60 shadow-md px-4 py-3 self-start animate-[float_5s_ease-in-out_infinite]">
          <span className="w-9 h-9 rounded-full bg-pink-400/60 flex items-center justify-center text-pink-700">
            <FiZap size={16} />
          </span>
          <div className="text-xs text-slate-700 leading-tight">
            Last transfer
            <div className="text-base font-bold text-slate-900">2.3s</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {wallets.map((wallet) => (
          <div
            key={wallet.code}
            className="rounded-2xl bg-white/55 backdrop-blur-md border border-white/60 px-4 py-3"
          >
            <div className="text-xs font-bold text-slate-600 tracking-wide">{wallet.code}</div>
            <div className="text-lg font-bold text-slate-900 tabular-nums mt-1">{wallet.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BalanceCard;
