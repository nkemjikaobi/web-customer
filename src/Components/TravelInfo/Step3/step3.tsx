/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment } from "react";
import PaymentMethodCard from "Components/Travel/PaymentMethodComponent";
import styles from "./step3.module.scss";
import PaymentMethodForm from "Models/ComponentModels/Travel/PaymentMethodForm";

interface IProps {
  currentStep: number;
  onChange: Function;
}

const step3: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <Fragment>
      <div className={styles.payment}>
        <div className={styles.heading}>
          <h1>Payment Method</h1>
        </div>
        <div className={styles.paymentMethods}>
          <PaymentMethodCard
            onChange={(event: PaymentMethodForm) => {
              props.onChange(event);
            }}
          />
        </div>
        <div className={styles.policy}>
          <p>
            By booking this item, you agree to pay the total amount shown, which
            includes Service Fees, on the right and to the Booking
            <span>Terms and Conditions</span> and <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default step3;
