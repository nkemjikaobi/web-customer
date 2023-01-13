/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import styles from "./RecommendationProductCard.module.scss";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import Skeleton from "react-loading-skeleton";
import { PRODUCTS_IMAGES_BASE_URL } from "Http/Routes/Marketplace";
import IProduct from "dto/KongaOnline/IProduct";
import { connect } from "react-redux";
import {
  SelectCategoryAction,
  SelectMarketplaceProductAction,
} from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import { useHistory } from "react-router-dom";
import MarketplaceService from "Http/Services/MarketplaceService";
import ICategorySku from "dto/KongaOnline/ICategorySku";
import ICategory from "dto/KongaOnline/ICategory";
import { isDiscounted } from "libs/utils/utils";
import RatingsComponent from "./RatingsComponent";

export interface IRecommendationProductCard {
  product: IProduct;
  SelectCategoryAction: Function;

  SelectMarketplaceProductAction: Function;
}

export const RecommendationProductCardTemplate: React.FunctionComponent =
  () => (
    <div className={"mb-3"}>
      <div className={styles.productCard}>
        <div className={styles.productCard_Top}>
          <Skeleton className={"ms-1"} height={135} width={200} />
        </div>
        <div className={styles.productCard_Bottom}>
          <Skeleton />
          <div className={styles.prices}>
            <p className={styles.dicountPrice}>
              <Skeleton className={"w-100"} width={150} />
            </p>
            <p className={styles.originalPrice}>
              <Skeleton width={150} />
            </p>
          </div>
          <p className={styles.amountSaved}>
            <Skeleton />
            <Skeleton />
          </p>
        </div>
      </div>
    </div>
  );

const RecommendationProductCard: React.FunctionComponent<
  IRecommendationProductCard
> = (properties: IRecommendationProductCard) => {
  const history = useHistory();
  const [productName, setProductName] = useState<string>("");
  const [displayPrice, setDisplayPrice] = useState<number>(0);
  const [specialPrice, setSpecialPrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [baseImage, setBaseImage] = useState<string>("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    let product: IProduct | null = properties.product;
    if (product) {
      setImage(product.image ?? "");
      setProductName(product.name);
      setDisplayPrice(product.special_price ?? product.original_price);
      setSpecialPrice(product.special_price);
      setOriginalPrice(product.original_price);
      setBaseImage(product.image_thumbnail);
      return () => {
        product = null;
      };
    }
  }, [properties]);

  const handleItemClick = (event: any) => {
    if (properties.product) {
      properties.SelectMarketplaceProductAction(properties.product);
      const response: ICategorySku =
        MarketplaceService.ExtractCategoryNameFromURLKey(
          properties.product.url_key
        );
      const catName =
        response && response.category
          ? response.category?.replaceAll("-", " ").toUpperCase()
          : "";
      const category: ICategory = {
        category_id: `"${response.sku}"`,
        image: "",
        name: catName,
        url_key: properties.product.url_key,
        children: [],
      };
      properties.SelectCategoryAction(category);
      history.push(
        `/online-shopping/product-detail/${response.category ?? 0}/${
          response.sku
        }`
      );
    }
  };

  return (
    <button
      className={`${styles.productCard} bg-white`}
      onClick={handleItemClick}
    >
      <div className={styles.recomendationCardWrapperContent}>
        <div className={styles.productCard_Top}>
          <img src={image ? image : PRODUCTS_IMAGES_BASE_URL + baseImage} />
        </div>
        <div className={styles.productCard_Bottom}>
          <h1 className={"h1 text-start"}>{productName}</h1>
          <div className={styles.prices}>
            <p className={styles.dicountPrice}>
              {accounting.formatMoney(displayPrice, CURRENCIES.NAIRA)}
            </p>
            {isDiscounted(properties.product) && (
              <p className={styles.originalPrice}>
                {accounting.formatMoney(originalPrice, CURRENCIES.NAIRA)}
              </p>
            )}
          </div>
          {isDiscounted(properties.product) && (
            <p className={`${styles.amountSaved} text-start`}>
              You Save{" "}
              {accounting.formatMoney(
                originalPrice - specialPrice,
                CURRENCIES.NAIRA
              )}
            </p>
          )}
          <RatingsComponent
            reviewsCount={properties.product.product_rating?.total_ratings || 0}
            starsCount={properties.product.product_rating?.quality}
          />
        </div>
      </div>
    </button>
  );
};

export default connect(null, {
  SelectCategoryAction,
  SelectMarketplaceProductAction,
})(RecommendationProductCard);
