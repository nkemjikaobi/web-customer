import IUpdateCartAttribute from "./IUpdateCartAttribute";

interface IUpdateCartItemQty {
  cart_id: number;
  sku: number;
  qty: number;
  attributes?: IUpdateCartAttribute;
}

export default IUpdateCartItemQty;
