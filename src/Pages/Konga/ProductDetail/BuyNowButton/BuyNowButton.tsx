/* eslint-disable @typescript-eslint/ban-types */
import Button from "Components/Button/button";
import Icon from "Components/Icons";
import { composeClasses } from "libs/utils/utils";
import React, { Fragment } from "react";
import styles from "./BuyNowButton.module.scss";

interface IProps {
  onAddToCart: Function;
  isSubmitting: boolean;
  isSavedItem: boolean;
  onRemoveItem: Function;
  onAddItem: Function;
  isLoading: boolean;
}

const BuyNowButton: React.FunctionComponent<IProps> = (properties: IProps) => {
  return (
    <Fragment>
      <div className={styles.buyNowButton}>
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={properties.onAddToCart}
            isSubmitting={properties.isSubmitting}
            title="Buy Now"
          />
        </div>
        <div
          className={styles.saveForLater}
          onClick={() =>
            properties.isSavedItem
              ? properties.onRemoveItem()
              : properties.onAddItem()
          }
        >
          <div>
            <div
              className={composeClasses(
                styles.iconWrapper,
                styles.tabletAndAboveOnly
              )}
            >
              {properties.isSavedItem ? (
                <Icon name="coloredSavedForLaterBig" />
              ) : (
                <Icon name="saveForLater" />
              )}
            </div>
            <div className={styles.mobileOnly}>
              {properties.isSavedItem ? (
                <Icon name="coloredSavedForLaterSmall2" />
              ) : (
                <Icon name="heart3" />
              )}
            </div>
            {properties.isSavedItem ? (
              <p className={styles.tabletAndAboveOnly}>Saved</p>
            ) : properties.isLoading ? (
              <p className={styles.tabletAndAboveOnly}>Saving...</p>
            ) : (
              <p className={styles.tabletAndAboveOnly}>Save For Later</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BuyNowButton;
