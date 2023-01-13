/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Input from "Components/Form/inputs/Input/Input";
import styles from "./verificationStep.module.scss";
import Button from "Components/Button/button";
import Icon from "Components/Icons";
import { connect } from "react-redux";
import { IOrderDetails } from "dto/Kongapay/IOrderDetails";
import IUser from "dto/Authentication/IUser";
import config from "Configurations/configurations";
import { ENV, PWA_HEADER } from "Helpers/Constants";
import { range } from "lodash";
import { VerifyOTP } from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { useFocus } from "CustomHooks/InputFocusHook";
import AirtimeService from "Http/Services/AirtimeService";
import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

export interface IProps {
  isPopup?: boolean;
  isDg?: boolean;
  user?: IUser;
  requestId?: number;
  orderDetails?: IOrderDetails;
  currentStep: number;
  submitBtnTitle?: string;
  submitBtnLoadingText?: string;
  setCurrentStep: Function;
  VerifyOTP: Function;
  ManageCartAlert: Function;
  SuccessRedirection: Function;
  SelectedCategory?: string;
}

const verificationStep: React.FunctionComponent<IProps> = (props: IProps) => {
  const [nextStep, setNextStep] = useState<number>(3);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");
  const [codeLength, setCodeLength] = useState<number>(4);
  const [timer, setTimer] = useState<number>();
  const [btnEnabled, setBtnEnabled] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [requestId, setRequestId] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submitBtnTitle, setSubmitBtnTitle] = useState<string>("");
  const [submitBtnLoadingText, setSubmitBtnLoadingText] = useState<string>("");

  const [setFocus, focusProps] = useFocus(true);

  const goBack = (event: any) => {
    event.preventDefault();
    props.setCurrentStep(nextStep - 2);
  };

  const replaceCharacter = (
    str: string,
    newStr: string,
    index: number
  ): string => `${str.substring(0, index)}${newStr}${str.substring(index + 1)}`;

  const handleChange = (value: string | null, position: number) => {
    setPinCode(replaceCharacter(pinCode, value ?? "0", position));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    // TODO: Call redux action to fire purchase of airtime
    const response = await props.VerifyOTP({
      token: pinCode,
      request_id: requestId,
      request_type: props.isDg ? "dg" : "",
    });

    if (response) {
      if (props.orderDetails?.saveBeneficiary ?? false) {
        await AirtimeService.SaveBeneficiary(
          props.SelectedCategory ?? "", // airtime
          props.orderDetails?.phoneNumber ?? "", // 09089898978
          props.orderDetails?.operator ?? "", // mtn
          PWA_HEADER // pwa
        );
      }
      props.SuccessRedirection(nextStep + 1);
    } else {
      setErrorMessage("Error Validating your token, Kindly try again");
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    let mounted = props.currentStep;
    setNextStep(mounted + 1);
    setRequestId(props.requestId ?? 0);
    if (props.orderDetails) {
      setPhoneNumber(props.orderDetails.phoneNumber);
    }
    // set the lenfth for the code
    setCodeLength(config.app.env === ENV.PRODUCTION ? 6 : 4);
    return () => {
      mounted = 0;
    };
  }, [props]);

  useEffect(() => {
    let mounted = pinCode;
    setBtnEnabled(mounted.trim().length === codeLength ? true : false);
    return () => {
      mounted = "";
    };
  }, [pinCode]);

  useEffect(() => {
    let mounted = true;

    if (mounted && errorMessage) {
      props.ManageCartAlert(
        null,
        { message: errorMessage },
        NotificationAlertType.Error
      );
    }
    return () => {
      mounted = false;
    };
  }, [errorMessage]);

  useEffect(() => {
    let startTime = 120;
    const mounted = setInterval(() => {
      if (startTime === 0) clearTimeout(mounted);
      setTimer(startTime--);
    }, 1000);

    setSubmitBtnTitle(props.submitBtnTitle ?? "Continue");
    setSubmitBtnLoadingText(props.submitBtnLoadingText ?? "");

    return () => clearTimeout(mounted);
  }, []);

  return (
    <Fragment>
      <div className={styles.verificationStep}>
        {props.isPopup ? (
          <Fragment>
            <div className={styles.header}>
              <div onClick={goBack}>
                <Icon name="arrowLeft" />
              </div>{" "}
              <h1>OTP Verification</h1>
            </div>
            <p className={styles.heading}>
              A verification code was sent via SMS to your phone number{" "}
              {phoneNumber}
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <div className={styles.verificationStepNotModalHeading}>
              <h1>OTP Verification</h1>
              <p>
                {"A verification code was sent via SMS to your phone number"}
              </p>
            </div>
          </Fragment>
        )}

        <div className={styles.passcodeWrapper}>
          {range(codeLength).map((index: number) => {
            const focusProperties =
              pinCode.length === index ? focusProps : null;
            return (
              <span key={index}>
                <Input
                  className={`text-center ${styles.input}`}
                  maxLength={"1"}
                  name={`pinOne_${index}`}
                  onChange={(e: any) => handleChange(e.nativeEvent.data, index)}
                  toggle={false}
                  type="password"
                  value={pinCode.split("")[index]}
                  {...focusProperties}
                />
              </span>
            );
          })}
        </div>
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={handleSubmit}
            isDisable={!btnEnabled}
            isSubmitting={isSubmitting}
            loadingText={submitBtnLoadingText}
            title={submitBtnTitle}
          />
        </div>
        <p className={styles.requestNewCode}>
          Didn’t receive any SMS? Request new code in {timer} seconds
        </p>
      </div>
    </Fragment>
  );
};

verificationStep.defaultProps = {
  isPopup: true,
  isDg: false,
  orderDetails: undefined,
  requestId: 0,
  user: undefined,
  submitBtnLoadingText: "",
  submitBtnTitle: "Continue",
  SelectedCategory: "",
};

const mapStateToParams = (state: any) => ({
  user: state.auth.CurrentUser,
  orderDetails: state.kpay.OrderDetails,
  requestId: state.kpay.RequestId,
  SelectedCategory: state.kpay.SelectedCategory,
});

export default connect(mapStateToParams, { VerifyOTP, ManageCartAlert })(
  verificationStep
);
