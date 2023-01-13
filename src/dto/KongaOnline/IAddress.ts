import IAddressArea from "./IAddressArea";
import IAddressCountry from "./IAddressCountry";
import IAddressRegion from "./IAddressRegion";

interface IAddress {
  id: number;
  firstname: string;
  lastname: string;
  is_active: boolean;
  telephone: string;
  country: IAddressCountry | null;
  region: IAddressRegion | null;
  city: string;
  area: IAddressArea | null;
  postcode: string;
  street: string;
  landmark: string;
  is_default: string;
  email?: string;
}

export default IAddress;
