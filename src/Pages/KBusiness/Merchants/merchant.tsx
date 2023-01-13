/* eslint-disable max-len */
import React, { Fragment } from "react";
import Button from "Components/Button/button";
import { Link } from "react-router-dom";
import webBrowserIcon from "Assets/images/png/webBrowserIcon.png";
import posPic from "Assets/images/png/posPic.png";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./merchant.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import { CURRENCIES, URLS } from "Helpers/Constants";
import { composeClasses } from "libs/utils/utils";

const Personal: React.FunctionComponent = () => {
  const breadCrumbs: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "For Business" },
  ];
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadCrumbs}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <section className={styles.header}>
          <div>
            <div className={styles.header_Text}>
              <h1>Become a KongaPay Merchant </h1>
              <p>
                Get access to amazing features that will make your life as a
                merchant easy. We make it easy to accept payment from your
                users.
              </p>
              <a
                className={composeClasses(styles.getStartedButton, "btn")}
                href={URLS.KONGA_PAY_MERCHANT_SIGN_UP}
              >
                Get Started
              </a>
              <a
                className={composeClasses(styles.loginButton, "btn")}
                href={URLS.KONGA_PAY_SIGN_IN}
              >
                Login
              </a>
            </div>
          </div>
        </section>
        <div className={styles.btnContainer}>
          <div className={styles.buttonDiv}>
            <Link to={"/business/become-an-agent"}>
              <button className={styles.button}>Agents</button>
            </Link>
            <Link to={"/business/merchant"}>
              <button className={styles.current_button}>Merchants</button>
            </Link>
            <a href={"https://www.kongapay.com/developer/docs/"}>
              <button className={styles.button}>Documentation</button>
            </a>
          </div>
        </div>

        <section className={"mb-5 pb-5"}>
          <div className={"container mt-5"}>
            <div className={"row"}>
              <div className={"col-md-12"}>
                <h1 className={"text-center mt-5 " + styles.pricing_header}>
                  Pricing
                </h1>
                <p className={styles.pricing_subheader}>
                  Our prices have been crafted with our agents in mind.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.product_card_container}>
            <div className={styles.product_card1}>
              <h5 className={"card-title text-center mt-5"}>Fund Account</h5>
              <div className={styles.product_card_content}>
                <p className={"mb-5"}>
                  <span className={styles.bold}>Free</span>
                  <small> per transaction</small>
                </p>
                <p>Web SDK</p>
                <p>Mobile SDK (iOS, Android)</p>
              </div>
            </div>

            <div className={styles.product_card}>
              <h5 className={"card-title text-center mt-5"}>Bulk Payout</h5>
              <div className={styles.product_card_content}>
                <p className={"mb-5"}>
                  <span className={styles.bold_discount}>
                    {CURRENCIES.NAIRA} 20
                  </span>{" "}
                  <small>Per transaction</small>
                </p>
                <p>No Setup Fee</p>
                <p>API Ready</p>
                <p>Reporting</p>
              </div>
            </div>

            <div className={styles.product_card1}>
              <h5 className={"card-title text-center mt-5"}>Digital Goods</h5>
              <div className={styles.product_card_content}>
                <p className={"mb-5"}>
                  <span className={styles.bold}>1% </span>{" "}
                  <small>commission back</small>
                </p>
                <p>No Setup Fee</p>
                <p>Web SDK</p>
                <p>Mobile SDK (iOS, Android)</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.transaction}>
          <h2 className={"pb-3"}>POS Card Transaction Charges.</h2>
          <p className={"pb-3"}>Flexible and Affordable</p>
          <h2>Account Accessbility</h2>
          <div className={styles.documentation_container}>
            <div className={"text-center " + styles.documentation_card}>
              <p className={styles.doc_color}>Web Browser</p>
              <img
                alt={"Web browser icon"}
                className={""}
                src={webBrowserIcon}
                width={"60"}
              />
            </div>
            <div className={"text-center " + styles.documentation_card}>
              <p className={styles.doc_color}>POS Terminal</p>
              <img alt="POS icon" height={"110"} src={posPic} width={"60"} />
            </div>
          </div>
        </section>
      </BasePageLayout>
    </Fragment>
  );
};

export default Personal;
