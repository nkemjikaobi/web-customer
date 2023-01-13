import IUpdateOrderStatusData from "./IUpdateOrderStatusData";

interface IUpdateOrderStatus {
  status: string;
  data: IUpdateOrderStatusData;
  message: string;
}

export default IUpdateOrderStatus;
