/* eslint-disable @typescript-eslint/ban-types */

import React, { Fragment, useEffect, useState } from "react";
import { composeClasses } from "libs/utils/utils";
import styles from "./categoriesCarousel.module.scss";
import MarketplaceService from "Http/Services/MarketplaceService";
import ICategory from "dto/KongaOnline/ICategory";
import { connect } from "react-redux";
import { SelectCategoryAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import { range } from "lodash";
import Icon from "Components/Icons";
import CategoryInfo from "./CategoryInfo";
import AllCategoriesInfo from "./AllCategoriesInfo";
import CategoryInfoLoading from "./CategoryInfoLoading";
import ICmsMenuCategory from "dto/KongaFood/ICmsMenuCategory";

interface ICategoriesCarousel {
  type?: string;
  SelectCategoryAction?: Function;
  handleClick: Function;
}

const CategoriesCarousel: React.FunctionComponent<ICategoriesCarousel> = (
  props: ICategoriesCarousel
) => {
  const { type, SelectCategoryAction, handleClick } = props;
  const [categoryList, setCategoryList] = useState<any>(<Fragment />);

  useEffect(() => {
    let _categoryList = range(10).map((index: number) => (
      <CategoryInfoLoading key={index} />
    ));
    setCategoryList(_categoryList);

    MarketplaceService.GetCMSMenuByStoreId().then(
      (results: Array<ICmsMenuCategory>) => {
        _categoryList = MarketplaceService.SortCMSMenuByStoreId(results).map(
          (category: ICategory, key: number) => (
            <CategoryInfo
              category={category}
              key={key}
              SelectCategoryAction={SelectCategoryAction}
              type={type}
            />
          )
        );

        const currentPath = window.location.pathname;
        const all_categories = <AllCategoriesInfo handleClick={handleClick} />;
        if (currentPath === "/") {
          setCategoryList([..._categoryList]);
        } else {
          setCategoryList([all_categories, ..._categoryList]);
        }
      }
    );
  }, []);

  const [showPreviousArrow, setShowPrevArrow] = useState<boolean>(false);

  const goBack = () => {
    const container = document.getElementById("categories");
    sideScroll(container, "left", 25, 100, 10);
  };

  const moveFoward = () => {
    const container = document.getElementById("categories");
    sideScroll(container, "right", 25, 100, 10);
    setShowPrevArrow(true);
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
    <div className={styles.carouselContainer}>
      {categoryList.length > 9 ? (
        <div className={styles.leftPointer} onClick={() => goBack()}>
          {showPreviousArrow && (
            <Icon
              className={styles.tabletAndAboveOnly}
              key={0}
              name="arrowLeftPink"
            />
          )}

          {showPreviousArrow && (
            <Icon className={styles.mobileOnly} key={1} name="arrowLeftPink" />
          )}
        </div>
      ) : (
        <div className={styles.leftPointer} onClick={() => goBack()}>
          {showPreviousArrow && (
            <Icon className={styles.mobileOnly} key={2} name="arrowLeftPink" />
          )}
        </div>
      )}

      <div
        className={composeClasses(
          type === "home"
            ? styles.categoriesCarouselHome
            : styles.categoriesCarousel
        )}
        id="categories"
      >
        {categoryList}
      </div>
      {categoryList.length > 9 ? (
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
  );
};

CategoriesCarousel.defaultProps = {
  type: undefined,
  SelectCategoryAction: () => null,
};

const mapStateToProps = (state: any) => ({ marketplace: state.marketplace });

export default connect(mapStateToProps, { SelectCategoryAction })(
  CategoriesCarousel
);
