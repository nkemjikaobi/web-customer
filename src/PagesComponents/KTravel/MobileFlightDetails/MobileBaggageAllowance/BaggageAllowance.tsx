import Icon from "Components/Icons";
import { composeClasses } from "libs/utils/utils";
import React, { Fragment, useState } from "react";
import styles from "./BaggageAllowance.module.scss";

const BaggageAllowance: React.FunctionComponent = () => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <Fragment>
      <div className={styles.baggageAllowance}>
        <div
          className={composeClasses(styles.dropdownNode, styles.mainNode)}
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className={styles.title}>
            <Icon name="briefcase" />
            <span>Baggage Allowance</span>
          </div>
          {showDetails === true ? (
            <Icon name="chevron-up" />
          ) : (
            <Icon name="chevron-right" />
          )}
        </div>
        {showDetails && (
          <div className={styles.baggageDetails}>
            <div
              className={composeClasses(
                styles.dropdownNode,
                styles.detailsNode
              )}
            >
              <div className={styles.title}>
                <Icon name="handLuggage" />
                <span>Hand Baggage</span>
              </div>
              {/* <span>Not Allowed</span> */}
            </div>
            <div
              className={composeClasses(
                styles.dropdownNode,
                styles.detailsNode
              )}
            >
              <div className={styles.title}>
                <Icon name="luggageLoader" />
                <span>Check-in Baggage</span>
              </div>
              {/* <span>45kg / Person</span> */}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default BaggageAllowance;
