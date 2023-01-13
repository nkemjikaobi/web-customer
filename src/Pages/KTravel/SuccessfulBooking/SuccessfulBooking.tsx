import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import Icon from "Components/Icons";
import Nav from "Components/TravelInfo/Nav/nav";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import React, { Fragment } from "react";
import styles from "./SuccessfulBooking.module.scss";
import config from "Configurations/configurations";
import { composeClasses } from "libs/utils/utils";

const SuccessfulBooking: React.FunctionComponent = () => {
  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/travel/booking" },
    { Text: "Flight", Url: "" },
    { Text: "Travelers Details" },
  ];
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.successfulBooking}>
          <Nav currentStep={3} />

          <div className={styles.actions}>
            <div className={styles.action}>
              <Icon name="home" />
              <span>Back to Home</span>
            </div>

            <div className={styles.right_actions}>
              <div className={styles.action}>
                <Icon name="home" />
                <span>Print</span>
              </div>
              <div className={styles.action}>
                <Icon name="home" />
                <span>Save as PDF</span>
              </div>
            </div>
          </div>
          <div className={styles.successContent}>
            <div
              className={composeClasses(
                styles.bookRefPanel,
                styles.contentPanel
              )}
            >
              <div className={styles.logoPanel}>
                <img src={config.images.travelLogo} />
                <div className={styles.contacts}>
                  <Icon name="whatsappWhite" />
                  <span>(+234) 8094605555, (+234) 7080635700</span>
                </div>
              </div>
              <div className={styles.refPanel}>
                <table className={styles.refDetails}>
                  <tr className={styles.dark}>
                    <th>Booking Date</th>
                    <td className={styles.darkData}>
                      Thu, 20th March, 2022 01:53 PM
                    </td>
                  </tr>
                  <tr>
                    <th>Booking Reference</th>
                    <td>KT-FB-200052022-1351-1529</td>
                  </tr>
                  <tr className={styles.dark}>
                    <th>Booking Status</th>
                    <td>BOOKING PENDING</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className={styles.successBody}>
              <div
                className={composeClasses(
                  styles.header,
                  styles.pink,
                  styles.flightHeader,
                  styles.adjustLeft
                )}
              >
                <span>Flight Details</span>
              </div>

              <div
                className={composeClasses(styles.airlinePane, styles.content)}
              >
                <Icon name="plane-placeholder" />
                <span>Air Peace</span>
              </div>

              <div
                className={composeClasses(
                  styles.header,
                  styles.pink,
                  styles.adjustLeft,
                  styles.multiHeader,
                  styles.flightDetails
                )}
              >
                <div className={styles.planeIcon}>
                  <Icon name="plane-bigger" />
                </div>
                <p>
                  Flight Details (Lagos, Nigeria, Murtala Muhammed Airport (LOS)
                  to Abuja, Nigeria, International Airport (ABV)) <br />
                  Please verify flight time with the airlines prior to departure
                </p>
              </div>
              <div className={styles.itinerary}>
                <div className={composeClasses(styles.cabin, styles.column)}>
                  <div
                    className={composeClasses(
                      styles.header,
                      styles.dark,
                      styles.adjustLeft
                    )}
                  >
                    <span>Flight</span>
                  </div>
                  <div>
                    <p>
                      <span className={styles.carrier}>
                        Air Peace (P4 7120)
                      </span>
                      <br />
                      <span className={styles.cabinType}>
                        Cabin: Standard economy
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  className={composeClasses(styles.departing, styles.column)}
                >
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <Icon name="plane-departing" />
                    <span>Departing</span>
                  </div>
                  <div className={styles.tableDetails}>
                    <p>Lagos (LOS) Sat, 22nd March 20222 06:30 AM</p>
                  </div>
                </div>

                <div className={composeClasses(styles.arriving, styles.column)}>
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <span>Arriving</span>
                    <Icon name="plane-arriving" />
                  </div>
                  <div className={styles.tableDetails}>
                    <p>Abuja (ABV) Sat, 22nd March 2022 07:45 AM</p>
                  </div>
                </div>

                <div className={composeClasses(styles.duration, styles.column)}>
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <span>Duration</span>
                  </div>
                  <div className={styles.tableDetails}>
                    <p>1h 15m</p>
                  </div>
                </div>

                <div
                  className={composeClasses(
                    styles.carrierDetails,
                    styles.column
                  )}
                >
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <span>Flight</span>
                  </div>
                  <div />
                </div>

                <div className={composeClasses(styles.terminal, styles.column)}>
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <span>Origin Terminal</span>
                  </div>
                  <div />
                </div>

                <div className={composeClasses(styles.terminal, styles.column)}>
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <span>Destination Terminal</span>
                  </div>
                  <div />
                </div>
              </div>

              <div
                className={composeClasses(
                  styles.header,
                  styles.pink,
                  styles.adjustLeft
                )}
              >
                <span className={styles.heading}>Passenger(s) Details</span>
              </div>

              <div className={styles.paxDetails}>
                <div className={composeClasses(styles.serial, styles.column)}>
                  <div
                    className={composeClasses(
                      styles.header,
                      styles.dark,
                      styles.adjustLeft
                    )}
                  >
                    <span>Sr. No</span>
                  </div>
                  <div className={styles.serialNumber}>
                    <p>1</p>
                  </div>
                </div>

                <div className={composeClasses(styles.pax, styles.column)}>
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <span>Passenger(s) Name</span>
                  </div>
                  <div className={styles.details}>
                    <p>Mr John Olawale</p>
                  </div>
                </div>

                <div className={composeClasses(styles.paxType, styles.column)}>
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <span>Type</span>
                  </div>
                  <div className={styles.details}>
                    <p>Adult</p>
                  </div>
                </div>

                <div
                  className={composeClasses(
                    styles.ticketDetails,
                    styles.column
                  )}
                >
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <span>Ticket Number</span>
                  </div>
                  <div className={styles.details}>
                    <p>Pending</p>
                  </div>
                </div>
              </div>

              <div
                className={composeClasses(
                  styles.header,
                  styles.dark,
                  styles.adjustLeft,
                  styles.contact,
                  styles.spaceBetween
                )}
              >
                <span>Customer Contact Details: 08027301074</span>
                <span>Email: Johnsonw@gmai.com</span>
              </div>

              <div className={styles.payment}>
                <div className={styles.column}>
                  <div
                    className={composeClasses(
                      styles.header,
                      styles.dark,
                      styles.adjustLeft
                    )}
                  >
                    <span>Payment Details</span>
                  </div>
                  <p>Base Fare</p>
                  <p>Taxes & Fees</p>
                  <p>Total</p>
                </div>
                <div className={composeClasses(styles.column, styles.right)}>
                  <div className={composeClasses(styles.header, styles.dark)}>
                    <span>Amount (NGN)</span>
                  </div>
                  <p>11, 600</p>
                  <p>22,772</p>
                  <p>34,372</p>
                </div>
              </div>

              <div
                className={composeClasses(
                  styles.header,
                  styles.pink,
                  styles.adjustLeft
                )}
              >
                <span className={styles.heading}>Terms and Conditions</span>
              </div>

              <div className={styles.terms}>
                <p>
                  All Guests, including children and infants, must present valid
                  identification at check-in. Check-in begins 2 hours prior to
                  the flight for seat assignment and closes 45 minutes prior to
                  the scheduled departure. Carriage and other services provided
                  by the carrier are subject to conditions of carriage, which
                  are hereby incorporated by reference. These conditions may be
                  obtained from the issuing carrier. In case of cancellations
                  less than 6 hours before departure please cancel with the
                  airlines directly. We are not responsible for any losses if
                  the request is received less than 6 hours before departure.
                  Please contact airlines for Terminal Queries. Due to security
                  reasons / Government regulations, passengers travelling on
                  flights from certain station like Jammu, Srinagar, etc. are
                  not allowed to carry any Hand Baggage. If the basic fare is
                  less than cancellation charges then only statutory taxes would
                  be refunded. We are not be responsible for any Flight
                  delay/Cancellation from airline&apos;s end. Kindly contact the
                  airline at least 24 hrs before to reconfirm your flight detail
                  giving reference of Airline PNR Number. We are a travel agent
                  and all reservations made through our website are as per the
                  terms and conditions of the concerned airlines. All
                  modifications, cancellations and refunds of the airline
                  tickets shall be strictly in accordance with the policy of the
                  concerned airlines and we disclaim all liability in connection
                  thereof. Do not hesitate to contact your ticketing Agent for
                  further clarifications, if any. <br />
                  <span className={styles.termsBold}>
                    Thanks For choosing us as your ticket provider. Wish you a
                    happy journey
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default SuccessfulBooking;
