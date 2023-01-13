import React from "react";

import Icon from "Components/Icons/icon";
import styles from "./promoCards.module.scss";
import { Link } from "react-router-dom";

export interface IProps {
  alternativeText: string;
  description: string;
  image: string;
  link: string;
  title: string;
  category?: any;
}
const PromoCard: React.FunctionComponent<IProps> = ({
  alternativeText,
  description,
  image,
  link,
  title,
  category,
}) => (
  <Link
    className={styles.promoCard}
    onClick={() => localStorage.setItem("currentCategory", category)}
    to={link}
  >
    <section className={styles.promoCardImageContainer}>
      <img
        alt={alternativeText}
        className={styles.promoCardImage}
        srcSet={image}
      />
    </section>

    <section className={styles.promoCardDetailsWrapper}>
      <h2 className={styles.promoCardTitle}>{title}</h2>
      <p className={styles.promoCardDescription}>{description}</p>

      <span className={styles.promoCardAction}>
        SHOP NOW
        <Icon name="chevron-next" />
      </span>
    </section>
  </Link>
);

export default PromoCard;

PromoCard.defaultProps = {
  category: "",
};
