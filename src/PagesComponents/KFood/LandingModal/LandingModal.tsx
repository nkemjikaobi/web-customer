/* eslint-disable @typescript-eslint/ban-types */
import useClickOutSide from "CustomHooks/useClickOutSide";
import React, { Fragment } from "react";
import styles from "./LandingModal.module.scss";

interface IProps {
  onCloseModal: Function;
}

const LandingModal: React.FunctionComponent<IProps> = (properties: IProps) => {
  const closeModal = useClickOutSide(() => {
    properties.onCloseModal();
  });
  return (
    <Fragment>
      <div className={styles.landingModal}>
        <div className={styles.details} ref={closeModal}>
          <div className={styles.message}>
            <p>
              To see restaurants around you, kindly tell us your location by
              selecting your <b>State and Area.</b>
            </p>
          </div>

          <div
            className={styles.iGetIt}
            onClick={() => properties.onCloseModal()}
          >
            <span>Ok, I get it</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingModal;
