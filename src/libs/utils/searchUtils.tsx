import { searchAttributes } from "Helpers/SearchConstants";
import {
  isObjectEmpty,
  queryString,
  removeEmptyObjectKeys,
} from "libs/utils/utils";
import config from "Configurations/configurations";

/**
 * Helper to build the full path for a search query
 * @param {string} searchQuery [The search term]
 * @returns {string} [The built path]
 */

interface IGetSearchStateUrl {
  configure: any;
  page: any;
  range: any;
  refinementList: any;
  sortBy: any;
}

export const getSearchQueryURL = (searchQuery: string): string =>
  `/online-shopping/search?search=${encodeURIComponent(searchQuery)}`;

/**
 * Convert the search state to a query string
 * @param {Object} rawSearchState Search state object
 * @returns {String} Search state to URL
 */
export const getSearchStateURL = ({
  configure,
  page,
  range,
  refinementList,
  sortBy,
}: IGetSearchStateUrl): string => {
  const query = configure && configure.query;

  const searchState = {
    ...refinementList,
    query,
  };

  interface IUrlParams {
    sort?: any;
    page?: any;
    max?: any;
    min?: any;
    rating?: string;
  }

  const urlParams: IUrlParams | any = {};

  Object.keys(searchState).forEach((key: string) => {
    const mapping = searchAttributes[key];
    const mappingKey = mapping && mapping.urlKey;

    if (!mappingKey) return;

    const val = searchState[key];

    if (val) urlParams[mappingKey] = encodeURIComponent(val);
  });

  if (sortBy) {
    const sortIndex = sortBy.substring(
      config.general.algolia.indexes.mainProductIndex
    );
    urlParams.sort = sortIndex;
  }

  if (page > 1) urlParams.page = page;

  const priceRange = range && range.special_price;
  if (priceRange && priceRange.max) urlParams.max = priceRange.max;
  if (priceRange && priceRange.max) urlParams.min = priceRange.min;

  const ratingRange = range && range["rating.average_rating"];

  if (ratingRange && ratingRange.min) {
    urlParams.rating = `${ratingRange.min}-${ratingRange.max || 5}`;
  }

  const withoutFalseValues: any = removeEmptyObjectKeys(urlParams);

  return isObjectEmpty(withoutFalseValues)
    ? ""
    : `?${queryString.stringify(withoutFalseValues)}`;
};

export const getLastItemOfUrl = (thePath: any) =>
  thePath.substring(thePath.lastIndexOf("/") + 1);
