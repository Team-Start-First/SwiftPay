import { useState } from "react";
import { FiCreditCard as FiWallet } from "react-icons/fi";
import DashboardNav from "../components/dashboard/DashboardNav";
import WalletCarousel from "../components/wallets/WalletCarousel";
import WalletDetail from "../components/wallets/WalletDetail";
import WalletActivity from "../components/wallets/WalletActivity";
import ExchangeRateTicker from "../components/wallets/ExchangeRateTicker";
import AddMoneyModal from "../components/wallets/AddMoneyModal";
import WithdrawModal from "../components/wallets/WithdrawModal";
import AddWalletModal from "../components/wallets/AddWalletModal";
import ConvertModal from "../components/dashboard/ConvertModal";
import { wallets as initialWallets, walletActivity } from "../data/walletsMock";
 
const Wallets = () => {
  const [wallets, setWallets] = useState(initialWallets);
  const [selectedId, setSelectedId] = useState(
    initialWallets.find((w) => w.isDefault)?.id || initialWallets[0]?.id
  );
  const [modal, setModal] = useState(null); // "add" | "withdraw" | "convert" | "add-wallet" | null
 
  const selectedWallet = wallets.find((w) => w.id === selectedId) || wallets[0];
 
  const updateBalance = (id, delta) => {
    setWallets((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, balance: w.balance + delta, history: [...w.history.slice(-7), w.balance + delta] }
          : w
      )
    );
  };
 
  const handleAddMoney = (amount) => updateBalance(selectedWallet.id, amount);
  const handleWithdraw = (amount) => updateBalance(selectedWallet.id, -amount);
 
  const handleSetDefault = () => {
    setWallets((prev) => prev.map((w) => ({ ...w, isDefault: w.id === selectedWallet.id })));
  };
 
  const handleAddWallet = (currency) => {
    const newWallet = {
      id: currency.code.toLowerCase(),
      code: currency.code,
      symbol: currency.symbol,
      flag: currency.flag,
      balance: 0,
      isDefault: false,
      history: [0, 0],
    };
    setWallets((prev) => [...prev, newWallet]);
    setSelectedId(newWallet.id);
  };
 
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DashboardNav />
 
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 space-y-6">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <FiWallet size={22} />
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Wallets</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Hold, manage, and move money across currencies
            </p>
          </div>
        </div>
 
        <ExchangeRateTicker />
 
        <WalletCarousel
          wallets={wallets}
          selectedId={selectedWallet?.id}
          onSelect={setSelectedId}
          onAddWallet={() => setModal("add-wallet")}
        />
 
        {selectedWallet && (
          <>
            <WalletDetail
              wallet={selectedWallet}
              onAddMoney={() => setModal("add")}
              onWithdraw={() => setModal("withdraw")}
              onConvert={() => setModal("convert")}
              onSetDefault={handleSetDefault}
            />
 
            <WalletActivity wallet={selectedWallet} activity={walletActivity[selectedWallet.code] || []} />
          </>
        )}
      </main>
 
      <AddMoneyModal
        isOpen={modal === "add"}
        onClose={() => setModal(null)}
        wallet={selectedWallet}
        onSubmit={handleAddMoney}
      />
      <WithdrawModal
        isOpen={modal === "withdraw"}
        onClose={() => setModal(null)}
        wallet={selectedWallet}
        onSubmit={handleWithdraw}
      />
      <ConvertModal isOpen={modal === "convert"} onClose={() => setModal(null)} />
      <AddWalletModal
        isOpen={modal === "add-wallet"}
        onClose={() => setModal(null)}
        existingCodes={wallets.map((w) => w.code)}
        onSubmit={handleAddWallet}
      />
    </div>
  );
};
 
export default Wallets;