/* eslint-disable max-len */
import React, { Fragment } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";

import styles from "./services.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import { composeClasses } from "libs/utils/utils";

const AdditionalServices: React.FunctionComponent = () => {
  const breadCrumbs: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Flight", Url: "/pay-bills" },
    { Text: "South Africa - Lagos" },
    { Text: "Flight Details" }, // TODO: change the locations based ont he trip
  ];
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadCrumbs}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={`card ${styles.iconCard}`}>
          <div className={styles.icons}>
            <div className="icons">
              <span className="icon">
                <svg
                  className="bi bi-check-circle"
                  fill="orange"
                  height="54"
                  viewBox="0 0 16 16"
                  width="54"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <p>Travellers Informations</p>
              </span>
            </div>
            <div className="icons">
              <span className="icon">
                <svg
                  className="bi bi-check2"
                  fill="orange"
                  height="54"
                  viewBox="0 0 16 16"
                  width="54"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </span>
              <p>Extras</p>
            </div>
            <div className="icons">
              <span className="icon">
                <svg
                  className="bi bi-wallet2"
                  fill="grey"
                  height="54"
                  viewBox="0 0 16 16"
                  width="54"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
                </svg>
              </span>
              <p>Payment Method</p>
            </div>
            <div className="icons">
              <span className="icon">
                <svg
                  className="bi bi-file-earmark-check"
                  fill="grey"
                  height="54"
                  viewBox="0 0 16 16"
                  width="54"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
                  <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                </svg>
              </span>
              <p>Booking Confirmation</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div
              className={composeClasses(
                "card mt-3",
                styles.changeFlightContainer
              )}
            >
              <div className="card-header">
                Lagos(LOS) <img alt="vector" src="images/kpay/plain.png" />{" "}
                Abuja(ABJ)
                <div className="row">
                  <div className="col">October 14, 2019 | 1 Audit</div>
                  <div className="col col-lg-3">
                    <svg
                      className="bi bi-arrow-repeat"
                      fill="orange"
                      height="16"
                      viewBox="0 0 16 16"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                      <path
                        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                        fillRule="evenodd"
                      />
                    </svg>
                    Change flight
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div
                  className={composeClasses("card-title", styles.flightDetails)}
                >
                  Flight details
                </div>
                <div className="card-text">
                  <div className="row">
                    <div className="col">Arik Air W3724</div>|
                    <div className="col">Economy</div>
                    <div className="col">Duration</div>
                    <div className="col">{""}</div>
                  </div>
                </div>
                <div className="card-text">
                  <div className="row">
                    <div className="col">Arik Air W3724</div>|
                    <div className="col">Economy</div>
                    <div className="col">Duration</div>
                    <div className="col">
                      <img alt="vector" src="images/kpay/Vector.png" />;
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={composeClasses(
                styles.priceSummaryContainer,
                "card border-o mt-3"
              )}
            >
              <div className="card-body">
                <div className="card-text">
                  <div className="row">
                    <p className="col">Adult</p>
                    <p className="col">N23,798 x 1</p>
                  </div>
                  <div className="row">
                    <p className="col">Base Fare</p>
                    <p className="col">N5, 024</p>
                  </div>
                  <div className="row">
                    <p className="col">Taxes & Fees</p>
                    <p className="col">N18, 754</p>
                  </div>
                  <div className="row">
                    <p className="col">Services Fees & Taxes</p>
                    <p className="col">N20</p>
                  </div>
                  <br />
                  <div className="row">
                    <h6 className="col">TOTAL</h6>
                    <h6 className="col">N23,798 x 1</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={composeClasses(
              styles.additionalServicesContainer,
              "card mt-3"
            )}
          >
            <div
              className={composeClasses(
                styles.additionalServices,
                "card-header"
              )}
            >
              Additional Services
            </div>
            <div className="card-body">
              <div
                className={composeClasses(
                  "card.title",
                  styles.additionalServicesItem
                )}
              >
                <div className="row">
                  <p className="col-md-8">Premium Service Package</p>
                  <p className="col">N200,000.00</p>
                </div>
              </div>
              <br />
              <div
                className={composeClasses(
                  "card-text",
                  styles.additionalServicesText
                )}
              >
                After completing your booking, email us your queries or travel
                requests for seating, meal preferences, extra luggage,
                wheelchair assistance and more. With this service, an agent will
                assist by processing your requests to the airline in question.
                <div className="row ms-3">
                  <div className="form-check form-check-inline">
                    <input
                      checked
                      className="form-check-input"
                      id="inlineRadio1"
                      name="inlineRadioOptions"
                      type="radio"
                      value="option1"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      id="inlineRadio2"
                      name="inlineRadioOptions"
                      type="radio"
                      value="option2"
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={composeClasses(
              styles.additionalServicesContainer,
              "card mt-3"
            )}
          >
            <div className="card-body">
              <div
                className={composeClasses(
                  "card.title",
                  styles.additionalServicesItem
                )}
              >
                <div className="row">
                  <p className="col-md-8">
                    Delayed and Lost Baggages Protection
                  </p>
                  <p className="col">N200,000.00</p>
                </div>
              </div>
              <br />
              <div
                className={composeClasses(
                  "card-text",
                  styles.additionalServicesText
                )}
              >
                {`If your baggage is lost or delayed after your flight's arrival,
                our partner, Blue Ribbon Bags will track and return your baggage
                to you. If your baggage is not found within 96 hours of your
                flight?s arrival, you'll receive USD1000 per bag guaranteed.`}
                <div className="row ms-3">
                  <div className="row ms-3">
                    <div className="form-check form-check-inline">
                      <input
                        checked
                        className="form-check-input"
                        id="inlineRadio1"
                        name="inlineRadioOptions"
                        type="radio"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        id="inlineRadio2"
                        name="inlineRadioOptions"
                        type="radio"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={composeClasses(
              styles.additionalServicesContainer,
              "card mt-3"
            )}
          >
            <div className="card-body">
              <div
                className={composeClasses(
                  "card.title",
                  styles.additionalServicesItem
                )}
              >
                <div className="row">
                  <p className="col-md-8">
                    Comprehensive International Travel Insurance
                  </p>
                  <p className="col">N200,000.00</p>
                </div>
              </div>
              <div
                className={composeClasses(
                  "card-text",
                  styles.additionalServicesText
                )}
              >
                Protect your trip with Schengen Visa approved travel insurance
                for persons aged 18 to 65. Covers: emergency medical expenses,
                personal accident, loss and theft, travel delays and more
                <div className="row ms-3">
                  <div className="row ms-3">
                    <div className="form-check form-check-inline">
                      <input
                        checked
                        className="form-check-input"
                        id="inlineRadio1"
                        name="inlineRadioOptions"
                        type="radio"
                        value="option1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        id="inlineRadio2"
                        name="inlineRadioOptions"
                        type="radio"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className={styles.paragraphContainer}>
            By booking this item, you agree to pay the total amount shown, which
            includes Service Fees, on the right and to the Booking{" "}
            <a className={styles.link} href="#">
              Terms and Conditions
            </a>{" "}
            and{" "}
            <a className={styles.link} href="#">
              Privacy Policy
            </a>
          </p>
          <button
            className={composeClasses(
              "btn btn-sm btn-primary",
              styles.continueButton
            )}
            type="button"
          >
            Continue
          </button>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default AdditionalServices;
