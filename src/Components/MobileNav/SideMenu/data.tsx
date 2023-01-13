export const sideMenuData = [
  {
    icon: "walletBalance-mobile",
    name: "Wallet Options",
    isWalletOptions: true,
    route: "#",
  },
  {
    icon: "pentagon",
    name: "My Orders",
    isMyOrders: true,
    route: "#",
  },
  {
    icon: "mail",
    name: "Konga Prime",
    route: "/prime-plan",
  },
  {
    icon: "timeSchedule",
    name: "Transactions",
    isTransactions: true,
    route: "transaction-history",
  },
  {
    icon: "mn-file",
    name: "For Business",
    isForBusiness: true,
    route: "#",
  },
  {
    icon: "mn-question",
    name: "FAQ",
    route: "#",
    isFAQ: true,
  },
  {
    icon: "mn-help",
    name: "Help & Support ",
    route: "#",
  },
  {
    icon: "settings2",
    name: "Settings",
    route: "/account/settings",
  },
  {
    name: "KYC Update",
    icon: "kyc",
    route: "/account/kycmobile",
  },
];

export const walletData = [
  {
    icon: "walletBalance-mobile",
    name: "Fund Wallet",
    route: "/fund-wallet",
  },
  {
    icon: "mn-sendMoney",
    name: "Send Money",
    route: "/send-money",
  },
  {
    icon: "exchange",
    name: "Withdraw Fund",
    route: "/transfer/selfWithdraw",
  },
  {
    icon: "clipboard",
    name: "Pay Bills",
    route: "/pay-bills",
  },
];

export const myOrdersData = [
  {
    icon: "mn-fundWallet",
    name: "Order History",
    route: "/online-shopping/my-orders",
  },
  {
    icon: "mn-sendMoney",
    name: "Pending Reviews",
  },
  {
    icon: "exchange",
    name: "My Saved Items",
  },
  {
    icon: "mn-location",
    name: "Track My Order",
    route: "/send-package",
  },
  {
    icon: "clipboard",
    name: "Address Book",
  },
];

export const notLoggedInSideMenuData = [
  {
    icon: "lock",
    name: "Login",
    route: "/login",
  },
  {
    icon: "mn-help",
    name: "For Business",
    route: "#",
    isForBusiness: true,
  },
  {
    icon: "mn-question",
    name: "FAQ",
    route: "#",
    isFAQ: true,
  },
  {
    icon: "mn-help",
    name: "Help & Support",
    route: "/help-support",
  },
];

export const forBusinessData = [
  {
    icon: "mn-help",
    name: "Sell on Konga",
    route: "/business/become-an-agent",
  },
  {
    icon: "mn-help",
    name: "KongaPay Business",
    route: "/business/merchant",
  },
  {
    icon: "mn-help",
    name: "Konga Prime",
    route: "/konga-prime",
  },
];

export const faqData = [
  {
    icon: "mn-help",
    name: "Konga Online",
    route: "/faq-konga",
  },
  {
    icon: "mn-help",
    name: "KongaPay",
    route: "/faq-kongapay",
  },
  {
    icon: "mn-help",
    name: "Konga Food",
    route: "/food",
  },
];
