import IQuality from "./IQuality";
import ISeller from "./ISeller";
import INavbarProductCategory from "./INavbarProductCategory";
import IVariant from "./IVariant";
import IFrontendAttribute from "./IFrontendAttribute";
import IProductReviews from "./IProductReviews";

export interface IProductRating {
  quality: IQuality;
  total_ratings: number;
  communication?: any;
}

interface IProduct {
  sku: number;
  name: string;
  price: number;
  id?: any;
  special_price?: any;
  original_price?: any;
  image_thumbnail?: any;
  image_thumbnail_path: string;
  seller: ISeller;
  product_rating?: IProductRating;
  product_reviews?: Array<IProductReviews>;
  images?: any;
  is_pay_on_delivery: boolean;
  parent_sku?: number | null;
  brand: string | null;
  description: string;
  short_description?: string;
  image_full?: string;
  product_type: string;
  status?: number;
  final_price?: any;
  deal_price?: number | null;
  weight?: number;
  product_weight?: number | null;
  url_key: string;
  stock?: any;
  pickup?: boolean;
  express_delivery?: boolean;
  is_free_shipping?: boolean;
  has_after_sales_service?: boolean;
  konga_fulfilment_type?: string;
  warehouseLocationRegions?: any;
  warehouse_location_regions?: any;
  is_official_store_product?: number;
  isYakata?: boolean;
  categories?: Array<INavbarProductCategory>;
  image?: string | null;
  variants?: IVariant;
  frontend_attributes?: Array<IFrontendAttribute>;
  product_extras?: any;
  open_store?: boolean;
}

export default IProduct;
