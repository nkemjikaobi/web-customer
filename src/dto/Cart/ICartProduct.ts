import ICartCategory from "./ICartCategory";
import ICartProductSeller from "./ICartProductSeller";

interface ICartProduct {
  seller: ICartProductSeller;
  product_id: number;
  sku: string;
  requested_quantity: number;
  min_sale_qty: number;
  max_sale_qty: number;
  name: string;
  small_image: string;
  available_quantity: number;
  weight: number;
  price: number;
  subtotal: number;
  is_konga_prime: number;
  type: string;
  brand: string;
  product_url: string;
  description: string;
  pickup: boolean;
  allow_installment: boolean;
  is_bulk: boolean;
  is_backorder: boolean;
  is_in_stock: boolean;
  allow_pod: boolean;
  sub_total: number;
  express_delivery: boolean;
  categories: any;
}

export default ICartProduct;
