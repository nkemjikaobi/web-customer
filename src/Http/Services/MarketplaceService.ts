/* eslint-disable max-len */
import ICategory from "dto/KongaOnline/ICategory";
import ICategorySku from "dto/KongaOnline/ICategorySku";
import IDeal from "dto/KongaOnline/IDeal";
import IDealProduct from "dto/KongaOnline/IDealProduct";
import ILocalGovernmentArea from "dto/KongaOnline/ILocalGovernmentArea";
import IMarketplaceCustomerDetail from "dto/KongaOnline/IMarketplaceCustomerDetail";
import IPickupLocation from "dto/KongaOnline/IPickupLocation";
import IProduct from "dto/KongaOnline/IProduct";
import IMerchantStore from "dto/KongaOnline/IMerchantStore";
import ISearchByStore from "dto/KongaOnline/ISearchByStore";
import ISponsoredProduct from "dto/KongaOnline/ISponsoredProduct";
import IState from "dto/KongaOnline/IState";
import IBrand from "dto/KongaOnline/IBrand";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import {
  GET_ALL_CATEGORIES_URL,
  GET_BEST_SELLING_PRODUCTS_URL,
  GET_CUSTOMERS_DETAILS_URL,
  GET_LOCAL_GOVERNMENT_AREAS,
  GET_PICKUP_LOCATIONS,
  GET_PRODUCTS_BY_CATEGORY_URL,
  GET_RECOMMENDED_PRODUCTS_URL,
  GET_RECENTLY_VIEWED_PRODUCTS_URL,
  GET_STATES,
  GET_SPONSORED_PRODUCTS_URL,
  GET_DEALS_URL,
  GET_BRAND_INFO,
  GET_INSPIRED_BY_YOUR_CART_RCOMMENDATIONS_URL,
  GET_SAVED_LIST_URL,
  ADD_ITEM_TO_SAVED_LIST_URL,
  DELETE_ITEM_FROM_SAVED_LIST_URL,
  GET_PRODUCTS_BY_URL_OR_ID,
  SOCIAL_MEDIA_LOGIN,
  GET_MERCHANT_WITH_URL_KEY,
  REQUERY_ORDER,
  GET_ORDER_HISTORY_URL,
  GET_PENDING_PROD_RATING_BY_CUSTOMER,
  GET_ORDER_DETAILS,
  GET_CANCEL_ORDER_REASONS_URL,
  CANCEL_ORDER,
} from "Http/Routes/Marketplace";
import AuthService from "./AuthService";
import HttpService from "./HttpService";

import ICmsMenuCategory from "dto/KongaFood/ICmsMenuCategory";
import { GET_CMS_MENU_BY_STORE_ID } from "Http/Routes/Food";
import ISavedList from "dto/KongaOnline/ISavedList";
import ISocialLoginResponse from "dto/KongaOnline/ISocialLoginResponse";
import { RECOMBI_HOME_PAGE } from "Helpers/Constants";
import IAddItemToSavedList from "dto/KongaOnline/IAddItemToSavedList";
import IUpdateOrderStatus from "dto/Cart/IUpdateOrderStatus";
import IOrderHistory from "dto/KongaOnline/IOrderHistory";
import IPendingProductReviewType from "dto/KongaOnline/IPendingProductReviewType";
import IOrderDetail from "dto/KongaOnline/IOrderDetail";
import ICancelOrderReason from "dto/KongaOnline/ICancelOrderReason";

class MarketplaceService extends HttpService {
  public static STORE_ID = 1;
  public static FOOD_STORE_ID = 3;
  public static PAGINATION_INIT = 0;
  public static PAGINATION_LIMIT = 20;

  /**
   * Methdo to handle transaction requery
   * @param store_id: number
   * @param transaction_id: string
   * @param response_code: string
   * @param response_desc: string
   * @returns response: updateOrderStatus
   */
  public static RequeryOrder = async (
    store_id: number,
    transaction_id?: string,
    response_code?: string,
    response_desc?: string
  ): Promise<IUpdateOrderStatus | null> => {
    const headers = await AuthService.SetRequestHeaders(store_id, false, true);

    let payloadParam = "";

    if (transaction_id) {
      payloadParam = `${payloadParam}, transaction_id=${transaction_id}`;
    }

    if (response_code) {
      payloadParam = `${payloadParam}, response_code:${response_code}`;
    }

    if (response_desc) {
      payloadParam = `${payloadParam}, response_desc:${response_desc}`;
    }

    const payload = {
      param: payloadParam,
      content:
        "status data { payment_reference increment_id order_id cart_id } message",
    };

    let response = null;

    try {
      const {
        data: {
          data: { updateOrderStatus },
        },
      } = await axios.post(REQUERY_ORDER, payload, { headers });

      response = updateOrderStatus;
    } catch (exception: unknown) {}

    return response;
  };

  /**
   * Method to fetch all the products by category
   * @param category
   * @param queryToSearch
   * @returns result ISearchByStore | null
   */
  public static GetProductsByCategory = async (
    category?: string | number,
    store_id: number = MarketplaceService.STORE_ID,
    paginatePage: number = MarketplaceService.PAGINATION_INIT,
    paginateLimit: number = MarketplaceService.PAGINATION_LIMIT,
    seller_id?: number | null,
    queryToSearch = "",
    brand_name?: string | null,
    sort_by?: string | null,
    numericFilters?: string,
    ratings?: number
  ): Promise<ISearchByStore | null> => {
    let searchResult: ISearchByStore | null = null;
    let search_term: Array<string> = [];
    if (category) {
      search_term = [...search_term, `"category.category_id:${category}"`];
    }
    if (seller_id) {
      search_term = [...search_term, `"seller.id:${seller_id}"`];
    }
    if (brand_name) {
      search_term = [...search_term, `"attributes.brand:${brand_name}"`];
    }

    if (ratings) {
      search_term = [...search_term, `"rating.average_rating:${ratings}"`];
    }

    sort_by = sort_by ? sort_by : "";

    const numericFilter = numericFilters ? numericFilters : "";

    const payload = {
      param: `search_term: [${search_term.join(
        ", "
      )}], paginate: {page: ${paginatePage}, limit: ${paginateLimit}}, numericFilters: [${numericFilter}], sortBy: "${sort_by}", filters: "", query: "${queryToSearch}", store_id: ${store_id}`,
      content:
        "pagination { tatal_number_of_products current_page total_number_pages total_number_product_per_pages page limit total} products { sku express_delivery product_type brand description name price image_thumbnail original_price special_price images seller { id name banner average_delivery_time opening_time closing_time url url_key } product_extras { title is_require type options { option_id option_name option_price option_type_id } } categories{ id name url_key }  product_rating{ quality { one_star two_star three_star four_star five_star average percentage number_of_ratings } total_ratings } }",
    };

    try {
      const products = await axios.post(GET_PRODUCTS_BY_CATEGORY_URL, payload);
      searchResult = products.data.data.searchByStore;
    } catch (error: any) {}
    return searchResult;
  };

  /**
   * Method to get all the categories
   * @returns result ICategory[]
   */
  public static GetAllCategories = async (): Promise<Array<ICategory>> => {
    try {
      const {
        data: { data },
      } = await axios.post(GET_ALL_CATEGORIES_URL, {
        param: "max_level: 3",
        content:
          // eslint-disable-next-line max-len
          "category_id image parent_id name is_active position url_key level image children { image category_id parent_id name is_active position url_key level image children { category_id parent_id name is_active position url_key level image children { category_id parent_id  name is_active position url_key level image} }}",
      });
      return data.getCategoryMenu.children[0].children;
    } catch (error: any) {
      return [];
    }
  };

  /**
   * Method to get all the recently viewed products by the customer
   * @returns products IProduct[]
   */
  public static GetRecentlyViewedProducts = async (
    placement?: string,
    num?: number,
    guest?: string,
    context?: { products: number }
  ): Promise<Array<IProduct>> => {
    let response: Array<IProduct> = [];
    const placement_payload = [];
    if (num) placement_payload.push(`num: ${num}`);
    if (guest) placement_payload.push(`guest: "${guest}"`);
    if (context) placement_payload.push(`context: "${context}"`);
    if (placement) placement_payload.push(`placement: "${placement}"`);
    const payload = {
      param: `${placement_payload.join(", ")}`,
      content:
        "placement{ reference } products {sku express_delivery parent_sku name brand description short_description image_thumbnail image_thumbnail_path image_full images product_type status price special_price original_price final_price deal_price weight product_weight url_key is_official_store_product}",
    };
    try {
      const {
        data: {
          data: { recentlyViewedProducts },
        },
      } = await axios.post(GET_RECENTLY_VIEWED_PRODUCTS_URL, payload);
      response = recentlyViewedProducts ?? [];
    } catch (error: any) {}
    return response;
  };

  /**
   * Method to get all the best selling products
   * @returns products IProduct[]
   */
  public static GetBestSellingProducts = async (): Promise<Array<IProduct>> => {
    try {
      const payload = {
        limit: 10,
        content:
          "sku express_delivery parent_sku name brand description short_description image_thumbnail image_thumbnail_path image_full images product_type status price special_price original_price final_price deal_price weight product_weight url_key visibility new_from_date new_to_date konga_fulfilment_type is_free_shipping is_pay_on_delivery has_after_sales_service pickup express_delivery special_from_date special_to_date max_return_period delivery_days is_official_store_product",
      };
      const { data } = await axios.post(GET_BEST_SELLING_PRODUCTS_URL, payload);
      return data.data.getBestSellingProducts ?? [];
    } catch (error: any) {
      return [];
    }
  };

  /**
   * Method to get merchant with url key
   * @returns merchantDetails IMerchantStore[]
   */
  public static GetMerchantWithUrlKey = async (
    urlKey: string
  ): Promise<IMerchantStore | null> => {
    try {
      const payload = {
        url_key: `"${urlKey}"`,
        content:
          "vendor_id name logo banner url_key city state shop_description latitude longitude is_premium is_konga_merchant rating { merchant_id seller_since quantity_sold quality { one_star two_star three_star four_star five_star average percentage number_of_ratings } communication { one_star two_star three_star four_star five_star average percentage number_of_ratings} delivery_percentage delivered_orders total_ratings} is_official_store",
      };
      const { data } = await axios.post(GET_MERCHANT_WITH_URL_KEY, payload);
      return data.data.getMerchantWithUrlKey ?? null;
    } catch (error: any) {
      return null;
    }
  };

  /**
   * Method to get all the sponsored products
   * @returns products IProduct[]
   */
  public static GetSponsoredProducts = async (): Promise<
    Array<ISponsoredProduct>
  > => {
    try {
      const { data } = await axios.get(GET_SPONSORED_PRODUCTS_URL);
      return data.data.products ?? [];
    } catch (error: any) {
      return [];
    }
  };

  /**
   * Method to fetch cancel order reasons before cancelling an order
   * @returns reasons Promise<Array<ICancelOrderReason>>
   */
  public static GetCancelOrderReasons = async (): Promise<
    Array<ICancelOrderReason>
  > => {
    const payload = {
      content: "cancelOrderReasonsList { status label total }",
    };
    let response: Array<ICancelOrderReason> = [];
    try {
      const {
        data: {
          data: {
            cancelOrderReasons: { cancelOrderReasonsList },
          },
        },
      } = await axios.post(GET_CANCEL_ORDER_REASONS_URL, payload);
      response = cancelOrderReasonsList;
    } catch (error: any) {}
    return response;
  };

  /**
   * Method to cancel an order<string>
   */

  /**
   * Method to retrieve recommended products for the user
   * @returns recommended_products Array<IProduct>
   */
  public static GetRecommendedProducts = async (
    product_id?: number,
    user?: number,
    pageCount = 6,
    placement = RECOMBI_HOME_PAGE
  ): Promise<Array<IProduct>> => {
    let recommended_products: Array<IProduct> = [];

    let param = `placement: "${placement}", num: ${pageCount}`;

    if (product_id) {
      param = `${param}, context: { products: [ ${product_id} ] }`;
    }

    if (user) {
      param = `${param}, user:${user}`;
    } else {
      param = `${param}, guest: "acdt5"`;
    }

    const payload = {
      param: `${param}`,
      content:
        "products {sku express_delivery parent_sku name brand description short_description image_thumbnail image_thumbnail_path image_full images product_type status price special_price original_price final_price product_rating{ quality { one_star two_star three_star four_star five_star average percentage number_of_ratings } total_ratings } deal_price weight product_weight url_key is_official_store_product seller { id name } }",
    };
    try {
      const {
        data: {
          data: { recommendations: products },
        },
      } = await axios.post(GET_RECOMMENDED_PRODUCTS_URL, payload);
      recommended_products = products.products;
    } catch (error: any) {}
    return recommended_products;
  };

  /**
   * Method to cancel an order<string>
   */
  public static CancelOrder = async (
    order_number: string,
    status: string,
    comment: string
  ): Promise<string> => {
    const headers = await AuthService.SetRequestHeaders(
      MarketplaceService.STORE_ID,
      false,
      true
    );

    const payload = {
      param: `order_number: "${order_number}", status: "${status}", comment: "${comment}"`,
      content: "ok",
    };
    let response: any;
    try {
      const {
        data: {
          data: { cancelOrder },
        },
      } = await axios.post(CANCEL_ORDER, payload, {
        headers,
      });
      response = cancelOrder;
    } catch (error: any) {}
    return response;
  };

  /**
   * Method to fetch states in nigeria
   * @returns states Promise<Array<IState>>
   */
  public static GetStates = async (): Promise<Array<IState>> => {
    const payload = {
      param: `country: "${"NG"}", paginate: { offset: 1, limit: 37 }`,
      content: "pagination { offset limit total } data { id name}",
    };
    let response: Array<IState> = [];
    try {
      const {
        data: {
          data: {
            states: { data },
          },
        },
      } = await axios.post(GET_STATES, payload);
      response = data;
    } catch (error: any) {}
    return response;
  };

  /**
   * Method to fetch local government area in a state
   * @returns lgas Promise<Array<ILocalGovernmentArea>>
   */
  public static GetLocalGovernmentArea = async (
    state_id: number,
    store_id: number = MarketplaceService.STORE_ID
  ): Promise<Array<ILocalGovernmentArea>> => {
    const payload = {
      param: `state_id: ${state_id}, store_id: ${store_id}, paginate: { offset: 0, limit: 50 }`,
      content: "pagination { offset limit total } data { id name}",
    };
    let response: Array<ILocalGovernmentArea> = [];
    try {
      const {
        data: {
          data: { lgas },
        },
      } = await axios.post(GET_LOCAL_GOVERNMENT_AREAS, payload);
      response = lgas.data;
    } catch (error: any) {}
    return response;
  };

  /**
   * get pickup locations
   *
   * @param pod: boolean
   * @param active: boolean
   * @param lga_id: number
   * @param region_id: number
   * @param state_id: number
   * @param pagination: number
   *
   * @returns locations Array<IPickupLocation>
   */
  public static GetPickupLocations = async (
    lga_id?: number,
    pod?: boolean,
    active?: boolean,
    region_id?: number,
    state_id?: number
  ): Promise<Array<IPickupLocation>> => {
    const holders = ["pagination: {page: 1, pageSize:1}"];

    if (pod) holders.push(`pod: ${pod}`);
    if (active !== undefined) holders.push(`active: ${active}`);
    if (lga_id) holders.push(`lga_id: ${lga_id}`);
    if (region_id) holders.push(`region_id: ${region_id}`);
    if (state_id) holders.push(`state_id: ${state_id}`);

    const payload = {
      param: holders.join(", "),
      content:
        "data { name id carrier_id lga_id lga is_active is_pickup_location allow_pod region_id region country_id city address directions landmark phone }",
    };
    let locations: Array<IPickupLocation> = [];

    try {
      const {
        data: {
          data: {
            getPickupLocations: { data },
          },
        },
      } = await axios.post(GET_PICKUP_LOCATIONS, payload);
      locations = data;
    } catch (err) {}

    return locations;
  };

  /**
   * Method to get customer details from konga online / marketplace
   * @returns customerDetails : IMarketplaceCustomerDetail | null
   */
  public static GetCustomerDetails =
    async (): Promise<IMarketplaceCustomerDetail | null> => {
      const headers = await AuthService.SetRequestHeaders(
        MarketplaceService.STORE_ID,
        false,
        true
      );
      const payload = {
        content:
          "id email username group_id created_at updated_at is_active has_yudala_account is_konga_prime_customer is_b2b is_b2b_admin is_b2b_staff_member firstname lastname verification_status { is_verified phone_number } konga_prime_data { customer_id website_id store_id amount base_currency_code is_active created_at updated_at product_id option_id duration region_id orders_available orders_used weight_limit} addresses { id firstname lastname is_active telephone country { id name} region { id name} city area { id name} postcode street landmark is_default created_at updated_at}",
      };
      let customerDetails: IMarketplaceCustomerDetail | null = null;
      try {
        const {
          data: {
            data: { getCustomerDetails },
          },
        } = await axios.post(GET_CUSTOMERS_DETAILS_URL, payload, { headers });
        customerDetails = getCustomerDetails;
      } catch (error: any) {}
      return customerDetails;
    };

  /**
   * Method to extract the category name and sku from a URL Key
   * @param url_key: string
   * @returns ICategorySku
   */
  public static ExtractCategoryNameFromURLKey = (
    url_key: string
  ): ICategorySku => {
    // example of url_key: "microsoft-office-365-for-business-5-users-lifetime-5238764"
    const key = url_key.toLowerCase().split("-");
    const category = key.slice(0, -1).join("-");
    const sku = parseInt(key.slice(-1)[0]);
    return { category: category, sku: sku };
  };

  /**
   * Method for the service call to fetch deals
   *
   * @returns deal: IDeal
   */
  public static GetDeals = async (): Promise<IDeal | null> => {
    let deal: IDeal | null = null;
    const payload = {
      content:
        "sliders { title filename image_alt image_text link link_target ga_event_tracking ga_event_category ga_event_action} top_categories { title filename image_alt image_text link link_target ga_event_tracking ga_event_category ga_event_action} top_offers { product_id name price final_price  brand image deal_timeto qty_sold deal_qty percent_off sold_percent url_key pickup } mid_sliders { title filename image_alt image_text link link_target ga_event_tracking ga_event_category ga_event_action} web_sliders { title filename image_alt image_text link link_target ga_event_tracking ga_event_category ga_event_action } top_offer { product_id name price final_price brand image deal_timeto qty_sold deal_qty percent_off sold_percent url_key pickup}",
    };
    try {
      const {
        data: {
          data: { cms },
        },
      } = await axios.post(GET_DEALS_URL, payload);
      deal = cms;
    } catch (error: any) {}
    return deal;
  };

  /**
   * Method to convert from an ISponsoredProduct to an IProduct
   * @param oldProduct: ISponsoredProduct
   * @returns product IProduct
   */
  public static ConvertISponsoredProductToIProduct = (
    oldProduct: ISponsoredProduct
  ): IProduct => {
    let url = "";
    if (oldProduct && oldProduct.name) {
      try {
        url = oldProduct.name
          .toLowerCase()
          .replaceAll("-", " ")
          .trim()
          .replaceAll(" ", "-");
      } catch (error: any) {}
    }
    return {
      brand: "",
      description: "",
      product_type: "",
      sku: oldProduct.skuId,
      url_key: url,
      image_thumbnail_path: oldProduct.imageUrl,
      name: oldProduct.name,
      price: oldProduct.salePrice ?? oldProduct.mrp,
      special_price: oldProduct.salePrice,
      original_price: oldProduct.mrp,
      is_pay_on_delivery: false,
      seller: {
        id: oldProduct.sellerId,
        name: oldProduct.soldBy,
        banner: "",
      },
    };
  };

  /**
   * Method to convert from an IDealProduct to an IProduct
   * @param oldProduct: IDealProduct
   * @returns product IProduct
   */
  public static ConvertIDealProductToIProduct = (
    oldProduct: IDealProduct
  ): IProduct => ({
    brand: oldProduct.brand,
    url_key: oldProduct.url_key,
    description: "",
    product_type: "",
    sku: parseInt(oldProduct.product_id),
    image: oldProduct.image,
    image_thumbnail_path: oldProduct.image,
    name: oldProduct.name,
    price: oldProduct.final_price ?? oldProduct.price,
    original_price: oldProduct.price,
    special_price: oldProduct.final_price,
    is_pay_on_delivery: oldProduct.pickup,
    seller: {
      id: 0,
      name: "",
      banner: "",
    },
  });

  /**
   * Method to get brands data
   * @returns states Promise<Array<IState>>
   */
  public static GetBrandData = async (
    url_key: string | null
  ): Promise<IBrand | null> => {
    const payload = {
      url_key: `${url_key}`,
    };
    let brandDetails: IBrand | null = null;
    try {
      const {
        data: { data },
      } = await axios.post(GET_BRAND_INFO, payload);
      brandDetails = data.getBrandWithUrlKey;
    } catch (error: any) {}
    return brandDetails;
  };

  /**
   * Method to get recommendations for a
   * customer based on his/her cart.
   *
   * @param placement: string
   * @param num: number
   * @param guest: string
   * @param context: { products: number }
   * @returns response: Array<IProduct>
   */
  public static GetInspiredByYourCartRecommendation = async (
    placement?: string,
    num?: number,
    guest?: string,
    context?: { products: number }
  ): Promise<Array<IProduct>> => {
    let response: Array<IProduct> = [];
    const placement_payload = [];
    if (num) placement_payload.push(`num: ${num}`);
    if (guest) placement_payload.push(`guest: "${guest}"`);
    if (context) placement_payload.push(`context: "${context}"`);
    if (placement) placement_payload.push(`placement: "${placement}"`);
    const payload = {
      param: `${placement_payload.join(", ")}`,
      content:
        "placement{ reference } products {sku express_delivery parent_sku name brand description short_description image_thumbnail image_thumbnail_path image_full images product_type status price special_price original_price final_price deal_price weight product_weight url_key is_official_store_product}",
    };
    try {
      const {
        data: {
          data: { inspiredByYourCartRecommendations },
        },
      } = await axios.post(
        GET_INSPIRED_BY_YOUR_CART_RCOMMENDATIONS_URL,
        payload
      );
      response = inspiredByYourCartRecommendations ?? [];
    } catch (error: any) {}
    return response;
  };

  /**
   * Method to get the content management service menu by store id
   * @param store_id: number
   * @returns results: Array<ICmsMenuCategory>
   */
  public static GetCMSMenuByStoreId = async (
    store_id: number = MarketplaceService.STORE_ID
  ): Promise<Array<ICmsMenuCategory>> => {
    let results: Array<ICmsMenuCategory> = [];
    const payload = {
      store_id: `${store_id}`,
      content:
        "categories { category_id banner_link banner icon_image image parent_id name is_active position url_key level image children { image banner_link banner icon_image category_id parent_id name is_active position url_key level image children { category_id banner banner_link icon_image parent_id name is_active position url_key level image children { category_id banner banner_link parent_id icon_image name is_active position url_key level image} }} }",
    };
    try {
      const {
        data: {
          data: {
            getCmsMenuByStoreId: { categories },
          },
        },
      } = await axios.post(GET_CMS_MENU_BY_STORE_ID, payload);
      results = categories;
    } catch (error: any) {}
    return results;
  };

  /**
   * Method to get all the saved items
   * @param listId: number
   * @param store_id: string
   *
   * @returns response: Array<ISavedList>
   */
  public static GetSavedList = async (
    listId = "default",
    store_id = MarketplaceService.STORE_ID
  ): Promise<ISavedList | undefined> => {
    let response: ISavedList | undefined = undefined;
    const headers = await AuthService.SetRequestHeaders(store_id, false, true);
    const payload = {
      list_id: `"${listId}"`,
      content:
        "id name created_at items { sku created_at product { sku express_delivery parent_sku name brand description short_description image_thumbnail image_thumbnail_path image_full images product_type status price special_price original_price final_price deal_price url_key seller { id name url url_key } objectID product_id store_id}}",
    };

    try {
      const {
        data: {
          data: { getSavedList },
        },
      } = await axios.post(GET_SAVED_LIST_URL, payload, { headers });
      response = getSavedList ?? undefined;
    } catch (error: any) {}

    return response;
  };

  /**
   * Method to add Item to saved list
   * @param listId: string
   * @param item_id: string
   * @returns response: <IAddItemToSavedList>
   */
  public static addItemToSavedList = async (
    listId = "default",
    item_id: number | null | string
  ): Promise<IAddItemToSavedList> => {
    let response: any;
    const headers = await AuthService.SetRequestHeaders(
      MarketplaceService.STORE_ID,
      false,
      true
    );
    const payload = {
      param: `list_id:"${listId}", item_id: "${item_id}"`,
      content:
        "sku parent_sku name brand description seller { id name banner url url_key} price short_description image_thumbnail image_thumbnail_path image_full images pickup",
    };

    try {
      const {
        data: {
          data: { addItemToSavedList },
        },
      } = await axios.post(ADD_ITEM_TO_SAVED_LIST_URL, payload, { headers });
      response = addItemToSavedList ?? null;
    } catch (error: unknown) {}
    return response;
  };

  /**
   * Method to delete saved list Item
   * @param listId: string
   * @param itemId: number
   * @returns response: <IAddItemToSavedList>
   */
  public static deleteSavedListItem = async (
    listId = "default",
    itemId: number | null
  ): Promise<IAddItemToSavedList> => {
    let response: any;
    const headers = await AuthService.SetRequestHeaders(
      MarketplaceService.STORE_ID,
      false,
      true
    );
    const payload = {
      param: `id: "${listId}", itemId: ${itemId}`,
      content:
        "id name created_at items { sku created_at product { sku parent_sku name brand description seller { id name banner url url_key} price short_description image_thumbnail image_thumbnail_path image_full images pickup }}",
    };

    try {
      const {
        data: {
          data: { deleteSavedListItem },
        },
      } = await axios.post(DELETE_ITEM_FROM_SAVED_LIST_URL, payload, {
        headers,
      });
      response = deleteSavedListItem ?? null;
    } catch (error: unknown) {}
    return response;
  };

  /**
   * Method to fetch a product by its id or url
   * @param identifier: string - product id or product url
   * @param isId: boolean - if it is the product id or url, the default is product id.
   * @returns products: Array<IPRoduct>
   */
  public static GetProductByUrlOrID = async (
    identifier: string,
    isId = true
  ): Promise<IProduct | null> => {
    let response: IProduct | null = null;
    const param = isId ? `product_id: ${identifier}` : `url_key: ${identifier}`;

    const payload = {
      param,
      // eslint-disable-next-line prettier/prettier
      content: `sku
      parent_sku
      is_pay_on_delivery
      name
      brand
      description
      short_description
      image_thumbnail
      image_thumbnail_path
      image_full
      images
      product_type
      status
      price
      special_price
      original_price
      final_price
      deal_price
      weight
      product_weight
      url_key
      categories {
        id
        name
        url_key
        position
      }
      visibility
      new_from_date
      new_to_date
      konga_fulfilment_type
      is_free_shipping
      is_pay_on_delivery
      has_after_sales_service
      pickup
      seller {
        id
        name
        banner
        url
        url_key
        is_premium
        is_konga
        is_konga_food
        is_konga_drink
        city
        state
        country
        phone_number
        email
        area
        average_delivery_time
        opening_time
        closing_time
        longitude
        latitude
        categories
        ratings {
          merchant_id
          seller_since
          quantity_sold
          quality {
            one_star
            two_star
            three_star
            four_star
            five_star
            average
            percentage
            number_of_ratings
          }
          communication {
            one_star
            two_star
            three_star
            four_star
            five_star
            average
            percentage
            number_of_ratings
          }
          delivery_percentage
          delivered_orders
          total_ratings
        }
      }
      frontend_attributes {
        attribute_label
        attribute_value
      }
      frontend_attribute_groups {
        group_id
        group_name
        frontend_attributes {
          attribute_label
          attribute_value
        }
      }
      variants {
        attributes {
          id
          code
          label
          options {
            code
            id
            value
          }
        }
        products {
          sku
          price
          special_price
          qty
          image_thumbnail_path
          image_path
          in_stock
          backorders
          options {
            code
            id
            value
          }
        }
      }
      stock {
        in_stock
        quantity
        quantity_sold
        min_sale_qty
        max_sale_qty
        backorders
      }
      warranty {
        has_warranty
        text
        period
      }
      product_rating {
        quality {
          one_star
          two_star
          three_star
          four_star
          five_star
          average
          percentage
          number_of_ratings
        }
        communication {
          one_star
          two_star
          three_star
          four_star
          five_star
          average
          percentage
          number_of_ratings
        }
        delivery_percentage
        delivered_orders
        total_ratings
      }
      product_reviews {
        merchant_id
        quality_rating
        communication_rating
        customer_id
        customer_name
        comment
        created_at
        status
        rating_id
        source
      }
      express_delivery
      special_from_date
      special_to_date
      max_return_period
      delivery_days
      shipping {
        country {
          code
          name
        }
        region {
          id
          name
        }
        city {
          id
          name
        }
        area {
          id
          name
        }
      }
      pay_on_delivery {
        country {
          code
          name
        }
        region {
          id
          name
        }
        city {
          id
          name
        }
        area {
          id
          name
        }
      }
      is_konga_prime
      is_bulk
      allow_installment
      custom_options {
        option_id
        product_id
        type
        is_require
        sku
        max_characters
        file_extension
        image_size_x
        image_size_y
        sort_order
        default_title
        store_title
        title
        default_price
        default_price_type
        store_price
        store_price_type
        price
        price_type
        values {
          option_type_id
          option_id
          sku
          sort_order
          default_price
          default_price_type
          store_price
          store_price_type
          price
          price_type
          default_title
          store_title
          title
        }
      }
      objectID
      product_id
      store_id
      warehouse_location_regions {
        availability_locations
      }
      is_official_store_product`,
      // "sku parent_sku is_pay_on_delivery  name brand description short_description image_thumbnail image_thumbnail_path image_full images product_type status price special_price original_price final_price deal_price weight product_weight url_key categories {id name url_key position} visibility new_from_date new_to_date konga_fulfilment_type is_free_shipping is_pay_on_delivery has_after_sales_service pickup seller { id name banner url url_key is_premium is_konga is_konga_food is_konga_drink city state country phone_number email area average_delivery_time opening_time closing_time longitude latitude ratings {merchant_id seller_since quantity_sold quality {one_star two_star three_star four_star five_star average percentage number_of_ratings}communication {one_star two_star three_star four_star five_star average percentage number_of_ratings}delivery_percentage delivered_orders total_ratings}categories}frontend_attributes { attribute_label attribute_value}frontend_attribute_groups {group_id group_name frontend_attributes {attribute_label attribute_value}}variants { attributes {id code label options {code id value}}products {sku price special_price qty image_thumbnail_path image_path in_stock backorders options { code id value }}}stock { in_stock quantity quantity_sold min_sale_qty max_sale_qty backorders}warranty { has_warranty text period} product_rating{ quality { one_star two_star three_star four_star five_star average percentage number_of_ratings } total_ratings } communication {one_star two_star three_star four_star five_star average percentage number_of_ratings}delivery_percentage delivered_orders total_ratings}product_reviews {merchant_id quality_rating communication_rating customer_id customer_name comment created_at status rating_id source}express_delivery special_from_date special_to_date max_return_period delivery_days shipping {country { code name}region {id name}city {id name}area {id name}}pay_on_delivery {country {code name}region {id name}city {id name}area {id name}}is_konga_prime is_bulk allow_installment custom_options {option_id product_id type is_require sku max_characters file_extension image_size_x image_size_y sort_order default_title store_title title default_price default_price_type store_price store_price_type price price_type values { option_type_id option_id sku sort_order default_price default_price_type store_price store_price_type price price_type default_title store_title title }} objectID product_id store_id warehouse_location_regions {availability_locations} is_official_store_product",
    };

    try {
      const {
        data: {
          data: { product },
        },
      } = await axios.post(GET_PRODUCTS_BY_URL_OR_ID, payload);
      response = product;
    } catch (error: any) {}

    return response;
  };

  /**
   * Method to authenticate the user via social media
   * @param token: string - OAuth token provided to the client by the social network
   * @param loginType: string - Social login type: facebook, google.
   * @returns retult: ISocialLoginResponse
   */
  public static AuthViaSocialMedia = async (
    token: string,
    loginType: string
  ): Promise<ISocialLoginResponse | null> => {
    let result: ISocialLoginResponse | null = null;
    const payload = {
      param: `token: "${token}", loginType: "${loginType}"`,
      content:
        "token customer { id email username group_id is_active firstname lastname verification_status{ is_verified phone_number }}",
    };

    try {
      const {
        data: { data },
      } = await axios.post(SOCIAL_MEDIA_LOGIN, payload);
      result = data;
    } catch (err: any) {}
    return result;
  };

  /**
   * Method to filter and map / format - menu dataset
   * @param dataset - Array<any>
   * @returns Array<any>
   */
  public static SortCMSMenuByStoreId = (
    dataset: Array<any>
  ): Array<ICategory> =>
    dataset
      .filter((category: ICategory) => {
        // get only categories with sub categories
        if (category.children.length > 0) {
          return category;
        }
      })
      .filter((category: ICategory) => {
        // get categories that have names
        const reg = category.name.trim().match(/\w+/g);
        if (reg && reg.length > 0) {
          return category;
        }
      })
      .map((category: ICategory) => {
        const reg = category.name.trim().match(/\w+/g);
        if (reg) {
          const split = reg
            .map((text: string) => text.toLocaleLowerCase())
            .join("-");
          category.alt_image_id = `/images/landingPage/${split}.svg`;
        }
        return category;
      });

  /**
   * Method to fetch the order ids for a customer based on store id
   * @param storeId: number - store id to query for.
   * @returns response: any
   */
  public static GetOrderHistory = async (
    storeId: number
  ): Promise<IOrderHistory | null> => {
    const headers = await AuthService.SetRequestHeaders(storeId, false, true);
    const payload = {
      param: `paginate: {offset: 1, limit: 10 }, store_id: ${storeId}`,
      // eslint-disable-next-line prettier/prettier
      content:
        "data{ created_at grand_total parent_id parent_status sub_orders{ can_customer_cancel estimated_delivery_date grand_total is_order_in_shipped_state items{ can_customer_return image name product_id quantity row_total stock url_key } merchant{ is_konga seller_email seller_name shop_id} order_caption order_id order_message payment_methods shipment_time_left_in_days shipment_updated_at shipping_address{ city country_id firstname lastname region street} shipping_amount status status_label status_time_frame status_time_unit}} paginate{ limit offset total}",
    };
    let response: IOrderHistory | null = null;

    try {
      const {
        data: {
          data: { orderHistory },
        },
      } = await axios.post(GET_ORDER_HISTORY_URL, payload, {
        headers: headers,
      });

      response = orderHistory;
    } catch (error: unknown) {}
    return response;
  };

  /**
   * Method to get the product ratings by customer
   *
   * @param customer_id: number - the customer's id
   * @param store_id: number - the store which is being requested for
   *
   * @return response: Promise<Array<IPendingProductReviewType>>
   */
  public static getPendingProductRatingsByCustomer = async (
    customer_id: number,
    store_id: number = MarketplaceService.STORE_ID
  ): Promise<Array<IPendingProductReviewType>> => {
    const headers = AuthService.CreateMagenttoHeaders();
    const payload = {
      param: `customer_id: ${customer_id}, store_id: ${store_id}`,
      content: `pendingProducts {
        product_id {
          sku
          parent_sku
          name
          brand
          description
          short_description
        }
        order_id
        created_at
      }`,
    };

    let response: Array<IPendingProductReviewType> = [];

    try {
      const {
        data: {
          data: { PendingProductReviewList },
        },
      } = await axios.post(GET_PENDING_PROD_RATING_BY_CUSTOMER, payload, {
        headers,
      });
      response = PendingProductReviewList;
    } catch (exception: unknown) {}

    return response;
  };

  /**
   * Method to get the details of an order
   * @param order_id: number - the order's id
   * @param store_id: number - the store which is being requested for
   *
   * @return response: Promise<Array<IPendingProductReviewType>>
   */
  public static getOrderDetails = async (
    order_id: string,
    store_id: number = MarketplaceService.STORE_ID
  ): Promise<Array<IOrderDetail>> => {
    const headers = AuthService.CreateMagenttoHeaders();
    const payload = {
      param: `orderId: "${order_id}", store_id: ${store_id}`,
      content: `entity_id
        grand_total
        shipping_amount
        subtotal
        shipping_description
        store_id
        customer_id
        base_grand_total
        base_shipping_amount
        shipping_method
        store_currency_code
        delivery_mode
        shipping_address {
          entity_id
          street
          firstname
          lastname
          landmark
        }
        status
        billing_address {
          telephone
        }
        payment {
          amount_ordered
          base_amount_ordered
          method
        }
        order_seller_details {
          product_id
          name
          seller
          seller_id
          quantity
          row_total
        }
        items {
          base_original_price
          base_price
          created_at
          qty_ordered
          row_total
          order_id
          mirakl_shop_id
          product_id
          order_id
          name
          url_key
          image_url
        }`,
    };

    let response: Array<IOrderDetail> = [];

    try {
      const {
        data: {
          data: { getOrderDetails },
        },
      } = await axios.post(GET_ORDER_DETAILS, payload, { headers });
      response = getOrderDetails;
    } catch (exception: unknown) {}

    return response;
  };
}

export default MarketplaceService;
