import React, { Fragment, useState, useEffect } from "react";

import ServicesCard from "Components/ServicesCard/servicesCard";
import CategoriesCarousel from "Components/CategoriesCarousel/CategoriesCarousel";
import QuickActions from "Components/QuickActions/quickActions";
import { moreQuickLinksData, quickLinksData } from "./data";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./HomePage.module.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  composeClasses,
  normalizePageContent,
  normalizeContentCards,
} from "libs/utils/utils";
import Icon from "Components/Icons";
import AuthService from "Http/Services/AuthService";
import ContentManagementService from "Http/Services/ContentManagementService";
import BottomNavigation from "Components/BottomNavigation/bottomNavigation";
import CategoryInfoLoading from "Components/CategoriesCarousel/CategoryInfoLoading";
import BrandPartnerList from "Components/BrandPartnerList/BrandPartnerList";
import { range } from "lodash";

interface IProps {
  route: string;
  backgroundImg: string;
  logo: string;
  data: any;
}

const PlatformCard: React.FunctionComponent<IProps> = ({
  backgroundImg,
  data,
  logo,
  route,
}) => {
  // return (
  //   <Link to={route ?? "#"}>
  //     <div className={styles.wrapper}>
  //       <div
  //         className={composeClasses(
  //           styles.platformCardWrapper,
  //           "bg-image hover-zoom"
  //         )}
  //       >
  //         <div className={styles.imageWrapper}>
  //           <img className={styles.backgroundImg} src={backgroundImg} />
  //         </div>
  //         <div className={styles.logo}>
  //           <img src={logo} />
  //         </div>
  //       </div>
  //       <p>{data.description}</p>
  const serviceData = (
    <div className={styles.wrapper}>
      <div
        className={composeClasses(
          styles.platformCardWrapper,
          "bg-image hover-zoom"
        )}
      >
        <div className={styles.imageWrapper}>
          <img className={styles.backgroundImg} src={backgroundImg} />
        </div>
        <div className={styles.logo}>
          <img src={logo} />
        </div>
      </div>
      <p>{data.description}</p>
    </div>
  );
  return (
    <>
      {route !== "/food" && route !== "/travel/booking" && (
        <Link to={route ?? "#"}>{serviceData}</Link>
      )}
      {route === "/food" ? (
        <a
          href="https://food.konga.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          {serviceData}
        </a>
      ) : (
        route === "/travel/booking" && (
          <a
            href="https://travel.konga.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {serviceData}
          </a>
        )
      )}
    </>
  );
};

interface IHomePage {
  kpay: any;
  flashShow: any;
}

const HomePage: React.FunctionComponent<IHomePage> = (
  properties: IHomePage
) => {
  const [className, setClassName] = useState<string>(styles.grid);
  const [gridView, setGridView] = useState<boolean>(true);
  const [firstLayer, setFirstLayer] = useState<Array<any>>([]);
  const [bottomLayer, setBottomLayer] = useState<Array<any>>([]);
  const [platformBenefits, setPlatformBenefits] = useState<Array<any>>([]);
  const [brandList, setBrandList] = useState<Array<any>>([]);
  const [adPopUp, setAdPopUp] = useState<boolean>(false);
  const [popupFrequency, setPopupFrequency] = useState<boolean>(false);
  const [popupImages, setPopupImages] = useState<Array<any>>([]);

  const fetchPageContent = async (slug: string) => {
    await ContentManagementService.GetPageContent(slug).then((res) => {
      const normalizedSectionData = normalizePageContent(res, false);
      const platformCard = normalizeContentCards(
        normalizedSectionData.PlatFormImages
      );
      const platFormBenefits = normalizeContentCards(
        normalizedSectionData.PlatFormBenefits
      );
      const popupBanners = normalizeContentCards(
        normalizedSectionData.PopupAdsBanner
      );
      const [a, b, c, ...rest] = platformCard.length > 0 ? platformCard : [];
      const brandList = normalizeContentCards(normalizedSectionData.BrandsList);
      const topLayer: any = [a, b, c];
      setFirstLayer(topLayer);

      setBottomLayer(rest);
      setPlatformBenefits(platFormBenefits);
      setPopupImages(popupBanners);
      setBrandList(brandList);
    });
  };

  const services = platformBenefits.map((e: any, key: number) => (
    <div className={styles.socialIcons} key={key}>
      <ServicesCard icon={e.image} text={e.description} title={e.title} />
    </div>
  ));

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const _skeletons = range(3).map((index: number) => (
        <CategoryInfoLoading key={index} />
      ));
      setFirstLayer(_skeletons);
      setBottomLayer(_skeletons);

      fetchPageContent("2-pwahome");
      handlePopupAction();
      AuthService.SetMagenttoToken();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const handlePopularCategoriesClick = (event: any) => {
    return null;
  };

  const handlePopupAction = () => {
    const authenticatedUser = AuthService.GetLoggedInUser();
    if (!authenticatedUser) {
      setPopupFrequency(true);
    } else {
      setPopupFrequency(false);
    }

    setTimeout(() => setAdPopUp(true), 2000);
    setTimeout(() => setAdPopUp(false), 12000);
  };

  const handleChangeViewClickEvent = (event: any) => {
    event.preventDefault();
    const currentClassName = gridView !== false ? styles.bloack : styles.grid;
    setGridView(!gridView);
    setClassName(currentClassName);
  };

  const handleShowPopUp = () => {
    setAdPopUp(true);
  };

  const topLayerData = [
    {
      description: "Shopping made easy",
    },
    {
      description: "Pay with Trust",
    },
    {
      description: "Tasty Meals On time",
    },
  ];
  const bottomLayerData = [
    {
      description: "Travel with Konga",
    },
    {
      description: "Connecting business & people",
    },
    {
      description: "We care for your health",
    },
  ];

  return (
    <Fragment>
      <BasePageLayout
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.home}>
          <div
            className={composeClasses(
              properties.flashShow
                ? styles.home_quickActions
                : styles.home_quickActions2
            )}
          >
            <QuickActions
              moreQuickLinksData={moreQuickLinksData}
              quickLinksData={quickLinksData}
              setPopUpTrigger={handleShowPopUp}
              title="quick links"
            />
          </div>
          <div className={styles.mainContent}>
            {/* <div>
              <Slider active={active} slides={listItems} useImages={true} />
            </div> */}
            <div className={styles.platforms}>
              <div className={styles.toggleWrapper}>
                <div
                  className={composeClasses(
                    styles.toggleButton,
                    styles.mobileOnly
                  )}
                  onClick={(e) => handleChangeViewClickEvent(e)}
                >
                  <p>Switch view</p>
                  {gridView ? (
                    <Icon name="bulletList" />
                  ) : (
                    <div className={styles.gridIconWrapper}>
                      <Icon name="grid" />
                    </div>
                  )}
                </div>
              </div>
              <div className={className}>
                <div className={styles.topLayer}>
                  {firstLayer.map((e: any, key: number) =>
                    e ? (
                      <PlatformCard
                        backgroundImg={e.image}
                        data={topLayerData[key]}
                        key={key}
                        logo={e.logo}
                        route={e.link}
                      />
                    ) : (
                      <Fragment />
                    )
                  )}
                </div>
                <div className={styles.bottomLayer}>
                  {bottomLayer.map((e: any, key: number) =>
                    e ? (
                      <PlatformCard
                        backgroundImg={e.image}
                        data={bottomLayerData[key]}
                        key={key}
                        logo={e.logo}
                        route={e.link}
                      />
                    ) : (
                      <Fragment />
                    )
                  )}
                </div>
              </div>
              <div className={styles.bottomNavigationWrapper}>
                <BottomNavigation />
              </div>
              <section>
                <BrandPartnerList brandList={brandList} />
              </section>
            </div>
            <div className={styles.servicesContent}>{services}</div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: { kpay: any; flashBanner: any }) => ({
  kpay: state.kpay,
  flashShow: state.flashBanner.show,
});

export default connect(mapStateToProps, null)(HomePage);
