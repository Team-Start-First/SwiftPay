const SendLimitCard = ({ used = 6200, limit = 10000 }) => {
  const pct = Math.min(100, Math.round((used / limit) * 100));

  return (
     <div className="rounded-2xl bg-white/65 dark:bg-slate-900/65 backdrop-blur-lg border border-white/70 p-5">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-semibold text-slate-800 dark:text-slate-100">Monthly send limit</span>
        <span className="text-slate-600 dark:text-slate-400 tabular-nums">
          ${used.toLocaleString()} / ${limit.toLocaleString()}
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Upgrade to Premium for a $100,000 limit</p>
    </div>
  );
};

export default SendLimitCard;
