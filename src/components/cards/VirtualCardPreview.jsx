/**
 * Purely decorative card mockup — masked digits, expiry, and a chip icon.
 * `last4` and `expiry` are cosmetic only; not real card data.
 */
const VirtualCardPreview = ({ last4 = "1234", expiry = "12/29", className = "" }) => (
  <div
    className={`w-56 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 p-4 text-white shadow-xl ${className}`}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold tracking-wide opacity-80">Virtual Card</span>
      <span className="w-6 h-4 rounded-sm bg-white/30" aria-hidden="true" />
    </div>
    <div className="mt-6 text-lg font-bold tracking-[0.2em] tabular-nums">•••• •••• •••• {last4}</div>
    <div className="mt-4 flex items-center justify-between text-[11px] font-semibold opacity-80">
      <span>VALID THRU {expiry}</span>
      <span className="w-5 h-5 rounded-full bg-white/25" aria-hidden="true" />
    </div>
  </div>
);

export default VirtualCardPreview;
