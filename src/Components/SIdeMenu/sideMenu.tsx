/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment } from "react";
import Button from "Components/Button/button";
import styles from "./sideMenu.module.scss";

interface Props {
  heading: string;
  buttonTitle: string;
  renderContent: Function;
}

const sideMenu: React.FunctionComponent<Props> = ({
  heading,
  buttonTitle,
  renderContent,
}: Props) => {
  return (
    <Fragment>
      <div className={styles.sideMenu}>
        <div className={styles.heading}>
          <h1>{heading}</h1>
          <div className={styles.close}>
            <p>X</p>
          </div>
        </div>
        <div className={styles.sideMenu_Main + " py-3"}>{renderContent()}</div>
        <div className={styles.bottom}>
          <Button
            btnClass={"btn-primary text-white"}
            className={"btn"}
            title={buttonTitle}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default sideMenu;
