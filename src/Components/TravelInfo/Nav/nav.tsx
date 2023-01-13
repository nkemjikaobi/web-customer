import React, { Fragment } from "react";
import { composeClasses } from "libs/utils/utils";
import styles from "./nav.module.scss";
import Icon from "Components/Icons";

interface IProps {
  currentStep: number;
}
const data = [
  {
    icon: "travelers",
    text: "Travellers Informations",
  },
  {
    icon: "extras",
    text: "Extras",
  },
  {
    icon: "paymentMethod",
    text: "Payment Method",
  },
  {
    icon: "bookingConfirmation",
    text: "Booking Confirmation",
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
        <div
          className={composeClasses(
            styles.navItemWrapper,
            i === 3 ? styles.hideInMobile : styles.hideInMobile2
          )}
        >
          <div>
            {currentStep > i || currentStep === 3 ? (
              <div
                className={composeClasses(
                  currentStep >= i
                    ? styles.activeIconWrapper
                    : styles.iconWrapper
                )}
              >
                <p className={styles.checkmark}>&#10003;</p>
              </div>
            ) : (
              <div
                className={composeClasses(
                  currentStep >= i
                    ? styles.activeIconWrapper
                    : styles.iconWrapper
                )}
              >
                <Icon name={e.icon} />
              </div>
            )}
            <p
              className={composeClasses(
                currentStep >= i ? styles.activeText : styles.text
              )}
            >
              {e.text}
            </p>
          </div>
        </div>
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
