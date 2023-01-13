import Icon from "Components/Icons";
import IProduct from "dto/KongaOnline/IProduct";
import { composeClasses } from "libs/utils/utils";
import { range } from "lodash";
import React, { Fragment, useState } from "react";
import BestSellingProductCard from "../BestSellingProductCard";
import { ProductCardTemplate } from "../listingCard4";
import styles from "./BestSellingProducts.module.scss";

interface IProps {
  bestSellingProducts: Array<IProduct> | null | undefined;
}

const BestSellingProducts: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const [showPreviousArrow, setShowPrevArrow] = useState<boolean>(false);

  const moveFoward = () => {
    const container = document.getElementById("bestSelling");
    sideScroll(container, "right", 25, 100, 10);
    setShowPrevArrow(true);
  };

  const goBack = () => {
    const container = document.getElementById("bestSelling");
    sideScroll(container, "left", 25, 100, 10);
  };
  const sideScroll = (
    element: any,
    direction: string,
    speed: number,
    distance: number,
    step: number
  ) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(function () {
      if (direction === "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;

      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };
  return (
    <Fragment>
      <div className={styles.bestSellingProductsWrapper}>
        {/* {props.bestSellingProducts && props.bestSellingProducts.length > 6 ? (
          <div className={styles.leftPointer} onClick={() => goBack()}>
            {showPreviousArrow && (
              <Icon
                className={styles.tabletAndAboveOnly}
                name="arrowLeftPink"
              />
            )}

            {showPreviousArrow && (
              <Icon className={styles.mobileOnly} name="arrowLeftPink" />
            )}
          </div>
        ) : (
          <div className={styles.leftPointer} onClick={() => goBack()}>
            {showPreviousArrow && (
              <Icon className={styles.mobileOnly} name="arrowLeftPink" />
            )}
          </div>
        )} */}

        {props.bestSellingProducts?.length !== 0 && (
          <section className={composeClasses(styles.bestSellingProduct)}>
            <div className={styles.heading}>
              <h3>Best Selling Products</h3>
            </div>
            <div className={styles.content} id="bestSelling">
              {props.bestSellingProducts !== null
                ? props.bestSellingProducts &&
                  props.bestSellingProducts.map(
                    (bestSellingProduct: IProduct, index: number) => (
                      <BestSellingProductCard
                        key={index}
                        product={bestSellingProduct}
                      />
                    )
                  )
                : range(5).map((index: number) => (
                    <ProductCardTemplate key={index} />
                  ))}
            </div>
          </section>
        )}
        {/* 
        {props.bestSellingProducts && props.bestSellingProducts.length > 6 ? (
          <div className={styles.rightPointer} onClick={() => moveFoward()}>
            <Icon className={styles.tabletAndAboveOnly} name="arrowRightPink" />

            <Icon className={styles.mobileOnly} name="arrowRightPink" />
          </div>
        ) : (
          <div className={styles.rightPointer} onClick={() => moveFoward()}>
            <Icon className={styles.mobileOnly} name="arrowRightPink" />
          </div>
        )} */}
      </div>
    </Fragment>
  );
};

export default BestSellingProducts;
