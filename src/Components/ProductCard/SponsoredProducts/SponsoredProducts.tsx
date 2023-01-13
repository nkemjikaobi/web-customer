import Icon from "Components/Icons";
import ISponsoredProduct from "dto/KongaOnline/ISponsoredProduct";
import MarketplaceService from "Http/Services/MarketplaceService";
import { composeClasses } from "libs/utils/utils";
import React, { Fragment, useState } from "react";
import SponsoredProductCard from "../SponsoredProductCard";
import styles from "./SponsoredProducts.module.scss";

interface IProps {
  sponsoredProducts: Array<ISponsoredProduct>;
}

const SponsoredProducts: React.FunctionComponent<IProps> = (props: IProps) => {
  const [showPreviousArrow, setShowPrevArrow] = useState<boolean>(false);

  const moveFoward = () => {
    const container = document.getElementById("sponsored");
    sideScroll(container, "right", 25, 100, 10);
    setShowPrevArrow(true);
  };

  const goBack = () => {
    const container = document.getElementById("sponsored");
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
      <div className={styles.sponsoredProductsWrapper}>
        {props.sponsoredProducts && props.sponsoredProducts.length > 6 ? (
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
        )}

        {props.sponsoredProducts.length > 0 ? (
          <section className={composeClasses(styles.home_sponsoredProducts)}>
            <div className={styles.heading}>
              <h2>Sponsored Products</h2>
            </div>
            <div
              className={composeClasses(styles.content, styles.customScroll)}
              id="sponsored"
            >
              {props.sponsoredProducts.map(
                (sponsoredProduct: ISponsoredProduct, index: number) => (
                  <SponsoredProductCard
                    key={index}
                    product={MarketplaceService.ConvertISponsoredProductToIProduct(
                      sponsoredProduct
                    )}
                  />
                )
              )}
            </div>
          </section>
        ) : (
          <Fragment />
        )}

        {props.sponsoredProducts && props.sponsoredProducts.length > 6 ? (
          <div className={styles.rightPointer} onClick={() => moveFoward()}>
            <Icon className={styles.tabletAndAboveOnly} name="arrowRightPink" />

            <Icon className={styles.mobileOnly} name="arrowRightPink" />
          </div>
        ) : (
          <div className={styles.rightPointer} onClick={() => moveFoward()}>
            <Icon className={styles.mobileOnly} name="arrowRightPink" />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SponsoredProducts;
