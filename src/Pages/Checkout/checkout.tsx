/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import DeliveryOptionsCard from "Components/DeliveryOptionsCard/deliveryOptionsCard";
import styles from "./checkout.module.scss";
import PaymentOptions from "Components/PaymentOptions/paymentOptions";
import SideMenu from "Components/SIdeMenu/sideBar";
import OrderDetails from "PagesComponents/Cart/OrderDetails";
import MarketplaceService from "Http/Services/MarketplaceService";
import IAddress from "dto/KongaOnline/IAddress";
import AddressBookComponent from "PagesComponents/Cart/AddressBookComponent/AddressBookComponent";
import IDeliveryAddressForm from "Models/FormModels/Marketplace/IDeliveryAddressForm";
import PickupAddressComponent from "PagesComponents/Cart/PickupAddressComponent/PickupAddressComponent";
import IPickupAddressForm from "Models/FormModels/Marketplace/IPickupAddressForm";
import IPickupLocation from "dto/KongaOnline/IPickupLocation";
import { connect, useDispatch } from "react-redux";
import { ShowSideMenu } from "Http/Redux/Actions/Cart/ICardDisplayAction";
import DeliveryAddressFormComponent from "PagesComponents/Cart/DeliveryAddressFormComponent/DeliveryAddressFormComponent";
import {
  SetDeliveryAddressAction,
  AddCustomerAddressAction,
  EditCustomerAddressAction,
  SetCustomerAddressesAction,
  SelectShippingAddressAction,
} from "Http/Redux/Actions/Cart/ICardDisplayAction";
import CartService from "Http/Services/CartService";
import Icon from "Components/Icons";
import { composeClasses } from "libs/utils/utils";
import { useParams } from "react-router";
import { ADDRESS_TAG } from "Http/Redux/Types/Cart/Types";
import IFoodCart from "dto/Cart/IFoodCart";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import { AddToMarketplaceCart } from "Http/Redux/Actions/ActionCreators/Cart/MarketPlaceCartCreator";

export interface ICheckoutPage {
  AddressToEdit: IAddress;
  CartId: number;
  CustomerAddresses: Array<IAddress>;
  CartDisplayAddressForm: boolean;
  CartDisplayAddressBook: boolean;
  CartDisplayPickupAddressForm: boolean;
  SelectedCheckoutAddress: IAddress;
  SetDeliveryAddressAction: Function;
  ShowSideMenu: Function;
  SetCustomerAddressesAction: Function;
  AddCustomerAddressAction: Function;
  EditCustomerAddressAction: Function;
  SelectShippingAddressAction: Function;
  shoppingCart?: IMarketplaceCart | IFoodCart;
}

const Checkout: React.FunctionComponent<ICheckoutPage> = (
  props: ICheckoutPage
) => {
  const [heading, setHeading] = useState(" ");
  const [buttonTitle, setButtonTitle] = useState(" ");
  const [ratingCardHidden, setRatingCardHidden] = useState(false);
  const [hasAddress, setHasAddress] = useState<boolean>(false);
  const [comment, setComment] = useState("");
  const [pickupLocations, setPickupLocations] = useState<
    Array<IPickupLocation>
  >([]);

  const [allowPod, setAllowPod] = useState<boolean>(true);
  const [sideMenuChild, setSideMenuChild] = useState(<Fragment />);
  const target = document.getElementById("sidemenu");

  const { store_id }: any = useParams();
  const dispatch = useDispatch();

  const [pickupAddressForm, setPickupAddressForm] =
    useState<IPickupAddressForm>();
  const [addressForm, setAddressForm] = useState<IDeliveryAddressForm>();
  const [selectedCard, setSelectedCard] = useState<IPickupLocation>();
  const [selectedAddress, setSelectedAddress] = useState<IAddress>();
  const [sidebarClassName, setSidebarClassName] = useState<string>("");
  const [sideBarUpdating, setSideBarUpdating] = useState<boolean>(false);
  const [stageSelector, setStageSelector] = useState<string>("deliverToMe");

  const setStageSelectorState: Function = (selector: string) => {
    setStageSelector(selector);
  };

  const fetchPickupLocations = async (lga: number) => {
    const response: Array<IPickupLocation> =
      await MarketplaceService.GetPickupLocations(lga);
    if (response) {
      setPickupLocations(response);
    }
  };

  const fetchCustomerAddresses = async () => {
    const results: any = await CartService.GetCustomerAddresses();
    if (results && results.length > 0) {
      props.SetCustomerAddressesAction(results);
      const default_address = results.filter(
        (result: IAddress) => `${result.is_default}` === "true"
      );
      props.SelectShippingAddressAction(default_address[0], props.CartId);
    }
  };

  const fetchCart = async () => {
    const cartData = await CartService.GetCart();
    dispatch(AddToMarketplaceCart(cartData));
  };

  useEffect(() => {
    fetchCustomerAddresses();
    fetchCart();
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted && props.shoppingCart) {
      checkIfPodIsAllowed(props.shoppingCart);
    }
    return () => {
      mounted = false;
    };
  }, [props.shoppingCart]);

  const handleSideBarDispatch = (value: string) => {
    if (props.ShowSideMenu) {
      props.ShowSideMenu(value);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (props.CartDisplayAddressBook) {
      renderAddress();
      handleSideBarAction();
      setSideMenuChild(
        <AddressBookComponent
          onSelectAddress={setSelectedAddress}
          stageSelector={stageSelector}
        />
      );
    } else if (props.CartDisplayAddressForm) {
      props.AddressToEdit !== null
        ? renderDeliveryAddress("Save Changes")
        : renderDeliveryAddress("Save & Use Address");
      handleSideBarAction();
      setSideMenuChild(
        <DeliveryAddressFormComponent onChange={setAddressForm} />
      );
    } else if (props.CartDisplayPickupAddressForm) {
      renderPickupAddress();
      handleSideBarAction();
      setSideMenuChild(
        <PickupAddressComponent
          fetchPickupLocations={fetchPickupLocations}
          locations={pickupLocations}
          onChange={(formData: IPickupAddressForm, card: IPickupLocation) => {
            setPickupAddressForm(formData);
            setSelectedCard(card);
            if (card && card.id > 0) {
              setButtonTitle("Use Pickup Address");
            }
          }}
          onSelectAddress={setSelectedAddress}
        />
      );
    } else if (props.SelectedCheckoutAddress) {
      hidePageBlocker();
    }

    setHasAddress(props.CustomerAddresses?.length > 0);

    return () => {
      mounted = false;
    };
  }, [props, pickupLocations]);

  const handleSideBarAction = () => {
    setSidebarClassName(styles.moveSideBar);
    setRatingCardHidden(true);
  };

  const renderDeliveryAddress = (message: string) => {
    setHeading("Delivery Address");
    setButtonTitle(message);
  };

  const renderAddress = () => {
    setHeading("Address Book");
    setButtonTitle("Use this Address");
  };

  const renderPickupAddress = () => {
    setHeading("Pickup Address");
    setButtonTitle("Search Pickup Address");
  };

  const handleSubmit = (event: any) => {
    setSideBarUpdating(true);
    console.log("1");

    if (props.CartDisplayAddressBook || selectedAddress) {
      console.log("4");
      console.log({ selectedAddress });
      // we have been instructed to use this address
      props.SelectShippingAddressAction(selectedAddress, props.CartId);
      handleBackdropClick(event, false);
    }

    if (props.CartDisplayAddressForm && addressForm) {
      console.log("2");
      // save and use address used
      const address =
        CartService.ConvertIDeliveryAddressToIAddress(addressForm);
      props.AddCustomerAddressAction(address);
      console.log({ address });
      props.SelectShippingAddressAction(address, props.CartId);
    }

    if (selectedCard) {
      handleBackdropClick(event, false);
    }

    if (props.SelectedCheckoutAddress) {
      hidePageBlocker();
    }
    setSideBarUpdating(false);
  };

  const handleEditSubmit = async (event: any) => {
    setSideBarUpdating(true);
    if (props.CartDisplayAddressForm && addressForm) {
      // save and use address used
      const address =
        CartService.ConvertIDeliveryAddressToIAddress(addressForm);
      try {
        const addresses = await CartService.EditCustomerAddress(
          props.AddressToEdit.id,
          address
        );
        if (addresses) {
          props.SetCustomerAddressesAction(addresses);
        }
        handleSideBarDispatch(ADDRESS_TAG);
      } catch (error) {
        handleSideBarDispatch(ADDRESS_TAG);
        console.log({ error });
      }
    }

    if (props.CartDisplayAddressBook && selectedAddress) {
      // we have been instructed to use this address
      props.SelectShippingAddressAction(selectedAddress, props.CartId);
      handleBackdropClick(event, false);
    }
    if (selectedCard) {
      handleBackdropClick(event, false);
    }

    if (props.SelectedCheckoutAddress) {
      hidePageBlocker();
    }
    setSideBarUpdating(false);
  };

  let backdropRef: HTMLDivElement | null;

  const hidePageBlocker = () => {
    setSidebarClassName(styles.removeSideBar);
    setRatingCardHidden(false);
  };

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    backdropRef: boolean
  ) => {
    if (event.target || backdropRef === false) {
      hidePageBlocker();
    }
  };

  const checkIfPodIsAllowed = (cartItems: any) => {
    const items = cartItems?.items;
    let hasAtLeastOnePrepaid = 0;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const products = items[i].products;
        for (let j = 0; j < products.length; j++) {
          if (!products[j].allow_pod) {
            hasAtLeastOnePrepaid = 1;
          }
        }
      }
    }
    if (hasAtLeastOnePrepaid > 0) {
      setAllowPod(false);
    }
  };

  return (
    <BasePageLayout
      hideFooterOnMobile="true"
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div
        className={
          ratingCardHidden === true ? "waves " + styles.overlay : undefined
        }
        onClick={(event) => handleBackdropClick(event, false)}
        ref={(node) => (backdropRef = node)}
      />
      <div className={styles.checkout}>
        <div className={styles.checkout_options}>
          <div className={styles.deliveryOption}>
            <div
              className={`${styles.header} ${
                props.SelectedCheckoutAddress ? "border" : styles.active
              }`}
            >
              {props.SelectedCheckoutAddress ? (
                <div className={styles.complete}>
                  <Icon name="marked" />
                </div>
              ) : (
                <div
                  className={composeClasses(styles.icon, styles.icon_active)}
                />
              )}
              <p>1. CHOOSE DELIVERY OPTION</p>
            </div>
            <DeliveryOptionsCard
              deliveryAddress={selectedAddress}
              selectedPickupLocation={selectedCard}
              setComment={setComment}
              setStageSelectorState={setStageSelectorState}
              stageSelector={stageSelector}
              StoreId={store_id}
            />
          </div>
          {props.SelectedCheckoutAddress !== null ? (
            <div className={styles.paymentOptions}>
              <div
                className={`${styles.header} ${
                  props.SelectedCheckoutAddress ? styles.active : "border"
                }`}
              >
                {selectedCard ? (
                  <div className={styles.complete}>
                    <Icon name="marked" />
                  </div>
                ) : (
                  <div
                    className={`${styles.icon} ${
                      props.SelectedCheckoutAddress ? styles.icon_active : ""
                    }`}
                  />
                )}
                <p>2. PAYMENT OPTIONS</p>
              </div>
              {(props.SelectedCheckoutAddress !== undefined ||
                selectedCard !== undefined) && (
                <PaymentOptions
                  allowPod={allowPod}
                  comment={comment}
                  storeId={store_id}
                />
              )}
            </div>
          ) : null}
        </div>
        <OrderDetails />
        <div
          className={`${styles.sideMenu} px-2 ${sidebarClassName}`}
          id="sidemenu"
        >
          <SideMenu
            buttonTitle={buttonTitle}
            heading={heading}
            isSubmitting={sideBarUpdating}
            onClose={(event: any) => handleBackdropClick(event, false)}
            onSubmit={
              props.AddressToEdit !== null ? handleEditSubmit : handleSubmit
            }
          >
            {sideMenuChild}
          </SideMenu>
        </div>
      </div>
    </BasePageLayout>
  );
};

Checkout.defaultProps = {
  shoppingCart: undefined,
};

const mapStateToProps = (state: any) => ({
  AddressToEdit: state.cart.AddressToEdit,
  CartId: (state.cart.Marketplace?.cart_id || state.cart.Marketplace?.id) ?? 0,
  CustomerAddresses: state.cart.CustomerAddresses,
  CartDisplayAddressForm: state.cart.CartDisplayAddressForm,
  CartDisplayAddressBook: state.cart.CartDisplayAddressBook,
  CartDisplayPickupAddressForm: state.cart.CartDisplayPickupAddressForm,
  SelectedCheckoutAddress: state.cart.SelectedCheckoutAddress,
  shoppingCart: state.cart.Marketplace,
});

export default connect(mapStateToProps, {
  SetDeliveryAddressAction,
  SetCustomerAddressesAction,
  ShowSideMenu,
  AddCustomerAddressAction,
  EditCustomerAddressAction,
  SelectShippingAddressAction,
})(Checkout);
