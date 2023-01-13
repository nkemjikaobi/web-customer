export default {
  Settings: [
    {
      id: 1,
      icon: "user",
      name: "Profile Settings",
      icon2: "arrowRight",
      route: "/account/settings",
    },
    {
      id: 2,
      icon: "key",
      name: "Change Pin",
      icon2: "arrowRight",
      route: "/account/changepin",
    },
    {
      id: 3,
      icon: "walletBalance-mobile",
      name: "Disable Wallet Balance",
      icon2: "switchButton",
      route: "#",
    },
  ],
  MoreInfo: [
    {
      id: 4,
      icon: "creditCard",
      name: "Bank/Card Details",
      icon2: "arrowRight",
      route: "#",
      disabled: "false",
    },
    {
      id: 5,
      icon: "restart",
      name: "Active Subscription",
      icon2: "arrowRight",
      route: "#",
      disabled: true,
    },
    {
      id: 6,
      icon: "authorizedMerchants",
      name: "Pre-authorized Merchants",
      icon2: "arrowRight",
      route: "#",
      disabled: true,
    },
    {
      id: 7,
      icon: "reload",
      name: "Referral Information",
      icon2: "arrowRight",
      route: "#",
      disabled: true,
    },
  ],
};
