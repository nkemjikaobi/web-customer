/* eslint-disable @typescript-eslint/ban-types */
import Button from "Components/Button/button";
import { Input } from "Components/Form/inputs";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./paymentOptions.module.scss";
import { PlaceOrderAction } from "Http/Redux/Actions/Cart/ICartAction";
import IPlaceOrder from "dto/Cart/IPlaceOrder";
import { CASH_ON_DELIVERY, ERROR, KONGA_PAY_SDK } from "Helpers/Constants";
import { useHistory } from "react-router-dom";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import IPayViaKongapaySdk from "dto/Cart/IPayViaKongapaySdk";
import IUser from "dto/Authentication/IUser";
import CartService from "Http/Services/CartService";
import masterCard from "Assets/images/png/masterCard.png";
import verve from "Assets/images/png/verve.png";
import visa from "Assets/images/png/visa.png";
import kongaPay from "Assets/images/png/kongaPay.png";
import { composeClasses } from "libs/utils/utils";
import IFoodCart from "dto/Cart/IFoodCart";
import FoodService from "Http/Services/FoodService";
import config from "Configurations/configurations";
import PaymentService from "Http/Services/PaymentService";
import { AddItemToCart } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import { useParams } from "react-router";
import MarketplaceService from "Http/Services/MarketplaceService";
import Icon from "Components/Icons";
import useClickOutside from "CustomHooks/useClickOutSide";
import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

interface IPaymentOption {
  AddItemToCart: Function;
  customer?: IUser;
  foodCart?: IFoodCart;
  storeId: number;
  shoppingCart?: IMarketplaceCart | IFoodCart;
  PlaceOrderAction: Function;
  comment: string;
  selectedFoodLga?: string;
  foodDeliveryAddress: string;
  foodDeliveryArea: string;
  OrderDetails?: any;
  ManageCartAlert: Function;
  allowPod: boolean;
}

const paymentOptions: React.FunctionComponent<IPaymentOption> = (
  props: IPaymentOption
) => {
  const history = useHistory();
  const [cartId, setCartId] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [paymentOption, setPaymentOption] = useState("kpaygateway");
  const [giftCard, setGiftCard] = useState("");
  const [applyingGiftCard, setApplyingGiftCard] = useState<boolean>(false);
  const [sdkConfig, setSdkConfig] = useState<IPayViaKongapaySdk>({
    hash: "",
    amount: 0,
    description: "",
    callback: "",
    callbackURL: "",
    customerId: "",
    email: "",
    firstname: "",
    lastname: "",
    merchantId: "",
    phone: "",
    reference: "",
    selectedChannelIdentifier: "",
  });
  const [showAddressAlert, setShowAddressAlert] = useState<boolean>(false);

  const handleGiftOrderApplicationEvent = async (e: any) => {
    e.preventDefault();
    setApplyingGiftCard(true);
    await CartService.ApplyGiftCard(giftCard, cartId);
    setApplyingGiftCard(false);
  };
  const { store_id }: any = useParams();
  const [orderData, setOrderData] = useState<any>({ id: "" });

  const handleOrderSuccess = async (oldCartId: any) => {
    await MarketplaceService.GetCustomerDetails().then(async (response) => {
      await props.AddItemToCart(null);
      history.push(`/online-shopping/cart/successful/${orderData.id}`);
      return response;
    });
    // Renable the old cart with items so that users does not loose their cart
    enableCart(oldCartId);
  };

  const enableCart = async (cartId: any) => {
    await CartService.EnableCart(cartId).catch((err) => {
      return null;
    });
  };

  const handleKongaPayResponse = async (
    orderID: any,
    cartId: any,
    oldCartId: any
  ) => {
    await PaymentService.RequeryPayment(orderID)
      .then((res: any) => {
        handleOrderSuccess(oldCartId);
      })
      .catch(async (error) => {
        // Re-enable original cart {oldCartId} if it had items in it
        if (oldCartId) {
          enableCart(oldCartId);
        }
      });
  };

  const addressAlertNode = useClickOutside(() => {
    setShowAddressAlert(false);
  });

  const handleConfirmOrderActionEvent = async (event: any) => {
    setIsSubmitting(true);

    const FOOD_ID = FoodService.STORE_ID.toString();
    if (store_id === FOOD_ID) {
      if (props.selectedFoodLga !== props.foodDeliveryAddress) {
        setShowAddressAlert(true);
        setIsSubmitting(false);
        return;
      }
    }

    if (props) {
      let cartIdentifier =
        props.shoppingCart &&
        (props.shoppingCart.cart_id || props.shoppingCart.id);

      const idStore = parseInt(`${props.storeId}`);
      if (idStore) {
        if (idStore === FoodService.STORE_ID && props.foodCart) {
          cartIdentifier = props.foodCart.cart_id || props.foodCart.id;
          orderData.foodCart = props.foodCart;
        }
      }

      const order: IPlaceOrder = {
        cart_id: cartIdentifier,
        comment: props.comment,
        payment_code: paymentOption,
      };

      const oldCartId = props.shoppingCart?.cart_id || props.shoppingCart?.id;
      orderData.shoppingCart = props.shoppingCart;
      const enableFrame = true;
      const result: any | null = await props.PlaceOrderAction(order, idStore);
      setIsSubmitting(false);

      const place_order = result?.data.placeOrder;

      if (result?.status === ERROR || place_order === null) {
        return props.ManageCartAlert(
          null,
          result?.aData?.errors[0].message || "",
          NotificationAlertType.Error
        );
      }

      let merchantIdentifier = config.sdk.kOnline.merchantId;
      orderData.id = place_order.order_id;

      if (idStore === FoodService.STORE_ID) {
        merchantIdentifier = config.sdk.kFood.merchantId;
      }

      switch (paymentOption) {
        case KONGA_PAY_SDK:
          // open the kongapay sdk
          const confgData = setConfigData();
          const finalConfig = {
            ...confgData,
            callback: enableFrame ? "transactionCB" : window.location.origin,
            callbackURL: `/online-shopping/cart/successful/${place_order?.order_id}`,
            amount: parseInt(place_order.grand_total.toString(), 10) * 100,
            merchantId: merchantIdentifier,
            reference: place_order.order_id,
            hash: place_order.kpaygateway.hash,
            mode: config.sdk.mode,
            enableFrame,
            description: `Konga Transaction ${place_order.order_id}`,
          };
          if (
            place_order &&
            place_order.kpaygateway.hasOwnProperty("discount") &&
            place_order.kpaygateway.discount !== null
          ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            finalConfig.discount = {
              ...place_order.kpaygateway.discount,
              amount: parseInt(place_order.kpaygateway.discount.amount),
            };
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (window.KPG) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-undef
            KPG.setup(finalConfig);
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.transactionCB = (err: any, data: any) => {
            if (err || !data) {
              setIsSubmitting(false);
              if (orderData.shoppingCart || orderData.foodCart) {
                const carts: any[] = [];
                if (orderData.shoppingCart) carts.push(orderData.shoppingCart);
                if (orderData.foodCart) carts.push(orderData.foodCart);
                carts.forEach((cart: any) => {
                  cart.items.forEach((item: any) => {
                    item.products.forEach(async (product: any) => {
                      await props.AddItemToCart({
                        product,
                        quantity: product.requested_quantity,
                      });
                    });
                  });
                });
              }
            } else {
              handleKongaPayResponse(place_order.order_id, cartId, oldCartId);
            }
          };
          return;
        case CASH_ON_DELIVERY:
          await props.AddItemToCart(null);
          history.push(
            `/online-shopping/cart/successful/${place_order.order_id}`
          );
          return;
      }

      setIsSubmitting(false);
    }
  };

  const setConfigData = () => {
    if (props.customer) {
      return {
        ...sdkConfig,
        callback: "/payment/callback",
        customerId: props.customer.emailAddress ?? "",
        email: props.customer.emailAddress ?? "",
        firstname: props.customer.firstName ?? "",
        lastname: props.customer.lastName ?? "",
        phone: props.customer.phoneNumber ?? "",
      };
    }
    return sdkConfig;
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && props.shoppingCart && props.shoppingCart.id) {
      const cartId: any = props.shoppingCart.cart_id || props.shoppingCart.id;
      setCartId(cartId);
      setSdkConfig(setConfigData());
    }
    return () => {
      mounted = false;
    };
  }, [props]);

  useEffect(() => {
    let mounted = true;
    if (mounted && props.shoppingCart && props.shoppingCart.id) {
      setCartId(props.shoppingCart.id);
      setSdkConfig(setConfigData());
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handleBackdropClick = (event: any, backdropRef: any, handler: any) => {
    if (event.target && event.target === backdropRef) {
      if (typeof handler === "function") handler();
    }
  };

  const handleOverlayAddress = () => {
    setShowAddressAlert(false);
  };

  let backdropRef: HTMLDivElement | null;

  return (
    <>
      <div className={`${styles.paymentOptions} border border-top-0`}>
        <div
          className={composeClasses(
            styles.paymentOptions_card,
            `${paymentOption === "kpaygateway" && styles.active}`
          )}
        >
          <div className={styles.inputWrapper}>
            <input
              checked={paymentOption === "kpaygateway"}
              className={"form-check-input"}
              name={"paymentOption"}
              onChange={(e: any) => setPaymentOption(e.target.value)}
              type={"radio"}
              value={"kpaygateway"}
            />
            <label className={"ps-1 pe-3"} htmlFor={"round-trip"}>
              Pay Now
            </label>
          </div>
          <div className={styles.cardInfo}>
            <p className={composeClasses(styles.info)}>
              Pay instantly and securely with KongaPay wallet or with your
              credit/debit card.
            </p>
            <div className={styles.cards}>
              <img alt="visa-card" className={styles.cardsImage} src={visa} />
              <img
                alt="master-card"
                className={styles.cardsImage}
                src={masterCard}
              />
              <img alt="verve-card" className={styles.cardsImage} src={verve} />
              <img
                alt="konga-pay"
                className={styles.cardsImage}
                src={kongaPay}
              />
            </div>
          </div>
        </div>
        {props.allowPod && (
          <div
            className={composeClasses(
              styles.paymentOptions_card,
              `${paymentOption === "cashondelivery" && styles.active}`
            )}
          >
            <div className={styles.inputWrapper}>
              <input
                checked={paymentOption === "cashondelivery"}
                className={"form-check-input"}
                name={"paymentOption"}
                onChange={(e: any) => setPaymentOption(e.target.value)}
                type={"radio"}
                value={"cashondelivery"}
              />
              <label
                className={composeClasses(
                  "ps-1 pe-3",
                  styles.payOnDeliveryLabel
                )}
                htmlFor={"round-trip"}
              >
                Pay on Delivery
              </label>
            </div>
            <div className={styles.cardInfo}>
              <p className={styles.info}>
                Please note that you would have to make payment before opening
                your package. Once the seal is broken, the item can only be
                returned if it is damaged, defective or has missing parts.
              </p>
            </div>
          </div>
        )}
        <div className={styles.addVoucher}>
          <div className={styles.heading}>
            <h3>Add Voucher Code</h3>
            <p>Do you have a voucher? Enter the voucher code below</p>
          </div>
          <div className={styles.applyVoucher}>
            <div className={styles.input}>
              <Input
                name={"giftCard"}
                onChange={(e: any) => setGiftCard(e.target.value)}
                placeholder="Add a Voucher / Gift Card"
                readOnly={paymentOption === "cashondelivery"}
                type="text"
              />
            </div>
            <div className={styles.applyVoucherButton}>
              <Button
                className={"text-white"}
                handleClick={handleGiftOrderApplicationEvent}
                isSubmitting={applyingGiftCard}
                title="Apply"
              />
            </div>
          </div>
          <p className={styles.terms}>
            By clicking this button, you agree with our{" "}
            <span>terms and conditions</span>{" "}
          </p>
          <div className={styles.confirmButtonWrapper}>
            <div className={styles.confirmOrderButton}>
              <Button
                className={"text-white"}
                handleClick={(e: any) => handleConfirmOrderActionEvent(e)}
                isSubmitting={isSubmitting}
                loadingText={"Confirming Order...."}
                title="Confirm Order"
              />
            </div>
          </div>
        </div>
      </div>
      {showAddressAlert && (
        <>
          <div
            className={showAddressAlert ? styles.overlay : undefined}
            onClick={(event) =>
              handleBackdropClick(event, backdropRef, handleOverlayAddress())
            }
            ref={(node) => (backdropRef = node)}
          />
          <div className={styles.addressAlert} ref={addressAlertNode}>
            <Icon name="mapMarker3" />
            <p>
              Please change your address or select address within{" "}
              {props.foodDeliveryArea}
            </p>
            <button onClick={() => setShowAddressAlert(false)}>ok</button>
          </div>
        </>
      )}
    </>
  );
};

paymentOptions.defaultProps = {
  customer: undefined,
  shoppingCart: undefined,
  OrderDetails: undefined,
  foodCart: undefined,
  selectedFoodLga: "",
  foodDeliveryAddress: "",
  foodDeliveryArea: "",
};

const mapStateToProps = (state: any) => ({
  customer: state.auth.CurrentUser,
  shoppingCart: state.cart.Marketplace,
  OrderDetails: state.kpay.OrderDetails,
  foodCart: state.cart.Food,
  selectedFoodLga: state?.food?.SelectedLocation?.area_id ?? "",
  foodDeliveryAddress: state?.cart?.SelectedCheckoutAddress?.area?.id ?? "",
  foodDeliveryArea: state?.food?.SelectedLocation?.area ?? "",
});

export default connect(mapStateToProps, {
  AddItemToCart,
  PlaceOrderAction,
  ManageCartAlert,
})(paymentOptions);
