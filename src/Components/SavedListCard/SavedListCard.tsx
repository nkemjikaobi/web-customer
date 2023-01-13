/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import Button from "Components/Button/button";
import Icon from "Components/Icons/icon";
import styles from "./SavedListCard.module.scss";
import {
  ADD_TO_CART_ERROR,
  CURRENCIES,
  REMOVE_SAVED_FOR_LATER_ERROR_MSG,
  REMOVE_SAVED_FOR_LATER_SUCCESS_MSG,
} from "Helpers/Constants";
import { getSanitizedHtml } from "libs/utils/utils";
import ISavedListItem from "dto/KongaOnline/ISavedListItem";
import accounting from "accounting";
import Asset from "Components/Asset/asset";
import constants from "Helpers/cloudinaryConstants";
import {
  RemoveItemFromSavedList,
  SetCartToOpenAction,
} from "Http/Redux/Actions/Cart/ICartAction";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { SelectMarketplaceProductAction } from "Http/Redux/Actions/MacketplaceActions/MarketplaceAction";
import {
  AddItemToCart,
  ManageCartAlert,
} from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import MarketplaceService from "Http/Services/MarketplaceService";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

interface ISavedListCard {
  cart_id: number | null;
  savedItem: any;
  RemoveItemFromSavedList: any;
  AddItemToCart: Function;
  SelectMarketplaceProductAction: Function;
  SetCartToOpenAction: Function;
  ManageCartAlert: Function;
}

const SavedListCard: React.FunctionComponent<ISavedListCard> = (
  props: ISavedListCard
) => {
  const [sku, setSku] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [urlKey, setUrlKey] = useState<string>("");
  const [sellerName, setSellerName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [cart, setCart] = useState<IMarketplaceCartForm>({
    cart_id: null,
    product: null,
    quantity: 1,
    options: null,
  });

  const handleAddtoCart = (e: unknown) => {
    setIsSubmitting(true);
    setIsSubmitting(false);
  };

  const removeItem = async (sku: number) => {
    try {
      setIsRemoving(true);
      if (sku) {
        setIsRemoving(true);
        const response = await props.RemoveItemFromSavedList(sku);
        if (response) {
          setIsRemoving(false);
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
      setIsRemoving(false);
    } catch (error) {
      setIsRemoving(false);
      console.log(error);
    }
  };

  const { store_id }: any = useParams();

  useEffect(() => {
    let mounted = true;

    if (mounted && props.savedItem) {
      setSku(props.savedItem.product?.sku || 0);
      setName(props.savedItem.product?.name || "");
      setSellerName(props.savedItem.product?.seller?.name || "");
      setAmount(props.savedItem.product?.price || 0);
      setUrlKey(
        props.savedItem?.product?.seller?.url_key ||
          props.savedItem?.product?.seller?.url
      );
    }
    return () => {
      mounted = false;
    };
  }, [sku, props.savedItem]);

  useEffect(() => {
    let mounted = true;

    if (mounted && props.savedItem?.product) {
      setCart({
        ...cart,
        product: props.savedItem?.product,
        store_id,
      });
    }

    return () => {
      mounted = false;
    };
  }, [props.savedItem?.product]);

  const handleAddtoCartBtnClickEvent = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    setIsHover(true);
    props.SelectMarketplaceProductAction(props.savedItem?.product);
    if (props.savedItem?.product) {
      let finalCart = { ...cart };

      if (props.cart_id) {
        finalCart = { ...finalCart, cart_id: props.cart_id };
      }

      if (store_id === MarketplaceService.STORE_ID) {
        finalCart = { ...finalCart, store_id };
      }

      const response = await props.AddItemToCart({
        ...finalCart,
      });
      if (response) {
        props.ManageCartAlert(cart);
        props.SetCartToOpenAction(store_id);
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

  const history = useHistory();
  const handleProductSelectEvent = (event: any) => {
    event.preventDefault();

    setIsSubmitting(true);
    // select product
    if (props.SelectMarketplaceProductAction) {
      props.SelectMarketplaceProductAction(props.savedItem.product);
    }

    setIsSubmitting(false);
    history.push(
      `/online-shopping/product-detail/${
        props?.savedItem?.product?.url_key || props?.savedItem?.product?.url
      }/${props?.savedItem?.product?.sku}`
    );
  };

  return (
    <div className={styles.savedListCard}>
      <div className={styles.image} onClick={handleProductSelectEvent}>
        <Asset
          alt="konga prime order img"
          name={`${
            props.savedItem.product && props.savedItem.product.image_full
          }`}
          type={constants.asset.cloudinaryType}
        />
      </div>
      <div className={styles.productInfo}>
        <h1 dangerouslySetInnerHTML={getSanitizedHtml(name)} />
        <p>
          Sold by
          <Link to={`/online-shopping/merchant/${urlKey}`}>
            <span className={sellerName}> {sellerName}</span>
          </Link>
        </p>
      </div>
      <div className={styles.quantity} />
      <div className={styles.price}>
        <p className={styles.priceInfo}>
          {accounting.formatMoney(amount, CURRENCIES.NAIRA)}
        </p>
      </div>
      <div>
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            className={"btn-sm"}
            handleClick={
              props.savedItem?.product.product_type !== "simple"
                ? handleProductSelectEvent
                : handleAddtoCartBtnClickEvent
            }
            isSubmitting={isSubmitting}
            title="Add To Cart"
          />
        </div>
        <div className={styles.removeItem} onClick={() => removeItem(sku)}>
          <Icon name="trash" />
          {isRemoving ? <p>Removing...</p> : <p>Remove Item</p>}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  cart_id: state.cart.Marketplace?.id ?? null,
});

export default connect(mapStateToProps, {
  RemoveItemFromSavedList,
  AddItemToCart,
  SetCartToOpenAction,
  ManageCartAlert,
  SelectMarketplaceProductAction,
})(SavedListCard);
