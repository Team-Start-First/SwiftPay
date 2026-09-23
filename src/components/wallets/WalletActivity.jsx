import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";

const WalletActivity = ({ wallet, activity = [] }) => (
  <div className="rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg border border-white/70 dark:border-slate-800 p-5">
    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
      Recent {wallet.code} activity
    </h3>

    {activity.length === 0 ? (
      <p className="text-sm text-slate-500 dark:text-slate-400 py-4 text-center">No activity yet for this wallet.</p>
    ) : (
      <ul>
        {activity.map((tx) => {
          const isCredit = tx.direction === "in";
          const Icon = isCredit ? FiArrowDownLeft : FiArrowUpRight;
          return (
            <li
              key={tx.id}
              className="flex items-center gap-3 py-2.5 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
            >
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isCredit ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}
              >
                <Icon size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{tx.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{tx.date}</p>
              </div>
              <p className={`text-sm font-bold tabular-nums ${isCredit ? "text-green-600 dark:text-green-400" : "text-slate-900 dark:text-white"}`}>
                {isCredit ? "+" : "-"}
                {wallet.symbol}
                {tx.amount}
              </p>
            </li>
          );
        })}
      </ul>
    )}
  </div>
);

export default WalletActivity;
