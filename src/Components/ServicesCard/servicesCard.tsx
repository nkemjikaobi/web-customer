import React from "react";
import Icon from "Components/Icons/icon";
import styles from "./servicesCard.module.scss";
interface IProps {
  icon: string;
  title: string;
  text: string;
}
const ServicesCard: React.FunctionComponent<IProps> = ({
  icon,
  title,
  text,
}: IProps) => {
  return (
    <div className={styles.servicesCard}>
      <img alt="Services Icons" src={icon} width="30px" />
      <h1 className={styles.servicesCard_title}>{title}</h1>
      <p className={styles.servicesCard_text}>{text}</p>
    </div>
  );
};

export default ServicesCard;
