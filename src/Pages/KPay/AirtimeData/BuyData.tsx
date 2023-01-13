/* eslint-disable @typescript-eslint/ban-types */

import React, { Fragment, useEffect, useState } from "react";
import AirtimeService from "Http/Services/AirtimeService";
import TransactionFlowComponent from "PagesComponents/Kpay/TransactionFlowComponent";
import "Scss/Custom.scss";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import { useHistory } from "react-router-dom";
import BuyDataComponent from "Components/BuyDataM/step1/step1";
import styles from "./Kpayservices.module.scss";
import IBeneficiary from "dto/Kongapay/IBeneficiary";
import NoBeneficiary from "Components/NoBeneficiary/NoBeneficiary";

// statically setting the product category for this form
const __PRODUCT_CATEGORY__ = "mobile-data";

const BuyData: React.FunctionComponent = () => {
  const history = useHistory();

  const [SavedBeneficiaries, SetSavedBeneficiaries] = useState<
    Array<IBeneficiary>
  >([]);

  // function to handle api request to the server for forgot password
  const handleBuyData: Function = async (param: number): Promise<any> => {
    if (param === 1) {
      history.push("/pay-bills/order-details/1");
    }
  };

  // load the operators
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // load saved airtime beneficiaries
      AirtimeService.GetSavedBeneficiaries(__PRODUCT_CATEGORY__).then(
        (beneficiaries: Array<IBeneficiary>) =>
          SetSavedBeneficiaries(beneficiaries)
      );
    }
    return () => {
      mounted = false;
    };
  }, []);

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/pay-bills/" },
    { Text: "Pay Bills", Url: "/pay-bills/" },
    { Text: "Data Plan Recharge" },
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
              <BuyDataComponent setCurrentStep={handleBuyData} />
            </div>

            <div className={styles.saveBenHolder}>
              <h6 className={"h6 p-4 border-bottom"}>Saved Beneficiaries</h6>
              {SavedBeneficiaries.length > 0 ? (
                <div className={"table p-0 mb-4 pb-4"}>
                  <table className={"table table-hover"}>
                    <tbody>
                      {SavedBeneficiaries.map(
                        (SavedBeneficiary: IBeneficiary) => {
                          return (
                            <tr key={SavedBeneficiary.id}>
                              <td className={styles.tableDataStyles}>
                                {SavedBeneficiary.beneficiary_name}
                              </td>
                              <td className={styles.tableDataStyles}>
                                {SavedBeneficiary.beneficiary_value}
                              </td>
                              <td className={styles.tableDataStyles}>Buy</td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>
              ) : (
                <NoBeneficiary />
              )}
            </div>
          </div>
          <TransactionFlowComponent />
        </div>
      </BasePageLayout>
    </Fragment>
  );
};
export default BuyData;
