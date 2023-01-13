import Icon from "Components/Icons";
import IProduct from "dto/KongaOnline/IProduct";
import { composeClasses } from "libs/utils/utils";
import { range } from "lodash";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import RecommendationProductCard, {
  RecommendationProductCardTemplate,
} from "../RecommendationProductCard";
import styles from "./RecommendedProducts.module.scss";

interface IProps {
  recommendedProducts: Array<IProduct> | null | undefined;
}

const RecommendationProducts: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const [showPreviousArrow, setShowPrevArrow] = useState<boolean>(false);

  const moveFoward = () => {
    const container = document.getElementById("recommended");
    sideScroll(container, "right", 25, 100, 10);
    setShowPrevArrow(true);
  };

  const goBack = () => {
    const container = document.getElementById("recommended");
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
      <div className={styles.recommendedProductsWrapper}>
        {props.recommendedProducts && props.recommendedProducts.length > 6 ? (
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

        {props.recommendedProducts?.length !== 0 && (
          <section
            className={composeClasses(
              styles.no_scrollbar,
              styles.home_recomendation
            )}
          >
            <div className={styles.heading}>
              <h1>Recommended for you</h1>
              <h1 className={styles.small}>
                <Link to={"/online-shopping/recommendations"}>
                  <small
                    className={`ps-3 text-primary align-middle ${styles.see_all_items}`}
                  >
                    See All Items
                  </small>
                </Link>
              </h1>
            </div>
            <div className={styles.recommendationContentWrapper}>
              <div className={styles.recommendationContent} id="recommended">
                {props.recommendedProducts === null
                  ? range(7).map((index: number) => (
                      <RecommendationProductCardTemplate key={index} />
                    ))
                  : props.recommendedProducts &&
                    props.recommendedProducts.map(
                      (product: IProduct, index: number) => {
                        return (
                          <div
                            className={styles.recomendationCardWrapper}
                            key={index}
                          >
                            <RecommendationProductCard product={product} />
                          </div>
                        );
                      }
                    )}
              </div>
            </div>
          </section>
        )}
        {props.recommendedProducts && props.recommendedProducts.length > 6 ? (
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

export default RecommendationProducts;
