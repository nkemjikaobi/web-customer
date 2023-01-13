interface ITransactionsResponsePagination {
  total_items: number;
  limit: number;
  first: number;
  previous: number;
  current: number;
  next: number;
  last: number;
}

export default ITransactionsResponsePagination;
