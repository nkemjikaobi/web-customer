import TransactionDetails from "Components/TransactionlDetails/transactionDetails";
import RouteModel from "Models/IRouteModel";
import ChangePin from "Pages/Authentication/Account/ChangPin/changePin";
import ProfileSettings from "Pages/Authentication/Account/ProfileSettings/profileSettings";
import FundWallet from "Pages/KPay/FundWallet/fundWallet";
import BuyAirtime from "Pages/KPay/AirtimeData/BuyAirtime";
import OrderDetails from "Pages/KPay/AirtimeData/OrderDetailsPage";
import CardDetails from "Pages/Authentication/Account/CardDetails/cardDetails";
import SendMoney from "Pages/KPay/SendMoney/sendMoney";
import BuyData from "Pages/KPay/AirtimeData/BuyData";
import ElectricityPage from "Pages/KPay/PayBills/ElectricityPage";
import CableTvPage from "Pages/KPay/PayBills/CableTvPage";
import PayBillsPage from "Pages/KPay/PayBills/PayBillsPage";
import TransctionHistoryPage from "Pages/KPay/Transactions/TransactionHistoryPage";
import InternetServices from "Pages/KPay/AirtimeData/InternetServices";
import otpVerification from "Components/OtpVerification/otpVerification";
import TransactionSuccessful from "Pages/KPay/Transactions/TransactionSuccessful";
import EPinPage from "Pages/KPay/PayBills/EPinPage";
import SelfWithdraw from "Pages/KPay/WithdrawFund/SelfWithdraw/selfWithdraw";
import CardlessWithdraw from "Pages/KPay/WithdrawFund/CardLessWithdrawal/cardlessWithdraw";
import TransactionDetailsPage from "Pages/KPay/AirtimeData/TransactionDetailsPage";
import PayMerchant from "Pages/Konga/PayMerchant/payMerchant";
import PaymentCallback from "Pages/KPay/PaymentCallback/PaymentCallback";
import TransactionFailed from "Pages/KPay/Transactions/TransactionFailed";
import Kyc from "Pages/Authentication/KycUpdate/Kyc/Kyc";
import IdVerification from "Pages/Authentication/KycUpdate/KycInfo/IdVerification/IdVerification";
import KycInformation from "Pages/Authentication/KycUpdate/KycInfo/KycInformation/KycInformation";
import KycMobile from "Pages/Authentication/KycUpdate/Kyc/KycMobile";
import BankVerification from "Pages/Authentication/KycUpdate/KycInfo/BankVerification/BankVerification";
import AddressVerification from "Pages/Authentication/KycUpdate/KycInfo/AddressVerification/AddressVerification";

const kongaPayConfig: Array<RouteModel> = [
  {
    path: "/pay-bills/buy-airtime",
    exact: true,
    auth: false,
    component: BuyAirtime,
  },
  {
    path: "/pay-bills/otpverification/:dgstatus",
    exact: true,
    auth: false,
    component: otpVerification,
  },
  {
    path: "/pay",
    exact: true,
    auth: false,
    component: PayMerchant,
  },
  {
    path: "/pay-bills/buy-data",
    exact: true,
    auth: false,
    component: BuyData,
  },
  {
    path: "/pay-bills/electricity",
    exact: true,
    auth: false,
    component: ElectricityPage,
  },
  {
    path: "/pay-bills/cable-tv",
    exact: true,
    auth: false,
    component: CableTvPage,
  },
  {
    path: "/pay-bills/internet-services",
    exact: true,
    auth: false,
    component: InternetServices,
  },
  {
    path: "/pay-bills/e-pins",
    exact: true,
    auth: false,
    component: EPinPage,
  },
  {
    path: "/pay-bills/order-details/:dgstatus",
    exact: true,
    auth: false,
    component: OrderDetails,
  },
  {
    path: "/pay-bills/transaction-details",
    exact: true,
    auth: false,
    component: TransactionDetailsPage,
  },
  {
    path: "/pay-bills/transaction-successful",
    exact: true,
    auth: false,
    component: TransactionSuccessful,
  },
  {
    path: "/pay-bills/transaction-failed",
    exact: true,
    auth: false,
    component: TransactionFailed,
  },
  {
    path: "/transfer/transcationdetails",
    exact: true,
    auth: false,
    component: TransactionDetails,
  },
  {
    path: "/fundwallet",
    exact: true,
    auth: false,
    component: FundWallet,
  },
  {
    path: "/account/settings",
    exact: true,
    auth: true,
    component: ProfileSettings,
  },
  {
    path: "/account/kyc",
    exact: true,
    auth: true,
    component: Kyc,
  },
  {
    path: "/account/kycmobile",
    exact: true,
    auth: true,
    component: KycMobile,
  },
  {
    path: "/account/kycinfo",
    exact: true,
    auth: true,
    component: KycInformation,
  },
  {
    path: "/account/idverification",
    exact: true,
    auth: true,
    component: IdVerification,
  },
  {
    path: "/account/bankverification",
    exact: true,
    auth: true,
    component: BankVerification,
  },
  {
    path: "/account/addressverification",
    exact: true,
    auth: true,
    component: AddressVerification,
  },
  {
    path: "/account/changepin",
    exact: true,
    auth: true,
    component: ChangePin,
  },
  {
    path: "/account/card-details",
    exact: true,
    auth: true,
    component: CardDetails,
  },
  {
    path: "/send-money",
    exact: true,
    auth: false,
    component: SendMoney,
  },
  {
    path: "/pay-bills",
    exact: true,
    auth: false,
    component: PayBillsPage,
  },
  {
    path: "/transaction-history",
    exact: true,
    auth: true,
    component: TransctionHistoryPage,
  },
  {
    path: "/transfer/selfWithdraw",
    exact: true,
    auth: false,
    component: SelfWithdraw,
  },
  {
    path: "/cardlessWithdraw",
    exact: true,
    auth: false,
    component: CardlessWithdraw,
  },
  {
    path: "/payment/callback/:payload?",
    exact: true,
    auth: false,
    component: PaymentCallback,
  },
  {
    path: "/confirmation/callback/:store_id?",
    exact: true,
    auth: false,
    component: PaymentCallback,
  },
];

export default kongaPayConfig;
