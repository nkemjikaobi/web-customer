import IOptionAttributeParam from "dto/KongaOnline/IOptionAttributeParam";

interface IMarketplaceCartForm {
  cart_id: any;
  store_id?: number;
  product: any;
  quantity: number;
  options?: any;
  attributes?: Array<IOptionAttributeParam>;
}

export default IMarketplaceCartForm;
