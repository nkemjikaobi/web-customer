import React from "react";
import FoodImg from "Assets/images/png/food.png";
import styles from "./listingCard2.module.scss";

interface IProps {
  title: string;
  foodType: string;
  percentage: string;
}
const ListingCard2: React.FunctionComponent<IProps> = ({
  title,
  foodType,
  percentage,
}) => {
  return (
    <div className={styles.listingCard}>
      <div className={styles.listingCard_top}>
        <img src={FoodImg} />
        <div className={styles.timeTag}>
          <p>
            35-45 <span>min</span>
          </p>
        </div>
      </div>
      <div className={styles.listingCard_bottom}>
        <h1>{title}</h1>
        <p>4.5 (73) American • burger</p>
        <p>.{foodType}</p>
        <p className={styles.percentage}>{`${percentage} off every meal`}</p>
      </div>
    </div>
  );
};

export default ListingCard2;
