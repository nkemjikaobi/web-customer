import IOrderData from "./IOrderData";

interface IOrderHistory {
  paginate: any;
  data: Array<IOrderData>;
}

export default IOrderHistory;
