/* eslint-disable @typescript-eslint/ban-types */
import { Select } from "Components/Form/inputs";
import { ISelect } from "Components/Form/inputs/Select/Select";
import PickupLocationCard from "Components/PickupLocationCard/PickupLocationCard";
import { useForm } from "CustomHooks/FormHook";
import ILocalGovernmentArea from "dto/KongaOnline/ILocalGovernmentArea";
import IPickupLocation from "dto/KongaOnline/IPickupLocation";
import IState from "dto/KongaOnline/IState";
import MarketplaceService from "Http/Services/MarketplaceService";
import IPickupAddressForm from "Models/FormModels/Marketplace/IPickupAddressForm";
import React, { useEffect, useState } from "react";
import styles from "./PickupAddressComponent.module.scss";

export interface IPickupAddressComponent {
  onChange: Function;
  fetchPickupLocations: Function;
  locations: Array<IPickupLocation>;
  onSelectAddress: Function;
}

const PickupAddressComponent: React.FunctionComponent<
  IPickupAddressComponent
> = ({
  onChange,
  locations,
  fetchPickupLocations,
  onSelectAddress,
}: IPickupAddressComponent) => {
  const [lgas, setLgas] = useState<Array<ISelect>>([]);
  const [states, setStates] = useState<Array<ISelect>>([]);
  const [pickupLocations, setPickupLocations] = useState<
    Array<IPickupLocation>
  >([]);

  const [selectedCard, setSelectedCard] = useState<number>(0);

  const initForm: IPickupAddressForm = {
    state_id: 0,
    lga_id: 0,
  };

  const form = useForm(null, initForm);

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

  useEffect(() => {
    let mounted = true;

    setLgas([]);
    if (form.Values.state_id) {
      fetchLgas(form.Values.state_id);
    }
    return () => {
      mounted = false;
    };
  }, [form.Values.state_id]);

  useEffect(() => {
    let mounted = true;
    setPickupLocations([]);
    if (form.Values.lga_id) {
      fetchPickupLocations(form.Values.lga_id);
    }
    return () => {
      mounted = false;
    };
  }, [form.Values.lga_id]);

  useEffect(() => {
    let mounted = true;

    onChange(
      form.Values,
      pickupLocations.find(
        (pickupLocation: IPickupLocation) => pickupLocation.id === selectedCard
      )
    );

    return () => {
      mounted = false;
    };
  }, [form.Values, selectedCard]);

  useEffect(() => {
    let mounted = true;
    if (mounted && pickupLocations) {
      onSelectAddress(
        pickupLocations.find(
          (address: IPickupLocation) => address.id === selectedCard
        )
      );
    }
    return () => {
      mounted = false;
    };
  }, [selectedCard]);

  useEffect(() => {
    let mounted = true;
    setPickupLocations(locations);
    return () => {
      mounted = false;
    };
  }, [locations]);

  useEffect(() => {
    let mounted = true;

    fetchStates();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.pickupLocationContent}>
      <div className={styles.addressHeading}>
        <p>Find a pickup location nearest to you</p>
        <div className={styles.selectInfo}>
          <div className={styles.select}>
            <Select
              name={"state_id"}
              onChange={form.onChange}
              options={states}
              placeholder="Select State"
              value={form.Values.state_id}
            />
          </div>
          <div className={styles.select}>
            <Select
              name={"lga_id"}
              onChange={form.onChange}
              options={lgas}
              placeholder="Select City"
              value={form.Values.lga_id}
            />
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        {pickupLocations.length <= 0 ? (
          <div className={styles.noLocationSelected}>
            <div>
              <img alt="image depicting location" src={""} />
            </div>
            <h2>No Pickup Location selected yet</h2>
            <p>Kindly select a state and city to show some locations</p>
          </div>
        ) : (
          pickupLocations.map((pickupLocation: IPickupLocation) => (
            <div className={"mb-3"} key={pickupLocation.id}>
              <PickupLocationCard
                address={pickupLocation.address}
                city={pickupLocation.city}
                lga={pickupLocation.lga}
                onClick={(e: any) => setSelectedCard(pickupLocation.id)}
                phone={pickupLocation.phone}
                selectedCard={selectedCard === pickupLocation.id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PickupAddressComponent;
