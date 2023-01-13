/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Select, { ISelect } from "Components/Form/inputs/Select/Select";
import SeoText from "Components/SeoText/seoText";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import OurLocationCard from "Components/OurLocationCard/OurLocationCard";
import styles from "./OurLocation.module.scss";
import Button from "Components/Button/button";
import LogisticsService from "Http/Services/LogisticsService";
import IOurLocation from "dto/KongaExpress/IOurLocation";
import IState from "dto/KongaOnline/IState";
import ILocalGovernmentArea from "dto/KongaOnline/ILocalGovernmentArea";
import LocationIconColored from "Assets/images/png/locationIconColored.png";
import { composeClasses } from "libs/utils/utils";

const OurLocation: React.FunctionComponent = () => {
  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/send-package/" },
    { Text: "Send Package", Url: "/send-package/ship-now/" },
    { Text: "Our Location" },
  ];

  const [locations, setLocations] = useState<Array<IOurLocation>>([]);
  const [filteredStores, setFilteredStores] = useState<Array<IOurLocation>>([]);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [individualLocation, setIndividualLocation] =
    useState<string>("Nigeria");
  const [states, setStates] = useState<Array<IState>>([]);
  const [mappedState, setMappedState] = useState<Array<ISelect>>([]);
  const [mappedLga, setMappedLga] = useState<Array<ISelect>>([]);
  const [selectedState, setSelectedState] = useState<number>(0);
  const [selectedLga, setSelectedLga] = useState<number>(0);
  const [selectedStateName, setSelectedStateName] = useState<string>("");
  const [selectedLgaName, setSelectedLgaName] = useState<string>("");
  const [counter, setcounter] = useState<number>(0);

  const loadLocations = async () => {
    const result = await LogisticsService.GetOurLocations();
    setLocations(result);

    result && setTotalNumber(result.length);
  };

  const showAll = () => {
    loadLocations();
    setFilteredStores([]);
    setIndividualLocation("Nigeria");
    setSelectedState(0);
  };

  const searchParams = new URLSearchParams(location.search);
  const stateId: any = searchParams.get("geocode");
  const stateName: any = searchParams.get("state");

  const findStore: Function = (state_id?: number, lga_id?: number) => {
    if (state_id && lga_id) {
      const _stateAndLga: any =
        locations &&
        locations.filter(
          (location) =>
            `${location.state_id}` === `${state_id}` &&
            `${location.lga_id}` === `${lga_id}`
        );
      setFilteredStores(_stateAndLga);
      setTotalNumber(_stateAndLga.length);
      setIndividualLocation(selectedLgaName);
      return _stateAndLga;
    } else if (state_id) {
      const _state: any =
        locations &&
        locations.filter((state) => `${state.state_id}` === `${state_id}`);
      if (_state) {
        setFilteredStores(_state);
        setTotalNumber(_state.length);
        setIndividualLocation(selectedStateName);
        return _state;
      }
    }
  };

  //Get locations
  useEffect(() => {
    let mounted = true;
    setSelectedState(stateId);
    setSelectedStateName(stateName);

    document.body.scrollTop = 0;
    if (mounted) {
      loadLocations();
      LogisticsService.GetStates().then((states: any) => {
        setStates(states);
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (locations) {
      if (locations.length > 0) {
        if (counter < 1) {
          findStore(selectedState);
          setcounter(1);
        }
      }
    }
  }, [locations, counter]);

  //Auto load results
  useEffect(() => {
    if (locations && locations.length > 0) {
      findStore(selectedState, selectedLga);
    }
  }, [selectedState, selectedLga]);

  //Map through the states
  useEffect(() => {
    let mounted: any =
      states.length > 0 &&
      states.map((state: IState) => ({
        value: state.id,
        text: state.name,
      }));
    try {
      setMappedState(mounted);
    } catch (error: any) {}
    return () => {
      mounted = [];
    };
  }, [states]);

  //Get location of selected state
  useEffect(() => {
    let mounted = true;
    setMappedLga([]);

    // fetch the details of the state
    if (selectedState) {
      const _state: any = states.find(
        (state: IState) => state.id * 1 === selectedState * 1
      );
      if (_state) {
        setMappedLga(
          _state.lgas.map((lga: ILocalGovernmentArea) => ({
            value: lga.id,
            text: lga.name,
          }))
        );
      }
    }
    return () => {
      mounted = false;
    };
  }, [selectedState]);

  const locationData =
    locations &&
    locations.length > 0 &&
    locations.map((location: IOurLocation, index: number) => (
      <OurLocationCard key={index} location={location} />
    ));

  const filteredStoreData =
    filteredStores &&
    filteredStores.length > 0 &&
    filteredStores.map((location: IOurLocation, index: number) => (
      <OurLocationCard key={index} location={location} />
    ));

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <Fragment>
        <div className={styles.ourLocation}>
          <section className={styles.locationContent}>
            <div>
              <div className={styles.mainHeading}>
                <img src={LocationIconColored} />
                <h1>Store Locator</h1>
              </div>
              <div className={"me-5 ms-5 " + styles.mainContent}>
                <div className={styles.selectLocation}>
                  <div className={styles.select}>
                    <Select
                      onChange={(e: any) => {
                        setSelectedState(e.target.value);
                        setSelectedLga(0);
                        setSelectedStateName(
                          e.target.options[e.target.selectedIndex].text
                        );
                      }}
                      options={mappedState}
                      placeholder={"Select State"}
                      value={selectedState}
                    />
                  </div>
                  <div className={styles.select}>
                    <Select
                      name={selectedLgaName}
                      onChange={(e: any) => {
                        setSelectedLga(e.target.value);
                        setSelectedLgaName(
                          e.target.options[e.target.selectedIndex].text
                        );
                      }}
                      options={mappedLga}
                      placeholder={"Select LGA"}
                      value={selectedLga}
                    />
                  </div>
                  <div className={styles.button}>
                    <Button
                      btnClass={"btn-primary text-white"}
                      handleClick={() => findStore(selectedState, selectedLga)}
                      title="Search"
                    />
                  </div>
                  <div className={styles.showAllButton}>
                    <Button
                      btnClass={"btn-primary text-white"}
                      handleClick={() => showAll()}
                      title="Show All"
                    />
                  </div>
                </div>
                <div className={styles.heading}>
                  <h1>
                    {totalNumber} {totalNumber > 1 ? "Locations" : "Location"}{" "}
                    found in {individualLocation ? individualLocation : null}
                  </h1>
                </div>
                <div className={composeClasses("ps-4", styles.locationHolder)}>
                  {totalNumber > 0 && (
                    <>{filteredStoreData ? filteredStoreData : locationData}</>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className={"pt-5 pb-5 " + styles.seoText}>
            <SeoText
              text={
                "Konga.com is Nigeria’s number one online Shopping destination" +
                ".We pride ourselves in having everything you could possibly need " +
                "for life and living at the best prices than anywhere else." +
                "Our access to Original Equipment Manufacturers and premium sellers " +
                "gives us a wide range of products at very low prices. Some of our popular " +
                "categories include electronics, mobile phones, computers, fashion, beauty " +
                "products, home and kitchen, Building and construction materials and " +
                "a whole lot more from premium brands. Some of our other categories " +
                "include Food and drinks, automotive and industrial, books, musical " +
                "equipment, babies and kids items, sports and fitness, to mention a few. " +
                "To make your shopping experience swift and memorable, there are also " +
                "added services like gift vouchers, consumer promotion activities " +
                "across different categories and bulk purchases with hassle-free delivery. " +
                "Enjoy free shipping rates for certain products and with the bulk purchase " +
                "option, you can enjoy low shipping rates, discounted prices and flexible " +
                "payment. When you shop on our platform, you can pay with your debit card " +
                "or via KongaPay, which is a convenient and secured payment solution. " +
                "Get the best of lifestyle services online. Don't miss out on the biggest " +
                "sales online which takes place on special dates yearly"
              }
              title={
                "Online Shopping on Konga.com – Nigeria’s Largest Online Mall"
              }
            />
          </section>
        </div>
      </Fragment>
    </BasePageLayout>
  );
};

export default OurLocation;
