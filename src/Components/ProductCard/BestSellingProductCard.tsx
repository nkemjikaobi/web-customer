/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import accounting from "accounting";
import styles from "./listingCard4.module.scss";
import { PRODUCTS_IMAGES_BASE_URL } from "Http/Routes/Marketplace";
import { CURRENCIES } from "Helpers/Constants";
import Img from "Assets/images/png/pots.png";
import MarketplaceService from "Http/Services/MarketplaceService";
import { SelectMarketplaceProductAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import IProduct from "dto/KongaOnline/IProduct";
import ICategorySku from "dto/KongaOnline/ICategorySku";
import { isDiscounted } from "libs/utils/utils";
import RatingsComponent from "./RatingsComponent";

export interface IProductCard {
  product: IProduct;
  SelectMarketplaceProductAction?: Function;
}

export const BestSellingProductCard: React.FunctionComponent<IProductCard> = (
  properties: IProductCard
) => {
  const history = useHistory();
  const [reviewsCount, setReviewsCount] = useState<number>();

  const handleProductClickEvent = (event: unknown) => {
    if (properties.product) {
      properties.SelectMarketplaceProductAction &&
        properties.SelectMarketplaceProductAction(properties.product);
      const response: ICategorySku =
        MarketplaceService.ExtractCategoryNameFromURLKey(
          properties.product.url_key
        );
      history.push(
        `/online-shopping/product-detail/${response.category ?? 0}/${
          response.sku
        }`
      );
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setReviewsCount(0);
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <button
      className={`p-3 bg-white ${styles.productCard}`}
      onClick={handleProductClickEvent}
    >
      <div className={styles.productCard_Top}>
        <img
          src={
            `${PRODUCTS_IMAGES_BASE_URL}${properties.product.image_full}` ?? Img
          }
        />
      </div>
      <p className="text-truncate text-start">
        {properties.product.name ?? ""}
      </p>
      <div className={styles.productCard_Bottom}>
        <div className={styles.prices}>
          <p className={`p-0 ${styles.dicountPrice}`}>
            {accounting.formatMoney(properties.product.price, CURRENCIES.NAIRA)}
          </p>
          {isDiscounted(properties.product) && (
            <p className={styles.originalPrice}>
              {accounting.formatMoney(
                properties.product.original_price,
                CURRENCIES.NAIRA
              )}
            </p>
          )}
        </div>
        {isDiscounted(properties.product) && (
          <p className={`${styles.amountSaved} text-start`}>
            You Save{" "}
            {accounting.formatMoney(
              properties.product.original_price === null
                ? 0
                : properties.product.original_price - properties.product.price,
              CURRENCIES.NAIRA
            )}
          </p>
        )}
      </div>
      <RatingsComponent
        reviewsCount={properties.product.product_rating?.total_ratings || 0}
        starsCount={properties.product.product_rating?.quality}
      />
    </button>
  );
};

BestSellingProductCard.defaultProps = {
  SelectMarketplaceProductAction: () => null,
};

export default connect(null, { SelectMarketplaceProductAction })(
  BestSellingProductCard
);
