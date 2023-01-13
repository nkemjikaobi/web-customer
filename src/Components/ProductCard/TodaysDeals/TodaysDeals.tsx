import Icon from "Components/Icons";
import IDealProduct from "dto/KongaOnline/IDealProduct";
import MarketplaceService from "Http/Services/MarketplaceService";
import { composeClasses } from "libs/utils/utils";
import { range } from "lodash";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import RecommendationProductCard, {
  RecommendationProductCardTemplate,
} from "../RecommendationProductCard";
import styles from "./TodaysDeals.module.scss";

interface IProps {
  productDeals: Array<IDealProduct> | null | undefined;
}

const TodaysDeals: React.FunctionComponent<IProps> = (props: IProps) => {
  const [showPreviousArrow, setShowPrevArrow] = useState<boolean>(false);

  const moveFoward = () => {
    const container = document.getElementById("todaysDeals");
    sideScroll(container, "right", 25, 100, 10);
    setShowPrevArrow(true);
  };

  const goBack = () => {
    const container = document.getElementById("todaysDeals");
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
      if (element) {
        if (direction === "left") {
          element.scrollLeft -= step;
        } else {
          element.scrollLeft += step;
        }
        scrollAmount += step;
      }

      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  };
  return (
    <Fragment>
      <div className={styles.todaysDealsWrapper}>
        {props.productDeals && props.productDeals.length > 6 ? (
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
        {props.productDeals?.length !== 0 && (
          <section
            className={composeClasses(
              styles.no_scrollbar,
              styles.home_recomendation
            )}
          >
            <div className={styles.heading}>
              <h1>{"Today's Deals"}</h1>
              <h1 className={styles.small}>
                <Link to={"/online-shopping/all-deals"}>
                  <small
                    className={`ps-3 text-primary align-middle ${styles.see_all_items}`}
                  >
                    See All Items
                  </small>
                </Link>
              </h1>
            </div>
            <div className={styles.recommendationContentWrapper}>
              <div className={styles.recommendationContent} id="todaysDeals">
                {props.productDeals === null
                  ? range(7).map((index: number) => (
                      <RecommendationProductCardTemplate key={index} />
                    ))
                  : props.productDeals &&
                    props.productDeals
                      .slice(0, 6)
                      .map((product: IDealProduct, index: number) => {
                        return (
                          <div
                            className={styles.recomendationCardWrapper}
                            key={index}
                          >
                            <RecommendationProductCard
                              product={MarketplaceService.ConvertIDealProductToIProduct(
                                product
                              )}
                            />
                          </div>
                        );
                      })}
              </div>
            </div>
          </section>
        )}
        {props.productDeals && props.productDeals.length > 6 ? (
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

export default TodaysDeals;
