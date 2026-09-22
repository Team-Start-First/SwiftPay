import { FiPlus, FiCreditCard } from "react-icons/fi";
import CardItem from "./CardItem";

const CardsList = ({ cards, onApply }) => (
  <div className="rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-lg border border-white/70 dark:border-slate-800 p-6">
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-base font-bold text-slate-900 dark:text-white">Your Cards</h2>
      <button
        type="button"
        onClick={onApply}
        className="flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2 rounded-xl hover:-translate-y-0.5 transition-transform"
      >
        <FiPlus size={15} />
        New Card
      </button>
    </div>

    {cards.length === 0 ? (
      <div className="flex flex-col items-center text-center py-10 px-4">
        <span className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
          <FiCreditCard size={28} />
        </span>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Cards Yet</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
          Get started by applying for your first virtual card. It only takes a few minutes!
        </p>
        <button
          type="button"
          onClick={onApply}
          className="mt-5 flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform"
        >
          <FiPlus size={16} />
          Apply for Your First Card
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    )}
  </div>
);

export default CardsList;
