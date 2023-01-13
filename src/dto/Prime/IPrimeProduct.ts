import ICustomOption from "./ICustomOption";

interface IPrimeProduct {
  sku: number;
  name: string;
  brand: string | null;
  description: string;
  short_description: string;
  image_thumbnail: string;
  image_thumbnail_path: string;
  image_full: string;
  images: Array<string>;
  product_type: string;
  status: number;
  price: number;
  original_price: number;
  weight: string;
  url_key: string;
  visibility: number;
  konga_fulfilment_type: string;
  has_after_sales_service: boolean;
  pickup: boolean;
  express_delivery: boolean;
  max_return_period: number;
  delivery_days: number;
  is_konga_prime: number;
  allow_installment: number;
  custom_options: ICustomOption;
}

export default IPrimeProduct;
