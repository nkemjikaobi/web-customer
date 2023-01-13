import React, { useState } from "react";
import { composeClasses, isNotEmptyArray } from "libs/utils/utils";
import Icon from "Components/Icons/icon";
import styles from "./AddressVerification.module.scss";
import { Input, Select } from "Components/Form/inputs";
import Button from "Components/Button/button";
import IState from "dto/KongaExpress/IState";
import { ISelect } from "Components/Form/inputs/Select/Select";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router-dom";

const idData = [
  {
    id: 1,
    text: "International Passport",
  },
  {
    id: 2,
    text: "National ID Card",
  },
  {
    id: 3,
    text: "Drivers Licence",
  },
  {
    id: 4,
    text: "Voters Card",
  },
];

const AddressVerification: React.FunctionComponent = () => {
  const [id, setId] = useState<string>("");
  const [street, setStreet] = useState<string>();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [states, setStates] = useState<Array<IState>>([]);
  const [lgas, setLGAs] = useState<Array<ISelect>>([]);
  const [lga, setLga] = useState<number>(0);

  const history = useHistory();

  const selectOptionsMapper = (
    options: any,
    labels: { text: string; value: string }
  ) => {
    const contents = options && isNotEmptyArray(options);
    if (contents) {
      return options.map((opt: any) => {
        return {
          text: opt[labels.text],
          value: opt[labels.value],
        };
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isMobile && (
          <div onClick={() => history.goBack()}>
            <Icon name="arrowLeft" />
          </div>
        )}
      </div>
      <h5>Address Verification</h5>
      <p className={styles.text}>
        Upload Valid government-Issue Utility Bill (NEPA Bill, Waste Management
        Bill, Water Cooperation Bill.)
      </p>
      <div className={styles.uploadContainer}>
        <div className={composeClasses("text-center", styles.uploadContent)}>
          <Icon name="upload" />
          <p>Upload your files here </p>
          <label className={styles.uploads}>
            <input className="text-center" type="file" />
            Browse Files
          </label>
        </div>
      </div>
      <form className={""}>
        <div className="mb-3">
          <Select
            label={"Identification Type"}
            name={"operator"}
            onChange={(event: any) => setId(event.target.value)}
            options={idData}
            placeholder={"Select ID Type"}
            value={id}
          />
        </div>
        <div className="mb-3">
          <Input
            label={"Street Address"}
            onChange={(event: any) => setStreet(event.target.value)}
            placeholder={"Enter Street Address"}
            type={"text"}
            value={street}
          />
        </div>
        <div className={composeClasses("mb-5", styles.state)}>
          <Select
            id={"personState"}
            label={"State"}
            name={"personState"}
            onChange={(event: any) => setStates(event.target.value)}
            options={selectOptionsMapper(states, {
              text: "name",
              value: "id",
            })}
            placeholder={"Select State"}
          />
          <Select
            id={"lga"}
            label={"LGA"}
            name={"lga"}
            onChange={(event: any) => setLga(event.target.value)}
            options={selectOptionsMapper(lgas, {
              text: "text",
              value: "value",
            })}
            placeholder={"Select LGA"}
          />
        </div>
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            isDisable={btnDisabled}
            title={"Update Profile"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddressVerification;
