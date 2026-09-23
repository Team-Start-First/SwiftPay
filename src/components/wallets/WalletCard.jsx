import Sparkline from "./Sparkline";
import CountUpNumber from "./CountUpNumber";

const CARD_THEMES = [
  "from-purple-500 via-indigo-500 to-blue-500",
  "from-pink-500 via-rose-500 to-orange-400",
  "from-blue-500 via-cyan-500 to-teal-400",
  "from-emerald-500 via-teal-500 to-cyan-500",
];

const WalletCard = ({ wallet, isSelected, onSelect, themeIndex = 0 }) => {
  const theme = CARD_THEMES[themeIndex % CARD_THEMES.length];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative shrink-0 w-52 sm:w-56 rounded-2xl p-4 text-left text-white bg-gradient-to-br ${theme} transition-all duration-300 ${
        isSelected ? "scale-100 shadow-xl ring-2 ring-white/70" : "scale-95 opacity-80 hover:opacity-100"
      }`}
    >
      {wallet.isDefault && (
        <span className="absolute top-3 right-3 text-[10px] font-semibold bg-white/25 px-2 py-0.5 rounded-full">
          Default
        </span>
      )}

      <div className="flex items-center gap-2 text-sm font-semibold opacity-90">
        <span className="text-lg leading-none">{wallet.flag}</span>
        {wallet.code}
      </div>

      <div className="mt-4 text-2xl font-bold tabular-nums">
        {wallet.symbol}
        <CountUpNumber
          value={wallet.balance}
          formatter={(n) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        />
      </div>

      <div className="mt-3 text-white/80">
        <Sparkline data={wallet.history} width={140} height={28} />
      </div>
    </button>
  );
};

export default WalletCard;
