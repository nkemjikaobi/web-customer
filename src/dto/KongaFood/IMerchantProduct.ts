import IQuality from "dto/KongaOnline/IQuality";
import ISeller from "dto/KongaFood/ISeller";

export interface IMerchantProducts {
  sku: number;
  product_type: string;
  brand: null;
  description: string;
  name: string;
  price: number;
  image_thumbnail: string;
  original_price: number;
  special_price: number;
  images: null;
  seller: ISeller;
  product_rating: {
    quality: IQuality;
  };
}
