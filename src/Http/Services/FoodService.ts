/* eslint-disable max-len */
import IDeliveryState from "dto/KongaFood/IDeliveryState";
import IFoodDeliveryArea from "dto/KongaFood/IFoodDeliveryArea";
import IMerchantLocation from "dto/KongaFood/IMerchantLocation";
import axios from "Http/Interceptors/Request/AuthInterceptor";
import {
  GET_ALL_KONGA_FOOD_DELIVERY_AREAS_URL,
  GET_ALL_KONGA_FOOD_DELIVERY_STATES_URL,
  GET_MERCHANT_LOCATIONS_URL,
} from "Http/Routes/Food";
import ILocalGovernmentArea from "../../dto/KongaOnline/ILocalGovernmentArea";
import MarketplaceService from "./MarketplaceService";

class FoodService extends MarketplaceService {
  public static STORE_ID = 3;
  public static CATEGORY = "";
  public static PAGINATION_INIT = 0;
  public static PAGINATION_LIMIT = 10;
  public static FIRST_INDEX = 0;

  /**
   * Method to fetch local government area in a state
   * @returns lgas Promise<Array<ILocalGovernmentArea>>
   */
  public static GetLocalGovernmentArea = async (
    state_id: number
  ): Promise<Array<ILocalGovernmentArea>> => {
    return MarketplaceService.GetLocalGovernmentArea(
      state_id,
      FoodService.STORE_ID
    );
  };

  /**
   * Method to get a list of states where food delivers to
   * @returns states Array<IDeliveryState>
   */
  public static GetAllKongaFoodDeliveryStates = async (): Promise<
    Array<IDeliveryState>
  > => {
    let states: Array<IDeliveryState> = [];
    try {
      const payload = {
        content: "delivery_state { region_id name country_id is_active }",
      };
      const {
        data: {
          data: {
            getAllKongaFoodDeliveryState: { delivery_state },
          },
        },
      } = await axios.post(GET_ALL_KONGA_FOOD_DELIVERY_STATES_URL, payload);
      states = delivery_state;
    } catch (error: any) {}
    return states;
  };

  /**
   * Service method to fetch the merchant locations
   * @param location lga
   * @returns locations Array<IMerchantLocation>
   */
  public static GetMerchantLocations = async (
    location: string
  ): Promise<Array<IMerchantLocation>> => {
    let locations: Array<IMerchantLocation> = [];
    const payload = {
      param: `merchant_location: "${location}",store_id: ${FoodService.STORE_ID}`,
      content:
        "merchants{id name logo banner url_key is_premium is_konga is_konga_food is_konga_drink city state average_delivery_time opening_time closing_time ratings {merchant_id seller_since quantity_sold quality {one_star two_star three_star four_star five_star average percentage} communication {one_star two_star three_star four_star five_star average percentage} delivery_percentage delivered_orders total_ratings} categories}",
    };
    try {
      const {
        data: {
          data: {
            getMerchantLocation: { merchants },
          },
        },
      } = await axios.post(GET_MERCHANT_LOCATIONS_URL, payload);
      locations = merchants;
    } catch (error: any) {}
    return locations;
  };

  /**
   * Method to get all food delivery areas
   * @param region_id: number
   * @returns results: <Array<IFoodDeliveryArea>>
   */
  public static GetAllFoodDeliveryAreas = async (
    region_id: number
  ): Promise<Array<IFoodDeliveryArea>> => {
    let results: Array<IFoodDeliveryArea> = [];
    const payload = {
      param: `region_id: ${region_id}`,
      content:
        "delivery_areas{ id delivery_location area area_id is_active region_id region country_id allow_pod }",
    };
    try {
      const {
        data: {
          data: {
            getAllKongaFoodDeliveryArea: { delivery_areas },
          },
        },
      } = await axios.post(GET_ALL_KONGA_FOOD_DELIVERY_AREAS_URL, payload);
      results = delivery_areas;
    } catch (error: any) {}
    return results;
  };

  public static areaToSlug = (area: string) =>
    area
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "_") // Replace spaces with _
      .replace(/\+/g, "_") // Replace all - with _
      .replace(/[^\w\/]+/g, "") // Remove all non-word chars
      .replace(/[\/]+/g, "-") // Replace / with -
      .replace(/\_\_+/g, "_") // Replace multiple _ with single _
      .replace(/^_+/, "") // Trim _ from start of text
      .replace(/_+$/, ""); // Trim _ from end of text

  public static SlugToArea = (slug: string) => {
    const areaSplit = slug.split("_");
    return areaSplit[0]
      .replace(/[\-]+/g, "/")
      .concat(" ", "(", areaSplit[1], ")");
  };
}

export default FoodService;
