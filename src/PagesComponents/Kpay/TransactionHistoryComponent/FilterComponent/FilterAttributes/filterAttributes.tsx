/* eslint-disable @typescript-eslint/ban-types */
import { Input, Select } from "Components/Form/inputs";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./filterAttributes.module.scss";
import { channelsData, buttonData } from "./data";
import Button from "Components/Button/button";
import Icon from "Components/Icons";
import DateRangeComponent from "../DateRangeComponent";
import { composeClasses } from "libs/utils/utils";

interface IProps {
  close: Function;
  onFilter: Function;
}

const FilterAttributesComponent: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const [showRange, setShowRange] = useState(false);
  const [activetab, setActiveTab] = useState("");
  const [attributes, setAttributes] = useState<any>();
  const [channel, setChannel] = useState<string>("All");
  const [range, setRange] = useState<any>();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.onFilter(attributes);
    }
    return () => {
      mounted = false;
    };
  }, [attributes]);

  const handleActiveTab = (event: any, button: any) => {
    setActiveTab(button.value);
    setRange({
      from: button.from,
      to: button.to,
      type: button.type,
    });
  };

  const handleShowRange = () => {
    setShowRange(!showRange);
  };

  const handleSetAttributes = () => {
    setAttributes({
      channel: channel,
      range: range,
    });
  };

  const handleDateRangeChange = (dateRange: any) => {
    setRange(dateRange);
  };

  const handleFilter = () => {
    handleSetAttributes();
  };

  const buttons = buttonData.map((button, i) => {
    return (
      <span
        className={
          activetab === button.value
            ? composeClasses(styles.buttonStyles, styles.active)
            : styles.buttonStyles
        }
        key={i}
        onClick={(e) => handleActiveTab(e, button)}
      >
        {button.value}
      </span>
    );
  });

  return (
    <Fragment>
      <div className={styles.filterAttributes}>
        <div className={styles.filterWrapper}>
          <div className={styles.channels}>
            <div className={styles.header}>
              <span onClick={() => props.close()}>
                <Icon name="closeFilter" />
              </span>
              <p>Filter Transaction</p>
            </div>
            <Select
              className={"form-select mb-4 " + styles.select}
              label={"Channel"}
              name={"channel"}
              onChange={(event: any) => setChannel(event?.target.value)}
              options={channelsData}
              value={channel}
            />
            <div className={styles.buttonContainer}>{buttons}</div>
            <div className={"pt-3"}>
              <p className={styles.label}>Choose Range</p>
              <div className={styles.rangeHolder} onClick={handleShowRange}>
                <div className={styles.calendarIcon}>
                  <Icon name="date-range" />
                </div>
                <p>Select Date Range</p>
              </div>
            </div>
            <div className={styles.dateInputHolder}>
              {showRange && (
                <DateRangeComponent onDateRangeChange={handleDateRangeChange} />
              )}
            </div>
            <hr className={styles.hr} />
            <div className={styles.buttonHolder}>
              <button
                className={styles.cancelButton}
                onClick={() => props.close()}
                type="submit"
              >
                Cancel
              </button>
              <button
                className={styles.filterButton}
                onClick={handleFilter}
                type="button"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FilterAttributesComponent;
