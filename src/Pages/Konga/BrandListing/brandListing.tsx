import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import CategoryListingCard from "Components/ProductCard/CategoryListingCard";
import SortByFilter from "Components/Filter/SortByFilter/sortByFilter";
import styles from "./brandListing.module.scss";
import BackgroundImg from "Assets/images/png/categoryBackgroundImg.png";
import ShoppingFilter from "Components/ShoppingFilter/shoppingFilter";
import { composeClasses, getSanitizedHtml } from "libs/utils/utils";
import { range } from "lodash";
import MarketplaceService from "Http/Services/MarketplaceService";
import IProduct from "dto/KongaOnline/IProduct";
import ISearchByStore from "dto/KongaOnline/ISearchByStore";
import PaginationComponent from "Components/Pagination/pagination";
import IPagination from "dto/KongaOnline/IPagination";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import IBrand from "dto/KongaOnline/IBrand";
import ServicesDataComponent from "PagesComponents/OnlineShopping/FilterPanel/ServicesDataComponent/ServicesDataComponent";
import CategoryListPlaceholder from "Components/ProductCard/CategoryListPlaceholder";

const BrandListing: React.FunctionComponent = () => {
  const { brand_name: brandUrlKey }: any = useParams();
  const [currentLocation, setCurrentLocation] = useState("");
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [pagination, setPagination] = useState<IPagination | null>(null);
  const [productList, setProductList] = useState<any>();
  const [brandData, setBrandData] = useState<IBrand | null>(null);
  const [totalNumberOfProducts, setTotalNumberOfProducts] = useState<number>(0);

  const updateEntry = (entry: any) => {
    console.log("[+] BrandListing: ", entry);
  };

  useEffect(() => {
    MarketplaceService.GetBrandData(brandUrlKey).then(
      (success: IBrand | null): void => {
        if (success) {
          setBrandData(success);
          setCurrentLocation(success?.name);
        }
      }
    );

    MarketplaceService.GetProductsByCategory(
      "",
      MarketplaceService.STORE_ID,
      MarketplaceService.PAGINATION_INIT,
      MarketplaceService.PAGINATION_LIMIT,
      null,
      brandUrlKey
    ).then((success: ISearchByStore | null): void => {
      if (success) {
        setProducts(success.products);
        setPagination(success.pagination);
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
  }, [brandUrlKey]);

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

  const onPageChange = (pageNumber: any) => {
    // makeApiCall(sortBy, pageNumber);
  };

  const handlePriceFilter = async (param: any) => {
    // console.log("SearchListing: ", param, param.join(", "));
  };

  const handleRatingsFilter = async (param: any) => {
    // console.log("SearchListing: ", param, param.join(", "));
  };

  const breadCrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Online Shopping", Url: "/online-shopping" },
    { Text: currentLocation },
  ];

  return (
    <BasePageLayout
      breadcrumbs={breadCrumb}
      hasLocation={true}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"yes"}
    >
      <div className={styles.productListing}>
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
            <div>
              <PaginationComponent onPageChange={onPageChange} />
            </div>
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

export default BrandListing;
