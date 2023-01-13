import React, { Fragment } from "react";
import { composeClasses } from "libs/utils/utils";
import styles from "./checkoutMobile.module.scss";
import Icon from "Components/Icons";

interface IProps {
  currentStep: number;
}
const data = [
  {
    icon: "house",
    name: "Delivery",
  },
  {
    icon: "house",
    name: "Payment",
  },
  {
    icon: "house",
    name: "Finished",
  },
];

const FormNav: React.FunctionComponent<IProps> = ({ currentStep }) => {
  const navList = data.map((e, i) => {
    return (
      <div
        className={composeClasses(
          currentStep >= i ? styles.active : styles.navLink
        )}
        key={i}
      >
        <div>
          <Icon name={e.icon} />
        </div>
        <p>{e.name}</p>
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
