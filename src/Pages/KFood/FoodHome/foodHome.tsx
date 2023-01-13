/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Banner from "Components/Banner/banner";
import Select from "Components/Form/inputs/Select";
import Icon from "Components/Icons/icon";
import FoodHomeListingCard from "Components/ProductCard/foodHomeListingCard";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";

//Images
import restaurant from "Assets/images/svg/restaurant.svg";
import restaurant_inactive from "Assets/images/svg/restaurant-i.svg";
import FoodBanner1 from "Assets/images/png/foodBanner1.png";
import FoodBanner2 from "Assets/images/png/foodBanner2.png";
import FoodBanner3 from "Assets/images/png/foodBanner3.png";
import Button from "Components/Button/button";
import SeoText from "Components/SeoText/seoText";
import {
  composeClasses,
  normalizeContentCards,
  normalizePageContent,
} from "libs/utils/utils";

import styles from "./foodHome.module.scss";
import IDeliveryState from "dto/KongaFood/IDeliveryState";
import IFoodDeliveryArea from "dto/KongaFood/IFoodDeliveryArea";
import IMerchantLocation from "dto/KongaFood/IMerchantLocation";
import FoodService from "Http/Services/FoodService";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import {
  SelectedLocationAction,
  MerchantByLocationAction,
  FoodStatesAction,
  FoodAreasAction,
} from "Http/Redux/Actions/Food/FoodAction";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import ContentManagementService from "Http/Services/ContentManagementService";
import FoodStepCard from "Components/FoodStepCard/FoodStepCard";
import LandingModal from "PagesComponents/KFood/LandingModal/LandingModal";
import KongaFoodVendor from "Components/KongaFoodVendor/KongaFoodVendor";

interface IProps {
  SelectedLocationAction: Function;
  SelectedLocation?: IFoodDeliveryArea;
  MerchantByLocationAction: Function;
  MerchantsByLocation?: Array<IMerchantLocation>;
  FoodStatesAction: Function;
  FoodAreasAction: Function;
  FoodStates: Array<IDeliveryState>;
  FoodAreas: Array<IFoodDeliveryArea>;
}

const iconsData = [
  "turky",
  "tomato",
  "cereal",
  "turkey",
  "tomato",
  "cereal",
  "turkey",
  "tomato",
];

const iconsList = iconsData.map((e, i) => {
  return <Icon key={i} name={e} />;
});

const FoodHome: React.FunctionComponent<IProps> = (props: IProps) => {
  const {
    SelectedLocationAction,
    SelectedLocation,
    MerchantByLocationAction,
    MerchantsByLocation,
    FoodStatesAction,
    FoodAreasAction,
    FoodStates,
    FoodAreas,
  } = props;

  const history = useHistory();
  const [locationStates, setLocationStates] =
    useState<Array<IDeliveryState>>(FoodStates);
  const [locationArea, setLocationArea] =
    useState<Array<IFoodDeliveryArea>>(FoodAreas);
  const [stateSelectValue, setStateSelectValue] = useState<any>(
    SelectedLocation?.region_id
  );
  const [areaSelectValue, setAreaSelectValue] = useState<any>(
    SelectedLocation?.area_id
  );
  const [showStoreButton, setShowStoreButton] = useState<boolean>(false);
  const [vendorList, setVendorList] = useState<Array<any>>([]);

  const [isLoadingCities, setIsLoadingCities] = useState<boolean>(false);
  const [bannerImage, setBannerImage] = useState([] as any);
  const [easySteps, setEasySteps] = useState([]);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(true);
  const [activeSelectedArea, setActiveSelectedArea] = useState<boolean>(false);

  const selectOptionsMapper = (
    options: any,
    labels: { text: string; value: string }
  ) => {
    if (options) {
      return options.map((opt: any) => {
        return {
          text: opt[labels.text],
          value: opt[labels.value],
        };
      });
    }
  };

  const defaultSetter: IFoodDeliveryArea = {
    id: 0,
    delivery_location: "",
    area: "",
    area_id: 0,
    region: "",
    region_id: 0,
    country_id: null,
    is_active: 0,
    allow_pod: 0,
  };

  const fetchLocationStates = async () => {
    const locationStateResponse: Array<IDeliveryState> =
      await FoodService.GetAllKongaFoodDeliveryStates();
    setLocationStates(locationStateResponse);
    FoodStatesAction(locationStateResponse);
  };

  const fetchLocationArea = async (e: any) => {
    e.preventDefault();
    setIsLoadingCities(true);
    setStateSelectValue(e.target.value);
    SelectedLocationAction(defaultSetter);

    const locationAreaResponse = await FoodService.GetAllFoodDeliveryAreas(
      e.target.value
    );

    setLocationArea(locationAreaResponse);
    FoodAreasAction(locationAreaResponse);
    setIsLoadingCities(false);
  };

  const setCustomerLocation = async (e: any) => {
    e.preventDefault();
    setAreaSelectValue(e.target.value);

    const deliveryLocation: IFoodDeliveryArea | undefined =
      await locationArea.find((area) => {
        return area.area_id.toString() === e.target.value.toString();
      });
    if (deliveryLocation) {
      SelectedLocationAction(deliveryLocation);
    }
  };

  const handleRestaurant = () => {
    if (typeof SelectedLocation !== "undefined" && SelectedLocation?.area) {
      const area_slug =
        SelectedLocation?.area &&
        FoodService.areaToSlug(SelectedLocation?.area);
      history.push("/food/restaurants/" + area_slug);
    }
  };

  const fetchMerchantsByLocation = async (delivery_location: string) => {
    const getMerchantsByLocation: Array<IMerchantLocation> =
      await FoodService.GetMerchantLocations(delivery_location);
    MerchantByLocationAction(getMerchantsByLocation);
  };

  const fetchPageContent = async (slug: string) => {
    await ContentManagementService.GetPageContent(slug).then((res) => {
      if (res) {
        const normalizedSectionData = normalizePageContent(res, false);
        const platformImages = normalizeContentCards(
          normalizedSectionData.PlatFormImages
        );
        const easySteps = normalizeContentCards(
          normalizedSectionData.EasySteps
        );
        const [a, b, c, d] = platformImages;
        setBannerImage(a);
        setEasySteps(easySteps);
      } else {
        setBannerImage([]);
        setEasySteps([]);
      }
    });
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (areaSelectValue && stateSelectValue) {
        setActiveSelectedArea(true);
      } else {
        setActiveSelectedArea(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [areaSelectValue, stateSelectValue]);

  const hasShown = sessionStorage.getItem("hasShown");
  useEffect(() => {
    let mounted = true;
    if (mounted && showWelcomeModal === false) {
      sessionStorage.setItem("hasShown", "true");
    }

    return () => {
      mounted = false;
    };
  }, [showWelcomeModal]);

  useEffect(() => {
    let mounted = true;
    if (mounted && hasShown === "true") {
      setShowWelcomeModal(false);
    }

    return () => {
      mounted = false;
    };
  }, [showWelcomeModal, hasShown]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchLocationStates();
      if (SelectedLocation) {
        fetchMerchantsByLocation(SelectedLocation!.area);
        setShowStoreButton(true);
      }
      fetchPageContent("2-pwakongafood");
    }

    return () => {
      mounted = false;
    };
  }, [SelectedLocation]);

  useEffect(() => {
    let vendors =
      MerchantsByLocation &&
      MerchantsByLocation.filter(
        (i: any) => MerchantsByLocation.length < 7
      ).map((i: any) => {
        return (
          <FoodHomeListingCard
            average_delivery_time={i.average_delivery_time}
            banner={i.banner}
            key={i.id}
            name={i.name}
            ratings={i.ratings}
            url_key={i.id}
          />
        );
      });
    setVendorList(vendors ?? []);
    return () => {
      vendors = [];
    };
  }, [MerchantsByLocation]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      SelectedLocationAction(defaultSetter);
    }

    return () => {
      mounted = false;
    };
  }, []);

  const breadCrumbs: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Konga Food" },
  ];

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadCrumbs}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.home}>
          {showWelcomeModal && (
            <LandingModal onCloseModal={handleCloseWelcomeModal} />
          )}

          <div className={styles.headerContainer}>
            <header className={styles.home_header}>
              <h1>Tasty meals, delivered to your door step on time </h1>
              <div className={styles.headerImg}>
                <img alt="image of different meals" src={bannerImage.name} />
              </div>
            </header>
          </div>

          <div className={styles.home_searchBand}>
            <h2>Delivering to</h2>
            <div className={styles.notification}>
              <Icon name="info" />
              <p>Your selected area will be used to deliver your order</p>
            </div>
            <div className={styles.searchBandWrapper}>
              <div className={styles.input}>
                <div className={styles.locationIcon}>
                  {/* <Icon name="mapMarker2" /> */}
                </div>
                <Select
                  onChange={(e: any) => fetchLocationArea(e)}
                  options={selectOptionsMapper(locationStates, {
                    text: "name",
                    value: "region_id",
                  })}
                  placeholder="Select State"
                  value={stateSelectValue}
                />
              </div>
              <div className={styles.input}>
                <Select
                  disabled={stateSelectValue === ""}
                  onChange={(e: any) => setCustomerLocation(e)}
                  options={selectOptionsMapper(locationArea, {
                    text: "area",
                    value: "area_id",
                  })}
                  placeholder={isLoadingCities ? "Loading..." : "Area"}
                  value={areaSelectValue}
                />
              </div>
            </div>
          </div>
          {/* Uncomment this when top ratted vendor implementation is ready
           <section className={styles.home_topRated}>
            <h3>Top rated vendors around you</h3>
            <p>Quicky order from top restaurants around </p>
            <div className={styles.listingWrapper}>{vendorList}</div>
          </section> */}
          <section
            className={composeClasses(
              styles.home_services,
              activeSelectedArea === true ? styles.isActive : ""
            )}
          >
            <div style={{ display: showStoreButton ? "block" : "none" }}>
              <p className={composeClasses(styles.headingText)}>
                Choose a service
              </p>
              <div className={styles.imageContainer}>
                <div
                  className={styles.serviceImage}
                  onClick={() => handleRestaurant()}
                >
                  {activeSelectedArea === true ? (
                    <img alt="Choose Restaurant" src={restaurant} />
                  ) : (
                    <img alt="Choose Restaurant" src={restaurant_inactive} />
                  )}
                  <p>Restaurants near you</p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.home_banners}>
            <div
              className={composeClasses(styles.leftSide, styles.bannerWrapper)}
            >
              <Banner href={"#"} image={FoodBanner1} isStaticBanner={"no"} />
            </div>
            <div className={styles.rightSide}>
              <div className={styles.bannerWrapper}>
                <Banner href={"#"} image={FoodBanner2} isStaticBanner={"no"} />
              </div>
              <div className={styles.bannerWrapper}>
                <Banner href={"#"} image={FoodBanner3} isStaticBanner={"no"} />
              </div>
            </div>
          </section>
          <section className={styles.home_steps}>
            <h3>Enjoy your food in 3 easy steps</h3>
            <p className={styles.headingText}>
              In three simple step, you get your food delivered to you
            </p>
            <div className={styles.stepsList}>
              {easySteps.map(
                (
                  e: { image: string; title: string; description: string },
                  i
                ) => {
                  return (
                    <FoodStepCard
                      description={e.description}
                      image={e.image}
                      key={i}
                      title={e.title}
                    />
                  );
                }
              )}
            </div>
          </section>
          <section>
            <KongaFoodVendor />
          </section>

          <section className={styles.home_bottom}>
            <div
              className={composeClasses(
                styles.vendorSignUp,
                styles.tabletAndAboveOnly
              )}
            >
              <h4>Get your restaurant on board</h4>
              <p>
                To reach a larger customer audience and also make more money by
                partnering with us
              </p>
              <div className={styles.button}>
                <Button
                  btnClass={"btn-primary text-white"}
                  title="Become a Vendor"
                />
              </div>
              <div className={styles.icons}>{iconsList}</div>
            </div>
          </section>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  SelectedLocation: state.food.SelectedLocation,
  MerchantsByLocation: state.food.MerchantsByLocation,
  FoodStates: state.food.FoodStates,
  FoodAreas: state.food.FoodAreas,
});

FoodHome.defaultProps = {
  SelectedLocation: undefined,
  MerchantsByLocation: [],
};

export default connect(mapStateToProps, {
  SelectedLocationAction,
  MerchantByLocationAction,
  FoodStatesAction,
  FoodAreasAction,
})(FoodHome);
