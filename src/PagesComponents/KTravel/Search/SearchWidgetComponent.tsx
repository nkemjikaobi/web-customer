/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState, useEffect } from "react";
import FlightSearchWidgetComponent from "./FlightSearchWidgetComponent/FlightSearchWidgetComponent";
import HotelSearchWidgetComponent from "../Search/HotelSearch/HotelSearchWidgetComponent";
import styles from "./SearchWidgetComponent.module.scss";
import Icon from "Components/Icons";
import { composeClasses, goToWhatsApp } from "libs/utils/utils";
import { KONGA_TRAVELS_WHATSAPP_NUMBER } from "Helpers/Constants";
import Button from "Components/Button/button";

const travelServicesTab = [
  {
    text: "Flights",
    link: "flights",
    activeIcon: "plane",
    inactiveIcon: "planeInactive",
  },
  {
    text: "Hotels",
    link: "hotels",
    activeIcon: "bed",
    inactiveIcon: "bedInactive",
  },
];

const SearchWidgetComponent: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setActiveTab("flights");
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handleChangeTab = (event: any, tabString: string) => {
    if (tabString === "hotels") {
      goToWhatsApp(KONGA_TRAVELS_WHATSAPP_NUMBER);
      setActiveTab(tabString);
    }
    setActiveTab(tabString);
  };

  const travelServices = travelServicesTab.map((travelservice, i) => {
    return (
      <div key={i}>
        <button
          className={
            travelservice.link === activeTab
              ? styles.buttonStyle
              : styles.buttonInactive
          }
          onClick={(e) => handleChangeTab(e, travelservice.link)}
        >
          <div className={composeClasses(styles.mobileOnly, styles.tabIcon)}>
            <Icon
              name={
                travelservice.link === activeTab
                  ? travelservice.activeIcon
                  : travelservice.inactiveIcon
              }
            />
          </div>
          {travelservice.text}
        </button>
      </div>
    );
  });

  return (
    <Fragment>
      <div className={styles.travelSearchFormWrapper}>
        <div className={styles.buttonsContainer}>{travelServices}</div>
        {activeTab === "flights" && (
          <div className={styles.flights}>
            <FlightSearchWidgetComponent />
          </div>
        )}
        {activeTab === "hotels" && (
          <div className={styles.hotels}>
            <HotelSearchWidgetComponent
              goToWhatsApp={() => goToWhatsApp(KONGA_TRAVELS_WHATSAPP_NUMBER)}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SearchWidgetComponent;
