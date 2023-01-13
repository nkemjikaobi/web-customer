/* eslint-disable max-len */
import IProduct from "dto/KongaOnline/IProduct";
import IPrimeProduct from "dto/Prime/IPrimeProduct";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import { GET_ALL_PRIME_PRODUCTS, GET_PRODUCT_BY_ID } from "Http/Routes/Prime";
import HttpService from "./HttpService";

class PrimeService extends HttpService {
  /**
   * Method to get all the prime products
   * @returns primeProducts - Array<IPrimeProduct>
   */
  public static GetAllPrimeProducts = async () => {
    let primeProducts: Array<IPrimeProduct> = [];
    try {
      const {
        data: {
          data: { getAllPrimeProducts },
        },
      } = await axios.post(GET_ALL_PRIME_PRODUCTS);
      primeProducts = getAllPrimeProducts;
    } catch (error: any) {}
    return primeProducts;
  };

  /**
   * Method to get a product by its id
   * @param product_id number
   * @param url_key? string
   * @returns response Iproduct | null
   */
  public static GetProduct = async (
    product_id: number,
    url_key?: string
  ): Promise<IProduct | null> => {
    const payload = {
      param: `product_id: ${product_id} ${
        url_key ? ", url_key: " + url_key : ""
      }`,
      content:
        "sku parent_sku name brand description short_description image_thumbnail image_thumbnail_path image_full images product_type status price special_price original_price final_price deal_price weight product_weight url_key categories {id name url_key position} visibility new_from_date new_to_date konga_fulfilment_type is_free_shipping is_pay_on_delivery has_after_sales_service pickup seller { id name banner url url_key is_premium is_konga is_konga_food is_konga_drink city state country phone_number email area average_delivery_time opening_time closing_time longitude latitude ratings {merchant_id seller_since quantity_sold quality {one_star two_star three_star four_star five_star average percentage number_of_ratings}communication {one_star two_star three_star four_star five_star average percentage number_of_ratings}delivery_percentage delivered_orders total_ratings}categories}frontend_attributes { attribute_label attribute_value}frontend_attribute_groups {group_id group_name frontend_attributes {attribute_label attribute_value}}variants { attributes {id code label options {code id value}}products {sku price special_price qty image_thumbnail_path image_path in_stock backorders options { code id value }}}stock { in_stock quantity quantity_sold min_sale_qty max_sale_qty backorders}warranty { has_warranty text period}product_rating {quality {one_star two_star three_star four_star five_star average percentage number_of_ratings}communication {one_star two_star three_star four_star five_star average percentage number_of_ratings}delivery_percentage delivered_orders total_ratings}product_reviews {merchant_id quality_rating communication_rating customer_id customer_name comment created_at status rating_id source}express_delivery special_from_date special_to_date max_return_period delivery_days shipping {country { code name}region {id name}city {id name}area {id name}}pay_on_delivery {country {code name}region {id name}city {id name}area {id name}}is_konga_prime is_bulk allow_installment custom_options {option_id product_id type is_require sku max_characters file_extension image_size_x image_size_y sort_order default_title store_title title default_price default_price_type store_price store_price_type price price_type values { option_type_id option_id sku sort_order default_price default_price_type store_price store_price_type price price_type default_title store_title title }} objectID product_id store_id warehouse_location_regions { availability_locations } is_official_store_product",
    };

    let response: IProduct | null = null;
    try {
      const {
        data: {
          data: { product },
        },
      } = await axios.post(GET_PRODUCT_BY_ID, payload);
      response = product;
    } catch (error: any) {}
    return response;
  };
}

export default PrimeService;
