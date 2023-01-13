/* eslint-disable @typescript-eslint/ban-types */
import Icon from "Components/Icons";
import React, { Fragment, useEffect, useState } from "react";

interface IClassTypeComponent {
  ageRange: string;
  defaultCounter: number;
  title: string;
  onChange: Function;
}

const ClassTypeComponent: React.FunctionComponent<IClassTypeComponent> = (
  props: IClassTypeComponent
) => {
  const [title, setTitle] = useState<string>("");
  const [ageRange, setAgeRange] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    let mounted: IClassTypeComponent | null = props;
    if (mounted) {
      setCounter(mounted.defaultCounter);
    }
    return () => {
      mounted = null;
    };
  }, []);

  useEffect(() => {
    let mounted: IClassTypeComponent | null = props;
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
          <div className={"col-md-12 p-1"}>
            <p className={"text-bold fs-6"}>
              <small className={"text-muted"}>{title}</small>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ClassTypeComponent;
