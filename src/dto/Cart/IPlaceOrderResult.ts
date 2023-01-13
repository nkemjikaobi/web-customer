import ICreatedOrderKongapay from "./ICreatedOrderKongapay";
import ICreatedOrderKongapayGateway from "./ICreatedOrderKongapayGateway";

interface IPlaceOrderResult {
  grand_total: number;
  order_id: string;
  oid: string;
  qid: number;
  kongapay: ICreatedOrderKongapay;
  kpaygateway: ICreatedOrderKongapayGateway;
}

export default IPlaceOrderResult;
