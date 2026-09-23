import { FiPlus } from "react-icons/fi";
import WalletCard from "./WalletCard";

const WalletCarousel = ({ wallets, selectedId, onSelect, onAddWallet }) => (
  <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
    {wallets.map((wallet, i) => (
      <WalletCard
        key={wallet.id}
        wallet={wallet}
        isSelected={wallet.id === selectedId}
        onSelect={() => onSelect(wallet.id)}
        themeIndex={i}
      />
    ))}

    <button
      type="button"
      onClick={onAddWallet}
      className="shrink-0 w-52 sm:w-56 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors py-6"
    >
      <span className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <FiPlus size={18} />
      </span>
      <span className="text-sm font-semibold">Add wallet</span>
    </button>
  </div>
);

export default WalletCarousel;
