import { useState } from "react";
import { FiPlus, FiCreditCard } from "react-icons/fi";
import DashboardNav from "../components/dashboard/DashboardNav";
import CardsSummary from "../components/cards/CardsSummary";
import CardsHero from "../components/cards/CardsHero";
import CardsList from "../components/cards/CardsList";
import ApplyCardModal from "../components/cards/ApplyCardModal";
import { cards as initialCards } from "../data/cardsMock";
 
const Cards = () => {
  const [cards, setCards] = useState(initialCards);
  const [applyOpen, setApplyOpen] = useState(false);
 
  const activeCount = cards.filter((c) => c.status === "active").length;
  const pendingCount = cards.filter((c) => c.status === "pending").length;
  const totalBalance = cards
    .filter((c) => c.status === "active")
    .reduce((sum, c) => sum + Number(c.balance || 0), 0);
 
  const handleApply = (application) => {
    setCards((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: application.label,
        currency: application.currency,
        balance: "0.00",
        last4: String(Math.floor(1000 + Math.random() * 9000)),
        expiry: "12/29",
        status: "pending",
      },
    ]);
  };
 
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DashboardNav />
 
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <FiCreditCard size={22} />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Virtual Cards</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Secure virtual cards for online payments and subscriptions
              </p>
            </div>
          </div>
 
          <button
            type="button"
            onClick={() => setApplyOpen(true)}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 px-5 py-2.5 rounded-xl shadow-lg shadow-pink-500/20 hover:-translate-y-0.5 transition-transform shrink-0"
          >
            <FiPlus size={16} />
            Apply for Card
          </button>
        </div>
 
        <CardsSummary
          activeCount={activeCount}
          pendingCount={pendingCount}
          totalBalance={`$${totalBalance.toFixed(2)}`}
        />
 
        <CardsHero />
 
        <CardsList cards={cards} onApply={() => setApplyOpen(true)} />
      </main>
 
      <ApplyCardModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} onSubmit={handleApply} />
    </div>
  );
};
 
export default Cards;