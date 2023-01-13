/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment } from "react";
import FilterAttributesComponent from "./FilterAttributes/filterAttributes";
import styles from "./filterComponent.module.scss";

interface IProps {
  isDisplayed: boolean;
  hideFilter: Function;
  onFilter: Function;
}

const FilterComponent: React.FunctionComponent<IProps> = (props: IProps) => {
  const handleFilter = (attributes: any) => {
    props.onFilter(attributes);
  };
  if (props.isDisplayed) {
    return (
      <Fragment>
        <div
          className={styles.filterComponent}
          onClick={() => props.hideFilter()}
        />
        <div className={styles.filterInner}>
          <FilterAttributesComponent
            close={props.hideFilter}
            onFilter={handleFilter}
          />
        </div>
      </Fragment>
    );
  }
  return null;
};

export default FilterComponent;
