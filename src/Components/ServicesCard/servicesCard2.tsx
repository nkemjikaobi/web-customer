/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import IconText from "Components/IconText/iconText";
import styles from "./servicesCard2.module.scss";
import CategoriesComponentModel from "Models/ComponentModels/Home/CategoriesComponentModel";
interface IProps {
  title: string;
  data: any[];
}
const ServicesCard: React.FunctionComponent<IProps> = (props: IProps) => {
  const { title, data }: IProps = props;

  const getRoute: Function = (param: {
    icon: string;
    title: string;
    route: string;
  }): string =>
    param.route
      ? param.route
      : param.title.trim().toLowerCase().replace(" ", "-");

  const cards =
    data &&
    data.map((e: { icon: string; title: string; route: string }, i) => (
      <IconText component={e.title} icon={e.icon} key={i} title={e.title} />
    ));
  return (
    <div className={styles.servicesCard}>
      <h1 className={styles.servicesCard_title}>{title}</h1>
      <div className={styles.servicesCard_cards}>{cards}</div>
    </div>
  );
};

export default ServicesCard;
