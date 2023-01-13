/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import OrderDetailsStep from "Components/Modal/orderDetailsStep/orderDetailsStep";
import VerificationStep from "Components/Modal/verificationStep/verificationStep";
import PaymentSuccessStep from "Components/Modal/paymentSuccess/paymentSuccess";

interface IQuicklinksContent {
  key: string;
  component: any;
}

interface IQuicklinksModalContent {
  currentStep: number;
  initalModals: Array<IQuicklinksContent>;
  isDg?: boolean;
  moveToNextStep: Function;
}

const QuicklinksModalContent: React.FunctionComponent<
  IQuicklinksModalContent
> = (props: IQuicklinksModalContent) => {
  const [currentStep, setCurrenStep] = useState(1);
  const [modals, setModals] = useState<Array<IQuicklinksContent>>([]);
  const [steps, setSteps] = useState<Array<IQuicklinksContent>>([]);

  useEffect(() => {
    setCurrenStep(props.currentStep);
    let mounted: Array<IQuicklinksContent> = [...props.initalModals, ...steps];
    setSteps([
      {
        key: "step_2",
        component: (
          <Fragment>
            <OrderDetailsStep
              currentStep={props.currentStep}
              setCurrentStep={props.moveToNextStep}
            />
          </Fragment>
        ),
      },
      {
        key: "step_3",
        component: (
          <Fragment>
            <VerificationStep
              currentStep={props.currentStep}
              isDg={props.isDg}
              setCurrentStep={props.moveToNextStep}
              submitBtnTitle={"Continue"}
              SuccessRedirection={(nextStep: number) =>
                props.moveToNextStep(nextStep)
              }
            />
          </Fragment>
        ),
      },
      {
        key: "step_4",
        component: (
          <Fragment>
            <PaymentSuccessStep />
          </Fragment>
        ),
      },
    ]);
    setModals(mounted);
    return () => {
      mounted = [];
    };
  }, [props]);

  return (
    <Fragment>
      <div>
        <div>{modals[currentStep]?.component}</div>
      </div>
    </Fragment>
  );
};

QuicklinksModalContent.defaultProps = {
  isDg: false,
};

export default QuicklinksModalContent;
