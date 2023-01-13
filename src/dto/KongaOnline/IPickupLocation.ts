interface IPickupLocation {
  name: string;
  id: number;
  carrier_id: number;
  lga_id: number;
  lga: string;
  is_active: boolean;
  is_pickup_location: boolean;
  allow_pod: boolean;
  region_id: number;
  region: string;
  country_id: string;
  city: string;
  address: string;
  directions: string;
  landmark: string;
  phone: string;
}

export default IPickupLocation;
