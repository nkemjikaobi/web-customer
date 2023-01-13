import React, { Fragment } from "react";
import styles from "./filterWrapper.module.scss";
interface IProp {
  heading: string;
  children?: React.ReactNode;
  type: string;
}
const ShoppingfilterWrapper: React.FunctionComponent<IProp> = (
  props: IProp
) => {
  return (
    <div className={styles.filterWrapper}>
      <div className={styles.header}>
        <h1>{props.heading}</h1>
        {props.type === "shopping" && <div className={styles.dash} />}
      </div>
      {props.children}
    </div>
  );
};

ShoppingfilterWrapper.defaultProps = {
  children: <Fragment />,
};
export default ShoppingfilterWrapper;
