import IOurLocation from "dto/KongaExpress/IOurLocation";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./OurLocationCard.module.scss";
import LocationIcon from "Assets/images/png/storeLocationIcon.png";

export interface ILocationCard {
  location: IOurLocation;
}

const LocationCard: React.FunctionComponent<ILocationCard> = ({
  location,
}: ILocationCard) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [storeAddress, setStoreAddress] = useState<string>("");
  const [isPickUpLocation, setIsPickUpLocation] = useState<boolean>(false);
  const [isDropOffLocation, setIsDropOffLocation] = useState<boolean>(false);

  useEffect(() => {
    let mounted: IOurLocation | undefined = location;

    if (mounted) {
      setPhoneNumber(mounted.phone);
      setStoreName(mounted.name);
      setStoreAddress(mounted.address);
      setIsDropOffLocation(mounted.can_ingest === 1);
      setIsPickUpLocation(mounted.is_pickup_location === 1);
    }

    return () => {
      mounted = undefined;
    };
  }, [location]);
  return (
    <Fragment>
      <div className={styles.locationCard}>
        <div className={styles.card}>
          <div className={styles.storeName}>
            <img src={LocationIcon} />
            <h3 className={"text-capitalize"}>{storeName}</h3>
          </div>
          <div className={styles.addressDetails}>
            <p className={styles.address}>{storeAddress}</p>
            <div className={"row m-0 p-0"}>
              <div className={"col ps-0"}>
                <span className={"h6 " + styles.fonts}>Working Hours</span>
                <p className={styles.workingHours}>Mon-Sat, 8am – 5pm</p>
              </div>
              <div className={"col ps-0"}>
                <span className={"h6 " + styles.fonts}>Phone Number</span>
                <p className={styles.phone}>{phoneNumber}</p>
              </div>
            </div>
            <p className={styles.deliveryOptions}>
              {isDropOffLocation ? "DropOff" : ""}{" "}
              {isPickUpLocation ? "PickUp" : ""}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LocationCard;
