export default [
  {
    name: "Wallet Options",
    icon: "walletBallance",
    children: [
      {
        name: "Fund Wallet",
        icon: "walletBallance",
        link: "/fund-wallet",
      },
      {
        name: "Send Money",
        icon: "sending",
        link: "/send-money",
      },
      {
        name: "Withdraw Fund",
        icon: "exchange",
        link: "/transfer/selfWithdraw",
      },
      {
        name: "Bills & Services",
        icon: "clipboard",
        link: "/pay-bills",
      },
    ],
  },
  {
    name: "My Orders",
    icon: "pentagon",
    children: [
      {
        name: "Order History",
        icon: "timeSchedule",
        link: "/online-shopping/my-orders",
      },
      {
        name: "My Saved Items",
        icon: "heart2",
        link: "/favourites",
      },
      {
        name: "Track My Order",
        icon: "location",
        link: "/send-package",
      },
    ],
  },
  {
    name: "Konga Prime",
    icon: "mail",
    link: "/prime-plan",
  },
  {
    name: "Transaction",
    icon: "timeSchedule",
    link: "/transaction-history",
  },
  {
    name: "Settings",
    icon: "settings2",
    link: "/account/settings",
  },
  {
    name: "KYC Update",
    icon: "kyc",
    link: "/account/kyc",
  },
];
