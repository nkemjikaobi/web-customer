interface ICategory {
  category_id: string;
  image: string;
  banner?: any;
  icon_image?: string;
  name: string;
  url_key: string;
  children: Array<ICategory>;
  alt_image_id?: string;
  position?: number;
}

export default ICategory;
