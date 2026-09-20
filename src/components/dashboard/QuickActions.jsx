import { FiSend, FiPlus, FiRepeat, FiClock } from "react-icons/fi";
 
const ACTIONS = [
  { id: "send", label: "Send Money", icon: FiSend, primary: true },
  { id: "add-funds", label: "Add Funds", icon: FiPlus },
  { id: "convert", label: "Convert", icon: FiRepeat },
  { id: "request", label: "Request", icon: FiClock },
];
 
const QuickActions = ({ onAction }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {ACTIONS.map(({ id, label, icon: Icon, primary }) => (
        <button
          key={id}
          type="button"
          onClick={() => onAction?.(id)}
          className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
            primary
              ? "text-white bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg shadow-pink-500/25"
              : "text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:text-purple-600"
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