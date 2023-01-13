interface IAddItemToSavedList {
  id: number;
  created_at: string;
  items: any;
  sku: number;
  brand: string | null;
  description: string;
  image_full: string;
  image_thumbnail: string;
  image_thumbnail_path: string;
  images: Array<string>;
  name: string;
  parent_sku: any;
  pickup: boolean;
  short_description: string | null;
}

export default IAddItemToSavedList;
