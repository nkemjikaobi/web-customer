import React, { Fragment, useEffect, useState } from "react";
import MarketplaceService from "Http/Services/MarketplaceService";
import IMerchantStore from "dto/KongaOnline/IMerchantStore";
import { composeClasses, getSanitizedHtml } from "libs/utils/utils";
import styles from "./merchantStore.module.scss";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import ShoppingFilter from "Components/ShoppingFilter/shoppingFilter";
import SortByFilter from "Components/Filter/SortByFilter/sortByFilter";
import PaginationComponent from "Components/Pagination/pagination";
import ServicesDataComponent from "PagesComponents/OnlineShopping/FilterPanel/ServicesDataComponent/ServicesDataComponent";
import BackgroundImg from "Assets/images/png/categoryBackgroundImg.png";
import CategoryListingCard from "Components/ProductCard/CategoryListingCard";
import IProduct from "dto/KongaOnline/IProduct";
import CategoryListPlaceholder from "Components/ProductCard/CategoryListPlaceholder";
import { range } from "lodash";
import ISearchByStore from "dto/KongaOnline/ISearchByStore";
import MerchantRatings from "./MerchantRatings/MerchantRatings";

const MerchantStore = () => {
  const [merchantDetails, setMerchantDetails] = useState<IMerchantStore | null>(
    null
  );
  const [vendorId, setVendorId] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>("");
  const [totalNumberOfProducts, setTotalNumberOfProducts] = useState<number>(0);
  const [productList, setProductList] = useState<any>();
  const [products, setProducts] = useState<Array<IProduct>>([]);
  // pagination
  const [pageCount, setPageCount] = useState<number>(10);
  const [resetCounter, setResetCounter] = useState<boolean>(false);

  // set filter sortBy
  const [sortBy, setSortBy] = useState<string>("");

  // set price filter
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [pageChangesCount, setPageChangesCount] = useState<number>();

  let merchantKey: string;

  useEffect(() => {
    let mounted = true;

    const url = window.location.href;
    const arrayOfUrlSegments = url.split("/");
    merchantKey = arrayOfUrlSegments[arrayOfUrlSegments.length - 1];

    if (mounted && merchantDetails === null) {
      (async () => {
        try {
          const response = await MarketplaceService.GetMerchantWithUrlKey(
            merchantKey
          );
          setMerchantDetails(response);
          setVendorId(response?.vendor_id);
          setCurrentLocation(response?.name);
        } catch (error) {
          console.log("Error", error);
        }
      })();
    }

    return () => {
      mounted = false;
    };
  }, [merchantDetails]);

  useEffect(() => {
    MarketplaceService.GetProductsByCategory(
      "",
      MarketplaceService.STORE_ID,
      MarketplaceService.PAGINATION_INIT,
      MarketplaceService.PAGINATION_LIMIT,
      vendorId,
      ""
    ).then((success: ISearchByStore | null): void => {
      if (success) {
        setProducts(success.products);
        setTotalNumberOfProducts(success.pagination.tatal_number_of_products);
      }
    });

    const tempProductList = range(10).map((index: number) => {
      return (
        <Fragment key={index}>
          <div className={styles.productCardWrapper}>
            <CategoryListPlaceholder key={index} />
          </div>
        </Fragment>
      );
    });
    setProductList(tempProductList);
    return () => {
      setCurrentLocation("");
    };
  }, [vendorId]);

  useEffect(() => {
    let mounted = products;
    if (mounted && products.length > 0) {
      const tempProductList = products.map(
        (product: IProduct, index: number) => {
          return (
            <Fragment key={index}>
              <div className={styles.productCardWrapper}>
                <CategoryListingCard
                  key={product.sku}
                  product={product}
                  store_id={MarketplaceService.STORE_ID}
                />
              </div>
            </Fragment>
          );
        }
      );
      setProductList(tempProductList);
    }

    return () => {
      mounted = [];
    };
  }, [products]);

  const makeApiCall = (
    sortBy: any,
    pageNumber: number = MarketplaceService.PAGINATION_INIT,
    priceFilter?: any,
    ratings?: number
  ) => {
    const response = MarketplaceService.GetProductsByCategory(
      "",
      MarketplaceService.STORE_ID,
      pageNumber,
      MarketplaceService.PAGINATION_LIMIT,
      vendorId,
      "",
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
    console.log({ param });
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

  const handleApiCall = (apiResponse: Promise<any>) => {
    apiResponse
      .then((searchByStore: ISearchByStore | null) => {
        if (searchByStore) {
          setProducts(searchByStore.products);
          setTotalNumberOfProducts(
            searchByStore.pagination.tatal_number_of_products
          );
          setPageCount(searchByStore.pagination.total_number_pages);
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        setResetCounter(false);
      });
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

  const breadCrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Online Shopping", Url: "/online-shopping" },
    { Text: currentLocation },
  ];
  return (
    <BasePageLayout
      breadcrumbs={breadCrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"yes"}
    >
      <div className={styles.productListing}>
        <div className={styles.heading}>
          <div
            className={styles.headingWrapper}
            style={{
              backgroundImage: `url(${BackgroundImg}) `,
            }}
          >
            <h1
              className={`pb-2 ${styles.header}`}
              dangerouslySetInnerHTML={getSanitizedHtml(currentLocation ?? "")}
            />
            <div />
          </div>
        </div>
        <MerchantRatings merchantDetails={merchantDetails} />
        <div className={styles.productListing_main}>
          <div
            className={composeClasses(styles.filter, styles.tabletAndAboveOnly)}
          >
            <ShoppingFilter
              starsFilter={handleRatingsFilter}
              updatePrice={handlePriceFilter}
            />
          </div>
          <div className={styles.content}>
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
                    ? `-${totalNumberOfProducts} Products`
                    : "No Product Found"}
                </p>
              </div>
              <div className={styles.tabletAndAboveOnly}>
                <SortByFilter updateEntry={updateEntry} />
              </div>
            </div>
            <div className={styles.productList}>{productList}</div>
            {pageCount > 20 && (
              <div className={styles.pagination}>
                <PaginationComponent
                  onPageChange={onPageChange}
                  pageCount={pageCount}
                  resetCounterListener={resetCounter}
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={composeClasses(styles.servicesContent, styles.mobileOnly)}
        >
          <ServicesDataComponent />
        </div>
      </div>
    </BasePageLayout>
  );
};

export default MerchantStore;
