import ICartAlert from "./ICartAlert";
import ICartAmount from "./ICartAmount";
import ICartItem from "./ICartItem";

interface IMarketplaceCart {
  alertMessage?: ICartAlert | null;
  id?: number;
  cart_id?: number;
  coupon_code?: string | null;
  messages?: Array<string> | null;
  giftcard_codes?: Array<string>;
  items?: Array<ICartItem>;
  shipping_address?: any;
  amounts?: Array<ICartAmount>;
}

export default IMarketplaceCart;
