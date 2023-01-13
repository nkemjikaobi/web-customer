import accounting from "accounting";
import Icon from "Components/Icons";
import { IJourneyPrice } from "dto/KongaTravel/ISearchResponse";
import { composeClasses } from "libs/utils/utils";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./FareBreakdown.module.scss";

interface IProps {
  priceBreakdown: IJourneyPrice;
}

const FareBreakdown: React.FunctionComponent<IProps> = (properties: IProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [totalFare, setTotalFare] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(0);
  const [totalCharge, setTotalCharge] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("NGN");

  useEffect(() => {
    let mounted = true;

    if (mounted && properties.priceBreakdown) {
      const prices = properties.priceBreakdown.total_breakup;
      setTotalCharge(properties.priceBreakdown.api_total_display_fare);
      setCurrency(properties.priceBreakdown.api_currency);
      if (prices) {
        setTotalFare(prices.api_total_fare);
        setTaxes(prices.api_total_tax);
      }
    }

    return () => {
      mounted = false;
    };
  }, [properties.priceBreakdown]);

  return (
    <Fragment>
      <div className={styles.fareBreakdown}>
        <div
          className={composeClasses(styles.dropdownNode, styles.mainNode)}
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className={styles.title}>
            <Icon name="chartLine" />
            <span>Fare Breakdown</span>
          </div>
          {showDetails === true ? (
            <Icon name="chevron-up" />
          ) : (
            <Icon name="chevron-right" />
          )}
        </div>
        {showDetails && (
          <div className={styles.fareDetails}>
            <div
              className={composeClasses(
                styles.dropdownNode,
                styles.detailsNode
              )}
            >
              <div className={styles.title}>
                <span>Traveller x 1</span>
              </div>
              <span>
                {currency}
                {accounting.formatNumber(totalFare)}
              </span>
            </div>
            <div
              className={composeClasses(
                styles.dropdownNode,
                styles.detailsNode
              )}
            >
              <div className={styles.title}>
                <span>Taxes and fees</span>
              </div>
              <span>
                {`${currency}`} {`${taxes}`}
              </span>
            </div>
            <div
              className={composeClasses(
                styles.dropdownNode,
                styles.detailsNode,
                styles.total
              )}
            >
              <div className={styles.title}>
                <span>Total</span>
              </div>
              <span>
                {currency}
                {totalCharge}
              </span>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default FareBreakdown;
