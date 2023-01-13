import React, { useState } from "react";
import Step1 from "Components/BuyAirtimeM/step1/step1";
import QuicklinksModalContent from "../OrderCompletion/OrderCompletion";

const buyAirtimeModal: React.FunctionComponent = () => {
  const [currentStep, setCurrenStep] = useState(0);
  const moveToNextStep = (step: number) => {
    step < 0 ? setCurrenStep(0) : setCurrenStep(step);
  };

  const formSteps = [
    {
      key: "step_1",
      component: <Step1 setCurrentStep={moveToNextStep} />,
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

export default buyAirtimeModal;
