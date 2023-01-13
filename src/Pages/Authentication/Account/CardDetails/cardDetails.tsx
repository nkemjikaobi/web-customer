/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState } from "react";
import AccountLayout from "Components/AccountLayout/accountLayout";
import AccountInfoCard from "./accountInfoCard";
import Card from "Assets/images/png/card.png";
import Input from "Components/Form/inputs/Input/Input";
import Select from "Components/Form/inputs/Select/Select";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import Button from "Components/Button/button";
import styles from "./cardDetails.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";

interface Props {
  bvn: true;
}

const data = [
  {
    id: 1,
    name: "Bank Account",
  },
  {
    id: 2,
    name: "Debit Card",
  },
];
const accountInfoData = [
  {
    img: "jjj",
    accountNumber: " 0121314896",
    accountName: "John Snow Martins ",
  },
];

const ProfileSettings: React.FunctionComponent<Props> = ({ bvn }) => {
  const [index, setIndex] = useState(0);
  const Navigation = data.map((e, i: number) => {
    return (
      <div className={styles.navItem} key={i} onClick={() => setIndex(i)}>
        <a onClick={() => setIndex(i)}>{e.name}</a>
      </div>
    );
  });
  const BankAccounts = accountInfoData.map((e, i) => {
    return (
      <AccountInfoCard
        accountName={e.accountName}
        accountNumber={e.accountNumber}
        key={i}
      />
    );
  });

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Settings" },
  ];

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <AccountLayout>
        <Fragment>
          {index === 0 && (
            <div className={styles.cardDetails}>
              <div className={styles.cardDetails_formNavigation}>
                {Navigation}
              </div>
              <div className={styles.cardDetails_content}>
                {BankAccounts}
                <form className={styles.cardDetails_form}>
                  <h1>Enter New Bank Account </h1>
                  <Input label={"Account Number"} type={"number"} />
                  <Select label={"Bank Name"} />
                  <div className={styles.button}>
                    <Button
                      btnClass={"btn-primary text-white"}
                      title={"Add New Bank"}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
          {index === 1 && (
            <div className={styles.cardDetails}>
              <div className={styles.cardDetails_formNavigation}>
                {Navigation}
              </div>
              <div className={styles.cardDetails_content2}>
                <div className={styles.cards}>
                  <div className={styles.card}>
                    <img src={Card} />
                  </div>
                  <div className={styles.card}>
                    <img src={Card} />
                  </div>
                </div>
                <form className={styles.cardDetails_form}>
                  <h2>Enter New Card Details</h2>
                  <Input label={"Card Holder Name"} type={"text"} />
                  <Input label={"Card Number"} type={"number"} />
                  <div className={styles.date}>
                    <Input label={"Expiry Date"} type={"date"} />
                    <Input label={"CCV"} type={"number"} />
                  </div>
                  <div className={styles.button}>
                    <Button
                      btnClass={"btn-primary text-white"}
                      title={"Add New Card"}
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </Fragment>
      </AccountLayout>
    </BasePageLayout>
  );
};

export default ProfileSettings;
