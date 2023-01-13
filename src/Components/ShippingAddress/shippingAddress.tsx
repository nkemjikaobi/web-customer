import React, { Fragment } from "react";
import Input from "Components/Form/inputs/Input/Input";
import Select from "Components/Form/inputs/Select/Select";
import { composeClasses } from "libs/utils/utils";
import styles from "./shippingAddress.module.scss";
import Button from "Components/Button/button";

const shippingAddress: React.FunctionComponent = () => {
  return (
    <Fragment>
      <div className={styles.form}>
        <div className={styles.input}>
          <Input label="Firstname" placeholder="Enter First Name" type="text" />
        </div>
        <div className={styles.input}>
          <Input label="Lastname" placeholder="Enter First Name" type="text" />
        </div>
        <div className={styles.input}>
          <Input
            label="PHone Number"
            placeholder="Enter First Name"
            type="number"
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Address"
            placeholder="Enter Street Address"
            type="text"
          />
        </div>
        <div className={styles.input}>
          <Input
            label="Directions(Optional)"
            placeholder="Landmark directions"
            type="text"
          />
        </div>
        <div className={styles.input}>
          <Select label="State" placeholder="Select State" type="text" />
        </div>
        <div className={styles.input}>
          <Input
            label="Local Government Area (LGA)"
            placeholder="Landmark directions"
            type="text"
          />
        </div>
        <div className={styles.input}>
          <Select label="City" placeholder="Select State" type="text" />
        </div>
        <div>
          <input type="checkbox" />
          <p>Default Shipping Address</p>
        </div>
        <div className={styles.button}>
          <Button btnClass={"btn-primary text-white"} />
        </div>
      </div>
    </Fragment>
  );
};

export default shippingAddress;
