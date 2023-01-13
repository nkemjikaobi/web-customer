import config from "Configurations/configurations";
import IPayViaKongapaySdk from "dto/Cart/IPayViaKongapaySdk";
import IUpdateOrderStatus from "dto/Cart/IUpdateOrderStatus";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import { REQUERY_PAYMENT_FOR_CART_URL } from "Http/Routes/Cart";
import { FUND_WALLET_URL, SEND_MONEY_URL } from "Http/Routes/Kpay";
import AuthService from "./AuthService";
import IFundWalletInit from "dto/Kongapay/IFundWalletInit";
import ISendMoneyInit from "dto/Kongapay/ISendMoneyInit";
import ICompleteOrderRequestType from "dto/Kongapay/ICompleteOrderRequestType";

class PaymentService {
  /**
   * Method to pay via konga payment sdk
   * @param sdkConfig: IPayViaKongapaySdk
   * @ - amount number
   * @ -  customerEmail string
   * @ -  customerFirstname string
   * @ -  customerLastname string
   * @ -  customerTelephone string
   * @returns void
   */
  public static PayViaKongapaySdk = (sdkConfig: IPayViaKongapaySdk): void => {
    const paymentConfiguration: IPayViaKongapaySdk = {
      ...sdkConfig,
      amount: sdkConfig.amount * 100, // Amount should be in Kobo
      mode: config.sdk.mode || "test",
      enableFrame: config.sdk.iframeEnabled || true,
    };

    const win = window as any;
    if (win.KPG) {
      win.KPG.setup(paymentConfiguration);
      win.transactionCB = PaymentService.TransactionCallback;
    }
  };

  public static TransactionCallback = async (
    error: any,
    data: any
  ): Promise<boolean> => {
    let response = false;
    if (data) {
      try {
        const orderId = await PaymentService.RequeryPayment(data);
        response = true;
      } catch (error: any) {}
    }
    return response;
  };

  /**
   * Method to call the payment gateway to requery payment status
   * @param transaction_id: string
   * @param response_code: string
   * @param response_desc: string
   * @returns response: IUpdateOrderStatus
   */
  public static RequeryPayment = async (
    transaction_id: string,
    response_code = "",
    response_desc = ""
  ): Promise<IUpdateOrderStatus> => {
    let response = null;
    const headers = await AuthService.CreateTempHeaders();
    const payload = {
      param: `transaction_id: "${transaction_id}" ${
        response_code ? ", response_desc: " + response_code : ""
      } ${response_desc ? ", response_desc: " + response_desc : ""}`,
      content:
        "status data { payment_reference increment_id order_id cart_id } message",
    };
    try {
      const {
        data: {
          data: { requeryOrder },
        },
      } = await axios.post(REQUERY_PAYMENT_FOR_CART_URL, payload, {
        headers,
      });
      response = requeryOrder;
    } catch (error: any) {}
    return response;
  };

  /**
   * Method to fund a customer's wallet
   * @param payload: IFundWalletInit - payload holding the amount and reference
   * @returns response: any - response from the fund wallet api endpoint.
   */
  public static FundWallet = async (payload: IFundWalletInit): Promise<any> => {
    let response = null;
    const headers = await AuthService.CreateTempHeaders();
    try {
      const { data } = await axios.post(FUND_WALLET_URL, payload, { headers });
      response = data;
    } catch (error: unknown) {}
    return response;
  };

  /**
   * Method to fund a customer's wallet
   * @param payload: ISendMoneyInit - payload holding the amount and reference
   * @returns response: any - response from the fund wallet api endpoint.
   */
  public static SendMoney = async (payload: ISendMoneyInit): Promise<any> => {
    let response = null;
    const headers = await AuthService.CreateTempHeaders();
    try {
      const { data } = await axios.post(SEND_MONEY_URL, payload, { headers });
      response = data;
    } catch (error: unknown) {}
    return response;
  };

  /**
   *
   * Method to format the complete order re
   * @param payload any - the payload sent from the request
   * @param responseData - the response from the validate customer call
   * @param mobileNumber - the customer's mobile number
   * @returns formattedCompleteOrder ICompleteOrderRequestType
   */
  public static FormatCompleteOrder = (
    payload: any,
    responseData: any,
    mobileNumber: string
  ): ICompleteOrderRequestType => {
    let productCode = "";
    try {
      productCode = responseData["form_elements"]["product_code"]["value"];
      if (productCode === null) {
        productCode = payload.productCode;
      }
    } catch (error: any) {
      productCode = responseData["product_code"];
    }
    const loggedIn = AuthService.GetLoggedInUser();
    const data: any = {
      form_id: responseData["form_id"],
      last_step: responseData["last_step"] ? 1 : 0,
      provider_product_id: responseData["provider_product_id"]
        ? responseData["provider_product_id"]
        : payload["operator"]["product_id"],
      quantity: 1,
      sku: payload["operator"]["sku"],
      step: responseData["step"],
    };
    const formData: any = {
      period: responseData["period"] || 1,
      amount: payload["amount"] | payload["amountTotal"],
      product_code: productCode,
      service_type: productCode,
      identifier: mobileNumber,
    };

    if (payload["phoneNumber"]) formData["phone"] = payload["phoneNumber"];

    if (loggedIn) {
      formData.use_only_otp = 1;
    } else {
      data.guest_vending = 1;
    }
    return {
      ...data,
      form_data: formData,
    };
  };
}

export default PaymentService;
