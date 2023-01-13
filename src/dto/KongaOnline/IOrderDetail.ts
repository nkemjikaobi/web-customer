import IBillingInformation from "./IBillingInformation";
import IOrdersellerDetails from "./IOrdersellerDetails";
import IOrderSellerInformation from "./IOrderSellerInformation";
import IOrderShippingAddress from "./IOrderShippingAddress";
import ISubOrdersDetail from "./ISubOrdersDetail";

interface IOrderDetail {
  entity_id: string;
  entity: number;
  grand_total: string; // Grand total amount
  shipping_amount: string; // Shipping amount
  subtotal: string; // Subtotal of sub order
  shipping_description: string; // shipping description
  store_id: number; // store id
  customer_id: string; // customer id
  base_grand_total: string; // base grand total
  base_shipping_amount: string; // base_shipping_amount
  shipping_method: string; // shipping_method
  store_currency_code: string; // store currency code
  delivery_mode: string; // Delivery mode
  shipping_address: IOrderShippingAddress; // shipping address
  billing_address: IBillingInformation; // billing information
  payment: IOrderSellerInformation; // payment information
  order_seller_details: Array<IOrdersellerDetails>;
  items: Array<ISubOrdersDetail>;
}

export default IOrderDetail;
