/* eslint-disable @typescript-eslint/ban-types */
import AddressCard from "Components/AddressCard/AddressCard";
import Button from "Components/Button/button";
import IAddress from "dto/KongaOnline/IAddress";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./AddressBookComponent.module.scss";
import {
  EditCustomerAddressAction,
  ShowSideMenu,
} from "Http/Redux/Actions/Cart/ICardDisplayAction";
import { DELIVERY_TAG } from "Http/Redux/Types/Cart/Types";
import CartService from "Http/Services/CartService";
import { SetCustomerAddressesAction } from "Http/Redux/Actions/Cart/ICardDisplayAction";
import { isArray } from "lodash";
export interface IAddressBookComponent {
  addresses: Array<IAddress>;
  EditCustomerAddressAction: Function;
  onSelectAddress: Function;
  ShowSideMenu: Function;
  SetCustomerAddressesAction: Function;
  stageSelector: string;
}

const AddressBookComponent: React.FunctionComponent<IAddressBookComponent> = (
  props: IAddressBookComponent
) => {
  const [selectedCard, setSelectedCard] = useState<number | undefined>(0);
  const [addresses, setAddresses] = useState<Array<IAddress>>([]);

  const handleAddaddressBtnClickEvent = (event: any) => {
    props.EditCustomerAddressAction(null);
    event.preventDefault();
    props.ShowSideMenu(DELIVERY_TAG);
  };

  const verifiedAddressLength =
    props.addresses && isArray(props.addresses) && props.addresses.length;

  const fetchCustomerAddresses = async () => {
    const results: Array<IAddress> = await CartService.GetCustomerAddresses();
    if (results && results.length > 0) {
      props.SetCustomerAddressesAction(results);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetchCustomerAddresses();
    }
    return () => {
      mounted = false;
    };
  }, [verifiedAddressLength]);

  useEffect(() => {
    let mounted = true;
    if (mounted && props.addresses) {
      setAddresses(props.addresses.reverse());
    }
    return () => {
      mounted = false;
    };
  }, [props]);

  useEffect(() => {
    let mounted = true;
    if (mounted && addresses) {
      props.onSelectAddress(
        addresses.find((address: IAddress) => address.id === selectedCard)
      );
    }
    return () => {
      mounted = false;
    };
  }, [selectedCard]);

  //Select the default address
  useEffect(() => {
    let mounted = true;
    if (mounted && addresses.length > 0) {
      const filteredAddress: any = addresses.filter(
        (singleAddress: any) => `${singleAddress.is_default}` === "true"
      );
      filteredAddress?.map((address: any) => setSelectedCard(address.id));
    }
    return () => {
      mounted = false;
    };
  }, [addresses]);

  return (
    <div className={styles.addressBook}>
      <div className={styles.heading}>
        <p> Want to Add another address?</p>
        <div className={styles.button}>
          <Button
            handleClick={handleAddaddressBtnClickEvent}
            title="Add Address"
          />
        </div>
      </div>
      <div>
        {addresses.map((address: IAddress) => (
          <AddressCard
            address={address.street}
            city={address.city}
            firstname={address.firstname}
            fullAddress={address}
            key={address.id}
            lastname={address.lastname}
            lga={address.region ? address.region.name : ""}
            onClick={() => setSelectedCard(address.id)}
            phone={address.telephone}
            selectedCard={selectedCard === address.id}
            stageSelector={props.stageSelector}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  addresses: state.cart.CustomerAddresses,
});

export default connect(mapStateToProps, {
  ShowSideMenu,
  SetCustomerAddressesAction,
  EditCustomerAddressAction,
})(AddressBookComponent);
