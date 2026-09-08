export const wallets = [
  { code: "USD", amount: "$8,120.00" },
  { code: "EUR", amount: "€1,540.30" },
  { code: "GBP", amount: "£980.00" },
  { code: "NGN", amount: "₦620,000" },
];
 
export const transactions = [
  {
    id: 1,
    name: "Sent to Michael Chen",
    date: "Today, 11:42 AM",
    amount: "$450.00",
    direction: "out",
    type: "sent",
    status: "completed",
  },
  {
    id: 2,
    name: "Received from Amara Okafor",
    date: "Yesterday, 4:15 PM",
    amount: "$1,200.00",
    direction: "in",
    type: "received",
    status: "completed",
  },
  {
    id: 3,
    name: "Added funds via card",
    date: "Sep 5, 2:08 PM",
    amount: "$2,000.00",
    direction: "in",
    type: "funded",
    status: "completed",
  },
  {
    id: 4,
    name: "Sent to David Martinez",
    date: "Sep 4, 9:30 AM",
    amount: "$780.00",
    direction: "out",
    type: "sent",
    status: "pending",
  },
];