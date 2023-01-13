import Icon from "Components/Icons/icon";
import IState from "dto/KongaExpress/IState";
import IWaybill from "dto/KongaExpress/IWaybill";
import React from "react";
import styles from "./AddressComponent.module.scss";

export interface IAddressComponent {
  title: string;
  states: Array<IState>;
  firstname: string;
  lastname: string;
  street: string;
  city: string;
  telephone: string;
  selectedState: string;
}

const AddressComponent: React.FunctionComponent<IAddressComponent> = ({
  city,
  title,
  firstname,
  lastname,
  street,
  states,
  telephone,
  selectedState,
}: IAddressComponent) => {
  return (
    <div className={styles.addressComponent}>
      <div className={"col " + styles.sourceInfo}>
        <p className={"mt-3 mb-4 h6 fw-bold text-capitalize"}>{title}</p>

        <p className={"text-capitalize"}>
          {firstname} {lastname}
        </p>
        <p>{street}</p>
        <p className={"text-capitalize"}>
          {city},{" "}
          {
            states.find((s: IState) => parseInt(selectedState || "") === s.id)
              ?.name
          }
        </p>
        <p>{telephone}</p>
      </div>
    </div>
  );
};

export default AddressComponent;
