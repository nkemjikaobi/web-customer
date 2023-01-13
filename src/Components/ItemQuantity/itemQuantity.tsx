/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";

import styles from "./itemQuantity.module.scss";

export interface IQuantityItem {
  value: number;
  availableQty: number | 0;
  onChange: Function;
  type?: string;
}

const ItemQuantity: React.FunctionComponent<IQuantityItem> = ({
  value,
  onChange,
  availableQty,
  type,
}: IQuantityItem) => {
  const [quantity, setQuantity] = useState(value);
  useEffect(() => {
    let mounted = value;
    if (mounted) setQuantity(mounted);
    return () => {
      mounted = 0;
    };
  }, [value]);

  const increase = () => {
    let newQty = quantity + 1;
    newQty = newQty <= availableQty ? newQty : newQty - 1;
    setQuantity(newQty);
    onChange(newQty);
  };
  const decrease = () => {
    let newQty = quantity - 1;
    newQty = newQty <= 0 ? 1 : newQty;
    setQuantity(newQty);
    onChange(newQty);
  };

  const className =
    type === "food" ? styles.itemQuantityFood : styles.itemQuantity;

  return (
    <div className={className}>
      <div className={styles.buttonWrapper}>
        <button onClick={decrease}>-</button>
      </div>
      <small>{quantity}</small>
      <div className={styles.buttonWrapper}>
        <button onClick={increase}>+</button>
      </div>
    </div>
  );
};

ItemQuantity.defaultProps = {
  type: "",
};

export default ItemQuantity;
