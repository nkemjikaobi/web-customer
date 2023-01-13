/* eslint-disable @typescript-eslint/ban-types */
import { composeClasses } from "libs/utils/utils";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./numberInput.module.scss";

export interface INumberInput {
  onChange: Function;
  value: any;
  defaultValue: any;
}

const NumberInput: React.FunctionComponent<INumberInput> = (
  props: INumberInput
) => {
  const [value, setValue] = useState(props.defaultValue);
  const [updating, setUpdating] = useState(false);

  const reduceNumber = (event: any) => {
    event.preventDefault();
    const tempValue = value <= 1 ? 1 : value - 1;
    setValue(tempValue);
    setUpdating(true);
    props.onChange(tempValue);
  };

  const increaseNumber = (event: any) => {
    event.preventDefault();
    const tempValue = value <= 0 ? 1 : value + 1;
    setValue(tempValue);
    setUpdating(true);
    props.onChange(tempValue);
  };

  useEffect(() => {
    let mounted = true;

    if (!updating) {
      setValue(props.defaultValue);
      setUpdating(false);
    }
    return () => {
      mounted = false;
    };
  }, [props]);

  return (
    <Fragment>
      <div className={composeClasses("input-group", styles.numberInput)}>
        <div className={"input-group-prepend"}>
          <button
            className={"btn btn-sm btn-outline-secondary " + styles.plusMinus}
            disabled={value <= 1}
            onClick={reduceNumber}
          >
            -
          </button>
        </div>
        <span
          className={
            "form-control border-secondary form-control-sm text-center"
          }
        >
          {value}
        </span>
        <div className={"input-group-append"}>
          <button
            className={"btn btn-sm btn-outline-secondary " + styles.plusMinus}
            onClick={increaseNumber}
          >
            +
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default NumberInput;
