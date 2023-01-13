interface ISeller {
  id: number;
  name: string;
  banner: string | null;
  phone_number?: string | null;
  url?: string | null;
  url_key?: any;
  average_delivery_time?: string | null;
  opening_time?: string | null;
  closing_time?: string | null;
}

export default ISeller;
