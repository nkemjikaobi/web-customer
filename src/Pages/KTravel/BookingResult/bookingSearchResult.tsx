import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import Icon from "Components/Icons";
import {
  IFlightDetailsJourney,
  IJourney,
} from "dto/KongaTravel/ISearchResponse";
import { IDestination } from "dto/KongaTravel/ITrip";
import BookingJournies from "PagesComponents/KTravel/BookingSummary/bookingJournies";
import BookingSummaryComponent from "PagesComponents/KTravel/BookingSummary/bookingSummaryComponent";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./bookingResult.module.scss";

export interface IBookingSearchResult {
  auth: any;
  travel: any;
}

const defaultCrumbs = [
  { Text: "Home", Url: "/travel/booking" },
  { Text: "Flight", Url: "" },
];

const BookingSearchResultPage: React.FunctionComponent<
  IBookingSearchResult
> = ({ travel }: IBookingSearchResult) => {
  const [breadcrumb, setSreadcrumb] = useState<Array<IBreadcrumbProp>>([
    ...defaultCrumbs,
  ]);

  const history = useHistory();
  const [destinations, setDestinations] = useState<Array<IDestination>>([]);
  const [journies, setJournies] = useState<Array<IJourney>>([]);
  const [modify, setModify] = useState<boolean>(false);

  const handleModify = () => {
    setModify(true);
  };

  // set the journies
  useEffect(() => {
    let mounted = true;
    try {
      const journey_list: Array<IJourney> =
        travel.SearchResult?.journey_list.journies;
      const tempJournies: IJourney = journey_list[0] ?? [];
      if (tempJournies.flight_details === undefined) {
        history.push("/travel/booking");
      }

      setJournies(journey_list);
      setDestinations(
        travel.SelectedTrip ? travel.SelectedTrip.destinations : []
      );
      const flightDetails: IFlightDetailsJourney =
        tempJournies.flight_details.summary[0];
    } catch (error: any) {
      history.push("/travel/booking");
    }

    return () => {
      mounted = false;
    };
  }, [travel]);

  useEffect(() => {
    let mounted = true;
    setSreadcrumb([
      ...defaultCrumbs,
      ...destinations.map((destination: IDestination) => ({
        Text: `${destination.fromAirport?.airport_name} - ${destination.toAirport?.airport_name}`,
      })),
    ]);
    return () => {
      mounted = false;
    };
  }, [destinations]);

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        {destinations.map((destination: IDestination, index: number) => (
          <BookingSummaryComponent
            destination={destination}
            key={index}
            onModify={handleModify}
          />
        ))}

        {/* flight search result */}
        <div className={"row mb-5"}>
          <div className={"col-md-2"}>
            <div>76 Results Found</div>
          </div>

          <div className={"col"}>
            <div className={"row"}>
              <div className={"col"}>
                <button className={"fw-bold text-primary btn"}>
                  <Icon name={"rotate-cw"} />
                  <span className={"ms-2"}>Reset Search</span>
                </button>
              </div>
            </div>
            <div className={"row"}>
              <div className={"col"}>
                <table className={"table table-bordered"}>
                  <tbody>
                    <tr className={styles.tableHeaders}>
                      <td className={"py-3 px-2"}>{"Airline ( JNB > LOS )"}</td>
                      <td className={"text-center"}>
                        <img src={"/images/ktravel/ArikAirLogo.svg"} />
                      </td>
                      <td className={"text-center"}>
                        <img src={"/images/ktravel/ArikAirLogo.svg"} />
                      </td>
                      <td className={"text-center"}>
                        <img src={"/images/ktravel/ArikAirLogo.svg"} />
                      </td>
                      <td className={"text-center"}>
                        <img src={"/images/ktravel/ArikAirLogo.svg"} />
                      </td>
                      <td className={"text-center"}>
                        <img src={"/images/ktravel/ArikAirLogo.svg"} />
                      </td>
                    </tr>
                    <tr>
                      <td className={"py-3 px-2"}>Direct Flight</td>
                      <td className={"py-3 px-2 fw-bold text-center"}>
                        N 133,578
                      </td>
                      <td />
                      <td className={"py-3 px-2 fw-bold text-center"}>
                        N 133,578
                      </td>
                      <td />
                      <td />
                    </tr>
                    <tr>
                      <td className={"py-3 px-2"}>One Stop</td>
                      <td />
                      <td className={"py-3 px-2 fw-bold text-center"}>
                        N 133,578
                      </td>
                      <td />
                      <td className={"py-3 px-2 fw-bold text-center"}>
                        N 133,578
                      </td>
                      <td />
                    </tr>
                    <tr>
                      <td className={"py-3 px-2"}>Two+ Stops</td>
                      <td className={"py-3 px-2 fw-bold text-center"}>
                        N 133,578
                      </td>
                      <td />
                      <td />
                      <td />
                      <td className={"py-3 px-2 fw-bold text-center"}>
                        N 133,578
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className={"btn-group float-end"}>
                  <button className={"btn"}>
                    <Icon name={"chevron-left"} />
                    <span className={"ms-2 fw-bold text-primary"}>Back</span>
                  </button>
                  <button className={"btn"}>
                    <span className={"me-2 fw-bold text-primary"}>Next</span>
                    <Icon name={"chevron-right"} />
                  </button>
                </div>
              </div>
            </div>

            <BookingJournies journies={journies} />
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  travel: state.travel,
});

export default connect(mapStateToProps, {})(BookingSearchResultPage);
