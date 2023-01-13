/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./paymentSuccess.module.scss";
import Success from "Assets/images/png/success.png";
import Button from "Components/Button/button";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { CURRENCIES } from "Helpers/Constants";
import {
  OpenModalAction,
  CloseModalAction,
  SetComponentAction,
} from "Http/Redux/Actions/ModalActions/ModalActions";

interface IPaymentSuccess {
  kpay?: any;
  OpenModalAction?: Function | undefined;
  CloseModalAction?: Function | undefined;
  SetComponentAction?: Function | undefined;
}

const paymentSuccess: React.FunctionComponent<IPaymentSuccess> = (
  props: IPaymentSuccess
) => {
  const history = useHistory();
  const [amount, setAmount] = useState("");
  const [operator, setOperator] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  useEffect(() => {
    let mounted = props.kpay;
    if (mounted.OrderDetails === null) {
      history.push("/pay-bills");
    } else {
      setAmount(mounted.OrderDetails.amount);
      setOperator(mounted.OrderDetails.operator);
      setReferenceCode(mounted.OrderRefenceNumber);
    }
    return () => {
      mounted = false;
    };
  }, [props]);

  const closeModalAction = () => {
    props.OpenModalAction && props.OpenModalAction(false);
    props.CloseModalAction && props.CloseModalAction(true);
    props.SetComponentAction && props.SetComponentAction(null);
  };

  const handleHomeBtnClick = (event: any) => {
    // TODO: close the modal that displays this component or redirect to a page if need be.
    closeModalAction();
    history.push("/");
  };

  return (
    <Fragment>
      <div className={styles.paymentSuccess}>
        <div className={styles.heading}>
          <img
            alt="a checkmark in a green background"
            className={styles.image}
            src={Success}
          />
          <h1>
            Payment <br /> Successful
          </h1>
        </div>
        <div className={styles.details}>
          <p>
            {operator} {`${CURRENCIES.NAIRA}${amount}`}
          </p>
        </div>

        <div className={styles.transactionReference}>
          <p>Transaction Reference is {referenceCode}</p>
        </div>
        <div>
          <Button
            className={styles.btn}
            handleClick={handleHomeBtnClick}
            title="Return to Home Page"
          />
        </div>
      </div>
    </Fragment>
  );
};

paymentSuccess.defaultProps = {
  kpay: undefined,
};

const mapStateToProps = (state: any) => {
  return { kpay: state.kpay };
};
export default connect(mapStateToProps, {
  CloseModalAction,
  OpenModalAction,
  SetComponentAction,
})(paymentSuccess);
