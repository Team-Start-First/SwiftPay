import DashboardNav from "../components/dashboard/DashboardNav";

/**
 * Placeholder route so the nav link has somewhere real to go.
 * Replace the content below with the actual Cards screen.
 */
const Cards = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardNav />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-900">Cards</h1>
        <p className="text-sm text-slate-600 mt-2">This screen is coming soon.</p>
      </main>
    </div>
  );
};

export default Cards;
