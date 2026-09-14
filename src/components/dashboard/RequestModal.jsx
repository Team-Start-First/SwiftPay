import { useState } from "react";
import Modal from "../ui/Modal";

/**
 * UI-only: replace the generated link with a real one created via your
 * backend (e.g. a Supabase row + /pay/:requestId route).
 */
const RequestModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const resetAndClose = () => {
    setAmount("");
    setNote("");
    setLink("");
    setCopied(false);
    onClose();
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!(Number(amount) > 0)) return;
    // TODO: replace with a real request record + shareable URL
    const fakeId = Math.random().toString(36).slice(2, 9);
    setLink(`https://swiftpay.app/pay/${fakeId}`);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title="Request money">
      {link ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">Share this link to request payment:</p>
          <div className="flex gap-2">
            <input
              readOnly
              value={link}
              className="flex-1 min-w-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 shrink-0"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="w-full py-3 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label htmlFor="rq-amount" className="text-xs font-semibold text-slate-600">
              Amount requested
            </label>
            <input
              id="rq-amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="mt-1.5 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label htmlFor="rq-note" className="text-xs font-semibold text-slate-600">
              Note (optional)
            </label>
            <input
              id="rq-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's this for?"
              className="mt-1.5 w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            disabled={!(Number(amount) > 0)}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            Generate request link
          </button>
        </form>
      )}
    </Modal>
  );
};

export default RequestModal;
