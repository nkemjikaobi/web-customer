/* eslint-disable max-len */
import React, { Fragment } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";

import styles from "./bookingConfirmation.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import { composeClasses } from "libs/utils/utils";

const BookingConfirmation: React.FunctionComponent = () => {
  const breadCrumbs: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/travel/booking" },
    { Text: "Flight", Url: "/pay-bills" },
    { Text: "South Africa - Lagos" },
    { Text: "Success" }, // TODO: change the locations based ont he trip
  ];
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadCrumbs}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={composeClasses("card", styles.cards)}>
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
              <p>Payment Method</p>
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
              <p>Booking Confirmation</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={composeClasses("row mt-3", styles.buttonContainer)}>
            <button
              className={composeClasses("btn btn-light", styles.printButton)}
              type="button"
            >
              Print
            </button>
            <button
              className={composeClasses("btn btn-light", styles.pdfButton)}
              type="button"
            >
              Save As PDF
            </button>
          </div>
          <div className="row">
            <div className={composeClasses("col", styles.phoneNumberContainer)}>
              (234) 8094605555, (234) 7080635700
            </div>
            <table
              className={composeClasses("table sm", styles.tableContainer)}
            >
              <tbody>
                <tr>
                  <td scope="col">BOOKING DATE</td>
                  <td scope="col">Thur, 20th May 2021 01:52 PM</td>
                </tr>
                <tr>
                  <td>BOOKING REFERENCE</td>
                  <td>KT-FB-200052021-1351-1234</td>
                </tr>
                <tr>
                  <td>BOOKING STATUS</td>
                  <td>BOOKING PENDING</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card text-center">
            <h5
              className={composeClasses(
                styles.flightDetails,
                "card-title text-white"
              )}
            >
              Flight Details
            </h5>
            <div className="card-body">
              <div className="card-text">
                <div className="row">
                  <div className="col me-5">Air Peace USA</div>
                  <div className="col">
                    <input
                      className="form-control"
                      id="exampleFormControlInput1"
                      type="email"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card text-center">
            <h5
              className={composeClasses(
                styles.flightDetailsContainer,
                "card-title text-white"
              )}
            >
              Flight Details Flight Details Flight Details Flight Details Flight
              Details Flight Details Flight Details Flight Details Flight
              DetailsFlight Details Flight Details
            </h5>
            <div className="card-body">
              <table className="table">
                <caption>Cabin: Standard Economy</caption>
                <thead>
                  <tr>
                    <th scope="col">Flight</th>
                    <th scope="col">Departing</th>
                    <th scope="col">Arriving</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Origin Terminal</th>
                    <th scope="col">Destination Terminal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Air Peace</td>
                    <td>Lagos(LOS)</td>
                    <td>Abuja(ABU)</td>
                    <td>1hr 15min</td>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>(PA 7120)</td>
                    <td>Sat,22nd May 2021 06:30AM</td>
                    <td>Sat,22nd May 2021 07:45AM</td>
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="card text-center">
              <div className="card-header">Passengers Details</div>
              <div className="card-body">
                <table className="table mb-3">
                  <thead>
                    <tr>
                      <th scope="col">Sr no</th>
                      <th scope="col">Passager(2) Name</th>
                      <th scope="col">Type</th>
                      <th scope="col">Ticket No</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mr John Oluwole</td>
                      <td>Adult</td>
                      <td className={styles.pending}>Pending</td>
                    </tr>
                  </tbody>
                </table>
                <table className="table">
                  <caption>Customer Contact Details: 08027301074</caption>
                  <thead>
                    <tr>
                      <th scope="col">Payment Details</th>
                      <th scope="col">Amount NGN</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Basic Fare</td>
                      <td>17,600</td>
                    </tr>
                    <tr>
                      <td>Tax and Fee</td>
                      <td>22,772</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>434,372</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">Terms and Condition </div>
            <div className="card-body">
              <p className="card-text">
                {`All passengers on Domestic Flights must present a valid photo
                identification at physical sales, check-in and boarding gates.
                All passengers on Regional and International Flights must
                present a valid International Passport and valid visa (where
                applicable) at physical sales, check-in and boarding gates.
                Physical check-in begins 3 hours (on Domestic Flights), 4 hours
                (on Regional Flights) and 6 hours (on International Flights)
                prior to the scheduled Flight departure and closes 45 minutes
                (on Domestic Flights), 60 minutes (on Regional Flights) and 75
                minutes (on International Flights) before scheduled Flight
                departure. Boarding on Domestic Flights closes 15 minutes before
                Flight departure while boarding on Regional and International
                Flights closes 20 minutes before Flight departure. Inline with
                POST COVID 19 protocols, all passengers are expected to wear a
                proper face mask all through the time of travel from check-in to
                arrival. All fees charged are in accordance with the tariff
                rules in the country of sale. Payment error issues are resolved
                by the customer's bank not the Airline. This is in line with the
                applicable regulations. The Airline can at best direct
                customer's complaint to its bank.`}
              </p>
            </div>
          </div>
          <button
            className={composeClasses(
              "btn btn-sm btn-primary",
              styles.returnHomeButton
            )}
            type="button"
          >
            Return To Home
          </button>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default BookingConfirmation;
