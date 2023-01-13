/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./Kyc.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import KycLayout from "../KycLayout/KycLayout";

const KycPage: React.FunctionComponent = () => {
  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Accounts Upgrade", Url: "/accounts/kyc" },
  ];

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div className={styles.container}>
        <KycLayout />
      </div>
    </BasePageLayout>
  );
};

export default KycPage;
