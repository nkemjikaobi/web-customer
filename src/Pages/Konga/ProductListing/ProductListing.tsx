import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import CategoryQuickLinks from "Components/CategoryQuickLinks/categoryQuickLinks";
import styles from "./productListing.module.scss";
import BackgroundImg from "Assets/images/png/categoryBackgroundImg.png";
import { composeClasses } from "libs/utils/utils";
import { connect } from "react-redux";
import ICategory from "dto/KongaOnline/ICategory";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import ServicesDataComponent from "PagesComponents/OnlineShopping/FilterPanel/ServicesDataComponent/ServicesDataComponent";
import lodash from "lodash";
import ProductListingComponent from "PagesComponents/OnlineShopping/ProductListingComponent/ProductListingComponent";
import ICmsMenuCategory from "dto/KongaFood/ICmsMenuCategory";

export interface IProductListing {
  SelectedCategory: ICategory;
}

const ProductListing: React.FunctionComponent<IProductListing> = (
  props: IProductListing
) => {
  const [selectedCategory, setSelectedCategory] = useState<ICmsMenuCategory>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();
  const [currentLocation, setCurrentLocation] = useState<string>("");

  const { category, categoryURL }: any = useParams();

  useEffect(() => {
    let mounted = true;

    if (mounted && (categoryURL || category)) {
      let categoryId = category;

      if (categoryURL) {
        try {
          categoryId = categoryURL.split("-").slice(-1)[0];
        } catch (error: unknown) {}
      }

      setSelectedCategoryId(categoryId);

      // TODO: get the category from the backend
      // MarketplaceService.GetProductsByCategory(categoryId)
      //   .then((res: any) => console.log("res: ", res))
      //   .catch((err: any) => console.log(err));
    }

    return () => {
      mounted = false;
    };
  }, [categoryURL, category]);

  useEffect(() => {
    let currentCategory: any;
    let tempLocation2: any;
    if (localStorage.getItem("currentCategory")) {
      currentCategory = localStorage.getItem("currentCategory");
      tempLocation2 = lodash.upperFirst(currentCategory);
    }
    let tempLocation = lodash.upperFirst(props?.SelectedCategory?.name ?? "");

    if (tempLocation2) {
      setCurrentLocation(tempLocation2);
    } else {
      setCurrentLocation(tempLocation);
    }

    return () => {
      tempLocation = "";
      localStorage.removeItem("currentCategory");
    };
  }, []);

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
      <div className={styles.wrapper}>
        <div className={styles.productListing}>
          <div className={styles.heading}>
            <div
              className={composeClasses(
                styles.headingWrapper,
                styles.tabletAndAboveOnly
              )}
              // style={{
              //   backgroundImage: `url(${BackgroundImg}) `,
              // }}
            >
              <div />
            </div>
            <div
              className={composeClasses(
                styles.headingWrapper,
                styles.mobileOnly
              )}
              // style={{
              //   backgroundImage: `url(${BackgroundImg}) `,
              // }}
            >
              <div />
            </div>
            <div
              className={composeClasses(
                "d-none d-sm-block d-md-none",
                styles.mobileHeader
              )}
            >
              <span>{selectedCategory?.name}</span>
            </div>
            {/* <div
            className={composeClasses(
              styles.quickLinks,
              styles.tabletAndAboveOnly
            )}
          >
            <CategoryQuickLinks
              categoryId={selectedCategoryId}
              getSelectedCategory={(cat: ICmsMenuCategory) => {
                setSelectedCategory(cat);
                setCurrentLocation(cat.name);
              }}
              header={currentLocation}
            />
          </div> */}
          </div>
          <ProductListingComponent
            banner={props.SelectedCategory?.banner}
            category={selectedCategoryId}
            currentLocation={currentLocation}
            searchedProducts={[]}
          />

          {/* <div
            className={composeClasses(
              styles.servicesContent,
              styles.mobileOnly
            )}
          >
            <ServicesDataComponent />
          </div> */}
        </div>
      </div>
    </BasePageLayout>
  );
};

const mapStateToProps = (state: any) => ({
  SelectedCategory: state.marketplace.SelectedCategory,
});

export default connect(mapStateToProps, {})(ProductListing);
