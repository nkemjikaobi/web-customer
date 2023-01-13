import IProduct from "./IProduct";

interface IPendingProductReviewType {
  product: IProduct;
  order_id: string;
  created_at: string;
}

export default IPendingProductReviewType;
