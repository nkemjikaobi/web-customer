export interface IFormData {
  period: number;
  amount: number;
  product_code: string;
  identifier: string;
}
export interface IFormDataTransactionPin extends IFormData {
  tnxPin: string;
}
export interface IFormDataOTP extends IFormData {
  use_only_otp: number;
}

interface ICompleteOrderRequestType {
  form_id: number;
  last_step: boolean;
  provider_product_id: number;
  quantity: number;
  sku: string;
  step: number;
  form_data: IFormDataOTP | IFormDataTransactionPin;
}

export interface ICompleteOrderRequestParams {
  guest_vending: number;
  guest_paid: number;
  form_data: any;
  order_response: any;
}

export default ICompleteOrderRequestType;
