import React, { useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import ServicesCard from "Components/ServicesCard/servicesCard";
import styles from "./searchListing.module.scss";
import BackgroundImg from "Assets/images/png/categoryBackgroundImg.png";
import { composeClasses } from "libs/utils/utils";
import { servicesData } from "Pages/Home/data";
import { connect } from "react-redux";
import lodash from "lodash";
import MarketplaceService from "Http/Services/MarketplaceService";
import IProduct from "dto/KongaOnline/IProduct";
import ISearchByStore from "dto/KongaOnline/ISearchByStore";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import { getLastItemOfUrl } from "libs/utils/searchUtils";
import ProductListingComponent from "PagesComponents/OnlineShopping/ProductListingComponent/ProductListingComponent";

export interface IProductListing {
  location: any;
}

const services = servicesData.map((e, i: number) => (
  <div className={styles.socialIcons} key={i}>
    <ServicesCard icon={e.icon} key={i} text={e.text} title={e.title} />
  </div>
));

const SearchListing: React.FunctionComponent<IProductListing> = ({
  location,
}: IProductListing) => {
  const [currentLocation, setCurrentLocation] = useState("");
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [queryString, setQueryString] = useState<any>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [pageCount, setPageCount] = useState<number>();
  const [totalNumberOfProducts, setTotalNumberOfProducts] = useState<number>(0);

  const searchParams = new URLSearchParams(location.search);
  let param = searchParams.get("search");

  const absolutePath = window.location.pathname;
  let brandName = getLastItemOfUrl(absolutePath);

  //Determine if it should show brands or search params
  useEffect(() => {
    if (param) {
      setQueryString(param);
    } else {
      setQueryString(brandName);
    }
    setChecked(true);
    return () => {
      param = null;
      brandName = null;
      setChecked(false);
      setQueryString(null);
    };
  }, [param, brandName]);

  useEffect(() => {
    let tempLocation;
    if (checked) {
      tempLocation = lodash.upperFirst(queryString ?? "All");
      setCurrentLocation(tempLocation);

      MarketplaceService.GetProductsByCategory(
        undefined,
        1,
        0,
        20,
        null,
        queryString
      ).then((success: ISearchByStore | null): void => {
        if (success) {
          setProducts(success.products);
          setPageCount(success.pagination.total_number_pages);
          setTotalNumberOfProducts(success.pagination.tatal_number_of_products);
          setChecked(false);
        }
      });
    }
    return () => {
      tempLocation = "";
      setChecked(false);
    };
  }, [queryString]);

  const breadCrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Online Shopping", Url: "/online-shopping" },
    { Text: "Search results" },
  ];
  return (
    <BasePageLayout
      breadcrumbs={breadCrumb}
      hasLocation={true}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"yes"}
    >
      <div className={styles.searchListing}>
        <div className={styles.heading}>
          <div
            className={composeClasses(
              styles.headingWrapper,
              styles.tabletAndAboveOnly
            )}
          >
            <div />
          </div>
          <div
            className={composeClasses(styles.headingWrapper, styles.mobileOnly)}
          >
            <div />
          </div>
          <div
            className={composeClasses(
              styles.quickLinks,
              styles.tabletAndAboveOnly
            )}
          >
            {/* <CategoryQuickLinks header={currentLocation} /> */}
          </div>
        </div>

        <ProductListingComponent
          banner={BackgroundImg}
          currentLocation={currentLocation}
          pageCount={pageCount}
          queryString={queryString}
          searchedProducts={products}
          totalNumberOfProducts={totalNumberOfProducts}
        />
        <div
          className={composeClasses(styles.servicesContent, styles.mobileOnly)}
        >
          {services}
        </div>
      </div>
    </BasePageLayout>
  );
};

const mapStateToProps = (state: any) => ({
  SelectedCategory: state.marketplace.SelectedCategory,
  MatchedProducts: state.marketplace.MatchedProducts,
});

export default connect(mapStateToProps, {})(SearchListing);
