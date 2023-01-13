/* eslint-disable @typescript-eslint/ban-types */
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import React, { Fragment } from "react";
import BuyElectricityComponent from "Components/BuyElectricityM/step1/step1";
import { useHistory } from "react-router";
import styles from "./electricityPage.module.scss";

const ElectricityPage: React.FunctionComponent = () => {
  const history = useHistory();

  // function to handle api request to the server for forgot password
  const handleElectricityPurchase: Function = (param: number) => {
    if (param === 1) {
      history.push("/pay-bills/order-details/1");
    }
  };

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/pay-bills/" },
    { Text: "Pay Bills", Url: "/pay-bills" },
    { Text: "Electricity" },
  ];
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.container}>
          <div className={styles.servicesContainer}>
            <div className={styles.servicesBody}>
              <BuyElectricityComponent
                setCurrentStep={handleElectricityPurchase}
              />
            </div>
            {/* <div className={styles.recentPurchase}>
              <RecentPurchaseComponent service={""} />
            </div> */}
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default ElectricityPage;
