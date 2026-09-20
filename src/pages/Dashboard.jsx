import { useState } from "react";
import DashboardNav from "../components/dashboard/DashboardNav";
import BalanceCard from "../components/dashboard/BalanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import TransactionList from "../components/dashboard/TransactionList";
import QuickConvert from "../components/dashboard/QuickConvert";
import SendLimitCard from "../components/dashboard/SendLimitCard";
import SendMoneyModal from "../components/dashboard/SendMoneyModal";
import AddFundsModal from "../components/dashboard/AddFundsModal";
import ConvertModal from "../components/dashboard/ConvertModal";
import RequestModal from "../components/dashboard/RequestModal";
import { useAuth } from "../context/AuthContext";
import { getDisplayName } from "../utils/userDisplay";
import { wallets, transactions } from "../data/dashboardMock";

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState(null); // "send" | "add-funds" | "convert" | "request" | null
  const { user, loading } = useAuth();
  const name = getDisplayName(user);

  const firstName = name ? name.split(" ")[0] : "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DashboardNav />
 
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {loading ? "Good afternoon 👋" : `Good afternoon, ${firstName} 👋`}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Here's what's happening with your money today.</p>
        </div>
 
        <div className="mb-6">
          <BalanceCard wallets={wallets} />
        </div>
 
        <div className="mb-6">
          <QuickActions onAction={setActiveModal} />
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
          <TransactionList transactions={transactions} />
          <div className="flex flex-col gap-5">
            <QuickConvert />
            <SendLimitCard />
          </div>
        </div>
      </main>
      
      <SendMoneyModal isOpen={activeModal === "send"} onClose={() => setActiveModal(null)} />
      <AddFundsModal isOpen={activeModal === "add-funds"} onClose={() => setActiveModal(null)} />
      <ConvertModal isOpen={activeModal === "convert"} onClose={() => setActiveModal(null)} />
      <RequestModal isOpen={activeModal === "request"} onClose={() => setActiveModal(null)} />
    </div>
  );
};

export default Dashboard;
