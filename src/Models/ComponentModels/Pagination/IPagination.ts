interface IPagination {
  tatal_number_of_products: number;
  current_page: number;
  total_number_pages: number;
  total_number_product_per_pages: number;
  page: number;
  limit: number;
  total: number;
}

export default IPagination;
