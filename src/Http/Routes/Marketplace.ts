/**
 * Routes for Konga Online
 */

import { GATEWAY_API_ROUTE } from "./Authentication";

export const PRODUCTS_IMAGES_BASE_URL =
  "https://www-konga-com-res.cloudinary.com/image/upload/media/catalog/product";
export const CATEGORIES_IMAGES_BASE_URL =
  "https://www-konga-com-res.cloudinary.com/image/upload/media/catalog/category/";

export const GET_ALL_CATEGORIES_URL = `${GATEWAY_API_ROUTE}/api-gateway/get-category-menu`;
export const GET_ORDER_HISTORY_URL = `${GATEWAY_API_ROUTE}/api-gateway/order-history`;
export const GET_PRODUCTS_BY_CATEGORY_URL = `${GATEWAY_API_ROUTE}/api-gateway/search-by-store`;
export const GET_PRODUCTS_BY_URL_OR_ID = `${GATEWAY_API_ROUTE}/api-gateway/get-product`;

const INIT_SPONSORED_URL =
  "a_slot=b&a_type=product&page_type=CATEGORY&pcnt=10&language=en&currency=NGN";
export const GET_SPONSORED_PRODUCTS_URL = `${GATEWAY_API_ROUTE}/online-ai/sponsored-products?${INIT_SPONSORED_URL}&client_id=66763&categories=computers%20and%20accessories`;

export const GET_RECENTLY_VIEWED_PRODUCTS_URL = `${GATEWAY_API_ROUTE}/api-gateway/recently-viewed-products`;
export const GET_RECOMMENDED_PRODUCTS_URL = `${GATEWAY_API_ROUTE}/api-gateway/recommendations`;
export const GET_BEST_SELLING_PRODUCTS_URL = `${GATEWAY_API_ROUTE}/api-gateway/get-bestSelling-products`;
export const GET_MERCHANT_WITH_URL_KEY = `${GATEWAY_API_ROUTE}/api-gateway/get-merchant-with-url-key`;
export const GET_TODAYS_DEALS_URL = `${GATEWAY_API_ROUTE}`;
export const GET_CANCEL_ORDER_REASONS_URL = `${GATEWAY_API_ROUTE}/api-gateway/cancel-order-reasons`;
export const CANCEL_ORDER = `${GATEWAY_API_ROUTE}/api-gateway/cancel-order`;

export const GET_STATES = `${GATEWAY_API_ROUTE}/api-gateway/states`;
export const GET_LOCAL_GOVERNMENT_AREAS = `${GATEWAY_API_ROUTE}/api-gateway/lgas`;
export const GET_PICKUP_LOCATIONS = `${GATEWAY_API_ROUTE}/api-gateway/get-pickup-locations`;

export const GET_CUSTOMERS_DETAILS_URL = `${GATEWAY_API_ROUTE}/api-gateway/get-customer-details`;
export const GET_DEALS_URL = `${GATEWAY_API_ROUTE}/api-gateway/get-deals`;

export const GET_BRAND_INFO = `${GATEWAY_API_ROUTE}/api-gateway/get-brand-with-url-key`;

export const GET_INSPIRED_BY_YOUR_CART_RCOMMENDATIONS_URL = `${GATEWAY_API_ROUTE}/api-gateway/inspired-by-your-cart-recommendations`;
export const GET_SAVED_LIST_URL = `${GATEWAY_API_ROUTE}/api-gateway/get-saved-list`;
export const ADD_ITEM_TO_SAVED_LIST_URL = `${GATEWAY_API_ROUTE}/api-gateway/add-item-to-saved-list`;
export const DELETE_ITEM_FROM_SAVED_LIST_URL = `${GATEWAY_API_ROUTE}/api-gateway/delete-saved-list-item`;

export const SOCIAL_MEDIA_LOGIN = `${GATEWAY_API_ROUTE}/api-gateway/login-using-social`;
export const REQUERY_ORDER = `${GATEWAY_API_ROUTE}/api-gateway/requery-order`;

export const GET_ORDER_DETAILS = `${GATEWAY_API_ROUTE}/api-gateway/get-order-details`;
export const GET_PENDING_PROD_RATING_BY_CUSTOMER = `${GATEWAY_API_ROUTE}/api-gateway/requery-order`;

export const KONLINE_CALLBACK_PARAM = "?origin=online";
