/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./otpVerification.module.scss";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { VerifyOTP } from "Http/Redux/Actions/KPayActions/DGActionEvent";
import TransactionFlowComponent from "PagesComponents/Kpay/TransactionFlowComponent";
import IUser from "dto/Authentication/IUser";
import VerificationStep from "Components/Modal/verificationStep/verificationStep";

interface IOtpVerification {
  user: IUser;
  kpay: any;
  VerifyOTP: Function;
}

const OtpVerification: React.FunctionComponent<IOtpVerification> = (
  properties: IOtpVerification
) => {
  const { dgstatus }: any = useParams();
  const history = useHistory();

  const [currentStep, setCurrentStep] = useState<number>(2);
  const [isDg, setIsDg] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      let responseData = 0;
      try {
        responseData = parseInt(dgstatus);
      } catch (exception: unknown) {}

      setIsDg(responseData === 1);
    }

    return () => {
      mounted = false;
    };
  }, [dgstatus]);

  const handleOtpVerification: Function = (isValid: boolean) => {
    if (isValid) {
      history.push("/pay-bills/transaction-successful");
    }
  };

  return (
    <Fragment>
      <BasePageLayout
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={"container-fluid my-4 mx-0 px-0"}>
          <div className={"row pt-4"}>
            <div className={"col"}>
              <div className={styles.otpVerification}>
                <VerificationStep
                  currentStep={currentStep}
                  isDg={isDg}
                  isPopup={false}
                  setCurrentStep={(step: number) => setCurrentStep(step)}
                  submitBtnTitle={"Continue"}
                  SuccessRedirection={(nextStep: number) =>
                    handleOtpVerification(nextStep > currentStep)
                  }
                />
              </div>
            </div>
          </div>
          <TransactionFlowComponent />
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToParams = (state: any) => {
  return { kpay: state.kpay, user: state.auth.CurrentUser };
};

export default connect(mapStateToParams, { VerifyOTP })(OtpVerification);
