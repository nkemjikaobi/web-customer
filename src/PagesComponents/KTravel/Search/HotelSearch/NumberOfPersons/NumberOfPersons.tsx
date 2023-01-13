/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import NumberOfPersonsComponent from "./NumberOfPersonsComponents/NumberOfPersonsComponent";
import styles from "./NumberOfPersons.module.scss";
import INumberOfPersonsInfo from "dto/KongaTravel/INumberOfPersonsInfo";
import useClickOutside from "CustomHooks/useClickOutSide";

export interface INumberOfPersons {
  onChange: Function;
}

const NumberOfPersons: React.FunctionComponent<INumberOfPersons> = (
  props: INumberOfPersons
) => {
  const [ariaExpanded, setAriaExpanded] = useState<boolean>(false);
  const [adultsCount, setAdultsCount] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);

  useEffect(() => {
    let mounted: INumberOfPersonsInfo | null = {
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
            2Adult, 1Child, 2Rooms
          </div>
          <div
            className={`dropdown-menu p-0 w-100 ${
              ariaExpanded === true ? "show" : ""
            }`}
          >
            <form>
              <div className={"list-group"}>
                <NumberOfPersonsComponent
                  ageRange={"18+ years"}
                  defaultCounter={1}
                  onChange={setAdultsCount}
                  title={"Adults"}
                />
                <NumberOfPersonsComponent
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

export default NumberOfPersons;
