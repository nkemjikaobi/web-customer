import React from "react";
import Icon from "Components/Icons/icon";
import CheckboxFilter from "Components/Filter/CheckboxFilter/checkboxFilter";
import RadioFilter from "Components/Filter/RadioFilter/radioFilter";
import { filterByData, sortByData } from "./data";
import styles from "./foodFilter.module.scss";

const checkboxFilters = filterByData.map((e) => {
  return (
    <div key={e}>
      <CheckboxFilter text={e} />
    </div>
  );
});

const radioFilters = sortByData.map((e) => {
  return (
    <div key={e}>
      <RadioFilter
        name={"foodFilter"}
        onChange={undefined}
        text={e}
        value={undefined}
      />
    </div>
  );
});
const foodFilter: React.FunctionComponent = () => {
  return (
    <div className={styles.foodFilter}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Filter By</h1>
        </div>
        <div className={styles.icon}>
          <Icon name="arrow-up" />
        </div>
      </div>
      <div className={styles.checkboxFiltersContainer}>{checkboxFilters}</div>
      <div className={styles.foodFilter}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.heading}>Filter By</h1>
          </div>
          <div className={styles.icon}>
            <Icon name="arrow-up" />
          </div>
        </div>
        <div>{radioFilters}</div>
      </div>
    </div>
  );
};

export default foodFilter;
