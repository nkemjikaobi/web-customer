/* eslint-disable @typescript-eslint/ban-types */
import accounting from "accounting";
import Icon from "Components/Icons";
import ICartProduct from "dto/Cart/ICartProduct";
import {
  CURRENCIES,
  REMOVE_FROM_CART_SUCCESS_MSG,
  REMOVE_FROM_CART_ERROR_MSG,
  REMOVE_SAVED_FOR_LATER_SUCCESS_MSG,
  REMOVE_SAVED_FOR_LATER_ERROR_MSG,
  SAVED_FOR_LATER_SUCCESS_MSG,
  SAVED_FOR_LATER_ERROR_MSG,
} from "Helpers/Constants";
import React, { useEffect, useState } from "react";
import styles from "./konlineCartCard.module.scss";
import {
  AddItemToSavedListAction,
  RemoveItemFromCartAction,
  RemoveItemFromSavedList,
} from "Http/Redux/Actions/Cart/ICartAction";
import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import MarketplaceService from "Http/Services/MarketplaceService";
import FoodService from "Http/Services/FoodService";
import { connect } from "react-redux";
import AuthService from "Http/Services/AuthService";
import { Link, useHistory, useParams } from "react-router-dom";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

interface IKonlineCartCard {
  cart: any;
  product: ICartProduct;
  RemoveItemFromCartAction: Function;
  savedItems: any;
  AddItemToSavedListAction: Function;
  RemoveItemFromSavedList: Function;
  ManageCartAlert: Function;
}

const konlineCartCard: React.FunctionComponent<IKonlineCartCard> = (
  props: IKonlineCartCard
) => {
  const [cartId, setCartId] = useState<number | null>(0);
  const [productImage, setProductImage] = useState<string>("");
  const [productName, setProductName] = useState<string>("");
  const [sku, setSku] = useState<string | number>("");
  const [productAmount, setProductAmount] = useState<number>(0);
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    if (props.product) {
      setSku(props.product.sku);
      setProductImage(props.product.small_image);
      setProductAmount(props.product.price);
      setProductName(props.product.name);
      setProductQuantity(props.product.requested_quantity);
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
  }, [props]);

  const removeItemFromCart = async (sku: any, cartId: any) => {
    if (sku && cartId) {
      setIsRemoving(true);
      const response = await props.RemoveItemFromCartAction(
        cartId,
        sku,
        MarketplaceService.STORE_ID
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

  const isSavedItem: boolean =
    Array.isArray(props.savedItems) &&
    props.savedItems.findIndex(
      (item) => item.sku === parseInt(props.product.sku)
    ) > -1;

  const history = useHistory();
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

  return (
    <div className={styles.konlineCartCard} title={productName}>
      <div className={styles.productImg}>
        <img alt={productName} src={productImage} />
      </div>
      <div className={styles.right}>
        <div>
          <p className={styles.productName}>{productName}</p>
        </div>

        <div className={styles.right_bottom}>
          <div className={styles.productInfo}>
            <p className={styles.price}>
              {accounting.formatMoney(productAmount, CURRENCIES.NAIRA)}
            </p>
            <p className={styles.quantity}>Qty: {productQuantity}</p>
          </div>
          <div className={styles.actions}>
            <div
              className={styles.icon}
              onClick={() => (isSavedItem ? removeItem(sku) : addItem(sku))}
            >
              {isSavedItem ? (
                <Icon name="coloredSavedForLaterSmall" />
              ) : (
                <Icon name="heart" />
              )}
            </div>
            <div
              className={styles.icon}
              onClick={() => removeItemFromCart(sku, cartId)}
            >
              {isRemoving ? (
                "Removing item..."
              ) : (
                <>
                  <Icon name="trash" />
                </>
              )}
            </div>
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
  RemoveItemFromCartAction,
  AddItemToSavedListAction,
  RemoveItemFromSavedList,
  ManageCartAlert,
})(konlineCartCard);
