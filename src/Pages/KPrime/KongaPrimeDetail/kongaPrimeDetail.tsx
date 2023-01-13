import Asset from "Components/Asset/asset";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import Button from "Components/Button/button";
import Icon from "Components/Icons";
import config from "Configurations/configurations";
import { CURRENCIES, PAYMENT_OPTIONS, pageIDs } from "Helpers/Constants";
import CartService from "Http/Services/CartService";
import MarketplaceService from "Http/Services/MarketplaceService";
import PaymentService from "Http/Services/PaymentService";
import PrimeService from "Http/Services/PrimeService";
import { isNotEmptyArray } from "libs/utils/utils";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { specialPrices } from "../data";
import constants from "Helpers/cloudinaryConstants";

import styles from "./kongaPrimeDetail.module.scss";

/**
 *
 * @param {*} props{
 * @param {number} currentIndex The current index of passed as props
 * @param {number} id The id of each element
 * @param {string} title
 * }
 * @returns {string} The title passed as props
 *
 */

export interface ICurrentUser {
  auth: any;
  cart: any;
}

function kongaPrimeDetail(userData: ICurrentUser) {
  const { kongaPrimeSubscriptionID, customOptionSku }: any = useParams();

  const [productDetails, setProductDetails] = useState<any>({});
  const [adresses, setDeliveryAdresses] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchPrimeService = async () => {
    const prime = await PrimeService.GetProduct(kongaPrimeSubscriptionID);
    setProductDetails(prime);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (!document.getElementById(pageIDs.kpgFrameID)) {
        const kpgSdkUrl = config.kpaygateway.webSdkScriptUrl;
        const sdkScript = document.createElement("script");
        sdkScript.type = "text/javascript";
        sdkScript.src = kpgSdkUrl;
        sdkScript.id = pageIDs.kpgFrameID;
        document.body.appendChild(sdkScript);
      }

      fetchPrimeService();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const productObj = productDetails;
  const customOptions =
    productObj && productObj.custom_options && productObj.custom_options.values;
  const selectedCustomOption =
    isNotEmptyArray(customOptions) &&
    customOptions.find((data: any) => data.sku === parseInt(customOptionSku));
  let stateName = "";
  if (productObj && typeof productObj.name === "string") {
    stateName = productObj.name.toLowerCase();
  }

  //Handle Prime Subscription Button
  const handleSubscription = async () => {
    setLoading(true);
    const cartItems = userData && userData.cart;

    const primeProduct = productObj || {};

    // Cart Options for ProductId:
    const cartOptions = {
      cart_id: "",
      options: {
        option_id: selectedCustomOption.option_id
          ? selectedCustomOption.option_id.toString()
          : "",
        option_type_id: selectedCustomOption.option_type_id
          ? selectedCustomOption.option_type_id.toString()
          : "",
      },
      product: primeProduct,
      quantity: 1,
    };

    const oldCartId =
      cartItems && cartItems.Marketplace && cartItems.Marketplace.id;

    /**
     * Disable user's current cart if it contains Items
     */

    const cartData =
      cartItems &&
      cartItems?.Marketplace &&
      cartItems?.Marketplace?.items?.map((ele: any) => {
        return ele.products;
      });

    if (isNotEmptyArray(cartData)) {
      try {
        const data = await CartService.DisableCart(oldCartId);
      } catch (error: any) {
        console.log("{CRITICAL} Error:", error);
      }
    }

    //Add KongaPrime product to cart
    const addCart = await CartService.AddItemToMarketplaceCart(cartOptions)
      .then((cartData) => {
        return cartData;
      })
      .catch((error) => {
        return null;
      });

    if (!addCart) return;

    const cart_id = addCart && addCart.id;
    const address_type = addCart && addCart.shipping_address.address_type;
    let address_id = addCart && addCart.shipping_address.address_id;

    /**
     * Pick first address in the user's list of addresses
     * if the cart shipping address is null
     */

    if (!address_id) {
      address_id = userData && isNotEmptyArray(adresses) && adresses[0].id;
    }
    const cartOption = {
      address_id,
      address_type,
      cart_id: cart_id ?? 0,
      phone_number: "",
    };
    await CartService.SetCartAddress(cartOption)
      .then((res: any) => console.log(res))
      .catch((err: any) => console.log("Error setting user address", err));
    completeCheckout(cart_id, oldCartId);
  };

  const completeCheckout = async (cartId: any, oldCartId: any) => {
    const placeOrderParams = {
      cart_id: cartId,
      comment: "",
      payment_code: `${PAYMENT_OPTIONS.KPAYGATEWAY}`,
    };
    const placeOrderData = await CartService.PlaceOrder(placeOrderParams).catch(
      async (err: any) => {
        await CartService.EnableCart(oldCartId);
        setLoading(false);
        return null;
      }
    );

    if (!placeOrderData) {
      await CartService.DisableCart(cartId);
    }

    const amount: any = placeOrderData && placeOrderData.grand_total;
    const {
      emailAddress: email,
      firstName: firstname,
      lastName: lastname,
      phoneNumber: phone,
    } = userData.auth.CurrentUser;

    const orderID = placeOrderData && placeOrderData.order_id;
    const enableFrame = Boolean(config.kongapay.iframeEnabled);

    const paymentDetails = {
      amount: parseInt(amount, 10) * 100,
      callback: enableFrame
        ? "transactionCB"
        : window.location.origin + "/konga-prime",
      callbackURL: "/konga-prime",
      customerId: email,
      description: `Konga Transaction ${orderID}`,
      enableFrame,
      email,
      firstname,
      hash: placeOrderData?.kpaygateway.hash,
      lastname,
      merchantId: config.sdk.kOnline.merchantId,
      phone,
      reference: orderID,
      mode: "live",
      selectedChannelIdentifier: "",
    };

    if (
      placeOrderData &&
      placeOrderData.kpaygateway.hasOwnProperty("discount") &&
      placeOrderData.kpaygateway.discount !== null
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      paymentDetails.discount = {
        ...placeOrderData.kpaygateway.discount,
        amount: parseInt(placeOrderData.kpaygateway.discount.amount),
      };
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.KPG) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-undef
      KPG.setup(paymentDetails);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.transactionCB = (err: any, data: any) => {
      if (err || !data) {
        setLoading(false);
      }
      handleKongaPayResponse(orderID, cartId, oldCartId);
    };

    const handleKongaPayResponse = async (
      orderID: any,
      cartId: any,
      oldCartId: any
    ) => {
      setLoading(true);
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
    const handleOrderSuccess = async (oldCartId: any) => {
      setLoading(false);
      const customerDetails = await MarketplaceService.GetCustomerDetails()
        .then((response) => response)
        .catch((err) =>
          console.log(
            "[KongaPrime.handleOrderSuccess] error fetching customer details -",
            err
          )
        );
      // Renable the old cart with items so that users does not loose their cart
      enableCart(oldCartId);
      setLoading(false);
    };

    /**
     * Method to enable user's cart
     * @param {*} cartId
     */
    const enableCart = async (cartId: any) => {
      await CartService.EnableCart(cartId).catch((err) => {
        console.log("[KongaPrime.handleSubscription], {CRITICAL} Error:", err);
        return null;
      });
    };
  };
  const defaultPrice =
    selectedCustomOption && parseFloat(selectedCustomOption.default_price);
  return (
    <Fragment>
      <BasePageLayout
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.productDetails}>
          <div className={styles.productDetails_ImageWrapper}>
            <Asset
              alt="konga prime order img"
              className={styles.productDetails_Image}
              name={`${productObj.image_full}`}
              type={constants.asset.cloudinaryType}
            />
          </div>
          <div className={styles.primePriceWrapper}>
            <div className={styles.primePriceWrapper_LocationWrapper}>
              <div className={styles.primePriceWrapper_State}>
                {productObj && productObj.name}
              </div>
            </div>
            <div className={styles.primePriceWrapper_Main}>
              <div className={styles.prices}>
                <div className={styles.primePriceWrapper_State}>
                  {CURRENCIES.NAIRA}
                  {defaultPrice}
                </div>
                <div className={styles.primePriceWrapper_Formerprice}>
                  {CURRENCIES.NAIRA}
                  {stateName &&
                    parseFloat(specialPrices[stateName][customOptionSku])}
                </div>
                <div className={styles.primePriceWrapper_Save}>
                  You save {CURRENCIES.NAIRA}
                  {stateName &&
                    parseFloat(specialPrices[stateName][customOptionSku]) -
                      defaultPrice}
                </div>
              </div>
              <div className={styles.durationWrapper}>
                <div className={styles.duration}>
                  <p>
                    {selectedCustomOption && selectedCustomOption.store_title}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                className={styles.buttonWrapper_subscribeButton}
                handleClick={handleSubscription}
                isSubmitting={loading}
                title="Subscribe"
              />
            </div>
            <div className={styles.shareWrapper}>
              <div className={styles.shareText}>Share With Friends</div>
              <div className={styles.iconWrapper}>
                <div className={styles.iconWrapper_Icon}>
                  <Icon name="facebook" />
                </div>
                <div className={styles.iconWrapper_Icon}>
                  <Icon name="twitter" />
                </div>
                <div className={styles.iconWrapper_Icon}>
                  <Icon name="youtube" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
}

const mapStateToProps = (state: any) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(kongaPrimeDetail);
