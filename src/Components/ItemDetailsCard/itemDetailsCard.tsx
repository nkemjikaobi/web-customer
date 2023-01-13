/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import Icon from "Components/Icons/icon";
import styles from "./itemDetailsCard.module.scss";
import ICartProduct from "dto/Cart/ICartProduct";
import accounting from "accounting";
import {
  CURRENCIES,
  REMOVE_FROM_CART_ERROR_MSG,
  REMOVE_FROM_CART_SUCCESS_MSG,
  REMOVE_SAVED_FOR_LATER_ERROR_MSG,
  REMOVE_SAVED_FOR_LATER_SUCCESS_MSG,
  SAVED_FOR_LATER_ERROR_MSG,
  SAVED_FOR_LATER_SUCCESS_MSG,
} from "Helpers/Constants";
import NumberInput from "Components/NumberInput/NumberInput";
import { connect } from "react-redux";
import {
  UpdateCartItemQtyAction,
  RemoveItemFromCartAction,
  AddItemToSavedListAction,
  RemoveItemFromSavedList,
} from "Http/Redux/Actions/Cart/ICartAction";
import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import IUpdateCartItemQty from "dto/Cart/IUpdateCartItemQty";
import MarketplaceService from "Http/Services/MarketplaceService";
import FoodService from "Http/Services/FoodService";
import { composeClasses } from "libs/utils/utils";
import { Link, useHistory, useParams } from "react-router-dom";
import { SelectMarketplaceProductAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import AuthService from "Http/Services/AuthService";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

interface ItemDetailsCardPage {
  cart: any;
  product: ICartProduct;
  savedItems: any;
  UpdateCartItemQtyAction: Function;
  RemoveItemFromCartAction: Function;
  AddItemToSavedListAction: Function;
  RemoveItemFromSavedList: Function;
  SelectMarketplaceProductAction: Function;
  ManageCartAlert: Function;
}

const ItemDetailsCard: React.FunctionComponent<ItemDetailsCardPage> = (
  props: ItemDetailsCardPage
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cartId, setCartId] = useState<number | null>(0);
  const [sku, setSku] = useState<number | null>(0);
  const [productImage, setProductImage] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [productSellerName, setProductSellerName] = useState<string>("");
  const [sellerUrlKey, setSellerUrlKey] = useState<string>("");
  const [sellerId, setSellerId] = useState<number>(0);
  const [productAmount, setProductAmount] = useState<number>(0);
  const [productSubTotalAmount, setProductSubTotalAmount] = useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>();
  const [loading, setLoading] = useState<any>(false);
  const [defaultProductQuantity, setDefaultProductQuantity] =
    useState<number>(1);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { store_id }: any = useParams();

  const MARKETPLACE_ID = MarketplaceService.STORE_ID.toString();

  useEffect(() => {
    let mounted = true;

    if (props.product && mounted) {
      setSku(parseInt(props.product.sku));
      setProductImage(props.product.small_image);
      setProductAmount(props.product.price);
      setProductSubTotalAmount(props.product.subtotal);
      setProductQuantity(props.product.requested_quantity);
      setDefaultProductQuantity(props.product.requested_quantity);
      setProductName(props.product.name);
      if (props.product.seller) {
        setProductSellerName(props.product.seller.name);
        setSellerUrlKey(props.product.seller.url_key);
        setSellerId(props.product.seller.id);
      }
    }

    if (props.cart && mounted) {
      let cart_id = null;
      switch (props.cart.CartToOpen) {
        case MarketplaceService.STORE_ID:
          cart_id =
            props.cart.Marketplace?.cart_id || props.cart.Marketplace?.id;
          break;
        case FoodService.STORE_ID:
          cart_id = props.cart.Food?.id || props.cart.Food?.cart_id;
      }
      setCartId(cart_id);
    }

    return () => {
      mounted = false;
    };
  }, []);

  const handleQuantityUpdateEvent = async (newQuantity: number) => {
    if (newQuantity !== productQuantity) {
      const params: IUpdateCartItemQty = {
        cart_id: cartId ?? 0,
        qty: newQuantity,
        sku: sku ?? 0,
      };
      setProductQuantity(newQuantity);
      await props.UpdateCartItemQtyAction(params);
    }
  };

  const removeItemFromCart = async (
    sku: any,
    cartId: any,
    cartToUpdate: number
  ) => {
    if (sku && cartId) {
      setIsRemoving(true);
      const response = await props.RemoveItemFromCartAction(
        cartId,
        sku,
        cartToUpdate
      );
      if (response) {
        setIsRemoving(false);
        props.ManageCartAlert(
          null,
          REMOVE_FROM_CART_SUCCESS_MSG,
          NotificationAlertType.Success
        );
      } else {
        props.ManageCartAlert(
          null,
          REMOVE_FROM_CART_ERROR_MSG,
          NotificationAlertType.Error
        );
      }
    }
  };

  const addItemToSavedList = async (sku: number | null) => {
    try {
      setLoading(true);
      await props.AddItemToSavedListAction(sku);
      // await MarketplaceService.addItemToSavedList("default", sku);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const history = useHistory();

  const handleProductSelectEvent = (event: any) => {
    event.preventDefault();

    setIsSubmitting(true);
    // select product
    if (props.SelectMarketplaceProductAction) {
      props.SelectMarketplaceProductAction(props.product);
    }

    setIsSubmitting(false);
    history.push(
      `/online-shopping/product-detail/${props.product?.categories[0].id}/${props.product.sku}`
    );
  };

  const isSavedItem: boolean =
    Array.isArray(props.savedItems) &&
    props.savedItems.findIndex(
      (item) => item.sku === parseInt(props.product.sku)
    ) > -1;

  const authenticatedUser = AuthService.GetLoggedInUser();

  const removeItem = async (sku: any) => {
    if (!authenticatedUser) {
      history.push("/login");
    }
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

  const addItem = async (sku: any) => {
    if (!authenticatedUser) {
      history.push("/login");
    }
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

  const marketPlaceLink = `/online-shopping/merchant/${sellerUrlKey}`;
  const foodLink = `/food/restaurant/${sellerId}`;
  return (
    <div className={styles.itemDetailsCard}>
      <div
        className={composeClasses("row w-100 position-relative", styles.row)}
      >
        {/* <p>Item Details</p> */}
        <div className={styles.mobileOnly}>
          <div className={styles.numberOfDelivery}>
            <span>Deliver 1 of 3</span>
          </div>
        </div>
        <div
          className={composeClasses(
            "col-md-5 col-sm-12 d-flex",
            styles.productCard
          )}
        >
          <div className={styles.image} onClick={handleProductSelectEvent}>
            <img alt={"product"} src={productImage} />
          </div>
          <div className={styles.productInfo}>
            <h6
              className={composeClasses(styles.name, "h6")}
              onClick={handleProductSelectEvent}
            >
              {productName}
            </h6>
            <p>
              Sold by{" "}
              <span>
                <Link
                  to={store_id === MARKETPLACE_ID ? marketPlaceLink : foodLink}
                >
                  {productSellerName}
                </Link>
              </span>
            </p>
          </div>
        </div>
        <div
          className={composeClasses(
            "col-md-2 col-sm-5 pt-1 mt-1",
            styles.quantityContainer
          )}
        >
          <div className={styles.quantity}>
            <p className={styles.mobileOnly}>Quantity</p>
            <NumberInput
              defaultValue={defaultProductQuantity}
              onChange={(newQuantity: number) =>
                handleQuantityUpdateEvent(newQuantity)
              }
              value={productQuantity ?? 1}
            />
          </div>
        </div>
        <div
          className={composeClasses(
            styles.priceContainer,
            "col-md-2 col-sm-7 text-end"
          )}
        >
          <div className={styles.price}>
            <p className={styles.priceInfo}>
              {accounting.formatMoney(
                productAmount * (productQuantity ?? 1),
                CURRENCIES.NAIRA
              )}
            </p>
            <div className={styles.btmPriceInfo}>
              <p>
                {accounting.formatMoney(productAmount, CURRENCIES.NAIRA)} x{" "}
                {productQuantity ?? 1}
              </p>
            </div>
          </div>
        </div>
        <div
          className={composeClasses(
            styles.productIconsContainer,
            "col-md-3 col-sm-12"
          )}
        >
          <div className={styles.productIcons}>
            <div className={`${styles.removeItem} py-2 me-2`}>
              <button
                className="btn"
                onClick={() => removeItemFromCart(sku, cartId, store_id)}
                type="button"
              >
                {isRemoving ? (
                  "Removing item..."
                ) : (
                  <>
                    <Icon className={"me-2"} name="trash" />
                    <small className={"pb-2 text-primary"}>Remove Item</small>
                  </>
                )}
              </button>
            </div>
            {store_id !== "3" && (
              <div
                className={`${styles.saveItem}`}
                onClick={() => (isSavedItem ? removeItem(sku) : addItem(sku))}
              >
                <div className={`${styles.iconWrapper} mt-1 mx-2`}>
                  {isSavedItem ? (
                    <Icon name="coloredSavedForLaterSmall" />
                  ) : (
                    <Icon name="heart" />
                  )}
                </div>
                {isSavedItem ? (
                  <p className={styles.tabletAndAboveOnly}>Saved</p>
                ) : isLoading ? (
                  <p className={styles.tabletAndAboveOnly}>Saving...</p>
                ) : (
                  <p className={styles.tabletAndAboveOnly}>Save For Later</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  cart: state.cart,
  savedItems: state?.cart?.SavedList?.items,
});

export default connect(mapStateToProps, {
  UpdateCartItemQtyAction,
  RemoveItemFromCartAction,
  AddItemToSavedListAction,
  ManageCartAlert,
  RemoveItemFromSavedList,
  SelectMarketplaceProductAction,
})(ItemDetailsCard);
