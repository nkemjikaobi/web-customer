interface IBrand {
  id: number;
  name: string;
  url_key?: string | null;
  image_url?: string | null;
  active?: string | null;
  description?: string | null;
}

export default IBrand;
