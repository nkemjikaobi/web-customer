/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import IDate from "dto/Utils/IDate";
import React, { Fragment } from "react";
import constants from "Components/constants";
const { productCardLabels, productCardVariants } = constants;

import queryStringInstance from "libs/utils/helpers/querystring";
import { EXTERNAL_URL_MAP } from "Helpers/Constants";
import IProduct from "dto/KongaOnline/IProduct";
import { BOOK_NOW_APP_REF_PREFIX } from "Http/Routes/KTravel";

/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @returns {Boolean} Boolean value
 */
export const isNotEmptyArray = (arr: []): boolean =>
  Array.isArray(arr) && arr.length > 0;

export const queryString = {
  /**
   * @function stringify
   * @memberof queryString
   * @param {Object} data Query data object
   * @returns {string} The formatted string
   */
  stringify: (data: any) => {
    return queryStringInstance.stringify(data);
  },

  /**
   * @function parse
   * @memberof queryString
   * @param {string} data The string to parse
   * @returns {Object} The parsed object
   */
  parse: (data: any) => {
    return queryStringInstance.parse(data);
  },
};
/**
 * Join the Brand and Original Names for a Product
 * @param {*} product: The product object
 * @returns {string} Branded name
 */
export const getBrandedProductName = (product: any) =>
  product
    ? `${
        product.brand &&
        product.name &&
        product.name.indexOf(product.brand) !== 0
          ? product.brand + " "
          : ""
      }${product.name}`
    : "";

// /**
//  * Return a user-friendly format for a number
//  * @param {Number} number Passed number
//  * @returns {String} Formatted number string
//  */
export const formatNumber = ({ number }: { number: number }): string => {
  if ((!number && number !== 0) || isNaN(number)) {
    return "";
  }

  return number.toLocaleString();
};

export const formatDate = (date: Date | string): IDate => {
  const dateTime = new Date(date);
  return {
    date: dateTime.getDate(),
    day: dateTime.toLocaleString("en-us", { weekday: "long" }),
    month: dateTime.toLocaleString("en-us", { month: "short" }),
    year: dateTime.getFullYear(),
  };
};

/**
 * Format date strings into the format - 8 Apr 2018
 * @param {String} dateString the date string
 * @returns {string} The parsed string
 */
export const formatDate2 = (dateString: string) => {
  if (!dateString) return "";
  try {
    const newDate = new Date(dateString);
    return `${newDate.getDate()} ${newDate.toLocaleString("en-us", {
      month: "short",
    })} ${newDate.getFullYear()}`;
  } catch (error) {
    return "";
  }
};

export const reformatDate = (date: Date): string => {
  const result: IDate = formatDate(date);
  return `${result.year}-${result.month}-${result.date}`;
};

export const generateAppReference = () => {
  const rand = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return BOOK_NOW_APP_REF_PREFIX + new Date().getTime() + "-" + rand;
};

/**
 * Method to accept a generic array of items and
 * return the array in chunks
 * @param array T - Generic class
 * @returns array Map<number, Array<T>> - the chunked array in a map form
 */
export const chunkArray = <T,>(
  array: Array<T>,
  chunkSize: number
): Map<number, Array<T>> => {
  const holder: Map<number, Array<T>> = new Map<number, Array<T>>();
  if (chunkSize <= 0) return holder;

  array.forEach((item: T, index: number) => {
    const floor: number = Math.floor(index / chunkSize);
    if (holder.get(floor)) {
      holder.get(floor)?.push(item);
    } else holder.set(floor, [item]);
  });
  return holder;
};
/**
 * Checks if an object has no set properties
 * @param {*} obj The object to test
 * @returns {*} boolean
 */
export const isObjectEmpty = (obj = {}) =>
  !obj || Object.keys(obj).length === 0;

/*

/**
 * Checks if we're on server
 * @returns {boolean} whether or not we're on the server
 */
export const isServer = (): boolean => {
  try {
    return typeof window === "undefined";
  } catch (error: any) {
    return true;
  }
};

export const cloudinaryImage = (
  imageUrl: any,
  width: any,
  cloudinaryBaseImageUrl: any
): any => {
  const genericPath = "image/upload";
  const DEFAULT_TRANSFORMS = "f_auto,fl_lossy,dpr_auto,q_auto";

  // This is actually the DIR for product images
  // So we assume urls without a suffix are product images
  const DEFAULT_PATH_SUFFIX = "/media/catalog/product";
  const ALTERNATE_CLOUDINARY_BASE_URL = `${cloudinaryBaseImageUrl}/${genericPath}/`;

  const widthTransform = parseInt(width) || "auto";
  const transformStr = `w_${widthTransform},${DEFAULT_TRANSFORMS}`;

  let imagePath = "";

  // Check for the generic Cloudinary image path
  const splitUrl = (imageUrl && imageUrl.split(genericPath)) || [];

  if (Array.isArray(splitUrl) && splitUrl.length === 2) imagePath = splitUrl[1];
  else {
    const fullPathRegex =
      /^.*(konga-com-res\.cloudinary\.com|res\.cloudinary\.com\/.*-konga-com)(.*)$/;
    const result = fullPathRegex.exec(imageUrl);

    if (Array.isArray(result) && result.length === 3) imagePath = result[2];
    else
      return `${cloudinaryBaseImageUrl}/${transformStr}${DEFAULT_PATH_SUFFIX}${imageUrl}`;
  }

  return imagePath
    ? `${ALTERNATE_CLOUDINARY_BASE_URL}${transformStr}${imagePath}`
    : imageUrl;
};

/**
 * Function that does nothing:
 * Useful as a default value for an optional Component prop
 * that's of type - function
 * Or for stubbing function calls in Tests and Storybook Docs
 * @returns {*} undefined
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noOp = () => {};

/**
 * Delete an array of keys from a given object
 * @param {Object} targetObj Object to remove propeties from
 * @param {Array} props Array of object properties to be deleted
 * @returns {Object} A copy of the orginal object excluding the specified properties
 */
export const omit = (targetObj: any, props: any): any => {
  // Clone the targetObj to avoid mutating the original data
  const obj = Object.assign({}, targetObj);

  if (!Array.isArray(props)) {
    // eslint-disable-next-line no-console
    return;
  }

  props.forEach((prop) => {
    obj.hasOwnProperty(prop) && delete obj[prop];
  });

  return obj;
};

/**
 * [debounce: forces a function to execute only once after a set time]
 * @param {*} ctx
 * @param {*} func
 * @param {*} delay
 * @return {function} [The debounced function]
 */
export const debounce = (ctx: any, func: any, delay: any): any => {
  let timeout: any;

  return (...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(ctx, args);
    }, delay);
  };
};

/**
 * Helper method to generate random characters with a length
 * @param length: number - the length of the random characters to be generated.
 * @returns text: string - random characters generated.
 */
export const generateRandomCharacter = (length: number): string => {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * Helper method to generate transaction reference
 * @returns reference: string
 */
export const generateTransactionReference = (prefix: string) => {
  const date = new Date();
  const dateFormat = [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ].join("");
  return `${prefix}_${dateFormat}_${generateRandomCharacter(5)}`;
};

/**
 * Helper function to prevent default event handling and call a specified handler
 * @param {A} event The DOM event
 * @param {A} handler The callback to handle the event
 * @returns {*} undefined
 */
export const handleDOMEvent = (event: any, handler: any) => {
  event.preventDefault();
  event.stopPropagation();

  if (typeof handler === "function") handler(event);
};

// /**
//  * Compose a number of styles together easily
//  * @ty {String} styles Classes/styles to be applied
//  * @returns {String} Combined classes
//  */
export const composeClasses = (...styles: string[]): string => {
  let classes = "";

  styles.forEach((arg) => {
    if (arg) classes += `${arg} `;
  });

  return classes.trim();
};

/**
 * Separates a given string with a hyphen
 * @param {String} parameter The string to be parsed
 * @returns {String} parameter The hyphenated string
 */
export const hyphenate = (parameter: string) =>
  parameter && parameter.toLowerCase().split(" ").join("-");

/**
 * Remove keys with null/falsy values from a given object (doesn't mutate the object)
 * @param {Object} obj Target obj
 * @returns {Object} The new object
 */
export const removeEmptyObjectKeys = (obj: any) => {
  const newObj: any = Object.assign({}, obj);

  Object.keys(newObj).forEach((key: string) => {
    if (!newObj[key]) delete newObj[key];
  });
};

/**
 * Handles singularity and plurality
 * @param {Number} param Given parameter
 * @returns {String} string
 */
export const checkPlurality = (param: any): any => {
  const plural = param && param > 1;
  return plural ? "s" : "";
};

/**
 * Converts a number within one to 10
 * @param {string}  word the number in strings
 * @returns {number}
 */
export const convertNumber = (word: any) => {
  const numberObject: any = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };
  const value = word.toLowerCase();
  return numberObject[value];
};

/**
 * Format a given number to a currency format
 * NOTE: If we ever need to format for different currencies, this is be a good place to do that :)
 * @param {Number} price The given price
 * @returns {String} Formatted price
 */
export const formatMoney = (price: any) => {
  if (!price && price !== 0) {
    return "";
  }

  return (
    <Fragment>
      {/* Resetting the font-family for the naira icon ensures that the
  Naira symbol renders correctly as some font don't render it properly
  (e.g. system-ui on Mac) */}
      <span
        style={{
          fontFamily: "sans-serif",
          marginRight: "1px",
        }}
      >
        &#x20A6;
      </span>
      {formatNumber(price)}
    </Fragment>
  );
};
/**
 * Normalize cards that contains desktop and mobile variants
 * @param {*} card
 */
export const normalizeCards = (card: any) => {
  return isNotEmptyArray(card)
    ? card.reduce((acc: any, item: any) => {
        const key = slugify(
          item.template_field ? item.template_field.template_label : item.title
        );
        const value = item.data;

        acc[key] = value;
        return acc;
      }, {})
    : [];
};

/**
 * Util to convert a string to a slug format
 * @param {string} text The string to format
 * @returns {string} The resulting string
 */
export const slugify = (text: any) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "_") // Replace spaces with _
    .replace(/\-+/g, "_") // Replace all - with _
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\_\_+/g, "_") // Replace multiple _ with single _
    .replace(/^_+/, "") // Trim _ from start of text
    .replace(/_+$/, ""); // Trim _ from end of text

/**
 * Normalize page cards
 * @param { array } cards Original array of cards
 * @returns { array } Normalized Array of cards
 */
export const normalizeContentCards = (cards: any) => {
  return isNotEmptyArray(cards)
    ? cards
        .sort((a: any, b: any) => a.position - b.position)
        .map((card: any) => {
          return card.content.reduce((acc: any, item: any) => {
            const key = slugify(
              item.template_field
                ? item.template_field.template_label
                : item.title
            );
            const value = item.data;

            acc[key] = value;
            return acc;
          }, {});
        }, {})
    : [];
};

/**
 * Normalize page contents fetched from Content Service
 * @param {*} data Response data
 * @param { bool } traverse Whether to normalize cards as well
 * @returns { object } Section Object
 */
export const normalizePageContent = (data?: any, traverse?: any): any => {
  const sections = data && data.sectionData && data.sectionData.sections;
  const sectionObj =
    isNotEmptyArray(sections) &&
    sections.reduce((acc: any, val: any) => {
      const section = val.section;
      const key = section.title;
      const value = traverse
        ? normalizeContentCards(section.cards)
        : section.cards;

      return Object.assign({}, acc, { [key]: value });
    }, {});

  return sectionObj;
};

/**
 * Return sanitized HTML to be rendered to prevent XSS attacks from user generated content
 * Rationale: https://zhenyong.github.io/react/tips/dangerously-set-inner-html.html
 * @param {String} content HTML content from server
 * @returns {Object} Sanitized content
 */
export const getSanitizedHtml = (content: any) => ({ __html: content });

/**
 * Format date strings into the format - July 30, 2015
 * @param {string} dateString The string to parse
 * @param {object} options Date.toLocaleDateString options
 * @returns {string} The parsed string
 */
export const parseDate = (
  dateString: any,
  options: any = {
    day: "numeric",
    year: "numeric",
    month: "long",
  }
) => {
  const date = new Date(dateString);
  const parsedDate = date.toLocaleDateString("en-us", options);

  if (parsedDate === "Invalid Date") {
    return dateString;
  }

  return parsedDate;
};

/**
 * Check if given date is today
 * @param date: Date given date
 * @returns isToday: boolean
 */
export const dateIsToday = (date: Date): boolean =>
  new Date().getFullYear() === date.getFullYear() &&
  new Date().getMonth() === date.getMonth() &&
  new Date().getDate() === date.getDate();

/**
 * Adds month(s) to date
 * @param {string} date datetime string
 * @param {integer} month number of months to add
 * @return {string} return a new date
 */
export const addMonthToDate = (date: any, month: any) => {
  return new Date(date.setMonth(date.getMonth() + month));
};

/**
 * Convert a string seperated with space into a dash seperated string
 * eg: Hirekaan Micheal Hemen -> hirekaan-micheal-hemen
 * @param parameter: string
 * @return result: string
 */
export const convertStringToDashed = (parameter: string): string => {
  let result = "";
  try {
    result = parameter.toLowerCase().replaceAll(" ", "-");
  } catch (error: any) {}
  return result;
};

/**
 * Helper to check that a link points to an external url rather than a relative path
 * @param {*} url The url
 * @returns {Boolean} The result
 */
export const isExternalUrl = (url: string): any => {
  if (url) {
    if (url.includes("901")) {
      return true;
    }
    return String(url).indexOf("http") > -1;
  }
};

export const parseUrl = (url: string, prop?: string) => {
  const anchor = document.createElement("a");
  anchor.setAttribute("href", url);
  const { host, hostname, pathname, port, protocol, search, hash } = anchor;
  const origin = `${protocol}//${hostname}${port.length ? `:${port}` : ""}`;
  return prop
    ? eval(prop)
    : { origin, host, hostname, pathname, port, protocol, search, hash };
};

/**
 * Helper function to check if a product is discounted or not
 * @param product This is the product object, should contain price, original price and special price
 * @returns {Boolean}
 */
export const isDiscounted = (product: IProduct) => {
  let originalPrice = 0;
  let price = 0;
  if (product.special_price) {
    price = product.special_price;
    if (!product.original_price && !product.price) return false;
    originalPrice = product.original_price || product.price;
  }
  return price < originalPrice;
};

/**
 * Helper function to redirect to whatsapp
 * @param mobile This is mobile number, it is of type number
 * @returns {VoidFunction}
 */
export const goToWhatsApp = (mobile: string) => {
  const win: any = window.open(
    `https://api.whatsapp.com/send/?phone=${mobile}&text&app_absent=0`,
    "_blank"
  );
  win.focus();
};

/**
 * This method rewrites URL from content service to map to the internal routes to cater for
 * legacy routes that have been prefixed with the existing sites host.
 * e.g https://konga.com/content/nowonkonga => "/content/nowonkonga"; The host is removed as PWA should have its own internal route that handles this.
 * @param url string url value
 * @returns string
 */
export const urlMapsToInternalRoute = (url: string) => {
  if (!url) return null;
  const parsedUrl = parseUrl(url);
  const { host, pathname, search } = parsedUrl;

  const urlMap = EXTERNAL_URL_MAP.find((url) => url.externalUrl.includes(host));

  if (!urlMap) {
    return url;
  }

  if (search?.length > 1 && pathname?.length > 1) {
    return `${pathname}${search}`;
  }

  if (pathname?.length > 1) {
    return pathname;
  }
  return urlMap?.internalRoute || url;
};
/**
 * Computes the percentage for a product where possible
 * @param {Number} price Original Price
 * @param {Number} specialPrice Special Price
 * @returns {Number} Percentage off
 */
const computePercentageOff = (price: any, specialPrice: any) => {
  if (specialPrice !== 0 && !specialPrice) return;
  if (price === specialPrice) return;

  const difference = price - specialPrice;
  if (difference < 1) return;

  return Math.round((difference / price) * 100);
};
/**
 * Checks if product belongs to yakata category
 * @param {String} category
 */
export const isYakataCategory = (categoryTree: any) => {
  if (categoryTree) {
    const keyCheck = "Yakata";
    // convert values within category tree to lower case to allow case insensitive checks
    const isYakataCategory =
      isNotEmptyArray(categoryTree) &&
      categoryTree.filter(
        (category: any) =>
          category.toLowerCase().indexOf(keyCheck.toLowerCase()) > -1
      );

    return isYakataCategory.length > 0;
  }

  return false;
};

/**
 * Given a product object, extract and normalize values from product data because the data content may be different based on the source
 * @param {Object} product Raw product object
 * @param {String} variant Product card variant
 * @returns {Object} Normalized product values
 */

const enabledAttributes = {
  freeShipping: Boolean(1),
  payOnDelivery: Boolean(1),
  pickup: Boolean(1),
};

export const normalizeProductValues = (product: any, variant?: any): any => {
  if (!product) {
    return null;
  }

  let image =
    product.image || product.image_thumbnail || product.image_thumbnail_path;
  const description = product.description;
  let images = [];
  let attributes = [];
  let variantsProducts = [];
  let savings;

  const id = product.product_id || product.sku;
  const name = product.name;
  const categories = product.categories;
  const category = isNotEmptyArray(categories)
    ? categories[categories.length - 1]
    : null;
  // Enable during Yakata
  const categoryTree =
    isNotEmptyArray(product.categories) &&
    product.categories.map((cat: any) => cat.name);
  const originalPrice = product.original_price || product.price;
  const price = product.price;
  const specialPrice = product.special_price || product.final_price;
  const dealPrice = product.deal_price || null;
  const percentageOff =
    product.percent_off || computePercentageOff(price, specialPrice);
  const dealExpiryDate = product.deal_timeto;
  // const freeShipping =enabledAttributes.freeShipping && !!product.is_free_shipping;
  // const isPickup = enabledAttributes.pickup && !!product.pickup;
  const isKongaFulfilled = product.konga_fulfilment_type === "CWK";
  const hasAfterSaleService = !!product.has_after_sales_service;
  const maxReturnPeriod = product.max_return_period;
  const isPromo = !!product.konga_promo_label;
  const isYakata = isYakataCategory(categoryTree); // Enable during Yakata
  // const isNew = product.new_in || isProductNew(product);
  // const payOnDelivery =enabledAttributes.payOnDelivery && !!product.is_pay_on_delivery;
  const productType = product.product_type;
  const url = product.url_key || product.id;
  const stock = product.stock;
  const brand = product.brand;
  const shortDescription = product.short_description;
  const warranty = product.warranty;
  const allowInstallment = product.allow_installment;
  const customOptions = product.custom_options;
  const status = product.status;
  const warehouseLocationRegions = product.warehouse_location_regions || null;
  const availabilityLocations = product.availability_locations || null;
  const is_official_store_product = product.is_official_store_product || 0;
  const is_konga_prime = product.is_konga_prime || 0;
  const objectID = product.objectID || "";
  const isPickup = enabledAttributes.pickup && !!product.pickup;
  const payOnDelivery =
    enabledAttributes.payOnDelivery && !!product.is_pay_on_delivery;
  const freeShipping =
    enabledAttributes.freeShipping && !!product.is_free_shipping;
  const hasExpressDelivery = product.express_delivery;

  // Deals
  const quantitySold =
    (product.stock && product.stock.quantity_sold) || product.qty_sold;
  const maxSaleQuantity = (product.stock && product.stock.max_sale_qty) || 0;
  const minSaleQuantity = (product.stock && product.stock.min_sale_qty) || 1;
  const availableQuantity = (product.stock && product.stock.quantity) || 0;
  const dealQuantity = product.deal_qty;
  const percentageSold = product.sold_percent || 0;

  const seller = {
    name: (product.seller && product.seller.name) || product.shop_name,
    url:
      (product.seller && product.seller.url_key) ||
      (product.seller && product.seller.url) ||
      (product.seller && product.seller.id) ||
      product.shop_url,
    id: product.seller && product.seller.id,
  };

  const productReview = {
    quality: product.product_reviews && product.product_reviews.quality,
    communication:
      product.product_reviews && product.product_reviews.communication,
    deliveryPercentage: product.delivery_percentage,
    deliveredOrders: product.delivered_orders,
    totalRatings: product.total_ratings,
    reviews: product.product_reviews,
  };
  let productRating = product.product_rating;

  // Check for Algolia response
  if (!productRating && product.rating) {
    productRating = {
      average_rating: product.rating.average_rating,
      total_ratings: product.rating.total_rating,
    };
  }

  const attributeGroups =
    (product && product.frontend_attribute_groups) || null;
  const _productAttributes = (product && product.frontend_attributes) || null;
  const hasValidAttributes =
    Array.isArray(_productAttributes) && _productAttributes.length > 0;
  const productAttributes = hasValidAttributes
    ? _productAttributes
    : Array.isArray(attributeGroups)
    ? attributeGroups.reduce(
        (acc, group) => acc.concat(group.frontend_attributes),
        []
      )
    : [];

  // TODO: The label type and label needs to be computed based on defined rules with business/marketing
  let label;
  const priceOff =
    specialPrice && originalPrice ? originalPrice - specialPrice : 0;
  const discount = priceOff > 0 ? (priceOff / originalPrice) * 100 : 0;
  const percentage = (
    product.percent_off ||
    percentageOff ||
    (discount > 0 ? discount : 0)
  ).toFixed(2);

  if (isPromo) {
    label = {
      text: product.konga_promo_label,
      type: productCardLabels.PROMO,
    };
  } else if (isYakata) {
    label = {
      text: "Yakata Black Friday",
      type: productCardLabels.PROMO,
    };
  } else if (percentage > 0) {
    label = {
      text: `${percentage}% Off`,
      type: productCardLabels.PERCENTAGE_OFF,
    };
    // } else if (isNew) {
    //   label = {
    //     text: "New",
    //     type: productCardLabels.NEW_PRODUCT,
    //   };
  } else if (product.onSale) {
    label = {
      text: "Deal",
      type: productCardLabels.SALE,
    };
  }

  if (isNotEmptyArray(product.images)) images = product.images;
  if (productType === "configurable") {
    if (product.variants && product.variants.attributes) {
      attributes = product.variants.attributes;
    }

    variantsProducts = product.variants && product.variants.products;
  }

  if (productType === "configurable" && isNotEmptyArray(variantsProducts)) {
    savings =
      (variantsProducts[0].deal_price &&
        variantsProducts[0].price - variantsProducts[0].deal_price) ||
      (variantsProducts[0].special_price &&
        variantsProducts[0].price - variantsProducts[0].special_price);
  } else {
    savings =
      (dealPrice && originalPrice - dealPrice) ||
      (specialPrice && originalPrice - specialPrice);
  }

  if (variant === productCardVariants.search) {
    image = product.image_thumbnail_path;
  }

  return {
    attributes,
    availableQuantity,
    availabilityLocations,
    allowInstallment,
    brand,
    category,
    categories,
    customOptions,
    dealExpiryDate,
    dealPrice,
    description,
    freeShipping,
    id,
    hasAfterSaleService,
    hasExpressDelivery,
    maxReturnPeriod,
    image,
    images,
    isKongaFulfilled,
    is_konga_prime,
    isYakata,
    is_official_store_product,
    isPickup,
    label,
    maxSaleQuantity,
    minSaleQuantity,
    name,
    originalPrice,
    objectID,
    percentageOff,
    price,
    productReview,
    productRating,
    productType,
    productAttributes,
    savings,
    seller,
    shortDescription,
    specialPrice,
    status,
    stock,
    url,
    variantsProducts,
    quantitySold,
    dealQuantity,
    percentageSold,
    denormalized: product,
    payOnDelivery,
    warranty,
    warehouseLocationRegions,
  };
};

/**
 * Pads with any arbitrary string(s)
 * @param {string} val [The string to pad]
 * @param {...string} pad [The string to pad to the passed string]
 * @returns {string} string The padded string
 */
export const padWithString = (val: any, ...pad: any) => {
  return `${pad.join("")} ${val}`;
};

/**
 * Resizes images to be uploaded on KongaPay for KYC to not greater than 2mb
 * eg: image-size 5mb -> image-size 500kb
 * @param parameter: file
 * @return result: file
 */

export const minifyImg = (
  dataUrl: string,
  newWidth: number,
  imageType = "image/jpeg",
  resolve: any,
  imageArguments = 0.7
) => {
  let image: any, oldWidth, oldHeight, newHeight, canvas, ctx: any, newDataUrl;
  new Promise((resolve) => {
    image = new Image();
    image.src = dataUrl;

    resolve("");
  }).then((d) => {
    oldWidth = image.width;
    oldHeight = image.height;
    newHeight = Math.floor((oldHeight / oldWidth) * newWidth);
    canvas = document.createElement("canvas");
    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, newWidth, newHeight);
    newDataUrl = canvas.toDataURL(imageType, imageArguments);
    resolve(newDataUrl);
  });
};

export const imageUrlToFile = (
  ImageURL: string,
  name: string,
  sliceSize: number | undefined
) => {
  sliceSize = sliceSize || 512;
  const block = ImageURL.split(";");
  const contentType = block[0].split(":")[1];
  const realData = block[1].split(",")[1];
  const byteCharacters = atob(realData);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return new File([blob], name, { type: contentType });
};

export const handleResize = async (
  fileObject: any,
  callback: (arg0: File) => void
) => {
  const reader: any = new FileReader();
  const maxUploadFileSize = 1048576;
  const imageTypes = ["image/jpeg", "image/png", "image/gif"];

  if (
    fileObject.size > maxUploadFileSize &&
    imageTypes.includes(fileObject.type)
  ) {
    reader.addEventListener(
      "load",
      async () => {
        minifyImg(reader.result, 1000, fileObject.type, (data: any) => {
          const newFile = imageUrlToFile(data, fileObject.name, 0);
          callback(newFile);
        });
      },
      false
    );
  } else {
    callback(fileObject);
  }

  if (fileObject) {
    reader.readAsDataURL(fileObject);
  }
};

/**
 * Flattens the orderHistory array to create a new array for sub Orders
 * @param {Array} arr array to be flattened
 * @returns {Array} 1-dimensional array of items
 */
export const transformOrderHistoryArray = (arr: any) => {
  const newArr: any = [];
  arr &&
    isNotEmptyArray(arr) &&
    arr.map((e: any) => {
      const items = e.sub_orders;
      const createdAt = e.created_at;
      items &&
        isNotEmptyArray(items) &&
        items.map((element: any) => {
          const value = element;
          newArr.push({ ...value, createdAt });
        });
    });
  return newArr;
};

/**
 * Normalizes pickup and delivery addresses to a uniform object
 * @param {object} address [The address object]
 * @returns {object} The normalized address
 */
export const normalizeAddress = (address: any) => {
  if (!address) return {};

  const id = address.id;
  const name = address.name || `${address.firstname} ${address.lastname}`;
  const telephone = address.phone || address.telephone;

  const street = address.address || address.street;
  const landmark = address.landmark;

  let area = "";
  let city = address.lga || "";
  let region = "";
  let regionID = 0;
  let is_default = false;

  if (address.area && address.area.name) area = address.area.name;
  if (address.city && address.city.name) city = address.city.name;
  if (address.region && address.region.name) region = address.region.name;
  if (address.region && address.region.id) regionID = address.region.id;
  if (address.is_default) is_default = address.is_default;

  return {
    id,
    name,
    telephone,
    street,
    landmark,
    area,
    city,
    region,
    regionID,
    is_default,
  };
};

/**
 * Convert date strings to epoch format
 * @param {String} dateString the date string
 * @returns {number} The epoch value
 */
export const dateToEpoch = (dateString: string) => {
  if (dateString) {
    return new Date(dateString.replace(/-/g, "/")).getTime();
  } else {
    return 0;
  }
};

/**
 * Parses timestamps date strings into the format:
 * July 30, 2015
 * @param {*} timestamp The timestamp to parse
 * @param {object} options Date.toLocaleDateString options
 * @returns {string} The parsed string
 */
export const parseTimestamp = (timestamp: any, options?: any) => {
  const parsedDate = parseDate(1000 * timestamp, options);
  return parsedDate || timestamp;
};
