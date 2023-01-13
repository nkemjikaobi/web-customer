/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState } from "react";
import ForgotStep1 from "./ForgotStep1/ForgotStep1";
import ForgotStep2 from "./ForgotStep2/ForgotStep2";

const ForgotPasswordPage: React.FunctionComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <Fragment>
      {currentStep === 1 ? (
        <ForgotStep1
          currentStep={currentStep}
          email={email}
          setCurrentStep={setCurrentStep}
          setEmail={setEmail}
        />
      ) : currentStep === 2 ? (
        <ForgotStep2 email={email} />
      ) : null}
    </Fragment>
  );
};

export default ForgotPasswordPage;
