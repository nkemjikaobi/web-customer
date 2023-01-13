/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import Icon from "Components/Icons/icon";
import styles from "./AddressCard.module.scss";
import Button from "Components/Button/button";
import { connect } from "react-redux";
import {
  EditCustomerAddressAction,
  ShowSideMenu,
} from "Http/Redux/Actions/Cart/ICardDisplayAction";
import { DELIVERY_TAG } from "Http/Redux/Types/Cart/Types";
import IAddress from "dto/KongaOnline/IAddress";
import useClickOutside from "CustomHooks/useClickOutSide";
export interface IAddressCard {
  address: string;
  city: string;
  fullAddress: IAddress;
  phone: string;
  lga: string;
  selectedCard: boolean;
  onClick: any;
  firstname: string;
  lastname: string;
  stageSelector: string;
  ShowSideMenu: Function;
  EditCustomerAddressAction: Function;
  AddressToEdit: any;
}

const AddressCard: React.FunctionComponent<IAddressCard> = (
  props: IAddressCard
) => {
  const [locationAddress, setLocationAddress] = useState<string>("");
  const [locationPhone, setLocationPhone] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setLocationAddress([props.address, props.city, props.lga].join(", "));
    setLocationPhone(props.phone);
    setIsSelected(props.selectedCard);
  }, [props]);

  const handleAddaddressBtnClickEvent = (event: any) => {
    props.EditCustomerAddressAction(props.fullAddress);
    event.preventDefault();
    props.ShowSideMenu(DELIVERY_TAG);
  };

  return (
    <div
      className={`${styles.addressCard} mb-3 ${
        isSelected ? styles.active : ""
      }`}
      onClick={props.onClick}
    >
      <div
        className={`${styles.heading} ${
          isSelected ? styles.heading_active : ""
        }`}
      >
        <div className={"row w-100 m-0 py-2"}>
          <div className={"col text-start"}>
            <div className={styles.checkmark} />
            {isSelected ? (
              <Icon className={"me-4"} name={"addressCardSelected"} />
            ) : (
              <Icon className={"me-4 pe-3"} name="circle" />
            )}
          </div>
          <div className={"col-md-4 " + styles.editButton}>
            <Button
              btnClass={"border-0"}
              handleClick={handleAddaddressBtnClickEvent}
              title={"Edit"}
            />
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        {props.stageSelector === "deliverToMe" && (
          <div className={styles.address}>
            <Icon className={"me-3"} name="userAddress" />
            <div className={styles.info}>
              <h3>{`${props.firstname} ${props.lastname}`}</h3>
            </div>
          </div>
        )}

        <div className={styles.address}>
          {isSelected ? (
            <Icon className={"me-3"} name="addressSelected" />
          ) : (
            <Icon className={"me-3"} name="addressUnselected" />
          )}
          <div className={styles.info}>
            <h2>Address</h2>
            <p>{locationAddress}</p>
          </div>
        </div>
        <div className={styles.address}>
          {isSelected ? (
            <Icon className={"me-3"} name="phoneSelected" />
          ) : (
            <Icon className={"me-3"} name="phoneUnselected" />
          )}
          <div className={styles.info}>
            <h3>Contact Information</h3>
            <p>{locationPhone}</p>
          </div>
        </div>
        {props.stageSelector !== "deliverToMe" && (
          <div className={styles.address}>
            <div className={"me-4 pe-2"} />
            <div className={styles.info}>
              <h4>Opening Hours</h4>
              <p>Mon - Fri 9am-4pm; Closed on Weekends</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  addresses: state.cart.CustomerAddresses,
  AddressToEdit: state.cart.AddressToEdit,
});

export default connect(mapStateToProps, {
  ShowSideMenu,
  EditCustomerAddressAction,
})(AddressCard);
