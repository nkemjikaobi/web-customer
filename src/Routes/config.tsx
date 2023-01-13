import HomePage from "../Pages/Home/HomePage";
import LoginPage from "../Pages/Authentication/Login/login";
import SignUp from "../Pages/Authentication/SignUp/signUp";
import ForgotPasswordPage from "../Pages/Authentication/ForgotPassword/forgotPassword";
import ResetPasswordPage from "Pages/Authentication/ResetPassword/resetPassword";
import VendorListingPage from "Pages/KFood/Vendors/vendors";
import RouteModel from "Models/IRouteModel";

import FoodHome from "Pages/KFood/FoodHome/foodHome";
import TravelHome from "Pages/KTravel/TravelHome/travelHome";

import kongaTravelConfig from "./konga.travel.config";
import kongaPayConfig from "./konga.pay.config";
import kongaShoppingConfig from "./konga.shopping.config";
import kongaExpressConfig from "./konga.express.config";
import kongaFoodConfig from "./konga.food.config";
import FundWallet from "Pages/KPay/FundWallet/fundWallet";
import kongaBusinessConfig from "./konga.business.config";
import kongaPrimeConfig from "./konga.prime.config";
import KongaHealthConfig from "./Konga.health.config";
import kongaContentConfig from "./konga.content.config";
import HelpAndSupport from "Pages/MobileHelpAndSupport/helpHome";
import PageNotFound from "Pages/PageNotFound/PageNotFound";
import TermsAndConditions from "Pages/TermsAndConditions/TermsAndConditions";
import savedItems from "Pages/Konga/SavedItems/savedItems";
import ContactUsWeb from "Pages/ContactUs/ContactUsWeb";
import AboutUs from "Pages/AboutUs/AboutUs";
import Executives from "Pages/AboutUs/Executives/Executives";
import ForgotStep3 from "Pages/Authentication/ForgotPassword/ForgotStep3/ForgotStep3";
const config: Array<RouteModel> = [
  {
    path: "/",
    exact: true,
    auth: false,
    component: HomePage,
  },
  {
    path: "/login",
    exact: true,
    auth: false,
    component: LoginPage,
  },
  {
    path: "/vendors",
    exact: true,
    auth: false,
    component: VendorListingPage,
  },
  {
    path: "/foodHome",
    exact: true,
    auth: false,
    component: FoodHome,
  },
  {
    path: "/travelhome",
    exact: true,
    auth: false,
    component: TravelHome,
  },
  {
    path: "/favourites",
    exact: true,
    auth: false,
    component: savedItems,
  },
  {
    path: "/forgotpassword",
    exact: true,
    auth: false,
    component: ForgotPasswordPage,
  },
  {
    path: "/forgotpassword/reset",
    exact: true,
    auth: false,
    component: ForgotStep3,
  },
  {
    path: "/resetpassword",
    exact: true,
    auth: false,
    component: ResetPasswordPage,
  },
  {
    path: "/signup",
    exact: true,
    auth: false,
    component: SignUp,
  },
  {
    path: "/fund-wallet/",
    exact: true,
    auth: false,
    component: FundWallet,
  },
  {
    path: "/help-support",
    exact: true,
    auth: false,
    component: HelpAndSupport,
  },
  {
    path: "/page-not-found",
    exact: true,
    auth: false,
    component: PageNotFound,
  },
  {
    path: "/terms-and-conditions",
    exact: true,
    auth: false,
    component: TermsAndConditions,
  },
  {
    path: "/contact-us",
    exact: true,
    auth: false,
    component: ContactUsWeb,
  },
  {
    path: "/about-us",
    exact: true,
    auth: false,
    component: AboutUs,
  },
  {
    path: "/about-us/our-team/:id",
    exact: true,
    auth: false,
    component: Executives,
  },

  // konga travel routes
  ...kongaTravelConfig,

  // konga pay routes
  ...kongaPayConfig,

  // konga express routes
  ...kongaExpressConfig,

  // konga shopping routes
  ...kongaShoppingConfig,

  // konga food routes
  ...kongaFoodConfig,

  // konga food routes
  ...KongaHealthConfig,

  // konga business routes
  ...kongaBusinessConfig,

  // konga prime routes
  ...kongaPrimeConfig,

  // konga content routes
  ...kongaContentConfig,
];

export default config;
