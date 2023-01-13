/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import Icon from "Components/Icons/icon";
import styles from "./PickupLocationCard.module.scss";

export interface IPickupLocationCard {
  address: string;
  city: string;
  phone: string;
  lga: string;
  selectedCard: boolean;
  onClick: any;
}

const PickupLocationCard: React.FunctionComponent<IPickupLocationCard> = (
  props: IPickupLocationCard
) => {
  const [locationAddress, setLocationAddress] = useState<string>("");
  const [locationPhone, setLocationPhone] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setLocationAddress([props.address, props.city, props.lga].join(", "));
    setLocationPhone(props.phone);
    setIsSelected(props.selectedCard);
  }, [props]);

  return (
    <div
      className={`${styles.pickupLocation} ${isSelected ? styles.active : ""}`}
      onClick={props.onClick}
    >
      <div
        className={`${styles.heading} ${
          isSelected ? styles.heading_active : ""
        }`}
      >
        <div className={styles.checkmark} />
        {isSelected ? (
          <Icon className={"me-4"} name={"addressCardSelected"} />
        ) : (
          <div className={"me-4 pe-3"} />
        )}
        <h1>Pickup Location</h1>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.address}>
          {isSelected ? (
            <Icon className={"me-3"} name="addressSelected" />
          ) : (
            <Icon className={"me-3"} name="addressUnselected" />
          )}
          <div className={styles.info}>
            <h2>Address</h2>
            <p>{locationAddress}</p>
          </div>
        </div>
        <div className={styles.address}>
          {isSelected ? (
            <Icon className={"me-3"} name="phoneSelected" />
          ) : (
            <Icon className={"me-3"} name="phoneUnselected" />
          )}
          <div className={styles.info}>
            <h3>Contact Information</h3>
            <p>{locationPhone}</p>
          </div>
        </div>
        <div className={styles.address}>
          <div className={"me-4 pe-2"} />
          <div className={styles.info}>
            <h4>Opening Hours</h4>
            <p>Mon - Fri 9am-4pm; Closed on Weekends</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PickupLocationCard;
