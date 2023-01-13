/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import Icon from "Components/Icons/icon";
import styles from "./itemDetailsCard.module.scss";
import { composeClasses } from "libs/utils/utils";
import Skeleton from "react-loading-skeleton";

const ItemDetailsTemplateCard: React.FunctionComponent = () => (
  <div className={styles.itemDetailsCard}>
    <div className={"row w-100 position-relative"}>
      {/* <p>Item Details</p> */}
      <div className={styles.mobileOnly}>
        <div className={styles.numberOfDelivery}>
          <span>Deliver 1 of 3</span>
        </div>
      </div>
      <div
        className={composeClasses(
          "col-md-5 col-sm-12 d-flex",
          styles.productCard
        )}
      >
        <div className={styles.image}>
          <Skeleton height={100} />
        </div>
        <div className={composeClasses("w-100", styles.productInfo)}>
          <h6 className={composeClasses(styles.name, "h6")}>
            <Skeleton className={"w-100"} />
          </h6>
          <h6 className={composeClasses(styles.name, "h6")}>
            <Skeleton className={"w-50"} />
          </h6>
          <Skeleton height={10} width={40} />
        </div>
      </div>
      <div
        className={composeClasses(
          "col-md-2 col-sm-5",
          styles.quantityContainer
        )}
      >
        <div className={styles.quantity}>
          <p className={styles.mobileOnly}>Quantity</p>
          <Skeleton height={30} />
        </div>
      </div>
      <div
        className={composeClasses(
          styles.priceContainer,
          "col-md-2 col-sm-7 text-end"
        )}
      >
        <div className={styles.price}>
          <Skeleton />
          <div className={styles.btmPriceInfo}>
            <Skeleton />
          </div>
        </div>
      </div>
      <div
        className={composeClasses(
          styles.productIconsContainer,
          "col-md-3 col-sm-12"
        )}
      >
        <div className={styles.productIcons}>
          <div className={`${styles.removeItem} pt-2 me-2`}>
            <div className={`${styles.iconWrapper} mt-1 mx-2`}>
              <Icon className={"ms-1"} name="trash" />
            </div>
            <Skeleton className={"mt-3"} height={10} width={80} />
          </div>
          <div className={`${styles.saveItem}`}>
            <div className={`${styles.iconWrapper} mt-1 mx-2`}>
              <Icon name="heart" />
            </div>
            <Skeleton height={10} width={80} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ItemDetailsTemplateCard;
