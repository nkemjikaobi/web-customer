import IOption from "./IOption";

interface IVariantAttribute {
  id?: number;
  code?: string;
  label?: string;
  options?: Array<IOption>;
}
export default IVariantAttribute;
