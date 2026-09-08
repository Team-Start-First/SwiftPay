import DashboardNav from "../components/dashboard/DashboardNav";
import BalanceCard from "../components/dashboard/BalanceCard";
import QuickActions from "../components/dashboard/QuickActions";
import TransactionList from "../components/dashboard/TransactionList";
import QuickConvert from "../components/dashboard/QuickConvert";
import SendLimitCard from "../components/dashboard/SendLimitCard";
import { wallets, transactions } from "../data/dashboardMock";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav user={{ name: "Alex", initials: "AO" }} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Good afternoon, Alex 👋</h1>
          <p className="text-sm text-slate-600 mt-1">Here's what's happening with your money today.</p>
        </div>

        <div className="mb-6">
          <BalanceCard wallets={wallets} />
        </div>

        <div className="mb-6">
          <QuickActions onAction={(label) => console.log(label)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5">
          <TransactionList transactions={transactions} />
          <div className="flex flex-col gap-5">
            <QuickConvert />
            <SendLimitCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
