/* eslint-disable @typescript-eslint/ban-types */

import AirtimeService from "Http/Services/AirtimeService";
import React, { useEffect, useState, Fragment } from "react";

import SavedBeneficiary from "dto/Kongapay/ISavedBeneficiary";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import TransactionFlowComponent from "PagesComponents/Kpay/TransactionFlowComponent";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { useHistory } from "react-router-dom";
import ServicesInternetComponent from "Components/ServicesInternet/step/step";
import styles from "./Kpayservices.module.scss";

const DataServicesPage: React.FunctionComponent = () => {
  const history = useHistory();
  const [SavedBeneficiaries, SetSavedBeneficiaries] = useState<
    SavedBeneficiary[]
  >([]);

  // function to handle api request to the server for forgot password
  const handleBuyData: Function = (param: number): any => {
    if (param === 1) {
      history.push("/pay-bills/order-details/1");
    }
  };
  // load the operators
  useEffect(() => {
    let mounted = AirtimeService.loadBeneficiaries();
    // load saved airtime beneficiaries
    SetSavedBeneficiaries(mounted);
    return () => {
      mounted = [];
    };
  }, []);

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Pay Bills", Url: "/pay-bills" },
    { Text: "Internet Services" },
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
              <ServicesInternetComponent setCurrentStep={handleBuyData} />
            </div>

            <div className={styles.saveBenHolder}>
              <h6 className={"h6 p-4 border-bottom"}>Saved Beneficiaries</h6>
              <div className={"table p-0 mb-4 pb-4"}>
                <table className={"table table-hover"}>
                  <tbody>
                    {SavedBeneficiaries.map((beneficiary: SavedBeneficiary) => {
                      return (
                        <tr key={beneficiary.Id}>
                          <td className={styles.tableDataStyles}>
                            {beneficiary.BeneficiaryType}
                          </td>
                          <td className={styles.tableDataStyles}>
                            {beneficiary.PhoneNumber}
                          </td>
                          <td className={styles.tableDataStyles}>Buy</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <TransactionFlowComponent />
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default DataServicesPage;
