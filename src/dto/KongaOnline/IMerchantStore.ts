export interface IMerchantStoreRating {
  merchant_id: number;
  seller_since: string;
  quantity_sold: number;
  quality: {
    one_star: number;
    two_star: number;
    three_star: number;
    four_star: number;
    five_star: number;
    average: number;
    percentage: number;
    number_of_ratings: number;
  };
  communication: {
    one_star: number;
    two_star: number;
    three_star: number;
    four_star: number;
    five_star: number;
    average: number;
    percentage: number;
    number_of_ratings: number;
  };
  delivery_percentage: number;
  delivered_orders: number;
  total_ratings: number;
}

interface IMerchantStore {
  name: string;
  logo: string | null;
  banner: string | null;
  url_key: string;
  is_premium: boolean;
  is_konga_merchant: boolean;
  is_official_store: number;
  vendor_id: string | null;
  rating: IMerchantStoreRating;
}

export default IMerchantStore;
