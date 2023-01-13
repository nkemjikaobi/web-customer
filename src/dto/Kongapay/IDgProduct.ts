interface IDgProduct {
  id: number;
  discount_id: number | null;
  product_id: number | null;
  image_url: string;
  name: string;
  sku: string;
  slug: string;
  surcharge: string;
}

export default IDgProduct;
