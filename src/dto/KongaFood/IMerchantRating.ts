import IMerchantCommunication from "./IMerchantCommunication";
import IMerchantQuality from "./IMerchantQuality";

interface IMerchantRating {
  merchant_id: number;
  seller_since: number;
  quantity_sold: number;
  quality: IMerchantQuality;
  communication: IMerchantCommunication;
  delivery_percentage: number;
  delivered_orders: number;
  total_ratings: number;
}

export default IMerchantRating;
