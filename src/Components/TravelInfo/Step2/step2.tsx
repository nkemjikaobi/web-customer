/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./step2.module.scss";

interface IProps {
  currentStep: number;
  onChange: Function;
}

const step2: React.FunctionComponent<IProps> = (props: IProps) => {
  const [premiumServicePackage, setPremiumServicePackage] =
    useState<boolean>(false);
  const [delayedLostBaggageProtection, setDelayedLostBaggageProtection] =
    useState<boolean>(false);
  const [compIntlTravelInsurance, setCompIntlTravelInsurance] =
    useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    props.onChange({
      premiumServicePackage,
      delayedLostBaggageProtection,
      compIntlTravelInsurance,
    });
    return () => {
      mounted = false;
    };
  }, [
    premiumServicePackage,
    delayedLostBaggageProtection,
    compIntlTravelInsurance,
  ]);

  return (
    <Fragment>
      <div className={styles.additonalServices}>
        <div className={styles.heading}>
          <h1>Additional Services</h1>
        </div>
        <div className={styles.services}>
          <div className={styles.service}>
            <div className={styles.service_heading}>
              <div className={styles.left}>
                <p className={styles.header}>Premium Service Package</p>
                <div className={styles.warning}>
                  <p>i</p>
                </div>
              </div>
              <p className={styles.right}>N200,000.00</p>
            </div>
            <p className={styles.serviceDetails}>
              After completing your booking, email us your queries or travel
              requests for seating, meal preferences, extra luggage, wheelchair
              assistance and more. With this service, an agent will assist by
              processing your requests to the airline in question.
            </p>
            <div className={styles.inputOptions}>
              <div className={styles.inputWrapper}>
                <input
                  checked={premiumServicePackage}
                  className={"square-check-input form-check-input"}
                  id={"premiumServicePackageYes"}
                  name={"premiumServicePackage"}
                  onChange={(e: any) => setPremiumServicePackage(true)}
                  type={"radio"}
                  value={"1"}
                />
                <label
                  className={"ps-1 pe-3"}
                  htmlFor={"premiumServicePackageYes"}
                >
                  Yes
                </label>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  checked={!premiumServicePackage}
                  className={"square-check-input form-check-input"}
                  id={"premiumServicePackageNo"}
                  name={"premiumServicePackage"}
                  onChange={(e: any) => setPremiumServicePackage(false)}
                  type={"radio"}
                  value={"0"}
                />
                <label
                  className={"ps-1 pe-3"}
                  htmlFor={"premiumServicePackageNo"}
                >
                  No
                </label>
              </div>
            </div>
          </div>
          <div className={styles.service}>
            <div className={styles.service_heading}>
              <div className={styles.left}>
                <p className={styles.header}>
                  Delayed and Lost Baggage Protection
                </p>
                <div className={styles.warning}>
                  <p>i</p>
                </div>
              </div>
              <p className={styles.right}>N200,000.00</p>
            </div>
            <p className={styles.serviceDetails}>
              {
                "If your baggage is lost or delayed after your flight's arrival, "
              }
              {
                "our partner, Blue Ribbon Bags will track and return your baggage "
              }
              {"to you. If your baggage is not found within 96 hours of your "}
              {"flight?s arrival, you'll receive USD1000 per bag guaranteed. "}
            </p>
            <div className={styles.inputOptions}>
              <div className={styles.inputWrapper}>
                <input
                  checked={delayedLostBaggageProtection}
                  className={"square-check-input form-check-input"}
                  id={"delayedLostBaggageProtectionYes"}
                  name={"delayedLostBaggageProtection"}
                  onChange={(e: any) => setDelayedLostBaggageProtection(true)}
                  type={"radio"}
                  value={"1"}
                />
                <label
                  className={"ps-1 pe-3"}
                  htmlFor={"delayedLostBaggageProtectionYes"}
                >
                  Yes
                </label>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  checked={!delayedLostBaggageProtection}
                  className={"square-check-input form-check-input"}
                  id={"delayedLostBaggageProtectionNo"}
                  name={"delayedLostBaggageProtection"}
                  onChange={(e: any) => setDelayedLostBaggageProtection(false)}
                  type={"radio"}
                  value={"0"}
                />
                <label
                  className={"ps-1 pe-3"}
                  htmlFor={"delayedLostBaggageProtectionNo"}
                >
                  No
                </label>
              </div>
            </div>
          </div>
          <div className={styles.service}>
            <div className={styles.service_heading}>
              <div className={styles.left}>
                <p className={styles.header}>
                  Comprehensive International Travel Insurance
                </p>
                <div className={styles.warning}>
                  <p>i</p>
                </div>
              </div>
              <p className={styles.right}>N200,000.00</p>
            </div>
            <p className={styles.serviceDetails}>
              Protect your trip with Schengen Visa approved travel insurance for
              persons aged 18 to 65. Covers: emergency medical expenses,
              personal accident, loss and theft, travel delays and more
            </p>
            <div className={styles.inputOptions}>
              <div className={styles.inputWrapper}>
                <input
                  checked={compIntlTravelInsurance}
                  className={"square-check-input form-check-input"}
                  id={"compIntlTravelInsuranceYes"}
                  name={"compIntlTravelInsurance"}
                  onChange={(e: any) => setCompIntlTravelInsurance(true)}
                  type={"radio"}
                  value={"1"}
                />
                <label
                  className={"ps-1 pe-3"}
                  htmlFor={"compIntlTravelInsuranceYes"}
                >
                  Yes
                </label>
              </div>
              <div className={styles.inputWrapper}>
                <input
                  checked={!compIntlTravelInsurance}
                  className={"square-check-input form-check-input"}
                  id={"compIntlTravelInsuranceNo"}
                  name={"compIntlTravelInsurance"}
                  onChange={(e: any) => setCompIntlTravelInsurance(false)}
                  type={"radio"}
                  value={"0"}
                />
                <label
                  className={"ps-1 pe-3"}
                  htmlFor={"compIntlTravelInsuranceNo"}
                >
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.policy}>
          <p>
            By booking this item, you agree to pay the total amount shown, which
            includes Service Fees, on the right and to the Booking
            <span>Terms and Conditions</span> and <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default step2;
