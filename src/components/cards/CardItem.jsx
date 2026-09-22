import VirtualCardPreview from "./VirtualCardPreview";

const STATUS_STYLES = {
  active: "bg-green-500/10 text-green-700 dark:text-green-400",
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
};

const CardItem = ({ card }) => (
  <div className="rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg border border-white/70 dark:border-slate-800 p-5 flex flex-col items-center text-center gap-4">
    <VirtualCardPreview last4={card.last4} expiry={card.expiry} />
    <div>
      <p className="text-sm font-semibold text-slate-900 dark:text-white">{card.label}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
        {card.currency} {card.balance}
      </p>
    </div>
    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${STATUS_STYLES[card.status]}`}>
      {card.status === "active" ? "Active" : "Pending"}
    </span>
  </div>
);

export default CardItem;
