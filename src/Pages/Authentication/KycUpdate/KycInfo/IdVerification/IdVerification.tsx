import React, { useState } from "react";
import { composeClasses } from "libs/utils/utils";
import Icon from "Components/Icons/icon";
import styles from "./IdVerification.module.scss";
import { Input, Select } from "Components/Form/inputs";
import Button from "Components/Button/button";
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

const IdVerification: React.FunctionComponent = () => {
  const [id, setId] = useState<string>("");
  const [idNumber, setIdNumber] = useState<number>();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [file, setFile] = useState(null);

  const history = useHistory();

  const validate = () => {
    if (!id && !idNumber) {
      setBtnDisabled(false);
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
      <h5>Identity Verification</h5>
      <p className={styles.text}>
        Upload Valid government-Issue ID (Intl. passport, NIN, Drivers license,
        voters card.)
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
            label={"Select ID Type"}
            name={"operator"}
            onChange={(event: any) => setId(event.target.value)}
            options={idData}
            placeholder={"Select ID Type"}
            value={id}
          />
        </div>
        <div className="mb-5">
          <Input
            label={"ID Number"}
            maxLength={12}
            onChange={(event: any) => setIdNumber(event.target.value)}
            placeholder={"Enter ID Number"}
            type={"number"}
            value={idNumber}
          />
        </div>
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            isDisable={btnDisabled}
            title={"Submit"}
          />
        </div>
      </form>
    </div>
  );
};

export default IdVerification;
