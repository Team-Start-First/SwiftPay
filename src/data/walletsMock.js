// Seed data for the Wallets page. `history` is a short trend series used
// to draw each wallet's sparkline — swap for real balance-over-time data
// from your backend when available.
export const wallets = [
  {
    id: "usd",
    code: "USD",
    symbol: "$",
    flag: "🇺🇸",
    balance: 8120.0,
    isDefault: true,
    history: [7200, 7400, 7100, 7800, 7950, 8020, 8090, 8120],
  },
  {
    id: "eur",
    code: "EUR",
    symbol: "€",
    flag: "🇪🇺",
    balance: 1540.3,
    isDefault: false,
    history: [1200, 1260, 1300, 1280, 1350, 1420, 1480, 1540.3],
  },
  {
    id: "gbp",
    code: "GBP",
    symbol: "£",
    flag: "🇬🇧",
    balance: 980.0,
    isDefault: false,
    history: [1100, 1080, 1020, 1050, 1000, 990, 970, 980],
  },
  {
    id: "ngn",
    code: "NGN",
    symbol: "₦",
    flag: "🇳🇬",
    balance: 620000,
    isDefault: false,
    history: [540000, 560000, 570000, 590000, 600000, 610000, 615000, 620000],
  },
];
 
// Currencies available to add as a new wallet (not already held).
export const AVAILABLE_CURRENCIES = [
  { code: "USD", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", flag: "🇬🇧" },
  { code: "NGN", symbol: "₦", flag: "🇳🇬" },
  { code: "JPY", symbol: "¥", flag: "🇯🇵" },
  { code: "CAD", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", symbol: "A$", flag: "🇦🇺" },
];
 
// Static exchange rates for the ticker (base: USD) — reuse the same
// source as QuickConvert.jsx in a real integration.
export const EXCHANGE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  NGN: 1520,
  JPY: 149.5,
  CAD: 1.36,
  AUD: 1.52,
};
 
// Mock recent activity per wallet currency.
export const walletActivity = {
  USD: [
    { id: 1, name: "Sent to Michael Chen", date: "Today, 11:42 AM", amount: "450.00", direction: "out" },
    { id: 2, name: "Added funds via card", date: "Sep 5, 2:08 PM", amount: "2,000.00", direction: "in" },
  ],
  EUR: [{ id: 1, name: "Converted from USD", date: "Sep 3, 9:12 AM", amount: "500.00", direction: "in" }],
  GBP: [{ id: 1, name: "Sent to David Martinez", date: "Sep 4, 9:30 AM", amount: "120.00", direction: "out" }],
  NGN: [{ id: 1, name: "Received from Amara Okafor", date: "Yesterday, 4:15 PM", amount: "45,000", direction: "in" }],
};