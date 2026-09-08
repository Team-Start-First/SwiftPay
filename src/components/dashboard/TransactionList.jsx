import { FiArrowUpRight, FiArrowDownLeft, FiCreditCard } from "react-icons/fi";

const TYPE_STYLES = {
  sent: { icon: FiArrowUpRight, classes: "bg-blue-500/10 text-blue-600" },
  received: { icon: FiArrowDownLeft, classes: "bg-green-500/10 text-green-600" },
  funded: { icon: FiCreditCard, classes: "bg-purple-500/10 text-purple-600" },
};

const STATUS_STYLES = {
  completed: "bg-green-500/10 text-green-700",
  pending: "bg-amber-500/15 text-amber-700",
};

const TransactionList = ({ transactions = [] }) => {
  return (
    <div className="rounded-3xl bg-white/65 backdrop-blur-lg border border-white/70 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-900">Recent transactions</h2>
        <button type="button" className="text-sm font-semibold text-pink-600 hover:text-pink-700">
          View all
        </button>
      </div>

      <ul>
        {transactions.map((tx) => {
          const style = TYPE_STYLES[tx.type] ?? TYPE_STYLES.sent;
          const Icon = style.icon;
          const isCredit = tx.direction === "in";

          return (
            <li key={tx.id} className="flex items-center gap-3 py-3.5 border-b border-slate-200 last:border-b-0">
              <span className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${style.classes}`}>
                <Icon size={18} />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-900 truncate">{tx.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{tx.date}</p>
              </div>

              <div className="text-right shrink-0">
                <p className={`text-sm font-bold tabular-nums ${isCredit ? "text-green-600" : "text-slate-900"}`}>
                  {isCredit ? "+" : "-"}
                  {tx.amount}
                </p>
                <span
                  className={`inline-block mt-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_STYLES[tx.status]}`}
                >
                  {tx.status === "completed" ? "Completed" : "Pending"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionList;
