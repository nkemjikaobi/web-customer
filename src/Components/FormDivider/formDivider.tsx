import React from "react";
import styles from "./formDivider.module.scss";

interface IProps {
  text: string;
}
const formDivider = ({ text }: IProps) => {
  return (
    <div className={styles.formDividerContainer}>
      <div className={styles.line1} />
      <p>or {text} with </p>
      <div className={styles.line2} />
    </div>
  );
};

export default formDivider;
