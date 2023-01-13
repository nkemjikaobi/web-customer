/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./DateRangeComponent.module.scss";

interface IProps {
  onDateRangeChange: Function;
}

const DateRangeComponent: React.FunctionComponent<IProps> = (props: IProps) => {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.onDateRangeChange({
        from: fromDate,
        to: toDate,
        type: "date-range",
      });
    }
    return () => {
      mounted = false;
    };
  }, [fromDate, toDate]);
  return (
    <Fragment>
      <div className={styles.container}>
        <div>
          <input
            min={Date.now()}
            onChange={(event: any) => setFromDate(event?.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            placeholder={"From"}
            type={"text"}
          />
        </div>
        <div>
          <input
            min={Date.now()}
            onChange={(event: any) => setToDate(event?.target.value)}
            onFocus={(e) => (e.target.type = "date")}
            placeholder={"To"}
            type={"text"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default DateRangeComponent;
