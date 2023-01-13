import React from "react";
import styles from "./FoodStepCard.module.scss";

interface IStepCard {
  image: string;
  title: string;
  description: string;
}

const FoodStepCard: React.FunctionComponent<IStepCard> = (props: IStepCard) => {
  return (
    <div className={styles.stepCard}>
      <div className={styles.stepCard_image}>
        <img src={props.image} />
      </div>
      <h5 className="pt-3 pb-2">{props.title}</h5>
      <p>{props.description}</p>
    </div>
  );
};

export default FoodStepCard;
