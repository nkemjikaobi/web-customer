/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState, useEffect } from "react";
import AccountLayout from "Components/AccountLayout/accountLayout";
import Input from "Components/Form/inputs/Input/Input";
import Select from "Components/Form/inputs/Select/Select";
import { composeClasses } from "libs/utils/utils";
import Button from "Components/Button/button";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./profileSettings.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import ProfileDetails from "PagesComponents/Kpay/KYC/ProfileDetails/ProfileDetails";

interface Props {
  bvn: true;
}

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Settings" },
];

const ProfileSettings: React.FunctionComponent<Props> = ({ bvn }) => {
  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <AccountLayout>
        <Fragment>
          <div className={styles.profileSettings}>
            <ProfileDetails />
          </div>
        </Fragment>
      </AccountLayout>
    </BasePageLayout>
  );
};

export default ProfileSettings;
