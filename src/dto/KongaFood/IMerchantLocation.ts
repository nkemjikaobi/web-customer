import IMerchantRating from "./IMerchantRating";

interface IMerchantLocation {
  id: number;
  name: string;
  logo: string | null;
  banner: string;
  url_key: string;
  is_premium: boolean;
  is_konga: string | null;
  is_konga_food: string | null;
  is_konga_drink: string | null;
  city: number | null;
  state: number | null;
  average_delivery_time: string;
  ratings: IMerchantRating;
  categories: [];
}

export default IMerchantLocation;
