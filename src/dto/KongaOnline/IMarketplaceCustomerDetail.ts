import IAddress from "./IAddress";
import IMarketplaceKongaPrimeData from "./IMarketplaceKongaPrimeData";
import IMarketplaceVerificationStatus from "./IMarketplaceVerificationStatus";

interface IMarketplaceCustomerDetail {
  id: number;
  email: string;
  username: string;
  group_id: string;
  created_at: string;
  updated_at: string;
  is_active: string;
  has_yudala_account: boolean;
  is_konga_prime_customer: string;
  is_b2b: string;
  is_b2b_admin: string;
  is_b2b_staff_member: string;
  firstname: string;
  lastname: string;
  verification_status: IMarketplaceVerificationStatus;
  konga_prime_data: IMarketplaceKongaPrimeData;
  addresses: Array<IAddress>;
}

export default IMarketplaceCustomerDetail;
