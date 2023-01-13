/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment } from "react";
import Input from "Components/Form/inputs/Input/Input";
import styles from "./paymentMethodStep.module.scss";
import Button from "Components/Button/button";
import Icon from "Components/Icons";

export interface IProps {
  currentStep: number;
  setCurrentStep: Function;
}

const paymentMethodStep: React.FunctionComponent<IProps> = (props: IProps) => {
  const { setCurrentStep, currentStep } = props;
  return (
    <Fragment>
      <div className={styles.paymentMethodStep}>
        <div className={styles.header}>
          <div onClick={(e) => setCurrentStep(currentStep - 1)}>
            <Icon name="arrowLeft" />
          </div>
          <h1>Payment Method</h1>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.paymentDetails}>
            <p>MTN NIGERIA</p>
            <p>SYSTEMSPEC - KONGAPAY AIRTIME</p>
          </div>
          <div className={styles.formWrapper}>
            <form>
              <Input label="CARD HOLDER NAME" type="text" />
              <Input label="CARD NUMBER" type="text" />
              <div className={styles.expiry}>
                <Input label="EXPIRY DATE" type="text" />
                <Input label="CCV" type="text" />
              </div>
              <div className={styles.button}>
                <Button
                  handleClick={(e: any) => setCurrentStep(currentStep + 1)}
                  title="Pay NGN 5000"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default paymentMethodStep;
