/* eslint-disable @typescript-eslint/ban-types */
import { Input, Select } from "Components/Form/inputs";
import { ISelect } from "Components/Form/inputs/Select/Select";
import { useForm } from "CustomHooks/FormHook";
import ILocalGovernmentArea from "dto/KongaOnline/ILocalGovernmentArea";
import IState from "dto/KongaOnline/IState";
import MarketplaceService from "Http/Services/MarketplaceService";
import IDeliveryAddressForm from "Models/FormModels/Marketplace/IDeliveryAddressForm";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./DeliveryAddressFormComponent.module.scss";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router";
import FoodService from "Http/Services/FoodService";
import { ADDRESS_TAG } from "Http/Redux/Types/Cart/Types";
import {
  EditCustomerAddressAction,
  ShowSideMenu,
} from "Http/Redux/Actions/Cart/ICardDisplayAction";
import IAddress from "dto/KongaOnline/IAddress";
import Icon from "Components/Icons/icon";

export interface IDeliveryAddressFormComponent {
  AddressToEdit: IAddress;
  Area: string;
  EditCustomerAddressAction: Function;
  onChange: Function;
  RegionId: number;
  Region: string;
  ShowSideMenu: Function;
}

const DeliveryAddressFormComponent: React.FunctionComponent<
  IDeliveryAddressFormComponent
> = ({
  onChange,
  RegionId,
  Area,
  Region,
  AddressToEdit,
  ShowSideMenu,
}: IDeliveryAddressFormComponent) => {
  const [lgas, setLgas] = useState<Array<ISelect>>([]);
  const [states, setStates] = useState<Array<ISelect>>([]);
  const [foodLgas, setFoodLgas] = useState<any>([]);
  const { store_id }: any = useParams();
  const FOOD_ID = FoodService.STORE_ID.toString();
  const history = useHistory();

  const initialForm: IDeliveryAddressForm = {
    phoneNumber: AddressToEdit !== null ? AddressToEdit?.telephone : "",
    firstName: AddressToEdit !== null ? AddressToEdit?.firstname : "",
    city: AddressToEdit !== null ? AddressToEdit?.city : "",
    deliveryAddress: AddressToEdit !== null ? AddressToEdit?.street : "",
    lastName: AddressToEdit !== null ? AddressToEdit?.lastname : "",
    state: AddressToEdit !== null ? AddressToEdit?.region?.id : "",
    lga: AddressToEdit !== null ? AddressToEdit?.area?.id : "",
    landmarkDirections: AddressToEdit !== null ? AddressToEdit?.landmark : "",
  };

  const form = useForm(null, initialForm);

  const fetchStates = async () => {
    const response: Array<IState> = await MarketplaceService.GetStates();
    setStates(
      response.map((state: IState) => ({
        value: state.id,
        text: state.name,
      }))
    );
  };

  const fetchLgas = async (state: number) => {
    const response: Array<ILocalGovernmentArea> =
      await MarketplaceService.GetLocalGovernmentArea(state);
    if (response) {
      setLgas(
        response.map((lga: ILocalGovernmentArea) => ({
          value: lga.id,
          text: lga.name,
        }))
      );
    }
  };

  const fetchFoodLgas = async (state: number) => {
    const response = await FoodService.GetAllFoodDeliveryAreas(state);
    if (response) {
      setFoodLgas(
        response.map((lga: any) => ({
          value: lga.area_id,
          text: lga.area,
        }))
      );
    }
  };

  useEffect(() => {
    let mounted = true;

    setLgas([]);
    if (store_id === FOOD_ID) {
      form.Values.state = RegionId;
      setFoodLgas([]);
      fetchFoodLgas(RegionId);
      fetchLgas(RegionId);
    } else if (form.Values.state) {
      fetchLgas(form.Values.state);
    }
    return () => {
      mounted = false;
    };
  }, [form.Values.state]);

  useEffect(() => {
    let mounted = true;

    onChange(form.Values);

    return () => {
      mounted = false;
    };
  }, [form.Values]);

  useEffect(() => {
    let mounted = true;

    fetchStates();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSideBarDispatch = (value: string) => {
    if (ShowSideMenu) {
      ShowSideMenu(value);
    }
  };
  return (
    <Fragment>
      <div
        className={styles.deliveryAddressForm + " px-2"}
        // ref={addressCardNode}
      >
        <div
          className={styles.goBack}
          onClick={() => handleSideBarDispatch(ADDRESS_TAG)}
        >
          <Icon name="arrowLeft" />
        </div>
        <div className={styles.input}>
          <Input
            label="Firstname"
            name={"firstName"}
            onChange={form.onChange}
            placeholder="Enter First Name"
            type="text"
            value={form.Values.firstName}
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Lastname"
            name={"lastName"}
            onChange={form.onChange}
            placeholder="Enter First Name"
            type="text"
            value={form.Values.lastName}
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Phone Number"
            name={"phoneNumber"}
            onChange={form.onChange}
            placeholder="Enter Phone Number"
            type="number"
            value={form.Values.phoneNumber}
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Address"
            name={"deliveryAddress"}
            onChange={form.onChange}
            placeholder="Enter Delivery Address"
            type="text"
            value={form.Values.deliveryAddress}
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Directions (Optional)"
            name={"landmarkDirections"}
            onChange={form.onChange}
            placeholder="Landmark directions"
            type="text"
            value={form.Values.landmarkDirections}
          />
        </div>
        <div className={styles.input}>
          <Select
            className={store_id === FOOD_ID ? styles.disabled : ""}
            disabled={store_id === FOOD_ID ? true : false}
            label="State"
            name={"state"}
            onChange={form.onChange}
            options={states}
            placeholder="Select State"
            value={form.Values.state}
          />
        </div>
        <div className={styles.input}>
          <Select
            className={store_id === FOOD_ID ? styles.disabled : ""}
            disabled={store_id === FOOD_ID ? true : false}
            label="Local Government Area (LGA)"
            name={"lga"}
            onChange={form.onChange}
            options={store_id === FOOD_ID ? foodLgas : lgas}
            placeholder="Select LGA"
            value={
              store_id === FOOD_ID
                ? (form.Values.lga = Area)
                : store_id === MarketplaceService.STORE_ID &&
                  AddressToEdit !== null
                ? (form.Values.lga = AddressToEdit?.area?.id)
                : form.Values.lga
            }
          />
        </div>
        <div className={styles.input}>
          <Input
            className={store_id === FOOD_ID ? styles.disabled : ""}
            disabled={store_id === FOOD_ID ? true : false}
            label="City"
            name={"city"}
            onChange={form.onChange}
            placeholder="Enter City"
            type="text"
            value={
              store_id === FOOD_ID
                ? (form.Values.city = Region)
                : form.Values.city
            }
          />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  AddressToEdit: state.cart.AddressToEdit,
  Area: state?.food?.SelectedLocation?.area_id ?? "",
  RegionId: state?.food?.SelectedLocation?.region_id ?? 0,
  Region: state?.food?.SelectedLocation?.region ?? "",
});

export default connect(mapStateToProps, {
  EditCustomerAddressAction,
  ShowSideMenu,
})(DeliveryAddressFormComponent);
