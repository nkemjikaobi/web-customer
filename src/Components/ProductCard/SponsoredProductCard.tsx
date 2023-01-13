/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import styles from "./listingCard4.module.scss";
import Img from "Assets/images/png/pots.png";
import { connect } from "react-redux";
import {
  SelectCategoryAction,
  SelectMarketplaceProductAction,
} from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import ICategorySku from "dto/KongaOnline/ICategorySku";
import MarketplaceService from "Http/Services/MarketplaceService";
import ICategory from "dto/KongaOnline/ICategory";
import IProduct from "dto/KongaOnline/IProduct";
import { Link, useHistory } from "react-router-dom";
import { isDiscounted } from "libs/utils/utils";
import RatingsComponent from "./RatingsComponent";

export interface ISponsoredProductCard {
  product: IProduct;
  SelectCategoryAction: Function;
  SelectMarketplaceProductAction: Function;
}

const SponsoredProductCard: React.FunctionComponent<ISponsoredProductCard> = (
  properties: ISponsoredProductCard
) => {
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [displayPrice, setDisplayPrice] = useState<number>(0);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    let props: ISponsoredProductCard | null = properties;
    if (props && props.product) {
      setProduct(props.product);
      setName(props.product.name);
      setDisplayPrice(props.product.price);
      setSalePrice(props.product.special_price);
      setOriginalPrice(props.product.original_price);
      setImageUrl(props.product.image_thumbnail_path);
    }
    return () => {
      props = null;
    };
  }, [properties]);

  const handleItemClick = (event: any) => {
    event.preventDefault();
    if (product) {
      properties.SelectMarketplaceProductAction(product);
      const response: ICategorySku =
        MarketplaceService.ExtractCategoryNameFromURLKey(product.url_key);
      const category: ICategory = {
        category_id: `"${response.sku}"`,
        image: "",
        name: response.category?.replaceAll("-", " ").toUpperCase(),
        url_key: product.url_key,
        children: [],
      };
      properties.SelectCategoryAction(category);
      history.push(
        `/online-shopping/product-detail/${product.url_key ?? 0}/${product.sku}`
      );
    }
  };

  return (
    <Link
      className={`p-3 ${styles.productCard}`}
      onClick={handleItemClick}
      to={""}
    >
      <div className={styles.productCard_Top}>
        <img src={imageUrl ?? Img} />
      </div>
      <div className={styles.productNameWrapper}>
        <p className={styles.productName}>{name}</p>
      </div>
      <div className={styles.productCard_Bottom}>
        <div className={styles.prices}>
          <p className={`m-0 p-0 ${styles.dicountPrice}`}>
            {accounting.formatMoney(displayPrice, CURRENCIES.NAIRA)}
          </p>
          {isDiscounted(properties.product) && (
            <p className={styles.originalPrice}>
              {accounting.formatMoney(originalPrice, CURRENCIES.NAIRA)}
            </p>
          )}
        </div>
        {isDiscounted(properties.product) && (
          <p className={styles.amountSaved}>
            You Save{" "}
            {accounting.formatMoney(
              originalPrice - salePrice,
              CURRENCIES.NAIRA
            )}
          </p>
        )}
      </div>
    </Link>
  );
};
export default connect(null, {
  SelectCategoryAction,
  SelectMarketplaceProductAction,
})(SponsoredProductCard);
