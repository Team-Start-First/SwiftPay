import { FiShield, FiGlobe, FiSliders, FiZap } from "react-icons/fi";
import VirtualCardPreview from "./VirtualCardPreview";

const FEATURES = [
  { icon: FiShield, title: "Secure", detail: "Protected payments" },
  { icon: FiGlobe, title: "Global", detail: "Worldwide acceptance" },
  { icon: FiSliders, title: "Control", detail: "Spending limits" },
  { icon: FiZap, title: "Instant", detail: "Quick issuance" },
];

const CardsHero = () => (
  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 p-6 sm:p-9 text-white">
    <div className="pointer-events-none absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-8">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl sm:text-3xl font-bold">Virtual Cards Made Easy</h2>
        <p className="mt-2 text-sm sm:text-base text-white/85 max-w-md">
          Create virtual cards for secure online payments, subscription management, and more. Enhanced security and
          spending control.
        </p>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="flex items-start gap-2">
              <Icon size={18} className="shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-white/75">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="shrink-0 self-center lg:self-auto">
        <VirtualCardPreview className="rotate-3" />
      </div>
    </div>
  </div>
);

export default CardsHero;
