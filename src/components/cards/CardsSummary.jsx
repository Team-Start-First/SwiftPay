import { FiCreditCard, FiClock, FiDollarSign } from "react-icons/fi";

const STAT_STYLES = {
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  green: "bg-green-500/10 text-green-600 dark:text-green-400",
};

const CardsSummary = ({ activeCount, pendingCount, totalBalance }) => {
  const stats = [
    { label: "Active cards", value: activeCount, icon: FiCreditCard, tone: "blue" },
    { label: "Pending applications", value: pendingCount, icon: FiClock, tone: "amber" },
    { label: "Total balance", value: totalBalance, icon: FiDollarSign, tone: "green" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon, tone }) => (
        <div
          key={label}
          className="rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg border border-white/70 dark:border-slate-800 p-5 flex items-center gap-4"
        >
          <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${STAT_STYLES[tone]}`}>
            <Icon size={20} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">
              {label}
            </p>
            <p className="text-xl font-bold text-slate-900 dark:text-white tabular-nums mt-0.5">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsSummary;
