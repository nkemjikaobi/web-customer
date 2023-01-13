import React, { useState } from "react";
import styles from "./BankVerification.module.scss";
import { Input, Select } from "Components/Form/inputs";
import Button from "Components/Button/button";
import { isMobile } from "react-device-detect";
import { useHistory } from "react-router-dom";
import Icon from "Components/Icons";

const BankVerification: React.FunctionComponent = () => {
  const [dob, setDob] = useState<string>("");
  const [bvnNumber, setBvnNumber] = useState<number>();
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);

  const history = useHistory();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isMobile && (
          <div onClick={() => history.goBack()}>
            <Icon name="arrowLeft" />
          </div>
        )}
      </div>
      <h5>Bank Verification</h5>
      <p className={styles.text}>
        We only need to access your Full Name, Phone Number and Date of Birth to
        be sure your account belong to you
      </p>
      <form>
        <div className="mb-5">
          <Input
            label={"ID Number"}
            maxLength={12}
            onChange={(event: any) => setBvnNumber(event.target.value)}
            placeholder={"Enter Number"}
            type={"number"}
            value={bvnNumber}
          />
        </div>
        <div className="mb-5">
          <Input
            label={"Date of Birth"}
            onChange={(event: any) => setDob(event.target.value)}
            onFocus={(event: any) => (event.target.type = "date")}
            placeholder={"Expiry Date"}
            type={"text"}
            value={dob}
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

export default BankVerification;
