import React, { useEffect, useState } from "react";
import RatingBar from "./utils/RatingBar/ratingBar";
import ReactPaginate from "react-paginate";
import styles from "./customerReview.module.scss";
import CustomerRatngCard from "./utils/CustomerRatingCard/customerRatingCard";
import { range } from "lodash";
import StarRatings from "react-star-ratings";
import IProduct from "dto/KongaOnline/IProduct";
import { composeClasses } from "libs/utils/utils";

interface ICustomerReview {
  selectedProduct: IProduct | undefined;
}

const CustomerReview: React.FC<ICustomerReview> = (props: ICustomerReview) => {
  const [average, setAverage] = useState<number | undefined>();
  const [totalRatings, setTotalRatings] = useState<number | undefined>();
  const [totalStars, setTotalStars] = useState<any>(undefined);

  const [pagenumber, setPageNumber] = useState<number>(0);

  const itemsPerPage = 10;

  const pagesVisited = pagenumber * itemsPerPage;

  const pageCount: any =
    props.selectedProduct?.product_reviews &&
    Math.ceil(props.selectedProduct?.product_reviews.length / itemsPerPage);

  const disablePagecount = pageCount - 1;

  const changePage = (data: any) => {
    //selected(page we want to move to) is from react-paginate
    setPageNumber(data.selected);
  };

  const reviewsData =
    props.selectedProduct?.product_reviews &&
    props.selectedProduct?.product_reviews
      .slice(pagesVisited, pagesVisited + itemsPerPage)
      .map((reviews: any, key: number) => (
        <div className={styles.items} key={key}>
          <CustomerRatngCard reviews={reviews} />
        </div>
      ));

  const formatStars = (holder: any): any => {
    const result = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    if (holder) {
      result[5] = holder.five_star ?? 0;
      result[4] = holder.four_star ?? 0;
      result[3] = holder.three_star ?? 0;
      result[2] = holder.two_star ?? 0;
      result[1] = holder.one_star ?? 0;
    }
    setTotalStars(result);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && props.selectedProduct) {
      const holder = props.selectedProduct.product_rating?.quality;
      holder && formatStars(holder);

      setAverage(props.selectedProduct.product_rating?.quality.average);
      setTotalRatings(props.selectedProduct.product_rating?.total_ratings);
    }
    return () => {
      mounted = false;
    };
  }, [props.selectedProduct]);

  return (
    <div style={{ padding: "1rem" }}>
      <div className={styles.customerReview}>
        <div className={styles.ratingCard}>
          {average && <h1>{average}/5</h1>}
          <div
            className={composeClasses(
              styles.iconList,
              styles.tabletAndAboveOnly
            )}
          >
            <StarRatings
              name="rating"
              numberOfStars={5}
              rating={average !== undefined ? average : 0}
              starDimension={"15px"}
              starEmptyColor="#DBDBDB"
              starRatedColor="#F9DB79"
              starSpacing="2px"
            />
          </div>
          <p>({totalRatings} Rating)</p>
        </div>
        <div className={styles.overallRatings}>
          {totalStars &&
            range(5, 0, -1).map((key: number) => (
              <RatingBar
                key={key}
                totalRatings={totalRatings || 1}
                value={{ key: key, value: totalStars[key] }}
              />
            ))}
        </div>
      </div>
      <div className={styles.customerRatingList}>{reviewsData}</div>
      {props &&
        props.selectedProduct &&
        props.selectedProduct.product_reviews &&
        props.selectedProduct.product_reviews.length > 10 && (
          <div className={styles.paginateWrapper}>
            <ReactPaginate
              activeClassName={styles.paginationActive}
              containerClassName={styles.paginationBttns}
              disabledClassName={styles.paginationDisabled}
              marginPagesDisplayed={0}
              nextClassName={composeClasses(
                styles.nextClassName,
                `${pagenumber === disablePagecount && styles.disabled}`
              )}
              nextLabel={"Next"}
              nextLinkClassName={"nextBttn"}
              onPageChange={changePage}
              pageCount={pageCount}
              pageRangeDisplayed={1}
              previousClassName={composeClasses(
                styles.previousClassName,
                `${pagenumber === 0 && styles.disabled}`
              )}
              previousLabel={"Previous"}
              previousLinkClassName={"previousBttn"}
            />
          </div>
        )}
    </div>
  );
};
export default CustomerReview;
