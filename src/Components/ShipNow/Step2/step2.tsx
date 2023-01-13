/* eslint-disable @typescript-eslint/ban-types */

import React, { Fragment, useEffect, useState } from "react";
import Input from "Components/Form/inputs/Input/Input";
import Select, { ISelect } from "Components/Form/inputs/Select/Select";
import styles from "./step2.module.scss";
import { connect } from "react-redux";
import IState from "dto/KongaExpress/IState";
import IStepTwoForm from "Models/FormModels/KExpress/StepTwoForm";
import ILocalGovernmentArea from "dto/KongaExpress/ILocalGovernmentArea";

import {
  StepTwoAction,
  MoveSteperAction,
} from "Http/Redux/Actions/KExpress/LogisticsActionEvent";
import LogisticsService from "Http/Services/LogisticsService";
import AddressComponent from "PagesComponents/KExpress/AddressComponent";
import Icon from "Components/Icons/icon";

export interface IStepTwo {
  wayBillRequest: any;
  StepTwoAction: Function;
  MoveSteperAction: Function;
}

const Step2: React.FunctionComponent<IStepTwo> = ({
  wayBillRequest,
  StepTwoAction,
  MoveSteperAction,
}: IStepTwo) => {
  const [receiver_firstname, setReceiverFirstname] = useState<string>(
    wayBillRequest.receiver_firstname ?? ""
  );
  const [receiver_lastname, setReceiverLastname] = useState<string>(
    wayBillRequest.receiver_lastname ?? ""
  );
  const [receiver_fullname, setReceiverFullname] = useState<string>("");
  const [receiver_street, setReceiverStreet] = useState<string>(
    wayBillRequest.receiver_street ?? ""
  );
  const [receiver_lga, setReceiverLGA] = useState<string>(
    wayBillRequest.receiver_lga ?? ""
  );
  const [receiver_telephone, setReceiverTelephone] = useState<string>(
    wayBillRequest.receiver_telephone ?? ""
  );
  const [receiver_email, setReceiverEmail] = useState<string>(
    wayBillRequest.receiver_email ?? ""
  );
  const [receiver_city, setReceiverCity] = useState<string>(
    wayBillRequest.receiver_city ?? ""
  );
  const [receiver_state, setReceiverState] = useState<string>(
    wayBillRequest.receiver_state ?? ""
  );

  const [selectedState, setSelectedState] = useState<IState | undefined>();

  const [states, setStates] = useState<Array<IState>>([]);
  const [mappedStates, setMappedStates] = useState<Array<ISelect>>([]);

  const mapData = (state: any) => ({
    value: state.id,
    text: state.name,
  });

  useEffect(() => {
    let mounted = true;
    const initialState = wayBillRequest.receiver_state || "";
    const initialLga = wayBillRequest.receiver_lga || "";

    setReceiverState(initialState);
    setReceiverLGA(initialLga);
    setSelectedState(
      states.find((state: IState) => state.id === parseInt(receiver_state))
    );
    return () => {
      mounted = false;
    };
  }, [receiver_state]);

  // update the mapped states
  useEffect(() => {
    let mounted = true;
    try {
      if (states.length > 0) {
        const mappedData = states.map((state: IState) => mapData(state));
        const initMappedItem =
          wayBillRequest.shipper_state || mappedData[0].value;

        const x = states.find((s: IState) => parseInt(initMappedItem) === s.id);
        setMappedStates(mappedData);
        setReceiverState(`${initMappedItem.value}`);
        setSelectedState(x);
      }
    } catch (error: any) {}
    return () => {
      mounted = false;
    };
  }, [states]);

  useEffect(() => {
    let mounted = true;
    LogisticsService.GetStates().then((states: any) => setStates(states));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    let firstname = receiver_firstname;
    let lastname = receiver_lastname;
    if (receiver_fullname) {
      firstname = receiver_fullname.split(" ").slice(0, -1).join(" ");
      lastname = receiver_fullname.split(" ").slice(-1).join(" ");
      setReceiverFirstname(firstname);
      setReceiverLastname(lastname);
    } else {
      setReceiverFullname(`${firstname} ${lastname}`);
    }
    const formData: IStepTwoForm = {
      receiver_firstname: firstname,
      receiver_lastname: lastname,
      receiver_city: receiver_city,
      receiver_lga: receiver_lga,
      receiver_street: receiver_street,
      receiver_telephone: receiver_telephone,
      receiver_email: receiver_email,
      receiver_state: receiver_state,
    };
    StepTwoAction(formData);

    return () => {
      mounted = false;
    };
  }, [
    receiver_fullname,
    receiver_street,
    receiver_lga,
    receiver_telephone,
    receiver_email,
    receiver_city,
    receiver_state,
  ]);

  const editBtnClickEventListener: Function = (event: any, index: number) => {
    event.preventDefault();
    MoveSteperAction(index);
  };

  return (
    <Fragment>
      <div className={styles.sourceAddress}>
        <AddressComponent
          city={wayBillRequest.shipper_city}
          firstname={wayBillRequest.shipper_firstname}
          lastname={wayBillRequest.shipper_lastname}
          selectedState={wayBillRequest.shipper_state}
          states={states}
          street={wayBillRequest.shipper_street}
          telephone={wayBillRequest.shipper_telephone}
          title={"Source Address"}
        />
        <div
          className={styles.edit}
          onClick={(e: any) => editBtnClickEventListener(e, 0)}
        >
          <Icon name="edit" />
          <p>Edit</p>
        </div>
      </div>
      <div className={styles.step2}>
        <div className={styles.form}>
          <div className={styles.form_content}>
            <h2>Delivery Address</h2>
            <label>{"Reciever's Full Name"}</label>
            <input
              name={"receiver_fullname"}
              onChange={(e: any) => setReceiverFullname(e.target.value)}
              placeholder={"Sender Full Name"}
              type={"text"}
              value={receiver_fullname}
            />
            <Input
              label={"Reciever's Address"}
              name={"receiver_street"}
              onChange={(e: any) => setReceiverStreet(e.target.value)}
              placeholder={"Sender Address"}
              type={"text"}
              value={receiver_street}
            />
            <Input
              label={"Enter City"}
              name={"receiver_city"}
              onChange={(e: any) => setReceiverCity(e.target.value)}
              type={"text"}
              value={receiver_city}
            />
            <Select
              className={"ps-2"}
              label={"Enter State"}
              name={"receiver_state"}
              onChange={(e: any) => setReceiverState(e.target.value)}
              options={[...mappedStates]}
              placeholder={"Enter State"}
              value={receiver_state}
            />
            <Select
              className={"ps-2"}
              label={"Enter LGA"}
              name={"receiver_lga"}
              onChange={(e: any) => setReceiverLGA(e.target.value)}
              options={selectedState?.lgas.map((lga: ILocalGovernmentArea) => ({
                value: lga.id,
                text: lga.name,
              }))}
              placeholder={"Enter LGA"}
              value={receiver_lga}
            />
            <Input
              label={"Phone Number"}
              name={"receiver_telephone"}
              onChange={(e: any) => setReceiverTelephone(e.target.value)}
              placeholder={"Phone Number"}
              type={"text"}
              value={receiver_telephone}
            />
            <Input
              label={"Email Address"}
              name={"receiver_email"}
              onChange={(e: any) => setReceiverEmail(e.target.value)}
              placeholder={"Email Address"}
              type={"email"}
              value={receiver_email}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  wayBillRequest: state.logistics.WayBillRequest,
});

export default connect(mapStateToProps, { StepTwoAction, MoveSteperAction })(
  Step2
);
