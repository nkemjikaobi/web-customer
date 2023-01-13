/**
 * This is a helper file to hold all app constants
 */

// HTTP - STATUS
export const HTTP_OK = 200;
export const HTTP_CREATED = 201;

export const SUCCESS = "success";
export const ERROR = "error";
export const FAILED_AUTHENTICATION_ERROR_MSG = "Invalid Username / Password!.";
export const INVALID_ENTRY_ERROR_MSG =
  "Invalid Entry, Kindly check and try again!";

// LOCAL STORAGE
export const USER_HOLDER = "system-items";
export const USER_BALANCE = "system-balance";
export const TOKEN_HOLDER = "system-token";
export const MAGENTTO_TOKEN_HOLDER = "system-bypass-token";
export const USER_HOLDER_DELETION_ERROR =
  "An error occured while deleting user token";

// KONGA ONLINE PAYMENT OPTIONS
export const KONGA_PAY_SDK = "kpaygateway";
export const CASH_ON_DELIVERY = "cashondelivery";

// KONGA CART CONSTANTS
export const SUB_TOTAL_FIELD_KEY = "subtotal";
export const TOTAL_FIELD_KEY = "total";
export const GRAND_TOTAL_FIELD_KEY = "grand_total";

// environments
export const ENV = {
  LOCALHOST: "localhost",
  STAGING: "staging",
  PRODUCTION: "production",
};

// ENVIRONMENTS
export const DEVELOPMENT = "development";

// HEADER SOURCE
export const PWA_HEADER = "pwa"; // change to pwa
export const SILK_ROAD_HEADER = "silk_road"; // change to pwa

// CURRENCIES
export const CURRENCIES = {
  NAIRA: "₦",
};

// TRAVEL STOPS COUNTS CONSTANTS
export const TRAVEL_STOPS_COUNTS = ["none-stop", "one-stop", "two+-stop"];

export const CONTENT = {
  KONGAPRIMESLUG: "2-konga-prime",
  KONGAPRIMETERMSSLUG: "2-kongaprime-terms",
  KONGAHOMESLUG: "2-home",
};
export const DEBOUNCE_DELAY = 350;
export const PAYMENT_OPTIONS = {
  KONGA_ME: "kongame",
  FREE: "free",
  KPAYGATEWAY: "kpaygateway",
  POD: "cashondelivery",
  BANK_TRANSFER: "banktransfer",
  KONGA_BULK: "kongabulk",
};

export const pageIDs = {
  kpgFrameID: "kpgFrame",
};

export const URLS = {
  KONGA_PAY_SIGN_UP: "https://www.kongapay.com/signup",
  KONGA_PAY_SIGN_IN: "https://www.kongapay.com/login",
  KONGA_PAY_MERCHANT_SIGN_UP: "https://www.kongapay.com/merchant/register",
  KONGA_PAY_IOS_SDK:
    "https://kongapay.com/developer/docs/#section/Collections/KongaPay-iOS-SDK",
  KONGA_PAY_ANDROID_SDK:
    "https://kongapay.com/developer/docs/#section/Collections/KongaPay-Android-SDK",
  KONGA_PAY_WEB_PAYMENT:
    "https://kongapay.com/developer/docs/#section/Collections/KongaPay-Inline",
  SHQ: "https://shq.konga.com",
};

export const SOCIAL_MEDIA_URLS = {
  FACEBOOK: "https://www.facebook.com/ShopKonga",
  TWITTER: "https://twitter.com/@shopkonga",
  INSTAGRAM: "https://www.instagram.com/shopkonga",
  YOUTUBE: "https://www.youtube.com/shopkonga",
};

export const MOBILE_APP_URLS = {
  IOS: "https://itunes.apple.com/us/app/konga/id880918394?ls=1&mt=8",
  ANDROID: "https://play.google.com/store/apps/details?id=com.konga.androida",
};

export const PAYMENT_URLS = {
  VERVE: "https://www.myverveworld.com",
  MASTERCARD: "https://www.mastercard.com",
  VISA: "https://www.visa.com",
};

export const EXTERNAL_URL_MAP = [
  {
    externalUrl: ["konga.com", "www.konga.com"],
    internalRoute: "/online-shopping",
  },
  {
    externalUrl: ["travel.konga.com"],
    internalRoute: "/travel/booking",
  },
  {
    externalUrl: ["kxpress.ng", "www.kxpress.ng"],
    internalRoute: "/send-package",
  },
  {
    externalUrl: ["kongapay.com", "www.kongapay.com"],
    internalRoute: "/pay-bills",
  },
];

export const RECOMBI_HOME_PAGE = "kongaez.home_page";
export const RECOMBI_PRODUCT_DETAIL_PAGE = "kongaez.product_details";

export const ADD_TO_CART_ERROR = {
  message:
    "We were unable to add the requested item to your cart, please try again later",
};
export const REMOVE_FROM_CART_SUCCESS_MSG = {
  message: "Product successfully removed from your Cart",
};
export const REMOVE_FROM_CART_ERROR_MSG = {
  message: "An error occurred while removing product from cart",
};

export const SAVED_FOR_LATER_SUCCESS_MSG = {
  message: "Product added to saved items",
};
export const SAVED_FOR_LATER_ERROR_MSG = {
  message: "An error occurred while adding product to saved items",
};
export const REMOVE_SAVED_FOR_LATER_SUCCESS_MSG = {
  message: "Product removed from saved items",
};
export const REMOVE_SAVED_FOR_LATER_ERROR_MSG = {
  message: "An error occurred while removing product from saved items",
};

export const NOTIFICATION_ERROR_COLOR = "#E11900";
export const NOTIFICATION_ERROR_SECONDARY_COLOR = "#C31C07";

export const NOTIFICATION_SUCCESS_COLOR = "#80BA45";
export const NOTIFICATION_SUCCESS_SECONDARY_COLOR = "#4A8D06";
export const KONGA_TRAVELS_WHATSAPP_NUMBER = "2348112114488";
export const KONGA_ONLINE_MOBILE_NUMBER = "2347080635700";
export const KONGA_ONLINE_CONTACT_US_NUMBER = "2348094605555";
