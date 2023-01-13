import accounting from "accounting";
import SortByFilter from "Components/Filter/SortByFilter/sortByFilter";
import PaginationComponent from "Components/Pagination/pagination";
import ShoppingFilter from "Components/ShoppingFilter/shoppingFilter";
import IProduct from "dto/KongaOnline/IProduct";
import ISearchByStore from "dto/KongaOnline/ISearchByStore";
import MarketplaceService from "Http/Services/MarketplaceService";
import { composeClasses, getSanitizedHtml } from "libs/utils/utils";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./ProductListingComponent.module.scss";

import ProductListComponent from "./ProductListComponent";
import FilterSortCallerMobile from "./FilterSortCallerMobile/FilterSortCallerMobile";
import Icon from "Components/Icons";
import config from "../../../Configurations/configurations";

interface IProductListingComponent {
  banner: any;
  category?: string;
  currentLocation: string;
  searchedProducts?: Array<IProduct>;
  queryString?: string;
  pageCount?: number;
  totalNumberOfProducts?: number;
}

const ProductListingComponent: React.FunctionComponent<
  IProductListingComponent
> = (props: IProductListingComponent) => {
  const { category, currentLocation, queryString } = props;

  const [pageChangesCount, setPageChangesCount] = useState<number>();

  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [searchedProducts, setSearchedProducts] = useState<Array<IProduct>>([]);
  const [totalNumberOfProducts, setTotalNumberOfProducts] = useState<number>(0);
  const [isImageValid, setIsImageValid] = useState<boolean>(true);

  // pagination
  const [pageCount, setPageCount] = useState<number>(10);
  const [resetCounter, setResetCounter] = useState<boolean>(false);

  // set filter sortBy
  const [sortBy, setSortBy] = useState<string>("");

  // set price filter
  const [priceFilter, setPriceFilter] = useState<string>("");

  const checkIfImageIsValid = () => {
    setIsImageValid(false);
  };

  const makeApiCall = async (
    sortBy: any,
    pageNumber: number = MarketplaceService.PAGINATION_INIT,
    priceFilter?: any,
    ratings?: number
  ) => {
    const response = await MarketplaceService.GetProductsByCategory(
      category,
      MarketplaceService.STORE_ID,
      pageNumber,
      MarketplaceService.PAGINATION_LIMIT,
      null,
      queryString ?? "",
      null,
      sortBy,
      priceFilter,
      ratings
    );

    // handle the promise response
    handleApiCall(response);
  };

  const updateEntry = async (param: string) => {
    setSortBy(param);
    setResetCounter(true);
    makeApiCall(param);
  };

  const getProducts = async (
    categoryId: string
  ): Promise<ISearchByStore | null> => {
    if (categoryId.trim().length <= 0) return null;

    return MarketplaceService.GetProductsByCategory(
      categoryId,
      MarketplaceService.STORE_ID
    );
  };

  const handleApiCall: any = async (apiResponse: ISearchByStore | null) => {
    if (apiResponse !== null) {
      const result = await apiResponse;
      setSearchedProducts([]);
      result && result.products && setProducts(result.products);
      if (result && result.pagination) {
        result.pagination.tatal_number_of_products &&
          setTotalNumberOfProducts(result.pagination.tatal_number_of_products);
        result.pagination.total_number_product_per_pages &&
          setPageCount(result.pagination.total_number_pages);
      }

      setResetCounter(false);
    } else {
      console.log("An error occurred");
    }
  };

  const handlePriceFilter = async (param: any) => {
    setPriceFilter(param);
    makeApiCall(sortBy, 0, param);
  };

  const handleRatingsFilter = async (param: any) => {
    makeApiCall(sortBy, 0, priceFilter, param);
  };

  const onPageChange = (pageNumber: any) => {
    const counter = pageChangesCount ?? 0;

    if (counter > 0) {
      makeApiCall(sortBy, pageNumber);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setPageChangesCount(pageChangesCount ?? 0 + 1);
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted && category) {
      handleApiCall(getProducts(category));
    }
    return () => {
      mounted = false;
    };
  }, [category]);

  useEffect(() => {
    let mounted = true;

    if (mounted && props.searchedProducts) {
      setSearchedProducts(props.searchedProducts);
    }
    return () => {
      mounted = false;
    };
  }, [props.searchedProducts]);

  useEffect(() => {
    let mounted = true;

    if (mounted && props.pageCount) {
      setPageCount(props.pageCount);
    }
    return () => {
      mounted = false;
    };
  }, [props.pageCount]);

  useEffect(() => {
    let mounted = true;

    if (mounted && props.totalNumberOfProducts) {
      setTotalNumberOfProducts(props.totalNumberOfProducts);
    }
    return () => {
      mounted = false;
    };
  }, [props.totalNumberOfProducts]);

  const handleShowMobileFilter = () => {
    const target = document.getElementById("filter");
    target?.classList.remove(styles.tabletAndAboveOnly);
    target?.classList.remove(styles.filter);
    target?.classList.add(styles.mobileFilter);
  };

  const handleHideMobileFilter = () => {
    const target = document.getElementById("filter");
    target?.classList.remove(styles.mobileFilter);
    target?.classList.add(styles.tabletAndAboveOnly);
    target?.classList.add(styles.filter);
  };

  const handleClearAll = () => {
    window.location.reload();
  };

  return (
    <Fragment>
      <div className={styles.productListing_main}>
        <div
          className={composeClasses(styles.filter, styles.tabletAndAboveOnly)}
          id="filter"
        >
          <div
            className={composeClasses(styles.mobileFilterHeader, styles.fixed)}
            onClick={handleHideMobileFilter}
          >
            <Icon name="arrowLeft" />
            <span>Filter</span>
          </div>
          <ShoppingFilter
            starsFilter={handleRatingsFilter}
            updatePrice={handlePriceFilter}
          />
          <div className={styles.clearApply}>
            <div className={styles.clearAll} onClick={handleClearAll}>
              <span>Clear All</span>
            </div>
            <div className={styles.apply} onClick={handleHideMobileFilter}>
              <span>Apply</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {isImageValid && (
            <div>
              <img
                alt="category banner image"
                onError={() => checkIfImageIsValid()}
                src={`${config.images.cloudinaryBaseImageUrl}//image/upload/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/customcmsmenu/item/${props.banner}`}
              />
            </div>
          )}

          <div className={styles.content_mainContent}>
            <div className={styles.contentHeader}>
              <div
                className={composeClasses(
                  styles.quantityInfo,
                  styles.tabletAndAboveOnly
                )}
              >
                <h2
                  dangerouslySetInnerHTML={getSanitizedHtml(
                    currentLocation ?? ""
                  )}
                />
                <p>
                  {totalNumberOfProducts > 0
                    ? `-${accounting.formatNumber(
                        totalNumberOfProducts
                      )} Products`
                    : "No Product Found"}
                </p>
              </div>
              <div
                className={composeClasses(
                  styles.tabletAndAboveOnly,
                  styles.sortByFilter
                )}
              >
                <SortByFilter
                  currentCategory={category}
                  updateEntry={updateEntry}
                />
              </div>
            </div>
            <div className={styles.productList}>
              <ProductListComponent
                products={
                  searchedProducts.length > 0 ? searchedProducts : products
                }
              />
            </div>
            {pageCount > 20 && (
              <div className={styles.pagination}>
                <PaginationComponent
                  onPageChange={onPageChange}
                  pageCount={pageCount}
                  resetCounterListener={resetCounter}
                />
              </div>
            )}

            <div className={styles.mobileFilterSortCaller}>
              <FilterSortCallerMobile onShowFilter={handleShowMobileFilter} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ProductListingComponent.defaultProps = {
  category: "",
  searchedProducts: [],
  queryString: "",
  pageCount: 0,
  totalNumberOfProducts: 0,
};

export default ProductListingComponent;
