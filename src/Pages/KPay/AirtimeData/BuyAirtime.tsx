/* eslint-disable @typescript-eslint/ban-types */

import React, { Fragment, useEffect, useState } from "react";
import TransactionFlowComponent from "PagesComponents/Kpay/TransactionFlowComponent";
import "Scss/Custom.scss";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import BuyAirtimeComponent from "Components/BuyAirtimeM/step1/step1";
import { useHistory } from "react-router";
import AirtimeService from "Http/Services/AirtimeService";
import styles from "./Kpayservices.module.scss";
import { composeClasses } from "libs/utils/utils";
import BeneficiaryBuyButton from "PagesComponents/Kpay/BeneficiaryBuyButton/beneficiaryBuy";
import BuyAirtimeForm from "Models/FormModels/KPay/AirtimeData/BuyAirtimeForm";
import IBeneficiary from "dto/Kongapay/IBeneficiary";
// statically setting the product category for this form

const __PRODUCT_CATEGORY__ = "airtime";
const BuyAirtime: React.FunctionComponent = () => {
  const [SavedBeneficiaries, SetSavedBeneficiaries] = useState<
    Array<IBeneficiary>
  >([]);
  const [beneficiary, setBeneficiary] = useState<BuyAirtimeForm>(
    new BuyAirtimeForm()
  );

  const history = useHistory();

  // function to handle api request to the server for forgot password
  const handleBuyAirtime: Function = (param: number) => {
    if (param === 1) {
      history.push("/pay-bills/order-details/1");
    }
  };
  const handleSetBeneficiary = (e: any, benef: IBeneficiary) => {
    e.preventDefault();
    const beneficiaryData = new BuyAirtimeForm();
    beneficiaryData.phoneNumber = benef.beneficiary_value;
    beneficiaryData.operator = benef.beneficiary_name;
    setBeneficiary(beneficiaryData);
  };

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
    { Text: "Pay Bills", Url: "/pay-bills" },
    { Text: "Airtime Recharge" },
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
              <BuyAirtimeComponent setCurrentStep={handleBuyAirtime} />
            </div>

            <div className={styles.saveBenHolder}>
              <h6 className={"h6 p-4 border-bottom"}>Saved Beneficiaries</h6>
              <div className={"table p-0 mb-4 pb-4"}>
                <table className={"table table-hover"}>
                  <tbody>
                    {SavedBeneficiaries.map(
                      (SavedBeneficiary: IBeneficiary, key: number) => {
                        return (
                          <tr key={key}>
                            <td className={styles.tableDataStyles}>
                              {SavedBeneficiary.beneficiary_name}
                            </td>
                            <td className={styles.tableDataStyles}>
                              {SavedBeneficiary.beneficiary_value}
                            </td>
                            <td
                              className={composeClasses(
                                styles.tableDataStyles,
                                styles.buyAirtime
                              )}
                            >
                              <BeneficiaryBuyButton
                                setBeneficiary={(e: unknown) =>
                                  handleSetBeneficiary(e, SavedBeneficiary)
                                }
                              />
                            </td>
                          </tr>
                        );
                      }
                    )}
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

export default BuyAirtime;
