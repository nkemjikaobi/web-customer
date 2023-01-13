/* eslint-disable @typescript-eslint/ban-types */
import Icon from "Components/Icons";
import React, { Fragment } from "react";
import styles from "./FilterSortCallerMobile.module.scss";

interface IProps {
  onShowFilter: Function;
}

const FilterSortCallerMobile: React.FunctionComponent<IProps> = (
  properties: IProps
) => {
  return (
    <Fragment>
      <div className={styles.filterSortCaller}>
        <div
          className={styles.filterBy}
          onClick={() => properties.onShowFilter()}
        >
          <Icon name="funnelFilter" />
          <span>Filter By</span>
        </div>
        <div className={styles.sortBy}>
          <Icon name="upDownArrows" />
          <span>Sort By</span>
        </div>
      </div>
    </Fragment>
  );
};

export default FilterSortCallerMobile;
