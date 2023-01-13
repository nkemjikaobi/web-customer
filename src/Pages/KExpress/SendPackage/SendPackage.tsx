/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */

import React, { Fragment, useEffect, useState } from "react";
import Select, { ISelect } from "Components/Form/inputs/Select/Select";
import Button from "Components/Button/button";
import Input from "Components/Form/inputs/Input/Input";
import SeoText from "Components/SeoText/seoText";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./SendPackage.module.scss";
import { useForm } from "CustomHooks/FormHook";
import LogisticsService from "Http/Services/LogisticsService";
import IState from "dto/KongaExpress/IState";
import ILocalGovernmentArea from "dto/KongaExpress/ILocalGovernmentArea";
import ICalculateRateForm from "Models/FormModels/KExpress/CalculateRateForm";
import ShippingFeeComponent from "PagesComponents/KExpress/shippingFeeComponent";
import { connect } from "react-redux";
import {
  InitializeWayBill,
  SaveShippingAmount,
} from "Http/Redux/Actions/KExpress/LogisticsActionEvent";
import { composeClasses } from "libs/utils/utils";
import TrackPackageComponent from "Components/TrackPackageComponent/TrackPackageComponent";
import DeliveryTypeComponent from "PagesComponents/KExpress/DeliveryTypeComponent/DeliveryTypeComponent";
import LocationDataComponent from "Components/LocationData/locationDataComponent";
import TruckLoad from "Assets/images/png/truckLoad.png";
import SmilingMan from "Assets/images/png/kxpress-smiling-man.png";
import BlueTruck from "Assets/images/png/kxpress-blue-truck.png";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import { isMobile } from "react-device-detect";
export interface ISendPackage {
  InitializeWayBill: Function;
  SaveShippingAmount: Function;
}

const SendPackage: React.FunctionComponent<ISendPackage> = ({
  InitializeWayBill,
  SaveShippingAmount,
}: ISendPackage) => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [fromLGAs, setFromLGAs] = useState<Array<ISelect>>([]);
  const [toLGAs, setToLGAs] = useState<Array<ISelect>>([]);
  const [fromState, setFromState] = useState<number | undefined>(undefined);
  const [toState, setToState] = useState<number | undefined>(undefined);
  const [states, setStates] = useState<Array<IState>>([]);
  const [mappedStates, setMappedStates] = useState<Array<ISelect>>([]);
  const [selectedStateTo, setSelectedStateTo] = useState<string>("");
  const [selectedStateFrom, setSelectedStateFrom] = useState<string>("");
  const [estimatedFee, setEstimatedFee] = useState<number>(0);
  const [deliveryType, setDeliveryType] = useState<string>("");
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  const initialForm: ICalculateRateForm = {
    toLocalGovernmentArea: "",
    fromLocalGovernmentArea: "",
    from_state: "",
    to_state: "",
    weight: 1,
    clientId: 3,
    deliveryType: "standard",
    description: "",
  };

  const calculateFee: Function = async () => {
    if (isMobile) {
      setIsCalculated(true);
      setIsSubmitting(true);
      const result = await InitializeWayBill(Values);
      SaveShippingAmount(result);
      setEstimatedFee(result);
      setIsSubmitting(false);
    } else {
      setIsSubmitting(true);
      const result = await InitializeWayBill(Values);
      SaveShippingAmount(result);
      setEstimatedFee(result);
      setIsSubmitting(false);
    }
  };

  const { Values, onChange, onSubmit, SetValues } = useForm(
    calculateFee,
    initialForm
  );

  const handleBackdropClick = (event: any, backdropRef: any, handler: any) => {
    if (event.target && event.target === backdropRef) {
      if (typeof handler === "function") handler();
    }
  };

  let backdropRef: HTMLDivElement | null;

  const deliverySolutions = () => {
    return (
      <>
        <div className={styles.deliverySolutionsCard}>
          <div className={styles.image}>
            <img alt="bald man" src={TruckLoad} />
          </div>
          <h1>Online Integration</h1>
          <p>
            We offer user-friendly API solutions which provides our clients with
            an extensive range of built-in features for effective integration.
          </p>
        </div>
        <div className={styles.deliverySolutionsCard}>
          <div className={styles.image}>
            <img alt="smiling man" src={SmilingMan} />
          </div>
          <h1>Order Fulfilment</h1>
          <p>
            At Kxpress Logistics, we offer sophisticated logistics services to
            help manage your entire supply chain process for your E-commerce
            business, both B2C and B2B.
          </p>
        </div>
        <div className={styles.deliverySolutionsCard}>
          <div className={styles.image}>
            <img alt="blue truck" src={BlueTruck} />
          </div>
          <h1>Nationwide Delivery</h1>
          <p>
            Kxpress Logistics offers effective and prompt door-door delivery
            across the nation
          </p>
        </div>
      </>
    );
  };

  useEffect(() => {
    let mounted = false;

    if (
      toState &&
      fromState &&
      Values.fromLocalGovernmentArea &&
      Values.toLocalGovernmentArea &&
      Values.weight > 0
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
    return () => {
      mounted = false;
    };
  }, [
    toState,
    fromState,
    Values.fromLocalGovernmentArea,
    Values.toLocalGovernmentArea,
    Values.weight,
  ]);

  // set to LGAs
  useEffect(() => {
    let mounted = true;

    setToLGAs([]);

    // fetch the details of the state
    if (toState) {
      const _state = states.find(
        (state: IState) => state.id * 1 === toState * 1
      );
      if (_state) {
        setSelectedStateTo(_state.name);
        setToLGAs(
          _state.lgas.map(
            (lga: ILocalGovernmentArea): ISelect => ({
              value: lga.id,
              text: lga.name,
            })
          )
        );
      }
      SetValues({ ...Values, ["to_state"]: toState });
    } else {
      setSelectedStateTo("");
    }

    return () => {
      mounted = false;
    };
  }, [toState]);

  // set from LGAs
  useEffect(() => {
    let mounted = true;
    setFromLGAs([]);

    // fetch the details of the state
    if (fromState) {
      const _state = states.find(
        (state: IState) => state.id * 1 === fromState * 1
      );
      if (_state) {
        setSelectedStateFrom(_state.name);
        setFromLGAs(
          _state.lgas.map(
            (lga: ILocalGovernmentArea): ISelect => ({
              value: lga.id,
              text: lga.name,
            })
          )
        );
      }
      SetValues({ ...Values, ["from_state"]: fromState });
    } else {
      setSelectedStateFrom("");
    }
    return () => {
      mounted = false;
    };
  }, [fromState]);

  useEffect(() => {
    let mounted = true;
    LogisticsService.GetStates().then((states: any) => {
      if (states) {
        setStates(states);
        const res =
          states.length > 0 &&
          states.map((state: IState) => ({
            value: state.id,
            text: state.name,
          }));
        try {
          setMappedStates(res);
        } catch (error: any) {}
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    SetValues({ ...Values, ["deliveryType"]: deliveryType });
    return () => {
      mounted = false;
    };
  }, [deliveryType]);

  const breadCrumbs: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/send-package/" },
    { Text: "Send Package", Url: "/send-package/" },
  ];
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadCrumbs}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.sendPackage}>
          <header className={styles.sendPackage_header}>
            <h1>
              Connecting businesses
              <br />
              <span>& people everyday</span>{" "}
            </h1>
            <p>
              Our ambition is to be the best delivery partner. With our
              state-of-the-art technology, we provide a great customer
              experience in moving packages to every corner of the country.
            </p>
            <TrackPackageComponent
              classNameForError={
                "col-md-6 offset-md-3 text-center d-flex justify-content-center"
              }
              columnClassName={"text-center d-flex justify-content-center"}
            />
          </header>
          <section className={styles.sendPackage_shippingClaculator}>
            <div className={styles.heading}>
              <h2>Shipping Calculator</h2>
              <p>
                Using state and LGA details provided by the customer to show the
                shipping rates and estimates saves you and your customers
                valuable time.
              </p>
            </div>
            <div>
              <div className={styles.calculateShipping}>
                <form className={styles.form} onSubmit={onSubmit}>
                  <div className={`${styles.form_select} mb-0`}>
                    <h6
                      className={composeClasses(
                        "h6",
                        styles.tabletAndAboveOnly
                      )}
                    >
                      Select Location
                    </h6>
                  </div>
                  <div className={styles.form_select} />
                  <div className={styles.form_select}>
                    <Select
                      className={"ps-3"}
                      label={"From"}
                      onChange={(e: any) => setFromState(e.target.value)}
                      options={mappedStates}
                      placeholder={"Select State"}
                      value={fromState}
                    />
                  </div>
                  <div className={styles.form_select}>
                    <Select
                      className={"ps-3"}
                      label={"Select LGA"}
                      name={"fromLocalGovernmentArea"}
                      onChange={onChange}
                      options={fromLGAs}
                      placeholder={"Select LGA"}
                      value={Values.fromLocalGovernmentArea}
                    />
                  </div>
                  <div className={`${styles.form_select} mb-0`}>
                    <h6
                      className={composeClasses(
                        "h6",
                        styles.tabletAndAboveOnly
                      )}
                    >
                      Select Destination
                    </h6>
                  </div>
                  <div className={styles.form_select} />
                  <div className={styles.form_select}>
                    <Select
                      className={"ps-3"}
                      label={"To"}
                      onChange={(e: any) => setToState(e.target.value)}
                      options={mappedStates}
                      placeholder={"Select State"}
                      value={toState}
                    />
                  </div>
                  <div className={styles.form_select}>
                    <Select
                      className={composeClasses("ps-3", styles.selectForm)}
                      label={"Select LGA"}
                      name={"toLocalGovernmentArea"}
                      onChange={onChange}
                      options={toLGAs}
                      placeholder={"Select LGA"}
                      value={Values.toLocalGovernmentArea}
                    />
                  </div>
                  <div className={`${styles.form_select}`}>
                    <h6 className={composeClasses("h6")}>Weight (KG)</h6>
                    <input
                      min={0}
                      name={"weight"}
                      onChange={onChange}
                      placeholder={"Type The Value"}
                      type={"number"}
                      value={Values.weight}
                    />
                  </div>
                  <div className={styles.form_select}>
                    <DeliveryTypeComponent
                      onChange={(param: string) => setDeliveryType(param)}
                    />
                  </div>
                  <div className={styles.form_select}>
                    <div className={"col"}>
                      <Input
                        className={"form-control"}
                        label={"Package Description"}
                        name={"description"}
                        onChange={onChange}
                        type={"textarea"}
                        value={Values.description}
                      />
                    </div>
                  </div>
                  <div className={styles.form_select} />
                  <div className={styles.form_button}>
                    <Button
                      btnClass={"btn-primary text-white mb-4"}
                      className={"mt-2"}
                      isDisable={!formIsValid}
                      isSubmitting={isSubmitting}
                      loadingText={"Calculating Rate"}
                      title={"Calculate Rate"}
                      type={"submit"}
                    />
                  </div>
                </form>
                <div className={styles.tabletAndAboveOnly}>
                  <ShippingFeeComponent
                    estimatedFee={estimatedFee}
                    stateFrom={selectedStateFrom}
                    stateTo={selectedStateTo}
                    weight={Values.weight}
                  />
                </div>
                <div
                  className={`${isCalculated ? styles.overlay : undefined}`}
                  onClick={(event) =>
                    handleBackdropClick(
                      event,
                      backdropRef,
                      setIsCalculated(false)
                    )
                  }
                >
                  <div
                    className={composeClasses(
                      styles.mobileOnly,
                      styles.calculateRate
                    )}
                  >
                    {isCalculated && (
                      <ShippingFeeComponent
                        estimatedFee={estimatedFee}
                        stateFrom={selectedStateFrom}
                        stateTo={selectedStateTo}
                        weight={Values.weight}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className={styles.sendPackage_deliverySolutionsSection}>
              <span>Delivery Solutions for Online Retailers</span>
              <div />
              <p>
                Quickly integrate powerful solutions that give you more
                flexibility and control over your parcel shipping and logistics
                processes.
              </p>
            </div>
            <div className={styles.deliverySolutions}>
              {deliverySolutions()}
            </div>
          </section>
          <section className={styles.sendPackage_locations}>
            <h2>Choose any Kxpress Location closest to you</h2>
            <p>
              Over 34 different locations are available for pick-up and drop-off
              of packages across Nigeria. Kindly pick a location close to you!
            </p>
            <LocationDataComponent states={states} />
          </section>
          <section className={styles.sendPackage_bottom}>
            <div className={styles.seoText}>
              <SeoText
                text={
                  "Konga.com is Nigeria’s number one online Shopping destination.We pride ourselves in having everything you could possibly need for life and living at the best prices than anywhere else.Our access to Original Equipment Manufacturers and premium sellers gives us a wide range of products at very low prices. Some of our popular categories include electronics, mobile phones, computers, fashion, beauty products, home and kitchen, Building and construction materials and a whole lot more from premium brands. Some of our other categories include Food and drinks, automotive and industrial, books, musical equipment, babies and kids items, sports and fitness, to mention a few. To make your shopping experience swift and memorable, there are also added services like gift vouchers, consumer promotion activities across different categories and bulk purchases with hassle-free delivery. Enjoy free shipping rates for certain products and with the bulk purchase option, you can enjoy low shipping rates, discounted prices and flexible payment. When you shop on our platform, you can pay with your debit card or via KongaPay, which is a convenient and secured payment solution. Get the best of lifestyle services online. Don't miss out on the biggest sales online which takes place on special dates yearly"
                }
                title={
                  "Online Shopping on Konga.com – Nigeria’s Largest Online Mall"
                }
              />
            </div>
          </section>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default connect(null, {
  InitializeWayBill,
  SaveShippingAmount,
})(SendPackage);
