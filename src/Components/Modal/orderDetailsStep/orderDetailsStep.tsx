/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Icon from "Components/Icons/icon";
import { CloseModalAction } from "Http/Redux/Actions/ModalActions/ModalActions";
import styles from "./orderDetailsStep.module.scss";
import Button from "Components/Button/button";
import { connect } from "react-redux";
import { IOrderDetails } from "dto/Kongapay/IOrderDetails";
import { IOrderResponse } from "dto/Kongapay/IOrderDetails";
import { CURRENCIES } from "Helpers/Constants";
import accounting from "accounting";
import IUser from "dto/Authentication/IUser";
import IPayViaKongapaySdk from "dto/Cart/IPayViaKongapaySdk";
import config from "Configurations/configurations";
import { generateHash } from "libs/utils/hashing";
import PaymentService from "Http/Services/PaymentService";
import AuthService from "Http/Services/AuthService";
import { KONLINE_CALLBACK_PARAM } from "Http/Routes/Marketplace";

export interface IProps {
  user?: IUser;
  currentStep: number;
  OrderDetails?: IOrderDetails;
  CloseModalAction?: Function | undefined;
  referenceCode?: string;
  OrderResponse?: IOrderResponse;
  setCurrentStep: Function;
}

const orderDetailsStep: React.FunctionComponent<IProps> = (props: IProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [phone, setPhone] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [sdkConfig, setSdkConfig] = useState<IPayViaKongapaySdk>({
    hash: "",
    amount: 0,
    description: "",
    callback: "",
    customerId: "",
    email: "",
    enableFrame: true,
    merchantId: "",
    phone: "",
    reference: "",
    showSuccessPage: 0,
  });

  useEffect(() => {
    let mounted = props.OrderDetails;
    const orderResponse = props.OrderResponse;
    let referenceCode = props.referenceCode || "";
    if (orderResponse && orderResponse.data && !referenceCode) {
      referenceCode = orderResponse.data.order_id;
    }

    if (props.user) {
      setIsLoggedIn(true);
    }

    if (mounted) {
      setPhone(mounted.phoneNumber);
      setAmount(mounted.amount);
      setOperator(mounted.operator);

      let newDetails = "/payment/callback/app=1";

      if (props.OrderResponse) {
        try {
          newDetails = `${newDetails}&orderResponse=${JSON.stringify(
            props.OrderResponse
          )}`;
        } catch (exception: unknown) {}
      }

      if (props.OrderDetails) {
        try {
          newDetails = `${newDetails}&orderDetails=${JSON.stringify(
            props.OrderDetails
          )}`;
        } catch (exception: unknown) {}
      }

      //TODO Get email from form
      const temp_config = {
        ...sdkConfig,
        amount: mounted.amount,
        callback: `${newDetails}${KONLINE_CALLBACK_PARAM}`,
        customerId: mounted.phoneNumber,
        email: "test@email.com",
        phone: mounted.phoneNumber,
        reference: referenceCode,
        merchantId: config.sdk.GuestDGVending.merchantId || "kongapay",
        description: `Payment for ${referenceCode}`,
        hash: generateHash(
          referenceCode,
          mounted.amount,
          config.sdk.GuestDGVending.publicKey
        ),
      };

      setSdkConfig(temp_config);
    }

    setCurrentStep(props.currentStep);

    return () => {
      mounted = undefined;
    };
  }, [props]);

  const makePayment = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const authenticatedUser = AuthService.GetLoggedInUser();
    // TODO: Check if the user is logged in
    // y: open the pin code
    // n: open the sdk for payment
    if (authenticatedUser) {
      // open pin code page
      props.setCurrentStep(currentStep + 2);
    } else {
      // open sdk
      props.CloseModalAction && props.CloseModalAction(true);
      PaymentService.PayViaKongapaySdk(sdkConfig);
    }

    setIsLoading(false);
  };

  const moveBack = () => {
    props.setCurrentStep(currentStep - 1);
  };

  return (
    <Fragment>
      <div className={styles.orderDetailsStep}>
        <div className={styles.header}>
          <div onClick={moveBack}>
            <Icon name="arrowLeft" />
          </div>
          <h1>Order Details</h1>
        </div>
        <div className={styles.detailsWrapper}>
          <div className={styles.info}>
            <p className={styles.title}>Phone Number</p>
            <p className={styles.result}>{phone}</p>
          </div>
          <div className={styles.info}>
            <p className={styles.title}>Operator</p>
            <p className={styles.result}>{operator}</p>
          </div>
          <div className={styles.info}>
            <p className={styles.title}>Amount</p>
            <p className={styles.result}>
              {accounting.formatMoney(amount, CURRENCIES.NAIRA)}
            </p>
          </div>
        </div>
        <div>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={makePayment}
            isSubmitting={isLoading}
            title="Continue"
          />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.auth.CurrentUser,
  OrderDetails: state.kpay.OrderDetails,
  referenceCode: state.kpay.RequestId,
  OrderResponse: state.kpay.OrderResponse,
});

orderDetailsStep.defaultProps = {
  OrderDetails: undefined,
  user: undefined,
  referenceCode: "",
  OrderResponse: undefined,
};

export default connect(mapStateToProps, { CloseModalAction })(orderDetailsStep);
