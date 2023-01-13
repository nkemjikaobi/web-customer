import IProduct from "dto/KongaOnline/IProduct";

interface ICmsMenuCategory {
  category_id: number;
  icon_image?: string;
  parent_id: number;
  name: string;
  url: string;
  url_key: string;
  image: string;
  banner: string;
  banner_link: string;
  is_active: boolean;
  level: number;
  position: number;
  column_count: number;
  description: string;
  small_image: string;
  cover_image: string;
  children: Array<ICmsMenuCategory>;
  products: Array<IProduct>;
}

export default ICmsMenuCategory;
