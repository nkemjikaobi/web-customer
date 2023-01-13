interface IFoodDeliveryArea {
  id: number;
  delivery_location: string;
  area: string;
  area_id: number;
  region: string;
  region_id: number;
  country_id: number | null;
  is_active: number;
  allow_pod: number;
}

export default IFoodDeliveryArea;
