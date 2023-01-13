/**
 * Routes to access the shopping Cart
 */

import { GATEWAY_API_ROUTE } from "./Authentication";

export const GET_CUSTOMER_ADDRESSES = `${GATEWAY_API_ROUTE}/api-gateway/get-customer-addresses`;

export const ADD_ITEM_TO_CART_URL = `${GATEWAY_API_ROUTE}/api-gateway/add-item-to-cart`;
export const ADD_CUSTOMER_ADDRESS_URL = `${GATEWAY_API_ROUTE}/api-gateway/create-customer-address`;
export const EDIT_CUSTOMER_ADDRESS_URL = `${GATEWAY_API_ROUTE}/api-gateway/update-customer-address`;
export const ADD_CUSTOMER_ADDRESS_TO_CART_URL = `${GATEWAY_API_ROUTE}/api-gateway/add-item-to-cart`;
export const PLACE_ORDER_URL = `${GATEWAY_API_ROUTE}/api-gateway/place-order`;

export const UPDATE_CART_ITEM_QTY_URL = `${GATEWAY_API_ROUTE}/api-gateway/update-cart-item-qty`;
export const GET_CART_URL = `${GATEWAY_API_ROUTE}/api-gateway/get-cart`;
export const SET_CART_ADDRESS_URL = `${GATEWAY_API_ROUTE}/api-gateway/set-address-for-cart`;
export const MERGE_CART_URL = `${GATEWAY_API_ROUTE}/api-gateway/merge-cart`;
export const APPLY_GIFT_CARD_URL = `${GATEWAY_API_ROUTE}/api-gateway/apply-gift-card`;

export const REMOVE_ITEM_FROM_CART_URL = `${GATEWAY_API_ROUTE}/api-gateway/remove-item-from-cart`;
export const ENABLE_CART_URL = `${GATEWAY_API_ROUTE}/api-gateway/enable-cart`;
export const DISABLE_CART_URL = `${GATEWAY_API_ROUTE}/api-gateway/disable-cart`;
export const REQUERY_PAYMENT_FOR_CART_URL = `${GATEWAY_API_ROUTE}/api-gateway/requery-order`;
