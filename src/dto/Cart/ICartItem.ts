import ICartProduct from "./ICartProduct";

interface ICartItem {
  can_ship: boolean;
  fulfilment_type: string;
  heavy_item_charge: number;
  products: Array<ICartProduct>;
}

export default ICartItem;
