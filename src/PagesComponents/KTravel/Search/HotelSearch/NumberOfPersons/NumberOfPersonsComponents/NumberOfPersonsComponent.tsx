/* eslint-disable @typescript-eslint/ban-types */
import Icon from "Components/Icons";
import React, { Fragment, useEffect, useState } from "react";

interface INumberOfPersonsComponent {
  ageRange: string;
  defaultCounter: number;
  title: string;
  onChange: Function;
}

const NumberOfPersonsComponent: React.FunctionComponent<
  INumberOfPersonsComponent
> = (props: INumberOfPersonsComponent) => {
  const [title, setTitle] = useState<string>("");
  const [ageRange, setAgeRange] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    let mounted: INumberOfPersonsComponent | null = props;
    if (mounted) {
      setCounter(mounted.defaultCounter);
    }
    return () => {
      mounted = null;
    };
  }, []);

  useEffect(() => {
    let mounted: INumberOfPersonsComponent | null = props;
    if (mounted) {
      setTitle(mounted.title);
      setAgeRange(mounted.ageRange);
    }
    return () => {
      mounted = null;
    };
  }, [props]);

  useEffect(() => {
    let mounted = counter;
    props.onChange(mounted);
    return () => {
      mounted = 0;
    };
  }, [counter]);

  /**
   * Event Listener to listen for the increment of passengers
   * @param event: any
   */
  const handleAddButtonClickedEvent = (event: any) => {
    event.preventDefault();
    let currentCount = counter;
    if (counter <= 0) {
      currentCount = 1;
    } else {
      currentCount += 1;
    }
    setCounter(currentCount);
  };

  /**
   * Event Listener to listen for the reduction of passengers
   * @param event: any
   */
  const handleMinusButtonClickedEvent = (event: any) => {
    event.preventDefault();
    let currentCount = counter;
    if (counter <= 0) {
      currentCount = 0;
    } else {
      currentCount -= 1;
    }
    setCounter(currentCount);
  };

  return (
    <Fragment>
      <div className={"list-group-item"}>
        <div className={"row"}>
          <div className={"col-md-6 p-1"}>
            <p className={"text-bold fs-6"}>
              <small className={"text-muted"}>{title}</small>
            </p>
            <p>
              <small className={"text-muted"}>{ageRange}</small>
            </p>
          </div>
          <div className={"col text-end p-1"}>
            <span onClick={handleMinusButtonClickedEvent}>
              <Icon name={"minusButton"} />
            </span>
            <small className={"p-1"}>{counter}</small>
            <span onClick={handleAddButtonClickedEvent}>
              <Icon name={"plusButton"} />
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NumberOfPersonsComponent;
