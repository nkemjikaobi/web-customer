/* eslint-disable @typescript-eslint/ban-types */
import IState from "dto/KongaOnline/IState";
import React, { useEffect, useState } from "react";
import styles from "./locationData.module.scss";
import LocationDataItem from "./locationDataItem";

export interface ILocationData {
  states: any;
}

const LocationDataComponent = (properties: ILocationData) => {
  const [states, setStates] = useState<Array<IState>>([]);

  useEffect(() => {
    let mounted = properties.states;
    if (mounted) {
      setStates(mounted);
    }
    return () => {
      mounted = [];
    };
  }, [properties]);
  return (
    <div>
      <ul className={styles.locationList}>
        {states.length > 0 &&
          states.map((state: any) => (
            <LocationDataItem key={state.id} state={state} />
          ))}
      </ul>
    </div>
  );
};

export default LocationDataComponent;
