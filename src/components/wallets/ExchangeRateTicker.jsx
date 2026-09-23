/**
 * Scrolling rate strip, base currency USD. Duplicates the list once so the
 * CSS animation can loop seamlessly. Uses the same static rate table as
 * QuickConvert.jsx — swap both for a shared live-rates source in production.
 */
const RATES = { EUR: 0.92, GBP: 0.79, NGN: 1520, JPY: 149.5, CAD: 1.36, AUD: 1.52 };

const ExchangeRateTicker = () => {
  const entries = Object.entries(RATES);
  const strip = [...entries, ...entries];

  return (
    <div className="rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg border border-white/70 dark:border-slate-800 py-3 overflow-hidden">
      <div className="flex gap-8 w-max animate-[ticker_22s_linear_infinite] px-4">
        {strip.map(([code, rate], i) => (
          <div key={`${code}-${i}`} className="flex items-center gap-2 text-sm whitespace-nowrap">
            <span className="font-semibold text-slate-900 dark:text-white">USD/{code}</span>
            <span className="text-slate-500 dark:text-slate-400 tabular-nums">{rate.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default ExchangeRateTicker;
