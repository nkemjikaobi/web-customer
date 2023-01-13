import IGetBankAcctNameQuery from "dto/Kongapay/IGetBankAcctNameQuery";
import { GATEWAY_API_ROUTE } from "./Authentication";

/**
 * File holding all Konga Pay Routes as a constant
 */
export const VALIDATE_CUSTOMER_URL = `${GATEWAY_API_ROUTE}/kpay/verify-dg-customer`;
export const COMPLETE_ORDER_URL = `${GATEWAY_API_ROUTE}/kpay/complete-order`;
export const VALIDATE_OTP = `${GATEWAY_API_ROUTE}/kpay/validate-token`;
export const GET_BANKS_URL = `${GATEWAY_API_ROUTE}/kpay/get-banks?status=active`;
export const GET_ACCT_NAME_FROM_BANK_URL = (
  payload: IGetBankAcctNameQuery
): string =>
  `${GATEWAY_API_ROUTE}/kpay/get-account-name-from-bank?account_number=${payload.account_number}&bank_id=${payload.bank_id}`;
export const GET_ACCT_NAME_FROM_KP_URL = (phoneNumber: string): string =>
  `${GATEWAY_API_ROUTE}/kpay/get-account-name-from-kongaPay?user=${phoneNumber}`;

export const FUND_WALLET_URL = `${GATEWAY_API_ROUTE}/kpay/fund-wallet`;
export const SEND_MONEY_URL = `${GATEWAY_API_ROUTE}/kpay/payout`;

export const LOAD_PRODUCTS_BY_CATEGORY = (category: string): string =>
  `${GATEWAY_API_ROUTE}/kpay/get-products-by-category?category=${category}`;

export const BANK_TRANSFER_URL = `${GATEWAY_API_ROUTE}/kpay/bank-transfer`;
export const WALLET_TRANSFER_URL = `${GATEWAY_API_ROUTE}/kpay/wallet-transfer`;

export const TRANSACTIONS_URL = `${GATEWAY_API_ROUTE}/kpay/get-wallet-transactions`;
export const USER_ACCOUNTS_URL = `${GATEWAY_API_ROUTE}/kpay/get-associated-accounts`;

export const GET_SAVED_BENEFICIARIES = `${GATEWAY_API_ROUTE}/kpay/get-beneficiaries`;

export const SAVE_BENEFICIARY = `${GATEWAY_API_ROUTE}/kpay/add-beneficiaries`;
