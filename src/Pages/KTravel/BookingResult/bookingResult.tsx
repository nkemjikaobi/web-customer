/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./bookingResult.module.scss";
import SearchWidgetComponent from "PagesComponents/KTravel/Search/SearchWidgetComponent";
import { connect } from "react-redux";
import ISearchResponse, {
  IAirlineMetric,
  IJourney,
} from "dto/KongaTravel/ISearchResponse";
import ISearchForm from "Models/FormModels/KTravel/SearchForm";
import AirlineMatrixPageComponent from "PagesComponents/KTravel/AirlineMatrixPageComponent/AirlineMatrixPageComponent";
import Icon from "Components/Icons";
import SearchResultComponent from "PagesComponents/KTravel/SearchResultComponent/SearchResultComponent";
import TravelSearchFilter from "Components/TravelSearchFilter/travelSearchFilter";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import { composeClasses } from "libs/utils/utils";
import BookingSummaryComponent from "PagesComponents/KTravel/BookingSummary/bookingSummaryComponent";
import ITrip, { IDestination } from "dto/KongaTravel/ITrip";
import TravelService from "Http/Services/TravelService";
import { useHistory } from "react-router";
import FlightSearchWidgetComponent from "PagesComponents/KTravel/Search/FlightSearchWidgetComponent/FlightSearchWidgetComponent";

interface IBookingResult {
  searchRequest?: ISearchForm | null;
  searchResult?: ISearchResponse | null;
}

const BookingResult: React.FunctionComponent<IBookingResult> = (
  properties: IBookingResult
) => {
  const [tripMatrix, setTripMatrix] = useState<Array<IAirlineMetric>>([]);
  const [tripSchedules, setTripSchedules] = useState<Array<IJourney>>([]);
  const [modify, setModify] = useState<boolean>(false);
  const [destination, setDestination] = useState<IDestination>();
  const [showMobileWidget, setShowMobileWidget] = useState<boolean>(false);

  const breadCrumbs: Array<IBreadcrumbProp> = [{ Text: "Home", Url: "/" }];
  const history = useHistory();

  useEffect(() => {
    let searchResult = properties.searchResult;
    const searchRequest = properties.searchRequest;

    if (searchResult) {
      setTripMatrix(searchResult.airline_metrix);
      setTripSchedules(searchResult.journey_list);
    }

    if (
      searchRequest &&
      searchRequest.Segments &&
      searchRequest.Segments.length > 0
    ) {
      const segment = searchRequest.Segments[0];
      const fromLocation = segment.DestinationAirport ?? "";
      const toLocation = segment.OriginAirport ?? "";
      breadCrumbs[1] = { Text: `${fromLocation} - ${toLocation}` };
    }

    return () => {
      searchResult = null;
    };
  }, [properties]);

  useEffect(() => {
    let mounted = true;

    if (mounted && properties.searchResult) {
      const trip: ITrip = TravelService.GetTrips(properties.searchResult);

      if (trip && trip.destinations && trip.destinations.length > 0) {
        const destination_ = trip.destinations[0];
        if (destination_ !== undefined) {
          if (
            properties.searchResult.journey_list &&
            properties.searchResult.journey_list.length > 0
          ) {
            const item = properties.searchResult.journey_list[0];
            const details = item.flight_details.details;
            if (details && details.length > 0) {
              const detail = details[0][0];
              if (detail) {
                setDestination({
                  ...destination_,
                  ["fromDate"]: detail.origin.date,
                });
              }
            }
          }
        }
      }
    }
    return () => {
      mounted = false;
    };
  }, [properties.searchResult]);

  const handleModify = () => {
    setModify(!modify);
  };

  const handleMobileModify = () => {
    history.push("/travel/booking");
  };

  return (
    <Fragment>
      <BasePageLayout
        // breadCrumbClass={styles.breadCrumbClass}
        breadcrumbs={breadCrumbs}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.searchWidgetWrapper}>
          <section className={styles.header2}>
            <div className={styles.bookingSummaryWrapper}>
              <div className={styles.bookingSummary}>
                <BookingSummaryComponent
                  destination={destination}
                  modify={modify}
                  onModify={handleModify}
                />
              </div>
            </div>
          </section>
          {modify && (
            <section className={styles.header}>
              <div
                className={composeClasses(
                  styles.mobileOnly,
                  styles.closeMobile
                )}
                onClick={handleModify}
              >
                <Icon name="arrowLeft" />
              </div>
              <div className={styles.searchAdditionalWrapper}>
                <FlightSearchWidgetComponent
                  onModificationSearch={handleModify}
                />
              </div>
            </section>
          )}
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.travelSearchFilter}>
              <TravelSearchFilter
                length={tripSchedules.length}
                matrix={tripMatrix}
              />
            </div>

            <div className={"col " + styles.tripDetails}>
              {tripMatrix.length > 0 ? (
                <div
                  className={"btn text-primary text-bold " + styles.resetSearch}
                >
                  <Icon name="rotate-cw" />
                  <span className={"ms-2 mt-2"}>Reset Search</span>
                </div>
              ) : (
                <Fragment />
              )}

              {tripMatrix && tripMatrix.length > 0 ? (
                <AirlineMatrixPageComponent
                  matrix={tripMatrix}
                  onShowMobileSearch={handleModify}
                  tripSchedules={tripSchedules}
                />
              ) : (
                <Fragment />
              )}
              {tripSchedules && tripSchedules.length > 0 ? (
                <Fragment>
                  <div className={composeClasses("row", styles.background)}>
                    <p
                      className={composeClasses(
                        styles.tableHeaderText,
                        "col text-center border-end py-3"
                      )}
                    >
                      <img
                        alt="vector"
                        className="me-3"
                        src="/images/kpay/airplain.png"
                      />
                      <span>Airline</span>
                    </p>
                    <p
                      className={composeClasses(
                        styles.tableHeaderText,
                        "col text-center border-end py-3"
                      )}
                    >
                      <Icon name={"calendar"} />
                      <span>Depart</span>
                    </p>
                    <p
                      className={composeClasses(
                        styles.tableHeaderText,
                        "col text-center border-end py-3"
                      )}
                    >
                      <Icon name={"calendar"} />
                      <span>Arrive</span>
                    </p>
                    <p
                      className={composeClasses(
                        styles.tableHeaderText,
                        "col text-center border-end py-3"
                      )}
                    >
                      <Icon name={"clock-circular-outline"} />
                      <span>Duration</span>
                    </p>
                    <p
                      className={composeClasses(
                        styles.tableHeaderText,
                        "col text-center border-end py-3"
                      )}
                    >
                      <img
                        alt="vector"
                        className="me-3"
                        src="/images/kpay/price.png"
                      />
                      <span>Price</span>
                    </p>
                  </div>
                  <div className={"card-body " + styles.resultWrapper}>
                    {tripSchedules.map(
                      (tripSchedule: IJourney, key: number) => (
                        <SearchResultComponent
                          key={key}
                          report={tripSchedule}
                        />
                      )
                    )}
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className={styles.noResult}>
                    <p>No results</p>
                  </div>
                  <div className={styles.modifySearch}>
                    <span onClick={handleMobileModify}>Modify Search</span>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

BookingResult.defaultProps = {
  searchRequest: null,
  searchResult: null,
};

const mapStateToProps = (state: any) => ({
  searchRequest: state.travel.SearchedData,
  searchResult: state.travel.SearchResult,
});

export default connect(mapStateToProps, {})(BookingResult);
