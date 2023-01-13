import IMarketplaceCustomerDetail from "./IMarketplaceCustomerDetail";

interface ISocialLoginResponse {
  token: string;
  customer: IMarketplaceCustomerDetail;
}

export default ISocialLoginResponse;
