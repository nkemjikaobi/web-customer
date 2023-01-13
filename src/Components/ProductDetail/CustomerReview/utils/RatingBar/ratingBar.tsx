import React, { useEffect, useState } from "react";
import styles from "./ratingBar.module.scss";
import StarRatings from "react-star-ratings";

interface IRatingBar {
  totalRatings: number | undefined;
  value: { key: number; value: number };
}

const RatingBar: React.FunctionComponent<IRatingBar> = ({
  value: { key, value },
  totalRatings,
}: IRatingBar) => {
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    let mounted = true;

    mounted && setScore(((value || 0) / (totalRatings || 1)) * 100);

    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div>
      <div className={styles.ratingBar}>
        <p>{key ?? 0}</p>
        <div className={styles.section}>
          <StarRatings
            name="rating"
            numberOfStars={1}
            rating={1}
            starDimension={"15px"}
            starEmptyColor="#DBDBDB"
            starRatedColor="#F9DB79"
            starSpacing="2px"
          />
          <progress id="file" max="100" value={score}>
            {score}%
          </progress>
        </div>
        <p>{(value || 0) > 0 ? value || 0 : ""}</p>
      </div>
    </div>
  );
};

export default RatingBar;
