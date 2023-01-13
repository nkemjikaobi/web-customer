/**
 * The different constants/types used for managing component/app related properties
 */
export default {
  // List types
  listTypes: {
    category: "CATEGORY",
    product: "PRODUCT",
    listing: "LISTING",
    deals: "DEALS",
  },

  productTypes: {
    simple: "simple",
    configurable: "configurable",
  },

  carouselVariants: {
    fullWidth: "fullWidth",
    adjacent: "adjacent",
  },

  productCardLabels: {
    NEW_PRODUCT: "NEW_PRODUCT",
    PERCENTAGE_OFF: "PERCENTAGE_OFF",
    SALE: "SALE",
    PROMO: "PROMO",
  },
  starRatingVariants: {
    productRating: "productRating",
    productReviewRating: "productReviewRating",
    merchantRating: "merchantRating",
  },

  // Unfriendly Algolia labels
  fulfilmentType: {
    merchant: {
      key: "SHQ",
      title: "In Merchant Store",
    },
    warehouse: {
      key: "CWK",
      title: "In Konga Warehouse",
    },
  },

  deliveryOption: {
    is_pay_on_delivery: {
      key: "is_pay_on_delivery",
      title: "Pay on Delivery",
    },
    is_free_shipping: {
      key: "is_free_shipping",
      title: "Free Shipping",
    },
    express_delivery: {
      key: "express_delivery",
      title: "Express Delivery",
    },
    pickup: {
      key: "pickup",
      title: "Pickup Available",
    },
  },
  // Product Card
  productCardVariants: {
    deals: "deals",
    listing: "listing",
    recommendations: "recommendations",
    search: "search",
    savedItems: "savedItems",
    trending: "trending",
    kongaprimecard: "kongaprimecard",
  },
  pageIDs: {
    kpgFrameID: "kpgFrame",
    contentWrapperID: "app-content-wrapper",
    productSellerBandID: "product-seller-band",
    productScrollBarID: "scroll-banner",
  },
  selectBoxIconVariants: {
    chevron: "chevron",
    triangle: "triangle",
  },

  productLabels: {
    isPickup: {
      field: "isPickup",
      icon: "pickup-label",
      label: "Pickup & Pay on Collection Available",
    },
    isKongaFulfilled: {
      icon: "warehouse",
      label: "Konga Warehouse",
    },
    payOnDelivery: {
      icon: "cash-exchange2",
      label: "Pay on Delivery Available",
    },
    freeShipping: {
      icon: "free-truck",
      label: "Free Shipping",
    },
    hasAfterSalesService: {
      icon: "repairs",
      label: "Yu Break It, We Fix It",
    },
    hasExpressDelivery: {
      icon: "express-truck",
      label: "Express Delivery Available",
    },
  },
  orderCancellationTimeLimit: 1800,
  kongaTrack: { url: "https://track.konga.com" },
};
