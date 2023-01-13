import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./locationData.module.scss";

const LocationDataItem = ({ state }: any) => {
  return (
    <Fragment>
      <li className={styles.locationList}>
        <Link
          className={styles.linkStyle}
          to={`/send-package/stores?state=${state.name}&geocode=${state.id}`}
        >
          {state.name} ({state.lgas.length})
        </Link>
      </li>
    </Fragment>
  );
};

export default LocationDataItem;
