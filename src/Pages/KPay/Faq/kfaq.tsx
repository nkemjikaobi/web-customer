import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import pageData from "./data";
import styles from "./faq.module.scss";
import Asset from "Components/Asset/asset";
import constants from "Helpers/cloudinaryConstants";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import Customer from "./customer";
import Merchant from "./merchant";
import Agent from "./agent";

const KongaPayFaq: React.FunctionComponent = () => {
  const [selected, setSelected] = useState<any>("customer");

  const { image, bannerText, title } = pageData;

  const navOption = (data: string) => {
    setSelected(data);
  };

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "FAQ" },
    { Text: "KongaPay", Url: "/faq-kongapay" },
  ];

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.wrapper}>
          <div className={styles.mainContainer}>
            <div className={styles.headerWrapper}>
              <p className={styles.header}>{title}</p>
            </div>
            <div className={styles.bannerContainer}>
              <p>{bannerText}</p>
              <Asset
                alt="Online Questions and Answer."
                name={image}
                type={constants.asset.cloudinaryType}
              />
            </div>
            <div className={styles.navWrapper}>
              <div
                className={
                  selected === "customer"
                    ? [styles.nav1, styles.active].join(" ")
                    : styles.nav1
                }
                onClick={() => navOption("customer")}
              >
                <p
                  className={
                    selected === "customer" ? styles.text : styles.activeText
                  }
                >
                  Customer FAQs
                </p>
              </div>
              <div
                className={
                  selected === "merchant"
                    ? [styles.nav2, styles.active].join(" ")
                    : styles.nav2
                }
                onClick={() => navOption("merchant")}
              >
                <p
                  className={
                    selected === "merchant" ? styles.text : styles.activeText
                  }
                >
                  Merchant FAQs
                </p>
              </div>
              <div
                className={
                  selected === "agent"
                    ? [styles.nav3, styles.active].join(" ")
                    : styles.nav3
                }
                onClick={() => navOption("agent")}
              >
                <p
                  className={
                    selected === "agent" ? styles.text : styles.activeText
                  }
                >
                  Agent FAQs
                </p>
              </div>
            </div>
            {selected === "customer" ? (
              <div>
                <div className={styles.wrapperText}>
                  <p className={styles.customerHead}>Customer FAQs</p>
                  <p className={styles.innerText}>
                    Take a look at the common questions we receive from regular
                    users, and their answers. The solution to your issue might
                    just be there answers. The solution to your issue might just
                    be there.
                  </p>
                </div>
                <Customer />
              </div>
            ) : selected === "merchant" ? (
              <div>
                <div className={styles.wrapperText}>
                  <p className={styles.customerHead}>Merchant FAQs</p>
                  <p className={styles.innerText}>
                    Take a look at the common questions we receive from regular
                    users, and their answers. The solution to your issue might
                    just be there.
                  </p>
                </div>
                <Merchant />
              </div>
            ) : selected === "agent" ? (
              <div>
                <div className={styles.wrapperText}>
                  <p className={styles.customerHead}>Agent FAQs</p>
                  <p className={styles.innerText}>
                    Take a look at the common questions we receive from regular
                    users, and their answers. The solution to your issue might
                    just be there.
                  </p>
                </div>
                <Agent />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default KongaPayFaq;
