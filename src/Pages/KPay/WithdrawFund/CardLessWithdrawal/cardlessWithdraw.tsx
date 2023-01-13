import React, { Fragment } from "react";
import WithdrawalLayout from "Components/WithdrawLayout/withdrawalLayout";
import Input from "Components/Form/inputs/Input/Input";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { Link } from "react-router-dom";
import InfoCard from "./infoCard";
import Button from "Components/Button/button";
import styles from "./cardlessWithdraw.module.scss";
import { CURRENCIES } from "Helpers/Constants";

const inputNoData = [1, 2, 3, 4];

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/pay-bills/" },
  { Text: "Withdraw Fund" },
];

const CardlessWithdraw: React.FunctionComponent = () => {
  const infoCards = inputNoData.map((e, i) => {
    return (
      <div className={styles.input} key={i}>
        <InfoCard />
      </div>
    );
  });

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <WithdrawalLayout activePage={1}>
        <Fragment>
          <div className={styles.cardlessWithdraw}>
            <div className={styles.form}>
              <h1>
                Generate code for cardless withdrawal at{" "}
                <span className={styles.bold}>ATM</span> or{" "}
                <span className={styles.bold}>Agent</span> Location
              </h1>
              <form>
                <Input
                  label={`Enter amount to withdraw (${CURRENCIES.NAIRA})`}
                  type="number"
                />
                <Input label="Beneficiary Phone Number" type="number" />
                <p>Transaction Charge: {CURRENCIES.NAIRA} 100</p>
                <div className={styles.button}>
                  <Button btnClass={"btn-primary text-white"} title="Contiue" />
                </div>
              </form>
            </div>
            <div className={styles.history}>
              <div className={styles.header}>
                <p>History</p>
                <div>
                  <Link to="#">View All</Link>
                </div>
              </div>
              {infoCards}
            </div>
          </div>
        </Fragment>
      </WithdrawalLayout>
    </BasePageLayout>
  );
};

export default CardlessWithdraw;
