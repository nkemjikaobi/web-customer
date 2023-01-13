/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Icon from "Components/Icons/icon";
import styles from "./CategoryListingCard.module.scss";
import { PRODUCTS_IMAGES_BASE_URL } from "Http/Routes/Marketplace";
import IProduct from "dto/KongaOnline/IProduct";
import accounting from "accounting";
import {
  ADD_TO_CART_ERROR,
  CURRENCIES,
  REMOVE_SAVED_FOR_LATER_ERROR_MSG,
  REMOVE_SAVED_FOR_LATER_SUCCESS_MSG,
  SAVED_FOR_LATER_ERROR_MSG,
  SAVED_FOR_LATER_SUCCESS_MSG,
} from "Helpers/Constants";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ICategory from "dto/KongaOnline/ICategory";
import StarRating from "Components/StarRating/starRating";
import {
  AddItemToCart,
  ManageCartAlert,
} from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import { SelectMarketplaceProductAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import {
  SetCartToOpenAction,
  AddItemToSavedListAction,
  RemoveItemFromSavedList,
} from "Http/Redux/Actions/Cart/ICartAction";
import Button from "Components/Button/button";
import Asset from "Components/Asset/asset";
import cloudinaryConstants from "Helpers/cloudinaryConstants";
import {
  composeClasses,
  normalizeProductValues,
  isDiscounted,
} from "libs/utils/utils";
import Label from "Components/ProductCard/shared";
import AuthService from "Http/Services/AuthService";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";
import StarRatings from "react-star-ratings";

interface IProps {
  cart_id: number | null;
  product: IProduct;
  selectedCategory?: ICategory;
  store_id: number;
  savedItems?: any;
  AddItemToSavedListAction: Function;
  RemoveItemFromSavedList: Function;
  AddItemToCart: Function;
  SelectMarketplaceProductAction: Function;
  SetCartToOpenAction: Function;
  ManageCartAlert: Function;
}

const CategoryListingCard: React.FunctionComponent<IProps> = (
  props: IProps
) => {
  const history = useHistory();
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
      } else {
        props.ManageCartAlert(
          null,
          ADD_TO_CART_ERROR,
          NotificationAlertType.Error
        );
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
      `/online-shopping/product-detail/${
        props.selectedCategory?.category_id ?? 0
      }/${props.product.sku}`
    );
  };

  const hanndleRating = (product: any) => {
    if (product.product_rating) {
      return product.product_rating.quality.number_of_ratings ?? 0;
    }
    return 0;
  };

  const normalizedProduct = normalizeProductValues(props.product);
  const isSavedItem: boolean =
    Array.isArray(props.savedItems) &&
    props.savedItems.findIndex((item) => item.sku === props.product.sku) > -1;

  const authenticatedUser = AuthService.GetLoggedInUser();

  const handleClick = (e: any, route: any) => {
    if (route !== null) {
      e.stopPropagation();
      history.push(`/online-shopping/merchant/${route}`);
    }
  };

  const removeItem = async (e: any, sku: number) => {
    if (!authenticatedUser) {
      history.push("/login");
    }
    e.stopPropagation();
    try {
      if (sku) {
        const response = await props.RemoveItemFromSavedList(sku);
        if (response) {
          props.ManageCartAlert(
            null,
            REMOVE_SAVED_FOR_LATER_SUCCESS_MSG,
            NotificationAlertType.Success
          );
        } else {
          props.ManageCartAlert(
            null,
            REMOVE_SAVED_FOR_LATER_ERROR_MSG,
            NotificationAlertType.Success
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (e: any, sku: number) => {
    if (!authenticatedUser) {
      history.push("/login");
    }
    e.stopPropagation();
    try {
      if (sku) {
        const response = await props.AddItemToSavedListAction(sku);
        if (response) {
          props.ManageCartAlert(
            null,
            SAVED_FOR_LATER_SUCCESS_MSG,
            NotificationAlertType.Success
          );
        } else {
          props.ManageCartAlert(
            null,
            SAVED_FOR_LATER_ERROR_MSG,
            NotificationAlertType.Success
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const numberOfReviews =
    props.product &&
    props.product.product_rating &&
    props.product.product_rating.total_ratings;
  return (
    <div
      className={styles.listingCard}
      onMouseLeave={() => {
        if (!isSubmitting) {
          setIsHover(false);
        }
      }}
      onMouseOver={() => {
        setIsHover(true);
      }}
    >
      <div
        className={styles.listingCard_top}
        onClick={handleProductSelectEvent}
      >
        <div>
          <Label product={normalizedProduct} />
        </div>
        <div className={composeClasses("text-center", styles.img)}>
          {props.product.image_thumbnail ? (
            <img
              src={`${PRODUCTS_IMAGES_BASE_URL}${props.product.image_thumbnail}`}
            />
          ) : (
            <Asset
              alt={"Product Image."}
              className={styles.mainImg}
              name={props.product.image_thumbnail_path}
              type={cloudinaryConstants.asset.cloudinaryType}
            />
          )}
          <div
            className={styles.icon}
            onClick={(e) =>
              isSavedItem
                ? removeItem(e, props.product.sku)
                : addItem(e, props.product.sku)
            }
          >
            <div className={styles.iconWrapper}>
              {isSavedItem ? (
                <Icon name="coloredSavedForLaterSmall" />
              ) : (
                <Icon name="heart" />
              )}
            </div>
          </div>
        </div>
        <div className={styles.title}>
          <h1 className={"text-truncate"}>
            {props.product.brand
              ? `${props.product.brand} ${props.product.name}`
              : `${props.product.name}`}
          </h1>
        </div>
      </div>

      <div className={styles.listingCard_bottom}>
        <div className={styles.prices}>
          <p className={styles.discountPrice}>
            {accounting.formatMoney(
              props.product.special_price ?? props.product.original_price,
              CURRENCIES.NAIRA
            )}
          </p>
          {isDiscounted(props.product) && (
            <p className={styles.originalPrice}>
              {accounting.formatMoney(
                props.product.original_price ?? props.product.price,
                CURRENCIES.NAIRA
              )}
            </p>
          )}
        </div>
        <p className={`my-1 text-truncate ${styles.merchantInfo}`}>
          Sold By{" "}
          <span onClick={(e) => handleClick(e, props.product.seller.name)}>
            {props.product.seller.name}
          </span>
        </p>
        {props.product?.express_delivery && (
          <div>
            <Icon name="kongaNow" />
          </div>
        )}
        <div className={styles.rating}>
          {/* <StarRating
            numStars={
              (props.product &&
                props.product.product_rating?.quality.average) ||
              0
            }
            productRating={normalizedProduct && normalizedProduct.productRating}
          /> */}
          <StarRatings
            name="rating"
            numberOfStars={5}
            rating={
              props.product ? props.product.product_rating?.quality.average : 0
            }
            starDimension={"15px"}
            starEmptyColor="#DBDBDB"
            starRatedColor="#FBA100"
            starSpacing="0"
          />
          {numberOfReviews && numberOfReviews > 0 ? (
            <p>
              {numberOfReviews}{" "}
              {numberOfReviews && numberOfReviews > 1 ? "Reviews" : "Review"}
            </p>
          ) : (
            <p>(No reviews yet)</p>
          )}

          {/* <RatingsComponent
            reviewsCount={props.product.product_rating?.total_ratings || 0}
            starsCount={props.product.product_rating?.quality}
          /> */}
        </div>
        <div className={styles.button}>
          {
            <Fragment>
              <Button
                className={composeClasses(
                  "my-2 w-100 btn",
                  isHover
                    ? "btn-danger text-white"
                    : "btn-outline-danger text-danger"
                )}
                handleClick={
                  props.product.product_type !== "simple"
                    ? handleProductSelectEvent
                    : handleAddtoCartBtnClickEvent
                }
                isSubmitting={isSubmitting}
                title={
                  props.product.product_type !== "simple"
                    ? "Choose Option"
                    : "Add to Cart"
                }
              />
            </Fragment>
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  cart_id: state.cart.Marketplace?.id ?? null,
  selectedCategory: state.marketplace.SelectedCategory,
  savedItems: state?.cart?.SavedList?.items,
});

CategoryListingCard.defaultProps = {
  selectedCategory: undefined,
  savedItems: [],
};

export default connect(mapStateToProps, {
  AddItemToCart,
  SelectMarketplaceProductAction,
  SetCartToOpenAction,
  ManageCartAlert,
  AddItemToSavedListAction,
  RemoveItemFromSavedList,
})(CategoryListingCard);
