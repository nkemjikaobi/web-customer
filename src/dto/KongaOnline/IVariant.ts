import IProductVariant from "./IProductVariant";
import IVariantAttribute from "./IVariantAttribute";

interface IVariant {
  attributes?: Array<IVariantAttribute>;
  products?: Array<IProductVariant>;
}

export default IVariant;
