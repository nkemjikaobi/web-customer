/* eslint-disable @typescript-eslint/ban-types */
import { useForm } from "CustomHooks/FormHook";
import { composeClasses } from "libs/utils/utils";
import ISearchForm, {
  ISearchFormSegment,
} from "Models/FormModels/KTravel/SearchForm";
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "./FlightSearchWidgetComponent.module.scss";
import { SearchFlightsAction } from "Http/Redux/Actions/TravelActions/Travel";
import { useHistory } from "react-router-dom";
import Button from "Components/Button/button";
import { IAirport } from "dto/KongaTravel/ITrip";
import * as airportsData from "dto/KongaTravel/airports.json";
import TravelersSearchField from "./TravellersSearchField/TravelersSearchField";
import ITravellersInfo from "dto/KongaTravel/ITravellersInfo";
import IClassType from "dto/KongaTravel/IClassType";
import ClassType from "../FlightSearchWidgetComponent/ClassType/ClassType";
import Icon from "Components/Icons/icon";
import useClickOutSide from "CustomHooks/useClickOutSide";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export interface IFlightSearchWidgetComponent {
  SearchFlightsAction: Function;
  onModificationSearch?: Function;
}

const FlightSearchWidgetComponent: React.FunctionComponent<
  IFlightSearchWidgetComponent
> = ({
  SearchFlightsAction,
  onModificationSearch,
}: IFlightSearchWidgetComponent) => {
  const history = useHistory();
  const [searchForm, setSearchForm] = useState<ISearchForm>({
    AdultCount: 1,
    ChildCount: 0,
    InfantCount: 0,
    JourneyType: "oneway",
    PreferredAirlines: [],
    CabinClass: "Economy",
    Segments: [],
    tripType: true,
  });

  // temporary state holders until we can complete the multi city calls
  const [airports, setAirports] = useState<Array<IAirport>>([]);
  const [origin, setOrigin] = useState<string>("");
  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [originAirport, setOrigiAirport] = useState<string>("");
  const [destinationAirport, setDestinationAirport] = useState<string>("");
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [departureCity, setDepartureCity] = useState<string>("");
  const [classType, setClassType] = useState<string>("");
  const [flexibleFlight, setFlexibleFlight] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isFocusDepartment, setIsFocusDepartment] = useState(false);
  const [isFocusDestination, setIsFocusDestination] = useState(false);
  const [showIcons, setShowIcons] = useState(true);
  const [type, setType] = useState("text");

  const [loading, setLoading] = useState(false);
  const [toggleadvancedOptions, setToggleAdvancedOptions] =
    useState<boolean>(true);

  const handleCheck = () => {
    setChecked(!checked);
  };

  const checkClassType = (classType: string) => {
    setClassType(classType);
  };

  const buildSegments: Function = (): ISearchFormSegment => {
    return {
      Origin: origin,
      Destination: departure,
      OriginAirport: departureCity,
      DestinationAirport: destination,
      DepartureDate: departureDate,
      ReturnDate: returnDate,
    };
  };
  const showDepartmentDropNode = useClickOutSide(() => {
    setIsFocusDepartment(false);
  });

  const showDestinationDropNode = useClickOutSide(() => {
    setIsFocusDestination(false);
  });

  const handleSearchFlights: Function = async () => {
    setLoading(true);
    if (isFormValid === true) {
      const response = await SearchFlightsAction(Values);
      setLoading(false);
      if (response === true) {
        onModificationSearch && onModificationSearch();
        history.push("/travel/booking-result");
      }
    }
  };

  const handleTravellersChange = (travellersInfo: ITravellersInfo) => {
    SetValues({
      ...Values,
      ["AdultCount"]: travellersInfo.adults,
      ["ChildCount"]: travellersInfo.children,
      ["InfantCount"]: travellersInfo.infants,
    });
  };

  const handleClassTypeChange = (classTypeInfo: IClassType) => {
    SetValues({
      ...Values,
      ["economy"]: classTypeInfo.economy,
      ["premiumEconomy"]: classTypeInfo.premiumEconomy,
      ["business"]: classTypeInfo.business,
    });
  };

  const handleAdvancedOptionsClick = () => {
    setToggleAdvancedOptions(false);
  };

  const goBackToAdvancedOptions = () => {
    setToggleAdvancedOptions(true);
  };

  useEffect(() => {
    let mounted = true;
    const results: any = airportsData;
    if (mounted && results && results.default) {
      setAirports(results.default);
    }
    return () => {
      mounted = false;
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

  const setIsfocused = (e: any) => {
    setType((e.target.type = "date"));
    setShowIcons(false);
  };

  function ShowDestinationByFilter() {
    return (
      <div className={styles.cardWrapper}>
        {airports
          .filter((value: any, index) => {
            if (destination === "") {
              return value;
            } else if (
              value.airport_name
                .toLowerCase()
                .includes(destination.toLowerCase()) ||
              value.airport_code
                .toLowerCase()
                .includes(destination.toLowerCase()) ||
              value.country.toLowerCase().includes(destination.toLowerCase()) ||
              value.airport_city
                .toLowerCase()
                .includes(destination.toLowerCase())
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
                  setDeparture(element.airport_code);
                  // eslint-disable-next-line prettier/prettier
                  setDestination(`${element.airport_city}, ${element.country}, ${element.airport_name} (${element.airport_code})`);
                }}
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

  function ShowCityByFilter() {
    return (
      <div className={styles.cardWrapper}>
        {airports
          .filter((value: any, index) => {
            if (departureCity === "") {
              return value;
            } else if (
              value.airport_name
                .toLowerCase()
                .includes(departureCity.toLowerCase()) ||
              value.airport_code
                .toLowerCase()
                .includes(departureCity.toLowerCase()) ||
              value.country
                .toLowerCase()
                .includes(departureCity.toLowerCase()) ||
              value.airport_city
                .toLowerCase()
                .includes(departureCity.toLowerCase())
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
                  // I rewrote this function
                  return (
                    setOrigin(element.airport_code),
                    setDepartureCity(
                      `${element.airport_city}, ${element.country}, ${element.airport_name} (${element.airport_code})`
                    )
                  );
                }}
                // onClick={() => {
                //   setOrigin(element.airport_code);
                //   // eslint-disable-next-line prettier/prettier
                //   setDepartureCity(`${element.airport_city}, ${element.country}, ${element.airport_name} (${element.airport_code})`);
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

  return (
    <form className={styles.travelSearchForm} onSubmit={onSubmit}>
      <div className={styles.tripTypeSelectors}>
        <div
          className={composeClasses(
            styles.wrapperHeight,
            "container-fluid p-4"
          )}
        >
          <div className={"row"}>
            <div className={"col-md-12 " + styles.raddioButtonsMobileWrapper}>
              <div
                className={
                  "form-check form-check-inline " + styles.raddioButtonMobile
                }
              >
                <input
                  className={"square-check-input form-check-input"}
                  id={"round-trip"}
                  name={"JourneyType"}
                  onChange={onChange}
                  type={"radio"}
                  value={"return"}
                />
                <label className={"ps-1 pe-3"} htmlFor={"round-trip"}>
                  Round Trip
                </label>
              </div>
              <div
                className={
                  "form-check form-check-inline " + styles.raddioButtonMobile
                }
              >
                <input
                  className={"form-check-input"}
                  defaultChecked={Values.tripType}
                  id={"one-way-trip"}
                  name={"JourneyType"}
                  onChange={onChange}
                  type={"radio"}
                  value={"oneway"}
                />
                <label className={"ps-1 pe-3"} htmlFor={"one-way-trip"}>
                  One Way Trip
                </label>
              </div>
              <div
                className={
                  "form-check form-check-inline " + styles.raddioButtonMobile
                }
              >
                <input
                  className={"form-check-input"}
                  id={"multi-city"}
                  name={"JourneyType"}
                  onChange={onChange}
                  type={"radio"}
                  value={"multicity"}
                />
                <label className={"ps-1 pe-3"} htmlFor={"multi-city"}>
                  Multi City
                </label>
              </div>
            </div>
          </div>
          <div className={"row mt-2"}>
            <div className={styles.tagMobile}>
              <p>From where?</p>
            </div>
            <div
              className={"col-md-3 " + styles.inputWidth}
              ref={showDepartmentDropNode}
            >
              <div className={styles.inputWrapper}>
                <Icon className={styles.icons} name={"aeroplaneUp"} />
                <input
                  className={styles.inputStyle}
                  onChange={(e: any) => setDepartureCity(e.target.value)}
                  onFocus={() => setIsFocusDepartment(true)}
                  placeholder={"Departure City"}
                  type={"text"}
                  value={departureCity}
                />
              </div>
              {isFocusDepartment ? <ShowCityByFilter /> : null}
            </div>
            <div className={styles.tagMobile}>
              <p>To where?</p>
            </div>
            <div
              className={"col-md-3 " + styles.inputWidth}
              ref={showDestinationDropNode}
            >
              <div className={styles.inputWrapper}>
                <Icon className={styles.icons} name={"aeroplaneDown"} />
                <input
                  className={styles.inputStyle}
                  onChange={(e: any) => setDestination(e.target.value)}
                  onFocus={() => setIsFocusDestination(true)}
                  placeholder={"Destination City"}
                  type={"text"}
                  value={destination}
                />
              </div>
              {isFocusDestination ? <ShowDestinationByFilter /> : null}
            </div>
            <div
              className={
                "col-md-2 " +
                composeClasses(styles.inputWidth, styles.datePickerMobile)
              }
            >
              <div
                className={composeClasses(
                  styles.inputWrapper,
                  styles.dateTagMobile
                )}
              >
                <div className={styles.tagMobile}>
                  <p>Departure Date</p>
                </div>
                <div className={styles.dateWrapper}>
                  {showIcons && <Icon className={styles.icons} name={"date"} />}
                  <DatePicker
                    className={styles.date}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    onChange={(date: Date) => setDepartureDate(date)}
                    placeholderText={"Departure Date"}
                    selected={departureDate}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                "col-md-2 " +
                composeClasses(styles.inputWidth, styles.datePickerMobile)
              }
            >
              <div
                className={composeClasses(
                  styles.inputWrapper,
                  styles.dateTagMobile
                )}
              >
                <div className={styles.tagMobile}>
                  <p>Return Date</p>
                </div>
                <div className={styles.dateWrapper}>
                  {showIcons && <Icon className={styles.icons} name={"date"} />}
                  <DatePicker
                    className={styles.date}
                    dateFormat="yyyy-MM-dd"
                    disabled={Values.JourneyType === "oneway"}
                    minDate={departureDate ? departureDate : new Date()}
                    onChange={(date: Date) => setReturnDate(date)}
                    placeholderText={"Return Date"}
                    selected={returnDate}
                  />
                </div>
              </div>
            </div>
            <div className={styles.tagMobile}>
              <p>Travellers and Class</p>
            </div>
            <TravelersSearchField onChange={handleTravellersChange} />
          </div>
        </div>
        <div className={styles.alignButton}>
          {toggleadvancedOptions ? (
            <div
              className={composeClasses("col-md-3", styles.advancedOptions)}
              onClick={handleAdvancedOptionsClick}
            >
              <a href={"#"}>Advanced Options &nbsp;&gt;</a>
            </div>
          ) : (
            <>
              <Icon
                className={composeClasses(styles.chevronLeft, "col-md-1 mt-1")}
                name={"arrowLeftPinkBg"}
                onClick={goBackToAdvancedOptions}
              />
              <div className={composeClasses(styles.classType)}>
                <ClassType
                  checkClassType={checkClassType}
                  onChange={handleClassTypeChange}
                />
              </div>
            </>
          )}
          <div>
            <input
              id={"flexible-dates"}
              name={"flexible-dates"}
              onChange={() => setFlexibleFlight(!flexibleFlight)}
              type={"checkbox"}
            />
            <label className={"ps-1 pe-3"} htmlFor={"flexible-dates"}>
              My dates are flexible (Calendar [+/- 3 days])
            </label>
          </div>
          <div
            className={
              toggleadvancedOptions ? styles.firstButton : styles.secondButton
            }
          >
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
        </div>
      </div>
    </form>
  );
};

FlightSearchWidgetComponent.defaultProps = {
  onModificationSearch: undefined,
};

export default connect(null, {
  SearchFlightsAction,
})(FlightSearchWidgetComponent);
