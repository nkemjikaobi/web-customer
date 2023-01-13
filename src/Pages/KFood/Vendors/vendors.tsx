/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Banner from "Components/Banner/banner";
import BreadCrumbComponent, {
  IBreadCrumbComponent,
} from "PagesComponents/KTravel/BreadCrumb/BreadCrumbComponent";
import FoodHomeListingCard from "Components/ProductCard/foodHomeListingCard";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import VendorListingBanner from "Assets/images/png/vendorListingBanner.png";

import IFoodDeliveryArea from "dto/KongaFood/IFoodDeliveryArea";
import IMerchantLocation from "dto/KongaFood/IMerchantLocation";
import FoodDeliveryLocation from "Components/FoodDeliveryLocation/FoodDeliveryLocation";
import { Link, useParams } from "react-router-dom";
import Icon from "Components/Icons/icon";

import { connect } from "react-redux";
import {
  SelectedLocationAction,
  MerchantByLocationAction,
} from "Http/Redux/Actions/Food/FoodAction";

import styles from "./vendors.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import ISeller from "dto/KongaOnline/ISeller";
import FoodService from "Http/Services/FoodService";

interface IProps {
  DeliveryLocation?: IFoodDeliveryArea;
  MerchantsByLocation?: Array<IMerchantLocation>;
  MerchantByLocationAction: Function;
}

const breadCrumbs: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Konga Food", Url: "/foodHome" },
  { Text: "Vendors" },
];
const FoodVendors: React.FunctionComponent<IProps> = ({
  DeliveryLocation,
  MerchantsByLocation,
  MerchantByLocationAction,
}) => {
  const [restaurantsList, setRestaurantsList] = useState<any>();
  const [locationChange, setLocationChange] = useState<boolean>(false);

  const { area }: any = useParams();

  const areaFromSlug = FoodService.SlugToArea(area);
  const fetchMerchants = async () => {
    if (area && area.length > 0) {
      const getMerchantsByLocation: Array<IMerchantLocation> =
        await FoodService.GetMerchantLocations(areaFromSlug);
      MerchantByLocationAction(getMerchantsByLocation);
    }
  };

  const storeTimeStatus = (seller: ISeller) => {
    let status = false;
    const currentTime = new Date().getTime();
    let openTime = null;
    let closeTime = null;

    if (seller.opening_time) {
      openTime = stringToHour(seller && seller.opening_time!.toLowerCase());
    }
    if (seller.closing_time) {
      closeTime = stringToHour(seller && seller.closing_time!.toLowerCase());
    }

    if (
      openTime !== null &&
      closeTime !== null &&
      openTime < currentTime &&
      currentTime < closeTime
    ) {
      status = true;
    }

    return status;
  };

  const stringToHour = (time: string) => {
    const today = new Date();
    const timeSplit = time.split(":");
    const timePeriod = timeSplit[1].substr(-2).toLowerCase();
    let timeHour = parseInt(timeSplit[0]);

    timeHour += timePeriod === "pm" && timeHour < 12 ? 12 : 0;
    return today.setHours(timeHour);
  };

  const handleChange = () => {
    setLocationChange(!locationChange);
  };

  useEffect(() => {
    let mounted = true;

    fetchMerchants();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const restaurants = MerchantsByLocation?.map((i: any) => {
        const store_status = storeTimeStatus(i);
        return (
          <div className={styles.itemContent} key={i.id}>
            <Link
              className={styles.cardContent}
              to={"/food/restaurant/" + i.id}
            >
              <div className={styles.listingCard}>
                <div
                  className={styles.isOpen}
                  style={{ display: store_status ? "none" : "block" }}
                >
                  Closed
                </div>

                <div className={styles.listingCard_banner}>
                  <img src={i.banner} />
                </div>
                <div className={styles.listingCard_bottom}>
                  <h1>{i.name}</h1>
                  {/* <p>
                    {i.ratings.total_ratings +
                      "(" +
                      i.ratings.delivery_percentage +
                      ")" +
                      ""}
                  </p> */}
                  <div className={styles.labels}>
                    <div className={styles.label}>
                      <p>{i.average_delivery_time + " Min"}</p>
                    </div>
                    <div className={styles.labels}>
                      <div className={styles.label}>
                        <span className={styles.lineAlign}>
                          <Icon name="star" />
                        </span>
                        <span>{i.ratings.total_ratings}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      });
      if (restaurants) {
        setRestaurantsList(
          restaurants?.length > 0 ? (
            restaurants
          ) : (
            <p className={styles.noResult}>
              No restaurant is available in this area
            </p>
          )
        );
      }
    }

    return () => {
      mounted = false;
    };
  }, [MerchantsByLocation]);

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadCrumbs}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.vendor}>
          <div className={styles.filter}>
            <p className={styles.title}>Delivering to</p>

            {locationChange ? (
              <div className={styles.deliveryDetails}>
                <FoodDeliveryLocation onLocationChange={handleChange} />
              </div>
            ) : (
              <div className={styles.deliveryDetails}>
                <p>{DeliveryLocation?.area}</p>
                <small className={styles.button} onClick={handleChange}>
                  Change
                </small>
              </div>
            )}
          </div>
          <div>
            <section className={styles.vendor_header}>
              <Banner
                href={"#"}
                image={VendorListingBanner}
                isStaticBanner={"no"}
              />
            </section>
            <section className={styles.vendor_vendorListing}>
              <div className={styles.content}>
                <h2>Restaurants near you</h2>
                <div className={styles.list}>{restaurantsList}</div>
              </div>
            </section>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  DeliveryLocation: state.food.SelectedLocation,
  MerchantsByLocation: state.food.MerchantsByLocation,
});

FoodVendors.defaultProps = {
  DeliveryLocation: undefined,
  MerchantsByLocation: [],
};

export default connect(mapStateToProps, {
  SelectedLocationAction,
  MerchantByLocationAction,
})(FoodVendors);
