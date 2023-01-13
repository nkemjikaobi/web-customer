import React, { useState, useEffect } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import MarketplaceService from "Http/Services/MarketplaceService";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import DealCard from "Components/DealCard/dealCard";
import styles from "./Recommendations.module.scss";

const Recommendations = () => {
  const breadCrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Online Shopping", Url: "/online-shopping" },
    { Text: "Recommendations" },
  ];
  const [recommendedProducts, setRecommendedProducts] = useState<Array<any>>();

  const fetchRecommendedProducts = async () => {
    const products = await MarketplaceService.GetRecommendedProducts(
      undefined,
      undefined,
      16
    );
    setRecommendedProducts(products);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // fetch recommended products
      fetchRecommendedProducts();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <BasePageLayout
      breadcrumbs={breadCrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"yes"}
    >
      <div className={styles.recommendations}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1>Recommendations</h1>
          </div>
        </div>

        <div className={styles.recommendationsContainer}>
          <ul>
            {recommendedProducts &&
              recommendedProducts.map((e, i) => {
                return (
                  <li key={i}>
                    <DealCard
                      key={i}
                      product={e}
                      store_id={MarketplaceService.STORE_ID}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </BasePageLayout>
  );
};

export default Recommendations;
