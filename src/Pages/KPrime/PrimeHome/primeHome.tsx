import Banner from "Components/Banner/banner";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./primeHome.module.scss";
import PrimeBanner from "Assets/images/png/primebanner.png";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import KongaPrimeWorksInfo from "../KongaPrimeWorksInfo/KongaPrimeWorksinfo";
import KongaPrimeInfoCard from "../KongaPrimeInfo/KongaPrimeinfoCard";
import KongaPrimeSubMainCard from "../KongaPrimeSubscriptionMainCard/KongaPrimeSubMainCard";
import KongaPrimeTermsInfo from "../KongaPrimeTermsInfo/KongaPrimeTermsInfo";
import PrimeService from "Http/Services/PrimeService";
import { CONTENT } from "Helpers/Constants";
import ContentManagementService from "Http/Services/ContentManagementService";
import { normalizePageContent, normalizeContentCards } from "libs/utils/utils";
import KongaPrimeWorksCarousel from "../KongaPrimeWorksCarousel/KongaPrimeWorksCarousel";
import IPageContent from "dto/ContentManager/IPageContent";
import IPrimeProduct from "dto/Prime/IPrimeProduct";
import KongaPrimeBanner from "../KongaPrimeBanner/KongaPrimeBanner";
import generateRandomColor from "libs/utils/generateRandomColor";

const PrimeHome: React.FunctionComponent = () => {
  const [primeProducts, setPrimeProducts] = useState<IPrimeProduct[]>([]);
  const [kongaPrimePageData, setKongaPrimePageData] = useState<any>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function fetchPrimeService() {
      const prime: IPrimeProduct[] = await PrimeService.GetAllPrimeProducts();
      console.log({ prime });
      setHasLoaded(true);
      setPrimeProducts(prime);
    }
    fetchPrimeService();
  }, []);

  useEffect(() => {
    const kongaPrimeSlug = CONTENT.KONGAPRIMESLUG;
    async function fetchPrimePageContent() {
      const contentData: IPageContent =
        await ContentManagementService.GetPageContent(kongaPrimeSlug)
          .then((res) => normalizePageContent(res, false))
          .catch((err) => null);
      setHasLoaded(true);
      setKongaPrimePageData(contentData);
    }
    fetchPrimePageContent();
  }, []);

  const { howItWorks, primeFeatures, desktopBanner, mobileBanner } =
    kongaPrimePageData;

  const howItWorksData = howItWorks && normalizeContentCards(howItWorks);
  const primeFeaturesData = normalizeContentCards(primeFeatures);
  const desktopBannerData = normalizeContentCards(desktopBanner);
  const mobileBannerData = normalizeContentCards(mobileBanner);

  const subscription =
    howItWorksData &&
    howItWorksData.map((datum: any, index: number) => (
      <KongaPrimeWorksInfo
        className={styles.hidden}
        content={datum.description}
        gif={datum.image}
        heading={datum.title}
        key={index}
        number={index + 1}
      />
    ));

  const subscriptionPlans =
    primeProducts &&
    primeProducts.map((element: any, index: number) => (
      <KongaPrimeSubMainCard
        iconColor={generateRandomColor()}
        img={element.image_full}
        key={index + 1}
        name={element.name}
        prices={element.custom_options}
        productId={element.sku}
        // returnUrl={element.returnUrl || ''}
        title={element.name}
      />
    ));
  const primeHelpItems =
    primeFeaturesData &&
    primeFeaturesData.map((element: any, index: number) => (
      <KongaPrimeInfoCard
        content={element.description}
        heading={element.heading}
        iconName={element.icon}
        key={index + 2}
      />
    ));

  return (
    <Fragment>
      <BasePageLayout
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.kongaPrime}>
          <section className={styles.kongaPrime__primeBanner}>
            <KongaPrimeBanner
              desktopBannerData={desktopBannerData}
              mobileBannerData={mobileBannerData}
            />
          </section>

          {hasLoaded && subscriptionPlans && (
            <section className={styles.kongaPrime__primeSubscription}>
              <h1 className={styles.primeSubheader}>
                Select your subscription plan
              </h1>
              <div className={styles.primeSubscriptionRows}>
                <div className={styles.row}>{subscriptionPlans}</div>
              </div>
              <div className={styles.primeSubTerms}>
                <KongaPrimeTermsInfo />
              </div>
            </section>
          )}

          {hasLoaded && howItWorksData && kongaPrimePageData && (
            <section className={styles.kongaPrime__primeWorks}>
              <h2 className={styles.primeWorks_header}>How it works</h2>
              <div className={styles.primeWorks_Mobile}>{subscription}</div>
              <div className={styles.primeWorks_Desktop}>
                <KongaPrimeWorksCarousel
                  howItWorksData={howItWorksData}
                  kongaPrimePageData={kongaPrimePageData}
                />
              </div>
            </section>
          )}

          {primeHelpItems && primeHelpItems.length > 0 && (
            <section className={styles.kongaPrime__primeHelp}>
              <div className={styles.primeHelpHeader}>
                <h3>Subscribe to Konga Prime and enjoy these benefits:</h3>
              </div>
              <div className={styles.primeHelprow}>{primeHelpItems}</div>
            </section>
          )}

          {/* <section className={styles.kongaPrime__primeTerms}>
            <div className={styles.primeTermsWrapper}>
              <KongaPrimeTerms style={"landingPageStyle"} />
            </div>
          </section> */}
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default PrimeHome;
