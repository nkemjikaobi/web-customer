import IDealProduct from "./IDealProduct";

export interface IDealItem {
  title: string;
  filename: string;
  image_alt: string;
  image_text: string | null;
  link: string;
  link_target: string | null;
  ga_event_tracking: string | null;
  ga_event_category: string | null;
  ga_event_action: string | null;
}

interface IDeal {
  sliders: Array<IDealItem>;
  top_categories: Array<IDealItem>;
  top_offers: Array<IDealProduct>;
  mid_sliders: Array<IDealItem>;
  web_sliders: Array<IDealItem>;
  top_offer: IDealProduct;
}

export default IDeal;
