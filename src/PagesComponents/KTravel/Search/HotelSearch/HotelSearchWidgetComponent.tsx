/* eslint-disable @typescript-eslint/ban-types */
import { useForm } from "CustomHooks/FormHook";
import { composeClasses } from "libs/utils/utils";
import ISearchForm, {
  ISearchFormSegment,
} from "Models/FormModels/KTravel/SearchForm";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./HotelSearchWidgetComponent.module.scss";
import { SearchFlightsAction } from "Http/Redux/Actions/TravelActions/Travel";
import { useHistory } from "react-router-dom";
import Button from "Components/Button/button";
import { IAirport } from "dto/KongaTravel/ITrip";
import * as airportsData from "dto/KongaTravel/airports.json";
import NumberOfNights from "./NumberOfNights/NumberOfNights";
import NumberOfPersons from "./NumberOfPersons/NumberOfPersons";
import ITravellersInfo from "dto/KongaTravel/ITravellersInfo";
import Icon from "Components/Icons/icon";
import useClickOutSide from "CustomHooks/useClickOutSide";

export interface IFlightSearchWidgetComponent {
  SearchFlightsAction: Function;
  goToWhatsApp: Function;
}

const HotelSearchWidgetComponent: React.FunctionComponent<
  IFlightSearchWidgetComponent
> = ({ SearchFlightsAction, goToWhatsApp }: IFlightSearchWidgetComponent) => {
  const history = useHistory();
  const [searchForm, setSearchForm] = useState<ISearchForm>({
    AdultCount: 1,
    ChildCount: 0,
    InfantCount: 0,
    JourneyType: "oneway",
    PreferredAirlines: [],
    CabinClass: "Economy",
    Segments: [],
  });

  // temporary state holders until we can complete the multi city calls
  const [cityName, setCityName] = useState<string>("");
  const [airports, setAirports] = useState<Array<IAirport>>([]);
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [originAirport, setOrigiAirport] = useState<string>("");
  const [destinationAirport, setDestinationAirport] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [checked, setChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  const buildSegments: Function = (): ISearchFormSegment => {
    return {
      Origin: origin,
      Destination: destination,
      OriginAirport: cityName,
      DestinationAirport: destinationAirport,
      DepartureDate: departureDate,
      ReturnDate: returnDate,
    };
  };

  const handleSearchFlights: Function = async () => {
    setLoading(true);
    if (isFormValid === true) {
      const response = await SearchFlightsAction(Values);
      setLoading(false);
      if (response === true) {
        history.push("/travel/booking-result");
      }
    }
  };
  const showDropNode = useClickOutSide(() => {
    setIsFocus(false);
  });

  useEffect(() => {
    if (cityName.length) {
      setIsFocus(true);
    }
  }, [cityName]);

  const handleTravellersChange = (travellersInfo: ITravellersInfo) => {
    SetValues({
      ...Values,
      ["AdultCount"]: travellersInfo.adults,
      ["ChildCount"]: travellersInfo.children,
      ["InfantCount"]: travellersInfo.infants,
    });
  };

  useEffect(() => {
    let results: any = airportsData;
    if (results && results.default) {
      setAirports(results.default);
    }
    return () => {
      results = [];
    };
  }, []);

  useEffect(() => {
    let mounted = buildSegments();
    if (origin.length > 0 && destination.length > 0) {
      setIsFormValid(true);
      SetValues({ ...Values, ["Segments"]: [mounted] });
    }
    return () => {
      mounted = null;
    };
  }, [origin, destination, departureDate, returnDate]);

  function ShowDestinationByFilter() {
    return (
      <div className={styles.cardWrapper}>
        {airports
          .filter((value: any, index) => {
            if (cityName === "") {
              return value;
            } else if (
              value.airport_name
                .toLowerCase()
                .includes(cityName.toLowerCase()) ||
              value.airport_code
                .toLowerCase()
                .includes(cityName.toLowerCase()) ||
              value.country.toLowerCase().includes(cityName.toLowerCase()) ||
              value.airport_city.toLowerCase().includes(cityName.toLowerCase())
            ) {
              return value;
            }
          })
          .slice(0, 19)
          .map((element: any, index: number) => {
            return (
              <div
                className={styles.items}
                key={index}
                onClick={() => {
                  return (
                    setOrigin(element.airport_code),
                    setCityName(
                      `${element.airport_city}, ${element.country}, ${element.airport_name} (${element.airport_code})`
                    )
                  );
                }}
                // onClick={() => {
                //   setOrigin(element.airport_code);
                //   // eslint-disable-next-line prettier/prettier
                //   setCityName(`${element.airport_city}, ${element.country}, ${element.airport_name} (${element.airport_code})`);
                //   );
                // }}
              >
                <p className={styles.itemsText}>
                  {element.airport_city}, {element.country},
                  {element.airport_name}({element.airport_code})
                </p>
              </div>
            );
          })}
      </div>
    );
  }

  const getCity = (text: string): string => {
    let response = "";
    const reg = /\((.*?)\)/g;
    const regResponse = reg.exec(text);
    try {
      if (regResponse && regResponse.length > 0) {
        response = regResponse[1];
      }
    } catch (error: any) {}
    return response;
  };

  const { Values, onChange, onSubmit, SetValues } = useForm(
    handleSearchFlights,
    searchForm
  );

  return (
    <form className={styles.travelSearchForm} onSubmit={onSubmit}>
      <div className={styles.tripTypeSelectors}>
        <div className={styles.hotelWrapper}>
          <p>
            Please chat Konga Travels agent on whatsapp for your hotel booking &
            reservation
          </p>
          <div className={styles.button} onClick={() => goToWhatsApp()}>
            {"continue to chat"}
          </div>
        </div>
        {/* <div
          className={composeClasses(
            styles.wrapperHeight,
            "container-fluid p-4"
          )}
        >
          <div className={"row"}>
            <div className={composeClasses("col-md-12", styles.emptyDiv)}>
              {" "}
            </div>
          </div>
          <div className={"row mt-2"}>
            <div className={"col-md-3 " + styles.inputWidth} ref={showDropNode}>
              <div className={styles.inputWrapper}>
                <div className={styles.tagMobile}>
                  <p>Enter City Name</p>
                </div>
                <Icon className={styles.icons} name={"location2"} />
                <input
                  className={styles.inputStyle}
                  onChange={(e: any) => setCityName(e.target.value)}
                  placeholder={"Enter City Name"}
                  style={{
                    paddingLeft: "40px",
                  }}
                  type={"text"}
                  value={cityName}
                />
              </div>
              {isFocus ? <ShowDestinationByFilter /> : null}
            </div>
            <div
              className={
                "col-md-3 " +
                composeClasses(styles.inputWidth, styles.datePickerMobile)
              }
            >
              <div className={styles.tagMobile}>
                <p>Departure Date</p>
              </div>
              <input
                min={Date.now()}
                onChange={(e) => setDepartureDate(e.target.value)}
                placeholder={"Departure Date"}
                type={"date"}
                value={departureDate}
              />
            </div>
            <div
              className={
                "col-md-2 " +
                composeClasses(styles.inputWidth, styles.datePickerMobile)
              }
            >
              <div className={styles.tagMobile}>
                <p>Return Date</p>
              </div>
              <input
                min={departureDate ? departureDate : Date.now()}
                onChange={(e) => setReturnDate(e.target.value)}
                placeholder={"Return Date"}
                type={"date"}
                value={returnDate}
              />
            </div>
            <div className={styles.tagMobile}>
              <p>Occupancy</p>
            </div>
            <NumberOfNights onChange={handleTravellersChange} />
            <NumberOfPersons onChange={handleTravellersChange} />
          </div>
        </div> */}
        {/* <div
          className={composeClasses(styles.searchHolder, "row my-3 px-4 pb-4")}
        >
          <div className={"col-md-3"}>{""}</div>
          <div className={"col-md-2 offset-md-7 " + styles.searchButtonMobile}>
            <Button
              className={composeClasses(
                styles.search,
                "btn w-100 text-white btn-danger"
              )}
              iconClass={"bi bi-search"}
              isDisable={!isFormValid}
              isSubmitting={loading}
              title={"Search"}
            />
          </div>
        </div> */}
      </div>
    </form>
  );
};

export default connect(null, {
  SearchFlightsAction,
})(HotelSearchWidgetComponent);
