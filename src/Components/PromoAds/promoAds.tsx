import React from "react";
import { isNotEmptyArray, composeClasses } from "libs/utils/utils";
import styles from "./promoAds.module.scss";
import URLConfigurator from "Components/URLConfigurator";
import config from "Configurations/configurations";

export interface IProps {
  ads: any;
}
/**
 * @param {Array} ads
 */
const PromoAds: React.FunctionComponent<IProps> = ({ ads }) => {
  return (
    <section className={styles.promoAdWrapper}>
      <section className={styles.promoAdContainer}>
        <section className={styles.promoAdImageWrapperTablet}>
          {isNotEmptyArray(ads) &&
            ads.map((promoAd: any, index: any) => {
              const categoryId = promoAd && promoAd.link.split("-").slice(-1);
              const splitPromos = promoAd.link.split("/");
              const categoryNames = splitPromos[splitPromos.length - 1];
              const splitCategoryNames = categoryNames.split("-");
              splitCategoryNames.pop();
              const category = splitCategoryNames.join(" ");
              // const link =
              //   categoryId && categoryId[0].length === 4
              //     ? `category/${categoryId[0]}`
              //     : `${promoAd.link}`;
              const link = `/product-listing/${categoryId[0]}`;
              return (
                <URLConfigurator
                  className={"mx-2"}
                  key={index}
                  onClick={() =>
                    localStorage.setItem("currentCategory", category)
                  }
                  to={link}
                >
                  <div
                    className={composeClasses(styles.imageWrapper)}
                    onClick={() =>
                      localStorage.setItem("currentCategory", category)
                    }
                  >
                    <img
                      alt={promoAd.alt_text}
                      className={styles.promoAdImage}
                      src={promoAd.image}
                    />
                  </div>
                </URLConfigurator>
              );
            })}
        </section>
      </section>
    </section>
  );
};

export default PromoAds;
