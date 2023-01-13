import ITransaction from "./ITransaction";
import ITransactionsResponsePagination from "./ITransactionsResponsePagination";

interface ITransactionsResponse {
  items: Array<ITransaction>;
  pagination: ITransactionsResponsePagination;
}

export default ITransactionsResponse;
