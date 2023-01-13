import ICardDiscountType from "./ICardDiscountType";

interface ICreatedOrderKongapayGateway {
  merchant_id: string;
  hash: string;
  amount: number;
  discount: ICardDiscountType;
}

export default ICreatedOrderKongapayGateway;
