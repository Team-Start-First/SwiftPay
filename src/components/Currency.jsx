import { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";

const CurrencyConverter = () => {
  /* =======================
     STATE
  ======================= */
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sendAmount, setSendAmount] = useState(1000);
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("NGN");

  /* =======================
     CURRENCY META
  ======================= */
  const currencyMeta = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    NGN: "₦",
    JPY: "¥",
    CAD: "C$",
    AUD: "A$",
    CHF: "CHF",
  };

  /* =======================
     FETCH LIVE FX RATES
     ⚠️ Base currency is USD
     ✔️ Now includes NGN explicitly
  ======================= */
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.frankfurter.app/latest?from=USD&to=EUR,GBP,JPY,CAD,AUD,CHF"
        );
        const data = await res.json();

        // Add NGN manually since Frankfurter doesn't include it
        // Using approximate rate (you can replace with real API)
        const ratesWithNGN = {
          ...data.rates,
          NGN: 1520 // Approximate USD to NGN rate
        };

        setRates(ratesWithNGN);
        setLoading(false);
      } catch (err) {
        setError("Failed to load exchange rates");
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  /* =======================
     CONVERSION LOGIC
     ✔ Handles USD correctly
     ✔ 3-way conversion
     ✔ Handles empty input
  ======================= */
  const convert = () => {
    if (!rates || !sendAmount || sendAmount === '') return "0.00";

    const amount = Number(sendAmount);

    // Same currency
    if (sendCurrency === receiveCurrency) {
      return amount.toFixed(2);
    }

    // USD → Other
    if (sendCurrency === "USD") {
      return (amount * rates[receiveCurrency]).toFixed(2);
    }

    // Other → USD
    if (receiveCurrency === "USD") {
      return (amount / rates[sendCurrency]).toFixed(2);
    }

    // Other → Other (via USD)
    const amountInUSD = amount / rates[sendCurrency];
    return (amountInUSD * rates[receiveCurrency]).toFixed(2);
  };

  const convertedAmount = convert();

  /* =======================
     GET EXCHANGE RATE
  ======================= */
  const getExchangeRate = () => {
    if (!rates) return "Loading...";
    
    if (sendCurrency === receiveCurrency) {
      return `1 ${sendCurrency} = 1.0000 ${receiveCurrency}`;
    }

    if (sendCurrency === "USD" && receiveCurrency !== "USD") {
      return `1 USD ≈ ${rates[receiveCurrency]?.toFixed(4)} ${receiveCurrency}`;
    }

    if (sendCurrency !== "USD" && receiveCurrency === "USD") {
      return `1 ${sendCurrency} ≈ ${(1 / rates[sendCurrency]).toFixed(4)} USD`;
    }

    if (sendCurrency !== "USD" && receiveCurrency !== "USD" && sendCurrency !== receiveCurrency) {
      return `1 ${sendCurrency} ≈ ${(rates[receiveCurrency] / rates[sendCurrency]).toFixed(4)} ${receiveCurrency}`;
    }

    return "";
  };

  /* =======================
     SWAP CURRENCIES
  ======================= */
  const swapCurrencies = () => {
    setSendCurrency(receiveCurrency);
    setReceiveCurrency(sendCurrency);
  };

  /* =======================
     LOADING UI
  ======================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 text-center">
          <div className="inline-block w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white font-semibold text-lg">Loading live exchange rates...</p>
          <p className="text-slate-400 text-sm mt-2">Fetching real-time data</p>
        </div>
      </div>
    );
  }

  /* =======================
     ERROR UI
  ======================= */
  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-gradient-to-br from-red-900/20 to-pink-900/20 border border-red-500/30 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Error Loading Rates</h3>
          <p className="text-slate-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* =======================
     MAIN UI
  ======================= */
  return (
    <div className="min-h-screen bg-slate-200/50 flex items-center justify-center p-4 sm:p-6">

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Live Currency Converter
          </h1>
          <p className="text-slate-600 text-lg">Real-time exchange rates powered by Frankfurter API</p>
        </div>

        {/* Converter Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-700 p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-sm">
          <div className="space-y-6">
            {/* SEND */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">You Send</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Allow empty string or valid numbers
                    if (value === '' || value === '0') {
                      setSendAmount('');
                    } else {
                      setSendAmount(Number(value));
                    }
                  }}
                  onFocus={(e) => {
                    // Select all text when focused for easy replacement
                    e.target.select();
                  }}
                  className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter amount"
                />
                <select
                  value={sendCurrency}
                  onChange={(e) => setSendCurrency(e.target.value)}
                  className="w-full sm:w-32 bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer"
                >
                  {Object.keys(currencyMeta).map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SWAP BUTTON */}
            <div className="flex justify-center">
              <button
                onClick={swapCurrencies}
                className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center hover:bg-purple-500/30 hover:scale-110 transition-all duration-300 group"
                title="Swap currencies"
              >
                <FiArrowRight className="rotate-90 group-hover:rotate-[450deg] transition-transform duration-500" size={20} />
              </button>
            </div>

            {/* RECEIVE */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400">Recipient Gets</label>
             <div className="flex flex-col sm:flex-row gap-3 w-full">
  <input
    readOnly
    value={`${currencyMeta[receiveCurrency]}${convertedAmount}`}
    className="
      flex-1
      min-w-0
      bg-slate-800
      border border-white/10
      rounded-xl
      px-4 py-3
      text-white
      text-2xl
      font-bold
      focus:outline-none
      cursor-default
    "
  />

  <select
    value={receiveCurrency}
    onChange={(e) => setReceiveCurrency(e.target.value)}
    className="
      sm:w-[6.5rem]
      w-full
      shrink-0
      bg-slate-800
      border border-white/10
      rounded-xl
      px-4 py-3
      text-white
      font-semibold
      focus:outline-none
      focus:ring-2 focus:ring-purple-500
      transition-all
      cursor-pointer
    "
  >
    {Object.keys(currencyMeta).map((code) => (
      <option key={code} value={code}>
        {code}
      </option>
    ))}
  </select>
</div>

            </div>

            {/* INFO SECTION */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Exchange Rate</span>
                <span className="text-white font-semibold">{getExchangeRate()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Transfer Fee</span>
                <span className="text-green-400 font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Delivery Time</span>
                <span className="text-yellow-400 font-semibold">⚡ Instant</span>
              </div>
            </div>

            {/* CTA BUTTON */}
            <button className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-300 active:scale-95">
              Send Money Now
            </button>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default CurrencyConverter;