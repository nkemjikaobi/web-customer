/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Button from "Components/Button/button";
import styles from "./deliveryOptionsCard.module.scss";
import IPickupLocation from "dto/KongaOnline/IPickupLocation";
import { ADDRESS_TAG, PICKUP_TAG } from "Http/Redux/Types/Cart/Types";
import { connect } from "react-redux";
import { ShowSideMenu } from "Http/Redux/Actions/Cart/ICardDisplayAction";
import { SelectShippingAddressAction } from "Http/Redux/Actions/Cart/ICardDisplayAction";
import IDeliveryAddress from "dto/KongaOnline/IDeliveryAddress";
import DeliveryInstructions from "Components/DeliveryInstructions/deliveryInstructions";
import IAddress from "dto/KongaOnline/IAddress";
import { composeClasses } from "libs/utils/utils";
import Icon from "Components/Icons";
import FoodService from "Http/Services/FoodService";
import MarketplaceService from "Http/Services/MarketplaceService";

interface IProps {
  CartId: number;
  deliveryAddress?: IAddress;
  selectedPickupLocation?: IPickupLocation;
  SelectedDeliveryAddress: IDeliveryAddress;
  SelectedCheckoutAddress: IAddress;
  SelectShippingAddressAction: Function;
  ShowSideMenu: Function;
  FoodLocation: string;
  stageSelector: string;
  setStageSelectorState: Function;
  StoreId: any;
  setComment: Function;
}

const deliveryOptionsCard: React.FunctionComponent<IProps> = ({
  CartId,
  selectedPickupLocation,
  ShowSideMenu,
  SelectedCheckoutAddress,
  SelectShippingAddressAction,
  FoodLocation,
  stageSelector,
  setStageSelectorState,
  StoreId,
  setComment,
}: IProps) => {
  const [contactAddress, setContactAddress] = useState<string>();
  const [cityAddress, setCityAddress] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [firstname, setFirstName] = useState<string>();
  const [lastname, setLastName] = useState<string>();
  const [deliveryAddress, setDeliveryAddress] = useState<IAddress | null>(null);
  const [numberOfLocations, setNumberOfLocations] = useState<number>(0);
  const handleSideBarDispatch = (value: string) => {
    if (ShowSideMenu) {
      ShowSideMenu(value);
    }
  };

  const FOOD_ID = FoodService.STORE_ID.toString();
  const MARKET_PLACE_ID = MarketplaceService.STORE_ID.toString();

  const handleChangeAddressEvent = (event: any) => {
    setDeliveryAddress(null);
    SelectShippingAddressAction(null, CartId);
  };

  useEffect(() => {
    let mounted = true;

    if (SelectedCheckoutAddress) {
      setDeliveryAddress(SelectedCheckoutAddress);
      setPhoneNumber(SelectedCheckoutAddress.telephone);
      setFirstName(SelectedCheckoutAddress.firstname);
      setLastName(SelectedCheckoutAddress.lastname);
      setCityAddress(
        [
          SelectedCheckoutAddress.street,
          SelectedCheckoutAddress.landmark,
          SelectedCheckoutAddress.city,
        ]
          .filter((item: string) => item && item.length > 0)
          .join(", ")
      );
      setContactAddress(
        [
          SelectedCheckoutAddress.area?.name,
          SelectedCheckoutAddress.region?.name,
          SelectedCheckoutAddress.country?.name,
        ]
          .filter((item: string | undefined) => item && item.length > 0)
          .join(", ")
      );
    }

    return () => {
      mounted = false;
    };
  }, [SelectedCheckoutAddress]);

  const getLocations = async () => {
    const response = await MarketplaceService.GetPickupLocations();
    setNumberOfLocations(response && response.length);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      getLocations();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={`${styles.deliveryOptions} border border-top-0`}>
      {deliveryAddress ? (
        <Fragment>
          <div className={"row p-3"}>
            <div className={composeClasses(styles.customerAddress)}>
              <div className={styles.addressHeader}>
                <h6 className={"h6 mb-2 fw-bolder"}>Customer Address</h6>
                <div
                  className={composeClasses(
                    "col-2",
                    styles.changeDeliveryAddress
                  )}
                >
                  <Button
                    btnClass={"btn-outline-danger btn-sm"}
                    handleClick={handleChangeAddressEvent}
                    title={"Change"}
                  />
                </div>
              </div>
              <h6>
                {firstname} {lastname}
              </h6>
              <p>{contactAddress}</p>
              <p>{cityAddress}</p>
              <p>{phoneNumber}</p>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div
            className={`${styles.deliveryOptions_selector} ${
              stageSelector === "deliverToMe"
                ? styles.deliveryOptions_active
                : styles.deliveryOptions_inactive
            }`}
          >
            <div className={styles.left}>
              <div className={styles.inputWrapper}>
                <input
                  checked={stageSelector === "deliverToMe"}
                  className={"square-check-input form-check-input"}
                  id={"deliverToMe"}
                  name={"stageSelector"}
                  onChange={(e: any) => setStageSelectorState(e.target.value)}
                  type={"radio"}
                  value={"deliverToMe"}
                />
                <label className={"ps-1 pe-3"} htmlFor={"deliverToMe"}>
                  Deliver to me
                </label>
              </div>
              <div className={styles.selectWrapper}>
                <p>
                  Hi , Click on{" "}
                  <span onClick={() => handleSideBarDispatch(ADDRESS_TAG)}>
                    Add Delivery Address
                  </span>{" "}
                  to specify a delivery address.
                </p>
                <div className={styles.button}>
                  <Button
                    btnClass={composeClasses(
                      stageSelector === "deliverToMe"
                        ? "btn-primary text-white"
                        : styles.inactive
                    )}
                    handleClick={() => handleSideBarDispatch(ADDRESS_TAG)}
                    isDisable={stageSelector !== "deliverToMe"}
                    title="Add Delivery Address"
                    value={ADDRESS_TAG}
                  />
                </div>
              </div>
              {StoreId === FOOD_ID && (
                <div className={styles.foodInfoContainer}>
                  <Icon name="foodInfo" />
                  <span>
                    Your delivery address should be within the area you selected
                  </span>
                </div>
              )}
            </div>
            <div className={styles.right}>
              {stageSelector === "deliverToMe" &&
              StoreId === MARKET_PLACE_ID ? (
                <p>
                  Your item should be delivered to you in about 5 working days
                  within Lagos & Abuja, and 7 to 14 days outside Lagos & Abuja.
                </p>
              ) : StoreId === FOOD_ID ? (
                <div className={styles.locationContainer}>
                  <p>Delivering to</p>
                  <div className={styles.location}>
                    <Icon name="foodLocation" />
                    <span>{FoodLocation && FoodLocation}</span>
                  </div>
                </div>
              ) : (
                <Fragment />
              )}
            </div>
          </div>
          {StoreId === MARKET_PLACE_ID && (
            <div
              className={`${styles.deliveryOptions_selector} ${
                stageSelector === "pickup"
                  ? styles.deliveryOptions_active
                  : styles.deliveryOptions_inactive
              }`}
            >
              <div className={styles.left}>
                <div className={styles.inputWrapper}>
                  <input
                    checked={stageSelector === "pickup"}
                    className={"square-check-input form-check-input"}
                    id={"pickup"}
                    name={"stageSelector"}
                    onChange={(e: any) => setStageSelectorState(e.target.value)}
                    type={"radio"}
                    value={"pickup"}
                  />
                  <label className={"ps-1 pe-3"} htmlFor={"pickup"}>
                    Pickup from a Location
                  </label>
                </div>
                <div className={styles.selectWrapper}>
                  {selectedPickupLocation ? (
                    <Fragment>
                      <h6 className={"fw-bold mb-2"}>Address</h6>
                      <p>
                        {[
                          selectedPickupLocation.address,
                          selectedPickupLocation.city,
                        ].join(", ")}
                      </p>
                      <p>{selectedPickupLocation.phone}</p>
                      <p>Mon - Fri 9am-4pm; Closed on Weekends</p>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <p>
                        Select a pickup location in your area from our{" "}
                        {numberOfLocations}
                        {numberOfLocations > 0
                          ? " locations"
                          : " location"}{" "}
                        nationwide.
                      </p>
                    </Fragment>
                  )}
                  <div className={styles.button}>
                    <Button
                      className={composeClasses(
                        stageSelector === "pickup"
                          ? "btn-danger text-white"
                          : styles.inactive
                      )}
                      handleClick={() => handleSideBarDispatch(PICKUP_TAG)}
                      isDisable={stageSelector !== "pickup"}
                      title="Select Pickup Address"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.right}>
                {stageSelector === "pickup" ? (
                  <p>
                    Pickup items from a store that is convenient for you. Save
                    some amount on delivery charges.
                  </p>
                ) : (
                  <Fragment />
                )}
              </div>
            </div>
          )}
        </Fragment>
      )}

      <div className={styles.deliveryInstructions}>
        <DeliveryInstructions setComment={setComment} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  CartId: state.cart.Marketplace?.id ?? 0,
  SelectedDeliveryAddress: state.cart.SelectedDeliveryAddress,
  SelectedCheckoutAddress: state.cart.SelectedCheckoutAddress,
  FoodLocation: state?.food?.SelectedLocation?.area ?? "",
});

export default connect(mapStateToProps, {
  SelectShippingAddressAction,
  ShowSideMenu,
})(deliveryOptionsCard);
