import React, { Fragment, useState } from "react";
import Step1 from "Components/BuyDataM/step1/step1";

import QuicklinksModalContent from "../OrderCompletion/OrderCompletion";

const buyDataModal: React.FunctionComponent = () => {
  const [currentStep, setCurrenStep] = useState(0);
  const moveToNextStep = (step: number) => {
    step < 0 ? setCurrenStep(0) : setCurrenStep(step);
  };

  const formSteps = [
    {
      key: "step_1",
      component: (
        <Fragment>
          <Step1 setCurrentStep={moveToNextStep} />
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

export default buyDataModal;
