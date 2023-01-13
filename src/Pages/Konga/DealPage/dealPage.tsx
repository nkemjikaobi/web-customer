import React, { useState, useEffect } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import MarketplaceService from "Http/Services/MarketplaceService";
import IDealProduct from "dto/KongaOnline/IDealProduct";
import ContentManagementService from "Http/Services/ContentManagementService";
import IDeal from "dto/KongaOnline/IDeal";
import constants from "Helpers/cloudinaryConstants";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import DealCard from "Components/DealCard/dealCard";
import styles from "./dealPage.module.scss";
import { normalizePageContent } from "libs/utils/utils";
import { range } from "lodash";
import { Link } from "react-router-dom";
import Asset from "Components/Asset/asset";

interface IBannerContentTemplateField {
  template_code: string;
  template_label: string;
}
interface IBannerContent {
  data: string;
  id: number;
  meta_data: string;
  position: number;
  status_id: number;
  template_field?: IBannerContentTemplateField;
}
interface IBanner {
  content: Array<IBannerContent>;
  id: number;
  position: number;
  status_id: number;
  title: string;
}

const dealPage = () => {
  const breadCrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Online Shopping", Url: "/online-shopping" },
    { Text: "Daily Deals" },
  ];
  const [productDeals, setProductDeals] = useState<Array<IDealProduct> | null>(
    null
  );
  const [banner, setBanner] = useState<Array<IBanner>>([]);
  const [bannerImage, setBannerImage] = useState("");
  const [bannerLink, setBannerLink] = useState("");
  const [bannerAlt, setBannerAlt] = useState("");
  const pageCount = 20;

  const fetchProductDeals = async () => {
    const deal: IDeal | null = await MarketplaceService.GetDeals();
    if (deal && deal.top_offers) {
      setProductDeals(deal.top_offers);
    }
  };

  const data = range(20);
  const slug = "2-deals";

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchProductDeals();
      fetchPageContent(slug);
    }

    return () => {
      mounted = false;
    };
  }, []);

  const fetchPageContent = async (slug: string) => {
    await ContentManagementService.GetPageContent(slug).then((res) => {
      if (res) {
        setBanner(normalizePageContent(res).banner);
        setBannerImage(normalizePageContent(res).banner[0].content[0].data);
        setBannerAlt(normalizePageContent(res).banner[0].content[1].data);
        setBannerLink(normalizePageContent(res).banner[0].content[2].data);
      }
    });
  };

  // Get the banner details from the data
  return (
    <BasePageLayout
      breadcrumbs={breadCrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"yes"}
    >
      <div className={styles.dealPage}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1>Amazing Deals Online</h1>
          </div>
        </div>
        <div className={styles.bannerContainer}>
          {bannerLink ? (
            <a href={bannerLink}>
              <img
                alt={bannerAlt}
                className={styles.banner}
                src={bannerImage}
              />
            </a>
          ) : (
            <img alt={bannerAlt} className={styles.banner} src={bannerImage} />
          )}
        </div>

        <div className={styles.dealContainer}>
          <ul>
            {productDeals &&
              productDeals.map((e, i) => {
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

export default dealPage;
