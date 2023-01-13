/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Asset from "Components/Asset/asset";
import cloudinaryConstants from "Helpers/cloudinaryConstants";
import accounting from "accounting";
import {
  AddItemToCart,
  ManageCartAlert,
} from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import { SelectMarketplaceProductAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import { SetCartToOpenAction } from "Http/Redux/Actions/Cart/ICartAction";
import ICategory from "dto/KongaOnline/ICategory";
import { connect } from "react-redux";
import { CURRENCIES } from "Helpers/Constants";
import Button from "Components/Button/button";
import Label from "Components/ProductCard/shared";
import Icon from "Components/Icons/icon";
import { useHistory } from "react-router-dom";
import { composeClasses } from "libs/utils/utils";
import sharedStyles from "./shared.module.scss";
import styles from "./dealCard.module.scss";
import { parseDateTime } from "libs/utils/dateUtils";
import CountDown from "Components/CountDown/countdown";

/**
 * Product card used on listing pages
 * @returns {React.Component} React component
 */
interface IProps {
  cart_id: number | null;
  product: any;
  selectedCategory?: ICategory;
  store_id: number;
  AddItemToCart: Function;
  SelectMarketplaceProductAction: Function;
  SetCartToOpenAction: Function;
  ManageCartAlert: Function;
}

const DealCard: React.FunctionComponent<IProps> = (props: IProps) => {
  const history = useHistory();
  const urlKey = props.product.url_key;
  const newUrlKey = urlKey && urlKey.substring(0, urlKey.length - 8);
  const categoryId = urlKey && urlKey.split("-").slice(-1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [cart, setCart] = useState<IMarketplaceCartForm>({
    cart_id: null,
    product: null,
    quantity: 1,
    options: null,
  });

  const handleAddtoCartBtnClickEvent = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsHover(true);
    props.SelectMarketplaceProductAction(props.product);
    if (props.product) {
      let finalCart = { ...cart };

      if (props.cart_id) {
        finalCart = { ...finalCart, cart_id: props.cart_id };
      }

      if (props.store_id) {
        finalCart = { ...finalCart, store_id: props.store_id };
      }

      const response = await props.AddItemToCart({
        ...finalCart,
      });
      if (response) {
        props.ManageCartAlert(cart);
        props.SetCartToOpenAction(props.store_id);
      }
    }
    setIsHover(false);
    setIsSubmitting(false);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && props.product) {
      setCart({ ...cart, product: props.product, store_id: props.store_id });
    }

    return () => {
      mounted = false;
    };
  }, [props.product]);

  const handleProductSelectEvent = (event: any) => {
    event.preventDefault();

    setIsSubmitting(true);
    // select product
    if (props.SelectMarketplaceProductAction) {
      props.SelectMarketplaceProductAction(props.product);
    }

    setIsSubmitting(false);
    history.push(
      `/online-shopping/product-detail/${newUrlKey}/${props.product.product_id}`
    );
  };

  return (
    <span
      className={composeClasses(
        sharedStyles.cardContainer,
        styles.dealCardContainer
      )}
    >
      <div className={styles.labelWrapper}>
        <Label labelInfo={props.product.percent_off} />
      </div>

      <div className={styles.dealCartTop}>
        <Link
          to={`/online-shopping/product-detail/${newUrlKey}/${
            props.product.product_id
              ? props.product.product_id
              : props.product.sku
          }`}
        >
          <div className={styles.dealCardImage}>
            <Asset
              alt={`${props.product.name}.`}
              className={sharedStyles.productImage}
              isProduct
              name={
                props.product.image
                  ? props.product.image
                  : props.product.image_thumbnail_path
              }
              type={cloudinaryConstants.asset.cloudinaryType}
            />
          </div>
        </Link>

        <div className={styles.dealCardMetaContainer}>
          <h3
            className={composeClasses(
              "text-truncate",
              styles.dealCardProductName
            )}
          >
            {props.product.name}
          </h3>
          <div className={styles.dealCardInfoContainer}>
            <div className={styles.prices}>
              <p className={`m-0 p-0 ${styles.dicountPrice}`}>
                {accounting.formatMoney(
                  props.product.final_price
                    ? props.product.final_price
                    : props.product.price,
                  CURRENCIES.NAIRA
                )}
              </p>
              <p className={styles.originalPrice}>
                {accounting.formatMoney(
                  props.product.original_price,
                  CURRENCIES.NAIRA
                )}
              </p>
            </div>
            <span className={sharedStyles.savingsText}>
              You save{" "}
              {accounting.formatMoney(
                props.product.final_price
                  ? props.product.price - props.product.final_price
                  : props.product.original_price - props.product.price,
                CURRENCIES.NAIRA
              )}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.dealCartBottom}>
        {props.product.deal_timeto && (
          <div className={styles.dealCartBottomContent}>
            <div className={styles.dealTime}>
              <Icon name="clock" />
              {true ? (
                <CountDown
                  className={styles.dealCardCountdown}
                  endTime={props.product.deal_timeto}
                />
              ) : (
                <time
                  className={styles.dealCardCountdown}
                  dateTime={parseDateTime(props.product.deal_timeto)}
                >
                  {parseDateTime(props.product.deal_timeto)}
                </time>
              )}
            </div>
            <div className={styles.dealCardSold}>
              <span>
                Sold: <strong>{props.product.sold_percent}%</strong>
              </span>
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${props.product.sold_percent}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <Button
          className={composeClasses(
            styles.dealButton,
            isHover ? "btn-danger text-white" : "btn-outline-danger text-danger"
          )}
          handleClick={
            props.product.product_type !== "simple"
              ? handleProductSelectEvent
              : handleAddtoCartBtnClickEvent
          }
          isSubmitting={isSubmitting}
          title={
            // props.product.product_type !== "simple"
            //   ? "Choose Option"
            "Add to Cart"
          }
        />
      </div>
    </span>
  );
};

const mapStateToProps = (state: any) => ({
  cart_id: state.cart.Marketplace?.id ?? null,
  selectedCategory: state.marketplace.SelectedCategory,
});

DealCard.defaultProps = {
  selectedCategory: undefined,
};

export default connect(mapStateToProps, {
  AddItemToCart,
  SelectMarketplaceProductAction,
  SetCartToOpenAction,
  ManageCartAlert,
})(DealCard);

// export default DealCard;
