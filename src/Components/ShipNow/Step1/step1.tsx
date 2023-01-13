/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./step1.module.scss";
import { Input, Select } from "Components/Form/inputs";
import { connect } from "react-redux";
import { StepOneAction } from "Http/Redux/Actions/KExpress/LogisticsActionEvent";
import IStepOneForm from "Models/FormModels/KExpress/StepOneForm";
import IState from "dto/KongaExpress/IState";
import LogisticsService from "Http/Services/LogisticsService";
import { ISelect } from "Components/Form/inputs/Select/Select";
import ILocalGovernmentArea from "dto/KongaExpress/ILocalGovernmentArea";

export interface IStepOne {
  wayBillRequest?: any;
  StepOneAction: Function;
}

const Step1: React.FunctionComponent<IStepOne> = ({
  wayBillRequest,
  StepOneAction,
}: IStepOne) => {
  const [shipper_firstname, setShipperFirstname] = useState<string>("");
  const [shipper_lastname, setShipperLastname] = useState<string>("");
  const [shipper_fullname, setShipperFullname] = useState<string>("");
  const [shipper_street, setShipperStreet] = useState<string>("");
  const [shipper_lga, setShipperLGA] = useState<string>("");
  const [shipper_telephone, setShipperTelephone] = useState<string>("");
  const [shipper_email, setShipperEmail] = useState<string>("");
  const [shipper_city, setShipperCity] = useState<string>("");
  const [shipper_state, setShipperState] = useState<string>(
    wayBillRequest.state
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
    const initialLga = wayBillRequest.shipper_lga || "";

    setShipperLGA(initialLga);
    setSelectedState(
      states.find((state: IState) => state.id === parseInt(shipper_state))
    );
    return () => {
      mounted = false;
    };
  }, [shipper_state]);

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
        setShipperState(initMappedItem);
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
    setShipperFirstname(wayBillRequest.shipper_firstname);
    setShipperState(wayBillRequest.shipper_state || "");
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    let firstname = "";
    let lastname = "";
    if (shipper_fullname) {
      firstname = shipper_fullname.split(" ").slice(0, -1).join(" ");
      lastname = shipper_fullname.split(" ").slice(-1).join(" ");
      setShipperFirstname(firstname);
      setShipperLastname(lastname);
    }
    const formData: IStepOneForm = {
      shipper_firstname: firstname,
      shipper_lastname: lastname,
      shipper_city: shipper_city,
      shipper_lga: shipper_lga,
      shipper_street: shipper_street,
      shipper_telephone: shipper_telephone,
      shipper_email: shipper_email,
      shipper_state: shipper_state,
    };
    StepOneAction(formData);

    return () => {
      mounted = false;
    };
  }, [
    shipper_fullname,
    shipper_street,
    shipper_lga,
    shipper_telephone,
    shipper_email,
    shipper_city,
    shipper_state,
  ]);

  return (
    <Fragment>
      <div className={styles.step1}>
        <div className={styles.form}>
          <div className={styles.form_content}>
            <h2>Source Address</h2>
            <Input
              label={"Sender Full Name"}
              name={"shipper_fullname"}
              onChange={(e: any) => setShipperFullname(e.target.value)}
              placeholder={"Sender Full Name"}
              type={"text"}
              value={shipper_fullname}
            />
            <Input
              label={"Sender Address"}
              name={"shipper_street"}
              onChange={(e: any) => setShipperStreet(e.target.value)}
              placeholder={"Sender Address"}
              type={"text"}
              value={shipper_street}
            />
            <Input
              label={"Enter City"}
              name={"shipper_city"}
              onChange={(e: any) => setShipperCity(e.target.value)}
              type={"text"}
              value={shipper_city}
            />
            <Select
              className={"ps-2"}
              label={"Enter State"}
              name={"shipper_state"}
              onChange={(e: any) => setShipperState(e.target.value)}
              options={[...mappedStates]}
              placeholder={"Enter State"}
              value={shipper_state}
            />
            <Select
              className={"ps-2"}
              label={"Enter LGA"}
              name={"shipper_lga"}
              onChange={(e: any) => setShipperLGA(e.target.value)}
              options={selectedState?.lgas.map((lga: ILocalGovernmentArea) => ({
                value: lga.id,
                text: lga.name,
              }))}
              placeholder={"Enter LGA"}
              value={shipper_lga}
            />
            <Input
              label={"Phone Number"}
              name={"shipper_telephone"}
              onChange={(e: any) => setShipperTelephone(e.target.value)}
              placeholder={"Phone Number"}
              type={"text"}
              value={shipper_telephone}
            />
            <Input
              label={"Email Address"}
              name={"shipper_email"}
              onChange={(e: any) => setShipperEmail(e.target.value)}
              placeholder={"Email Address"}
              type={"email"}
              value={shipper_email}
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

Step1.defaultProps = {
  wayBillRequest: undefined,
};

export default connect(mapStateToProps, { StepOneAction })(Step1);
