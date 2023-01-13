import React from "react";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import styles from "./foodOptions.module.scss";

interface IProps {
  name: string;
  amount: number;
}

const FoodOptions: React.FunctionComponent<IProps> = ({
  name,
  amount,
}: IProps) => {
  return (
    <div className={styles.foodOptions}>
      <div className={styles.inputWrapper}>
        <input
          className={"form-check-input"}
          defaultChecked={true}
          name={"foodOption"}
          type={"radio"}
        />
        <label>{name}</label>
      </div>
      <p>{`${accounting.formatMoney(amount, CURRENCIES.NAIRA)}`}</p>
    </div>
  );
};

export default FoodOptions;
