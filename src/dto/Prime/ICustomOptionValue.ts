interface ICustomOptionValue {
  option_type_id: number;
  option_id: number;
  sku: number;
  sort_order: string;
  default_price: number;
  default_price_type: string;
  store_price: number;
  store_price_type: string;
  price: number;
  price_type: string;
  default_title: string;
  store_title: string;
  title: string;
}

export default ICustomOptionValue;
