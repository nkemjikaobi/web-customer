/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment } from "react";
import styles from "./TermsAndConditionsCheckBox.module.scss";

interface IProps {
  isChecked: any;
  onChange: Function;
}

const TermsAndConditionsCheckBox: React.FunctionComponent<IProps> = (
  properties: IProps
) => {
  return (
    <Fragment>
      <div className={styles.termsAndConditionsCheckBox}>
        <div className={styles.terms}>
          <div className={"form-check ps-0"}>
            <input
              checked={properties.isChecked}
              className={"form-check-input"}
              id={"policyAgree"}
              name={"policyAgree"}
              onChange={(e) => properties.onChange(e)}
              required={true}
              type={"checkbox"}
              value={properties.isChecked}
            />
            <label className={"form-check-label h-100"} htmlFor={"policyAgree"}>
              <small className={"text-wrap " + styles.smallText}>
                By clicking Continue you agree to our{" "}
                <span className={styles.termsAndConditions}>
                  <a href="/terms-and-conditions">Terms and Conditions</a>
                </span>{" "}
                <span>and Privacy Policy</span>
              </small>
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TermsAndConditionsCheckBox;
