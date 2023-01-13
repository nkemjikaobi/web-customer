/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./CheckboxFilterInput.module.scss";

export interface ICheckboxFilterInput {
  name: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange: Function;
}

const CheckboxFilterInput: React.FunctionComponent<ICheckboxFilterInput> = (
  props: ICheckboxFilterInput
) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    let mounted = isChecked;
    props.onChange(mounted);
    return () => {
      mounted = false;
    };
  }, [isChecked]);

  useEffect(() => {
    let mounted = props.defaultChecked;
    // setIsChecked(mounted ?? false);
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = props.checked;
    // setIsChecked(mounted ?? false);
    return () => {
      mounted = false;
    };
  }, [props]);

  return (
    <Fragment>
      <div className={"input-box"}>
        <label className={styles.label}>
          {props.defaultChecked !== undefined ? (
            <Fragment>
              <input
                className={styles.input + " form-check-input pt-1"}
                defaultChecked={props.defaultChecked}
                name={props.name ?? "checkbox"}
                onChange={(e: any) => setIsChecked(!isChecked)}
                type={"checkbox"}
              />
            </Fragment>
          ) : (
            <input
              checked={isChecked}
              className={styles.input + " form-check-input pt-1"}
              name={props.name ?? "checkbox"}
              onChange={() => setIsChecked(!isChecked)}
              type={"checkbox"}
            />
          )}
          <small className={"ps-2"}>{props.label}</small>
        </label>
      </div>
    </Fragment>
  );
};

CheckboxFilterInput.defaultProps = {
  checked: false,
  defaultChecked: false,
};

export default CheckboxFilterInput;
