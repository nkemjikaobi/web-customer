import React from "react";
import IdVerification from "./KycInfo/IdVerification/IdVerification";
import BankVerification from "./KycInfo/BankVerification/BankVerification";
import AddressVerification from "./KycInfo/AddressVerification/AddressVerification";

export const kycData = [
  {
    id: 1,
    icon: "userIcon",
    name: "ID Verification",
    icon2: "arrowRight",
    route: "/account/idVerification",
    component: <IdVerification />,
    showComponent: false,
  },
  {
    id: 2,
    icon: "bankBuilding",
    name: "Bank Verification",
    icon2: "arrowRight",
    route: "/account/bankVerification",
    component: <BankVerification />,
    showComponent: false,
  },
  {
    id: 3,
    icon: "addressBook",
    name: "Address Verification",
    icon2: "arrowRight",
    route: "/account/addressVerification",
    component: <AddressVerification />,
    showComponent: false,
  },
];

export const kpayClassic = [
  {
    id: 1,
    text: "Name",
    icon: "yellowTick",
  },
  {
    id: 2,
    text: "Phone Number",
    icon: "yellowTick",
  },
  {
    id: 3,
    text: "BVN",
    icon: "yellowTick",
  },
  {
    id: 4,
    text: `Valid Government ID 
    (National ID Card, Voters Card, Drivers Licence, and National Passport)`,
    icon: "yellowTick",
  },
];

export const kpayPremium = [
  {
    id: 1,
    text: "Name",
    icon: "blueTick",
  },
  {
    id: 2,
    text: "Phone Number",
    icon: "blueTick",
  },
  {
    id: 3,
    text: "BVN",
    icon: "blueTick",
  },
  {
    id: 4,
    text: `Valid Government ID 
    (National ID Card, Voters Card, Drivers Licence, and National Passport)`,
    icon: "blueTick",
  },
  {
    id: 5,
    text: "Utility Bill (National Electric Power Authority, Waste Management Bill, Water Cooperation Bill)",
    icon: "blueTick",
  },
];
