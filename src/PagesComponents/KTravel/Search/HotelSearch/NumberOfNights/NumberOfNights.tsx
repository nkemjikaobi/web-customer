/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import NumberOfNightsComponent from "./NumberOfNightsComponents/NumberOfNightsComponent";
import styles from "./NumberOfNights.module.scss";
import INumberOfNightsInfo from "dto/KongaTravel/INumberOfNightsInfo";
import useClickOutside from "CustomHooks/useClickOutSide";

export interface INumberOfNights {
  onChange: Function;
}

const NumberOfNights: React.FunctionComponent<INumberOfNights> = (
  props: INumberOfNights
) => {
  const [ariaExpanded, setAriaExpanded] = useState<boolean>(false);
  const [adultsCount, setAdultsCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  useEffect(() => {
    let mounted: INumberOfNightsInfo | null = {
      adults: adultsCount,
      children: childrenCount,
    };
    props.onChange(mounted);
    return () => {
      mounted = null;
    };
  }, [adultsCount, childrenCount]);

  const handleButtonClickeEvent = () => {
    setAriaExpanded(!ariaExpanded);
  };

  const travellerNode = useClickOutside(() => {
    setAriaExpanded(false);
  });

  return (
    <Fragment>
      <div className={"col-md-2"} ref={travellerNode}>
        <div className={"dropdown"}>
          <div
            aria-expanded={ariaExpanded}
            className={`btn btn-outline-secondary dropdown-toggle w-100 ${
              styles.dropdownButton
            } ${ariaExpanded === true ? "show" : ""}`}
            onClick={handleButtonClickeEvent}
          >
            Number of Nights
          </div>
          <div
            className={`dropdown-menu p-0 w-100 ${
              ariaExpanded === true ? "show" : ""
            }`}
          >
            <form>
              <div className={"list-group"}>
                <NumberOfNightsComponent
                  ageRange={"18+ years"}
                  defaultCounter={1}
                  onChange={setAdultsCount}
                  title={"Adults"}
                />
                <NumberOfNightsComponent
                  ageRange={"2-12 years"}
                  defaultCounter={0}
                  onChange={setChildrenCount}
                  title={"Children"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NumberOfNights;
