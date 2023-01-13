/* eslint-disable no-undef */
/**
 * File holding all authentication Routes as a constant
 */

import config from "Configurations/configurations";

export const GATEWAY_API_ROUTE = config.api.GatewayRoute;

// Authentication - Routes
export const LOGIN_URL = `${GATEWAY_API_ROUTE}/aggregate/call/login`;
export const REGISTRATION_URL = `${GATEWAY_API_ROUTE}/sso/signup`;
export const FORGOT_PASSWORD_URL = `${GATEWAY_API_ROUTE}/sso/forgot-password `;
export const GET_WALLET_BALANCE = `${GATEWAY_API_ROUTE}/kpay/wallet-balance`;
export const GET_MAGENTTO_TOKEN_URL = `${GATEWAY_API_ROUTE}/api-gateway/get-auth-token`;
export const RESET_PASSWORD_URL = (request_id: string): string =>
  `${GATEWAY_API_ROUTE}/sso/reset-password/?request_id=${request_id}`;
export const VERIFY_TOKEN_PASSWORD_URL = `${GATEWAY_API_ROUTE}/sso/verify-otp`;
