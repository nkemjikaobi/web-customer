/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Button from "Components/Button/button";
import styles from "./sideBar.module.scss";

export interface Props {
  buttonTitle: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
  heading: string;
  onSubmit: Function;
  onClose: Function;
}

const sideBar: React.FunctionComponent<Props> = (props: Props) => {
  const [heading, setHeading] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    return () => {
      mounted = false;
    };
  }, [props]);

  const handleClose = (event: any) => {
    props.onClose(event);
  };
  return (
    <Fragment>
      <div className={styles.sideBar}>
        <div className={styles.heading}>
          <h1>{props.heading}</h1>
          <div className={styles.close} onClick={handleClose}>
            <p>X</p>
          </div>
        </div>
        <div className={styles.Main + " p-3"}>{props.children}</div>
        <div className={styles.bottom}>
          <Button
            className={"btn btn-danger text-white"}
            handleClick={props.onSubmit}
            isSubmitting={props.isSubmitting ?? false}
            title={props.buttonTitle}
          />
        </div>
      </div>
    </Fragment>
  );
};
export default sideBar;
