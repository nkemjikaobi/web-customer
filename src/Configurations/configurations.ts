/* eslint-disable no-undef */
const config: any = {
  app: {
    env: process.env.REACT_APP_NODE_ENV,
  },
  api: {
    kongaOnline: process.env.REACT_APP_KONGA_ONLINE_URL,
    kpgMerchantPublicKey: process.env.REACT_APP_KPG_PUBLIC_KEY,
    GatewayRoute: process.env.REACT_APP_GATEWAY_API_ROUTE,
    MerchantId: {
      KongaOnline: process.env.REACT_APP_KONGA_ONLINE_MERCHANT_ID,
    },
  },
  web: {
    public_url: process.env.PUBLIC_URL,
    port: process.env.REACT_APP_WEB_PORT,
    modeEnvironment: process.env.REACT_APP_KONGA_PAYMENT_MODE,
  },
  general: {
    algolia: {
      apiKey:
        process.env.REACT_APP_ALGOLIA_API_KEY &&
        process.env.REACT_APP_ALGOLIA_API_KEY.trim(),
      appID:
        process.env.REACT_APP_ALGOLIA_APP_ID &&
        process.env.REACT_APP_ALGOLIA_APP_ID.trim(),
      indexes: {
        mainProductIndex:
          process.env.REACT_APP_ALGOLIA_MAIN_PRODUCT_INDEX &&
          process.env.REACT_APP_ALGOLIA_MAIN_PRODUCT_INDEX.trim(),
        querySuggestionsIndex:
          process.env.REACT_APP_ALGOLIA_QUERY_SUGGESTIONS_INDEX &&
          process.env.REACT_APP_ALGOLIA_QUERY_SUGGESTIONS_INDEX.trim(),
      },
      filterLimit: process.env.REACT_APP_ALGOLIA_FILTER_LIMIT || "10",
    },
  },
  images: {
    basePath: process.env.REACT_APP_IMAGE_API_URL,
    serviceUrl: process.env.REACT_APP_IMAGE_SERVICE_URL,
    cloudinaryBaseImageUrl:
      process.env.REACT_APP_CLOUDINARY_BASE_IMAGE_URL ??
      "https://www-konga-com-res.cloudinary.com",
    categoriesBaseImageUrl:
      process.env.REACT_APP_CATEGORIES_IMAGES_BASE_URL ??
      "/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/customcmsmenu/item/",
    fallbackImage: process.env.REACT_APP_FALLBACK_IMAGE,
    travelLogo: process.env.REACT_APP_TRAVEL_LOGO_URL,
  },
  kongapay: {
    enabledAsPaymentMethod: !1,
    publicKey: process.env.REACT_APP_KONGA_PAY_GUEST_PUBLIC_KEY,
    guestMerchantId: process.env.REACT_APP_KONGA_PAY_GUEST_MERCHANT_ID,
    merchantId: process.env.REACT_APP_KONGA_PAY_MERCHANT_ID,
    merchantName: process.env.REACT_APP_KONGA_MERCHANT_NAME,
    webSdkAuthUrl: process.env.REACT_APP_WEB_SDK_AUTH_URL,
    iframeEnabled: !0,
  },
  kpaygateway: {
    merchantId: process.env.REACT_APP_KONGA_MERCHANT_ID,
    merchantName: process.env.REACT_APP_KONGA_MERCHANT_NAME,
    mode: "test",
    webSdkScriptUrl: process.env.REACT_APP_WEB_SDK_SCRIPT_URL,
    cardChannel: "chn_002_deb1t",
  },
  ktravel: {
    appReference: "FB11-161929-78656",
  },
  sdk: {
    kOnline: {
      publicKey: process.env.REACT_APP_KONGA_ONLINE_MERCHANT_PUBLIC_KEY,
      merchantId: process.env.REACT_APP_KONGA_ONLINE_MERCHANT_ID,
    },
    kFood: {
      publicKey: process.env.REACT_APP_KONGA_FOOD_MERCHANT_PUBLIC_KEY,
      merchantId: process.env.REACT_APP_KONGA_FOOD_MERCHANT_ID,
    },
    kExpress: {
      publicKey: process.env.REACT_APP_KONGA_EXPRESS_MERCHANT_PUBLIC_KEY,
      merchantId: process.env.REACT_APP_KONGA_EXPRESS_MERCHANT_ID,
    },
    kTravel: {
      publicKey: process.env.REACT_APP_KONGA_TRAVEL_MERCHANT_PUBLIC_KEY,
      merchantId: process.env.REACT_APP_KONGA_TRAVEL_MERCHANT_ID,
    },
    GuestDGVending: {
      publicKey: process.env.REACT_APP_KONGA_PAY_GUEST_PUBLIC_KEY,
      merchantId: process.env.REACT_APP_KONGA_PAY_GUEST_MERCHANT_ID,
    },
    mode: process.env.REACT_APP_KONGA_PAYMENT_MODE,
    webSdkAuthUrl: process.env.REACT_APP_WEB_SDK_AUTH_URL,
    iframeEnabled: process.env.REACT_APP_WEB_SDK_ENABLE_IFRAME,
  },
  spreadsheet: {
    REACT_APP_SPREADSHEET_ID: process.env.REACT_APP_SPREADSHEET_ID,
    REACT_APP_SHEET_ID: process.env.REACT_APP_SHEET_ID,
    REACT_APP_GOOGLE_CLIENT_EMAIL: process.env.REACT_APP_GOOGLE_CLIENT_EMAIL,
    REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY:
      process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY,
  },
};

export default config;
