/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import Img from "Assets/images/png/pots.png";
import styles from "./listingCard4.module.scss";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import Skeleton from "react-loading-skeleton";
import ICategorySku from "dto/KongaOnline/ICategorySku";
import MarketplaceService from "Http/Services/MarketplaceService";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { SelectMarketplaceProductAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import IProduct from "dto/KongaOnline/IProduct";
import StarListing from "./StarListing";
import RatingsComponent from "./RatingsComponent";

export interface IProductCard {
  product: IProduct;
  SelectMarketplaceProductAction?: Function;
}

export const ProductCardTemplate: React.FunctionComponent = () => {
  return (
    <div className={`p-3 ${styles.productCard}`}>
      <div className={styles.productCard_Top}>
        <Skeleton className={"w-100"} height={150} />
        <p>
          <Skeleton className={"w-100"} />
        </p>
      </div>
      <div className={styles.productCard_Bottom}>
        <div className={styles.prices}>
          <div className={"row"}>
            <div className={"col"}>
              <Skeleton className={"w-75"} />
            </div>
            <div className={"col text-end"}>
              <Skeleton className={"w-75"} />
              <Skeleton className={"w-75"} />
            </div>
          </div>
        </div>
        <Skeleton className={"w-100"} />
      </div>
      <div className={styles.reviews}>
        <div className={styles.icons}>
          <StarListing count={null} reviews={0} />
        </div>
        <p>
          (<Skeleton width={20} /> Reviews)
        </p>
      </div>
    </div>
  );
};

const ProductCard: React.FunctionComponent<IProductCard> = ({
  product,
  SelectMarketplaceProductAction,
}: IProductCard) => {
  const history = useHistory();
  const handleProductCardClickEvent = (event: any) => {
    if (product && SelectMarketplaceProductAction) {
      SelectMarketplaceProductAction(product);
      const response: ICategorySku =
        MarketplaceService.ExtractCategoryNameFromURLKey(product.url_key);
      history.push(
        `/online-shopping/product-detail/${response.category ?? 0}/${
          response.sku
        }`
      );
    }
  };

  return (
    <button
      className={`p-3 ${styles.productCard} bg-white`}
      onClick={handleProductCardClickEvent}
    >
      <div className={styles.productCard_Top}>
        <img src={product.image_thumbnail ?? Img} />
      </div>
      <div className={styles.productNameWrapper}>
        <p className={styles.productName}>{product.name ?? ""}</p>
      </div>
      <div className={styles.productCard_Bottom}>
        <div className={styles.prices}>
          <p className={`m-0 p-0 ${styles.dicountPrice}`}>
            {accounting.formatMoney(product.price, CURRENCIES.NAIRA)}
          </p>
          <p className={styles.originalPrice}>
            {accounting.formatMoney(product.price, CURRENCIES.NAIRA)}
          </p>
        </div>
        <p className={styles.amountSaved}>
          You Save{" "}
          {accounting.formatMoney(
            product.price - product.original_price,
            CURRENCIES.NAIRA
          )}
        </p>
      </div>
      <RatingsComponent
        reviewsCount={product.product_rating?.total_ratings || 0}
        starsCount={product.product_rating?.quality}
      />
    </button>
  );
};

ProductCard.defaultProps = {
  SelectMarketplaceProductAction: () => null,
};
export default connect(null, { SelectMarketplaceProductAction })(ProductCard);
