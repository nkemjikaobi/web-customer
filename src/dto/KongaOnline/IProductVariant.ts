import IOption from "./IOption";

interface IProductVariant {
  sku?: number;
  price?: number;
  special_price?: number;
  qty?: number;
  image_thumbnail_path?: string;
  image_path?: string;
  in_stock?: boolean;
  backorders?: boolean;
  options?: Array<IOption>;
}

export default IProductVariant;
