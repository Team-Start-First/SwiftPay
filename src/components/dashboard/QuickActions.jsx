import { FiSend, FiPlus, FiRepeat, FiClock } from "react-icons/fi";

const ACTIONS = [
  { label: "Send Money", icon: FiSend, primary: true },
  { label: "Add Funds", icon: FiPlus },
  { label: "Convert", icon: FiRepeat },
  { label: "Request", icon: FiClock },
];

const QuickActions = ({ onAction }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {ACTIONS.map(({ label, icon: Icon, primary }) => (
        <button
          key={label}
          type="button"
          onClick={() => onAction?.(label)}
          className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
            primary
              ? "text-white bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-pink-500/25"
              : "text-slate-700 bg-white/70 backdrop-blur-md border border-slate-200 hover:border-purple-400 hover:text-purple-600"
          }`}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
