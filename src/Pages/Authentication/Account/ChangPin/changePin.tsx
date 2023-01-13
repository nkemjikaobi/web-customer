/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from "react";
import AccountLayout from "Components/AccountLayout/accountLayout";
import Input from "Components/Form/inputs/Input/Input";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import Button from "Components/Button/button";
import styles from "./changePin.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";

const inputNoData = [1, 2, 3, 4];

const ChangePin: React.FunctionComponent = () => {
  const inputs = inputNoData.map((e, i) => {
    return (
      <div className={styles.input} key={i}>
        <Input type={"number"} />
      </div>
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
          <div className={styles.changePin}>
            <h1>Change PIN</h1>
            <p>Enter your current PIN to set a New PIN</p>
            <form>
              <div className={styles.inputsWrapper}>{inputs}</div>
              <div className={styles.button}>
                <Button
                  btnClass={"btn-primary text-white"}
                  isDisable={true} // disable it until the setting routes are provided
                  title="Continue"
                />
              </div>
            </form>
          </div>
          {/* <div className={styles.newPin}>
          <div className={composeClasses(styles.header, styles.hidden)}>
            <div className={styles.icon}>
              <Icon name="arrowLeft" />
            </div>

            <h2>Enter New PIN</h2>
          </div>
          <form>
            <div>
              <p>New PIN</p>
              <div className={styles.inputsWrapper}>{inputs}</div>
            </div>
            <div>
              <p>Confirm New PIN</p>
              <div className={styles.inputsWrapper}>{inputs}</div>
            </div>
            <div className={styles.button}>
              <Button title="Continue" />
            </div>
          </form>
        </div> */}
        </Fragment>
      </AccountLayout>
    </BasePageLayout>
  );
};

export default ChangePin;
