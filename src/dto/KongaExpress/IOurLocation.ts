import ILocalGovernmentArea from "./ILocalGovernmentArea";
import IState from "./IState";

interface IOurLocation {
  id: number;
  location_type_id: number;
  name: string;
  alternate_name: string;
  address: string;
  city: string;
  lga_id: number;
  state_id: number;
  phone: string;
  user_supervisor_id: number;
  location_code: string;
  internal_location: number;
  is_pickup_location: number;
  franchise_id: number;
  can_deliver: number;
  assurance_notification_enabled: number;
  assurance_grace_period: number;
  assurance_notification_email: string;
  auto_closed_service_max: number;
  deleted: number;
  courier_id: number;
  location_type: string;
  active: number;
  is_public: number;
  secondary_phone: string;
  email: string;
  longitude: number | null;
  latitude: number | null;
  can_pickup: number;
  can_ingest: number;
  gps_coordinates: number | null;
  services: Array<string>;
  lga: ILocalGovernmentArea;
  state: IState;
}

export default IOurLocation;
