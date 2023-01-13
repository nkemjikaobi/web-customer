import React, { Fragment, useState } from "react";
import Step from "Components/ServicesInternet/step/step";
import QuicklinksModalContent from "../OrderCompletion/OrderCompletion";

const InternetModal: React.FunctionComponent = () => {
  const [currentStep, setCurrenStep] = useState(0);
  const moveToNextStep = (step: number) => {
    step < 0 ? setCurrenStep(0) : setCurrenStep(step);
  };

  const formSteps = [
    {
      key: "step_1",
      component: (
        <Fragment>
          <Step setCurrentStep={moveToNextStep} />
        </Fragment>
      ),
    },
  ];

  return (
    <QuicklinksModalContent
      currentStep={currentStep}
      initalModals={formSteps}
      isDg={true}
      moveToNextStep={moveToNextStep}
    />
  );
};

export default InternetModal;
