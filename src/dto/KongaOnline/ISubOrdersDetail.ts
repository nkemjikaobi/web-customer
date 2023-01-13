interface ISubOrdersDetail {
  order_id: string; // Tracking id
  created_at: string; // order date
  mirakl_shop_id: string; // Merchant id
  product_id: number; // Unique ID of the product
  name: string; // Name of the product
  url_key: string; // Product URL
  stock: boolean; //Product availability
  qty_ordered: string; //  Quantity of item ordered
  base_original_price: string; // base original price
  base_price: string; // The base price
  original_price: string; // original price
  row_total: string; // row total
  image_url: string; // Product image URL
}

export default ISubOrdersDetail;
