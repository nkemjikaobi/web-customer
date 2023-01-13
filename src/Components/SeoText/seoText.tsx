import React from "react";
import styles from "./seoText.module.scss";
interface IProps {
  title: string;
  text: string;
}
const seoText: React.FunctionComponent<IProps> = ({ title, text }: IProps) => {
  return (
    <div className={styles.seoText}>
      <h1 className={styles.seoText_title}>{title}</h1>
      <p className={styles.seoText_text}>{text}</p>
    </div>
  );
};

export default seoText;
