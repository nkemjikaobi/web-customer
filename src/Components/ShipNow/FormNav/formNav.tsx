import React, { Fragment } from "react";
import { composeClasses } from "libs/utils/utils";
import styles from "./formNav.module.scss";
import Icon from "Components/Icons";

interface IProps {
  currentStep: number;
}
const data = ["Source Address", "Destination Address", "Finished"];

const FormNav: React.FunctionComponent<IProps> = ({ currentStep }) => {
  const navList = data.map((e, i) => {
    return (
      <div
        className={composeClasses(
          currentStep >= i ? styles.active : styles.navLink
        )}
        key={i}
      >
        {currentStep > i ? (
          <div className={styles.numberWrapper}>
            <span>&#10003;</span>
          </div>
        ) : (
          <div className={styles.numberWrapper}>{i + 1}</div>
        )}
        <p>{e}</p>
      </div>
    );
  });
  return (
    <Fragment>
      <div className={styles.formNav}>{navList}</div>
    </Fragment>
  );
};

export default FormNav;
