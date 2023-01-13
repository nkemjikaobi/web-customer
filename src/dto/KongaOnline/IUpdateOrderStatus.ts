interface IUpdateOrderStatus {
  status?: string;
  data?: IUpdateOrderStatusData;
  message?: string;
}
interface IUpdateOrderStatusData {
  payment_reference?: string;
  increment_id?: string;
  order_id?: string;
  cart_id?: string;
}

export default IUpdateOrderStatus;
