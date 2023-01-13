import React from "react";
import accounting from "accounting";
import Icon from "Components/Icons";
import { composeClasses } from "libs/utils/utils";
import styles from "./FlightSearchDetails.module.scss";
import { CURRENCIES } from "Helpers/Constants";

export interface Iprops {
  data: any;
}

const FlightSearchDetails: React.FunctionComponent<Iprops> = (
  properties: Iprops
) => {
  console.log(properties.data);
  const detail = properties.data.flight_details.summary[0];
  const multipleStops = properties.data.flight_details.details[0];
  let basePrice = 0;
  let tax_Fee = 0;
  let numberOfPassengers = 0;

  const passengerBreakDown = properties.data.passenger_breakup || [];

  for (const key in passengerBreakDown) {
    basePrice += parseFloat(passengerBreakDown[key]["base_price"]);
    tax_Fee += parseFloat(passengerBreakDown[key]["per_tax"]);
    numberOfPassengers += parseInt(passengerBreakDown[key]["pass_no"]);
  }

  const totalFare = basePrice + tax_Fee;

  return (
    <div className={styles.detailsHolder}>
      <div className={styles.destinationDetails}>
        <p>
          {detail?.origin.city} to {detail?.destination.city}
        </p>
        <p className={""}>{detail?.duration}</p>
      </div>
      <div className={styles.mainContainer}>
        {multipleStops.length === 1 ? (
          <div className={styles.container}>
            <div className={styles.flightDetails}>
              <div className={styles.operator}>
                <p>
                  {properties.data.flight_details.details[0][0]?.operator_name}
                </p>
                <p className={styles.align}>
                  {
                    properties.data.flight_details.details[0][0]
                      ?.display_operator_code
                  }
                  {"-"}
                  {properties.data.flight_details.details[0][0]?.flight_number}
                </p>
              </div>
              <div className={""}>
                <div className={styles.locTime}>
                  <p>
                    {properties.data.flight_details.details[0][0]?.origin.loc}
                  </p>
                  <p>
                    {properties.data.flight_details.details[0][0]?.origin.time}
                  </p>
                </div>
                <p className={styles.text}>
                  {properties.data.flight_details.details[0][0]?.origin.date}
                </p>
                <p className={composeClasses(styles.text, styles.alignCity1)}>
                  {properties.data.flight_details.details[0][0]?.origin.city}
                </p>
              </div>
              <div className={styles.line1} />
              <div className={"text-center"}>
                <p className={styles.duration}>
                  {properties.data.flight_details.details[0][0]?.duration}
                </p>
                <Icon name="aeroplaneLift" />
              </div>
              <div className={styles.line1} />
              <div className={""}>
                <div className={styles.locTime}>
                  <p className={""}>
                    {
                      properties.data.flight_details.details[0][0]?.destination
                        .loc
                    }
                  </p>
                  <p className={""}>
                    {
                      properties.data.flight_details.details[0][0]?.destination
                        .time
                    }
                  </p>
                </div>
                <p className={styles.text}>
                  {
                    properties.data.flight_details.details[0][0]?.destination
                      .date
                  }
                </p>
                <p className={composeClasses(styles.text, styles.alignCity1)}>
                  {
                    properties.data.flight_details.details[0][0]?.destination
                      .city
                  }
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={styles.flightStops}>
          {properties.data.flight_details.details[0]?.length > 1 ? (
            <div className={styles.stopContainer}>
              <div className={styles.stops}>
                <span>
                  <Icon name="aeroplane2" /> Plane change at{" "}
                  {
                    properties.data.flight_details.details[0][0].destination
                      .city
                  }{" "}
                  | <Icon name="clockIcon" /> Waiting:{" "}
                  {properties.data.flight_details.details[0][0].layover_time}
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
          {properties.data.flight_details.details[0]?.length > 1
            ? properties.data.flight_details.details[0].map(
                (e: any, i: number) => {
                  return (
                    <div className={styles.stopHolder} key={i}>
                      <div className={styles.stopDetails}>
                        <div className={styles.operator2}>
                          <p>{e.operator_name}</p>
                          <p className={styles.align}>
                            {e.display_operator_code}
                            {"-"}
                            {e.flight_number}
                          </p>
                        </div>
                        <div className={""}>
                          <div className={styles.locTime2}>
                            <p className={""}>{e.origin.loc}</p>
                            <p className={""}>{e.origin.time}</p>
                          </div>
                          <p className={styles.text}>{e?.origin.date}</p>
                          <p
                            className={composeClasses(
                              styles.text,
                              styles.alignCity
                            )}
                          >
                            {e?.origin.city}
                          </p>
                        </div>
                        <div className={styles.line} />
                        <div className={"text-center"}>
                          <p className={styles.duration}>{e.duration}</p>
                          <Icon name="aeroplaneLift" />
                        </div>
                        <div className={styles.line} />
                        <div className={""}>
                          <div className={styles.locTime2}>
                            <p className={""}>{e.destination.loc}</p>
                            <p className={""}>{e.destination.time}</p>
                          </div>
                          <p className={styles.text}>{e.destination.date}</p>
                          <p
                            className={composeClasses(
                              styles.text,
                              styles.alignCity
                            )}
                          >
                            {e.destination.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )
            : ""}
          <div className={styles.fareHolder}>
            <div className={styles.fareContainer}>
              <p>Fare Breakdown</p>
              <div className={styles.fareDetailsHeader}>
                <div>Type</div>
                <div>No</div>
                <div>Basefare</div>
                <div>Taxes & Fees</div>
                <div>Total</div>
              </div>
              <div className={styles.fareDetails1}>
                <div>Passengers</div>
                <div>{numberOfPassengers}</div>
                <div>{accounting.formatMoney(basePrice, CURRENCIES.NAIRA)}</div>
                <div>{accounting.formatMoney(tax_Fee, CURRENCIES.NAIRA)}</div>
                <div>{accounting.formatMoney(totalFare, CURRENCIES.NAIRA)}</div>
              </div>
              <div className={styles.fareDetails}>
                <div>Total Fare</div>
                <div>{accounting.formatMoney(totalFare, CURRENCIES.NAIRA)}</div>
              </div>
            </div>
            <div className={styles.grandTotal}>
              <p>GRAND TOTAL</p>
              <p className={styles.fare}>{`${accounting.formatMoney(
                properties.data.fare[0]?.api_total_display_fare,
                CURRENCIES.NAIRA
              )}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchDetails;
