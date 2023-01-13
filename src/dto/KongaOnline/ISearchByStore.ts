import IPagination from "./IPagination";
import IProduct from "./IProduct";

interface ISearchByStore {
  pagination: IPagination;
  products: Array<IProduct>;
}

export default ISearchByStore;
