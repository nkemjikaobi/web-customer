/* eslint-disable max-len */
import React, { Fragment, useEffect, useState } from "react";
import CardListingContainer from "Components/CardListingContainer/cardListingContainer";
import SearchWidgetComponent from "PagesComponents/KTravel/Search/SearchWidgetComponent";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";

import styles from "./travelHome.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import ContentManagementService from "Http/Services/ContentManagementService";
import { normalizeContentCards, normalizePageContent } from "libs/utils/utils";

const TravelHome: React.FunctionComponent = () => {
  const breadCrumbs: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Travels & Booking" },
  ];
  const [flightDeal, setFlightDeal] = useState([]);
  const [holidayDeal, setHolidayDeal] = useState([]);
  const [bannerImage, setbannerImage] = useState();
  const [headerBanner, setHeaderBanner] = useState();
  const fetchPageContent = async (slug: string) => {
    await ContentManagementService.GetPageContent(slug).then((res) => {
      if (res) {
        const normalizedSectionData = normalizePageContent(res, false);
        const flightDeal = normalizeContentCards(
          normalizedSectionData.FlightDeal
        );
        flightDeal.map((e: any) => {
          e.date = new Date().toISOString().slice(0, 10);
        });
        const holidayDeal = normalizeContentCards(
          normalizedSectionData.HolidayDeal
        );
        const [banner] = normalizeContentCards(normalizedSectionData.banner);
        const [headerBanner] = normalizeContentCards(
          normalizedSectionData.HeaderBanner
        );
        setFlightDeal(flightDeal);
        setHolidayDeal(holidayDeal);
        setbannerImage(banner.name);
        setHeaderBanner(headerBanner.name);
      } else {
        setFlightDeal([]);
        setHolidayDeal([]);
      }
    });
  };

  useEffect(() => {
    fetchPageContent("2-pwakongatravels");
  }, []);
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadCrumbs}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <section
          className={styles.header}
          style={{
            backgroundImage: `url(${headerBanner})`,
          }}
        >
          <div>
            <div>
              <SearchWidgetComponent />
            </div>
            <div className={styles.header_Text}>
              <p>...Experience the world with Konga Travels</p>
            </div>
          </div>
        </section>
        <div className={styles.mainContent}>
          <section className={styles.banner}>
            <div className={"row mt-5 " + styles.bannerInner}>
              <div className="col-md-12">
                <img alt="banner" src={bannerImage} />
              </div>
            </div>
          </section>
          <section className={styles.flightDeals}>
            <CardListingContainer
              deal={flightDeal}
              headerText={
                "Find out our cheapest flights for the top flight destinations around the world! "
              }
              link={"#"}
              title={"flight deals"}
              type={"travel"}
            />
          </section>
          <section className={styles.holidayPackages}>
            <CardListingContainer
              deal={holidayDeal}
              headerText={
                "Holiday Packages - Amazing Destinations awaiting your Discovery! "
              }
              link={"#"}
              title={"Top Holiday packages"}
              type={"travel"}
            />
          </section>
          <section className={styles.holidayPackages}>
            <CardListingContainer
              headerText={
                "We are dedicated to making our travellers have a splendid experience on their Journey. "
              }
              link={"#"}
              title={"Why Choose Us"}
              type={"why-us"}
            />
          </section>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default TravelHome;
