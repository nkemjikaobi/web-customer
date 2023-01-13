import ICustomOptionValue from "./ICustomOptionValue";

interface ICustomOption {
  sort_order: string;
  values: Array<ICustomOptionValue>;
}

export default ICustomOption;
