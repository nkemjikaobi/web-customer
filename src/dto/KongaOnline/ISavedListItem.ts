import IProduct from "./IProduct";

interface ISavedListItem {
  sku?: number;
  created_at?: string;
  product?: IProduct;
}

export default ISavedListItem;
