/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import TravellersFieldComponent from "./TravellersFieldComponent/TravellersFieldComponent";
import styles from "./TravelersSearchField.module.scss";
import ITravellersInfo from "dto/KongaTravel/ITravellersInfo";
import useClickOutside from "CustomHooks/useClickOutSide";
import Icon from "Components/Icons";
export interface ITravelersSearchField {
  onChange: Function;
}

const TravelersSearchField: React.FunctionComponent<ITravelersSearchField> = (
  props: ITravelersSearchField
) => {
  const [ariaExpanded, setAriaExpanded] = useState<boolean>(false);
  const [adultsCount, setAdultsCount] = useState<number>(1);
  const [infantsCount, setInfantsCount] = useState<number>(0);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  useEffect(() => {
    let mounted: ITravellersInfo | null = {
      adults: adultsCount,
      infants: infantsCount,
      children: childrenCount,
    };
    props.onChange(mounted);
    return () => {
      mounted = null;
    };
  }, [adultsCount, infantsCount, childrenCount]);

  const handleButtonClickeEvent = () => {
    setAriaExpanded(!ariaExpanded);
  };

  const travellerNode = useClickOutside(() => {
    setAriaExpanded(false);
  });

  return (
    <Fragment>
      <div className={"col-md-2 " + styles.dropdownSize}>
        <div className={"dropdown " + styles.dropdown} ref={travellerNode}>
          <Icon className={styles.icons} name={"userTraveller"} />
          <div
            aria-expanded={ariaExpanded}
            className={`btn btn-outline-secondary dropdown-toggle w-100 ${
              styles.dropdownButton
            } ${ariaExpanded === true ? "show" : ""}`}
            onClick={handleButtonClickeEvent}
          >
            {adultsCount + infantsCount + childrenCount} Travellers
          </div>
          <div
            className={`dropdown-menu p-0 w-100 ${
              ariaExpanded === true ? "show" : ""
            } ${styles.dropdownMenu}`}
          >
            <div className={"list-group " + styles.width}>
              <TravellersFieldComponent
                ageRange={"18+ years"}
                defaultCounter={1}
                onChange={setAdultsCount}
                title={"Adults"}
              />
              <TravellersFieldComponent
                ageRange={"2-12 years"}
                defaultCounter={0}
                onChange={setChildrenCount}
                title={"Children"}
              />
              <TravellersFieldComponent
                ageRange={"0-2 years"}
                defaultCounter={0}
                onChange={setInfantsCount}
                title={"Infants"}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TravelersSearchField;
