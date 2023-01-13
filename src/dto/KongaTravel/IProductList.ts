/* eslint-disable @typescript-eslint/ban-types */
interface IProductList {
  direction: string;
  origin: string;
  destination: string;
  price: number;
  class_type: string;
  date: string;
  return_date: string;
  traveler_type: string;
  traveler_number: string;
  adult_count: string;
  child_count: string;
  infant_count: string;
  image?: string;
}

export default IProductList;
