/* eslint-disable @typescript-eslint/ban-types */

import React, { Fragment, useEffect, useState } from "react";
import Button from "Components/Button/button";
import SeoText from "Components/SeoText/seoText";
import FormNav from "Components/ShipNow/FormNav/formNav";
import Step1 from "Components/ShipNow/Step1/step1";
import Step2 from "Components/ShipNow/Step2/step2";
import Step3 from "Components/ShipNow/Step3/step3";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./ShipNow.module.scss";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  GenerateWayBillAction,
  MoveSteperAction,
} from "Http/Redux/Actions/KExpress/LogisticsActionEvent";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import IWaybill from "dto/KongaExpress/IWaybill";
import Step4 from "Components/ShipNow/Step4/Step4";
import { composeClasses } from "libs/utils/utils";

export interface IShipNow {
  wayBillRequest: IWaybill;
  CurrentStep: number;
  GenerateWayBillAction: Function;
  MoveSteperAction: Function;
}

const ShipNow: React.FunctionComponent<IShipNow> = ({
  CurrentStep,
  wayBillRequest,
  MoveSteperAction,
  GenerateWayBillAction,
}: IShipNow) => {
  const history = useHistory();
  const [httpResponse, setHttpResponse] = useState<{
    message: string;
    data: any;
  } | null>(null);
  const [wayBillNumber, setWayBillNumber] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    if (wayBillRequest.shipper_lga.length <= 0) history.push("/send-package/");
    return () => {
      mounted = true;
    };
  }, []);

  const submitWayBill = async (event: any) => {
    event.preventDefault();
    const trember = await GenerateWayBillAction(wayBillRequest);
    //Add conditional statement
    setWayBillNumber(trember.data ?? "");
    _next(event);
    setHttpResponse(trember);
  };

  const _next = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const currentstep = CurrentStep + 1;
    MoveSteperAction(currentstep);
  };

  const nextButton = () => {
    if (CurrentStep === 0 || CurrentStep === 1) {
      return (
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={_next}
            title="Continue"
          />
        </div>
      );
    }
  };

  /**
   * handles the change
   * @returns{*} undefined
   */

  const submitButton = () => {
    if (CurrentStep === 2) {
      return (
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={submitWayBill}
            title="Generate Code"
            type={"button"}
          />
        </div>
      );
    }
    return null;
  };

  const ourLocationButton = () => {
    if (CurrentStep === 3) {
      return (
        <div className={composeClasses(styles.button, styles.locationButton)}>
          <Button
            btnClass={"btn-primary text-white"}
            icon={"locationMarker"}
            title="Our location"
            type={"button"}
          />
        </div>
      );
    }
    return null;
  };

  const handleReturToHome = () => {
    history.push("/send-package/");
  };

  const returnHomeButton = () => {
    if (CurrentStep === 3) {
      return (
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={handleReturToHome}
            title="Return to Home"
            type={"button"}
          />
        </div>
      );
    }
    return null;
  };

  const formSteps = () => [
    {
      key: "step_1",
      component: (
        <>
          <Step1 />
        </>
      ),
    },
    {
      key: "step_2",
      component: (
        <>
          <Step2 />
        </>
      ),
    },
    {
      key: "step_3",
      component: (
        <>
          <Step3 httpResponse={httpResponse} />
        </>
      ),
    },
    {
      key: "step_4",
      component: (
        <>
          <Step4 wayBillNumber={wayBillNumber} />
        </>
      ),
    },
  ];
  const formStepper = formSteps();

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/send-package/" },
    { Text: "Send Package", Url: "/send-package/ship-now/" },
    { Text: "Ship Now" },
  ];

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <React.Fragment>
        <div className={styles.shipNow}>
          <h1 className={styles.heading}>Ship Now</h1>
          <form className={styles.form}>
            <div>
              <FormNav currentStep={CurrentStep} />
            </div>
            <div className={styles.form_content}>
              {CurrentStep !== 3 && (
                <div className={styles.form_header}>
                  <h2>Ready to ship? Please fill details correctly</h2>
                </div>
              )}
              <div className={styles.form_main}>
                <div>{formStepper[CurrentStep].component}</div>
                <div className={styles.directionalbuttons}>
                  {httpResponse !== null && httpResponse.data.data !== null ? (
                    <Fragment>
                      <div className={"text-center mb-3"}>
                        <Link
                          className={"btn btn-block btn-outline-danger w-50"}
                          to={"/send-package/our-locations/"}
                        >
                          Our Location
                        </Link>
                      </div>
                      <div className={"text-center"}>
                        <Link
                          className={"btn btn-block btn-danger w-50 text-white"}
                          to={"/send-package/"}
                        >
                          Return to Home
                        </Link>
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      {nextButton()}
                      {submitButton()}
                      <div className={styles.buttonOptions}>
                        {ourLocationButton()}
                        {returnHomeButton()}
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </form>
          <section className={styles.seoText}>
            <SeoText
              text={
                "Konga.com is Nigeria’s number one online Shopping destination" +
                ".We pride ourselves in having everything you could possibly need " +
                "for life and living at the best prices than anywhere else." +
                "Our access to Original Equipment Manufacturers and premium sellers " +
                "gives us a wide range of products at very low prices. Some of our popular " +
                "categories include electronics, mobile phones, computers, fashion, beauty " +
                "products, home and kitchen, Building and construction materials and " +
                "a whole lot more from premium brands. Some of our other categories " +
                "include Food and drinks, automotive and industrial, books, musical " +
                "equipment, babies and kids items, sports and fitness, to mention a few. " +
                "To make your shopping experience swift and memorable, there are also " +
                "added services like gift vouchers, consumer promotion activities " +
                "across different categories and bulk purchases with hassle-free delivery. " +
                "Enjoy free shipping rates for certain products and with the bulk purchase " +
                "option, you can enjoy low shipping rates, discounted prices and flexible " +
                "payment. When you shop on our platform, you can pay with your debit card " +
                "or via KongaPay, which is a convenient and secured payment solution. " +
                "Get the best of lifestyle services online. Don't miss out on the biggest " +
                "sales online which takes place on special dates yearly"
              }
              title={
                "Online Shopping on Konga.com – Nigeria’s Largest Online Mall"
              }
            />
          </section>
        </div>
      </React.Fragment>
    </BasePageLayout>
  );
};

const mapStateToProps = (state: any) => ({
  CurrentStep: state.logistics.CurrentStep,
  wayBillRequest: state.logistics.WayBillRequest,
});

export default connect(mapStateToProps, {
  GenerateWayBillAction,
  MoveSteperAction,
})(ShipNow);
