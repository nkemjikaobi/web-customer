interface IDealProduct {
  product_id: string;
  name: string;
  price: number;
  final_price: number;
  brand: string;
  image: string;
  deal_timeto: Date;
  qty_sold: number;
  deal_qty: number;
  percent_off: number;
  sold_percent: number;
  url_key: string;
  pickup: boolean;
}

export default IDealProduct;
