/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "CustomHooks/FormHook";
import PaymentMethodForm from "Models/ComponentModels/Travel/PaymentMethodForm";
import styles from "./paymentMethodComponent.module.scss";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import { connect } from "react-redux";

interface IPaymentMethodComponent {
  shoppingCart?: IMarketplaceCart | undefined;
  onChange: Function;
}

const PaymentMethodComponent: React.FunctionComponent<
  IPaymentMethodComponent
> = (props: IPaymentMethodComponent) => {
  // initialize the form
  const initialForm: PaymentMethodForm = new PaymentMethodForm();

  const [cartId, setCartId] = useState<number>(0);

  const { onSubmit, onChange, Values } = useForm(null, initialForm);

  useEffect(() => {
    let mounted = true;
    if (props.shoppingCart && props.shoppingCart.id) {
      setCartId(props.shoppingCart.id);
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  useEffect(() => {
    let selected = Values;

    props.onChange(selected);
    return () => {
      selected = null;
    };
  }, [Values]);

  return (
    <Fragment>
      <div className={styles.paymentOptions}>
        <div className={styles.paymentOptions_card}>
          <div className={styles.inputWrapper}>
            <input
              checked={Values.paymentType === "payNow"}
              className={"square-check-input form-check-input"}
              id={"payNow"}
              name={"paymentType"}
              onChange={onChange}
              type={"radio"}
              value={"payNow"}
            />
            <label className={"ps-1 pe-3"} htmlFor={"payNow"}>
              Pay Now
            </label>
          </div>
          <div className={styles.cardInfo}>
            <p>
              Your wallet Balance will be used to complete the transaction, If
              your balance is low your debit card on your profile will be
              charged
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  customer: state.auth.CurrentUser,
  shoppingCart: state.cart.Marketplace,
});

export default connect(mapStateToProps, null)(PaymentMethodComponent);
