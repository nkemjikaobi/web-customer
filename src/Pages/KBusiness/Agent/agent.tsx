import React, { Fragment } from "react";
import Button from "Components/Button/button";
import AndroidIcon from "Assets/images/png/androidSdk.png";
import IosIcon from "Assets/images/png/iosSdk.png";
import WebPluginIcon from "Assets/images/png/webPlugin.png";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { Link } from "react-router-dom";
import styles from "./agent.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import { CURRENCIES, URLS } from "Helpers/Constants";
import { composeClasses } from "libs/utils/utils";

const breadCrumbs: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "For Business" },
];

const Personal: React.FunctionComponent = () => {
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
              <h1>Become a KongaPay Agent </h1>
              <p>Make seamless transactions and payments at a cheaper rate.</p>
              <p>
                Get access to amazing features that will make your experience as
                an agent easy.
              </p>
              <a
                className={composeClasses(styles.getStartedButton, "btn")}
                href={URLS.KONGA_PAY_SIGN_UP}
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
              <button className={styles.current_button}>Agents</button>
            </Link>
            <Link className={styles.button} to={"/business/merchant"}>
              <button className={styles.button}>Merchants</button>
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
              <h5 className={"card-title text-center mt-5"}>Receive Payment</h5>
              <div className={styles.product_card_content}>
                <p className={"mb-5"}>
                  <span className={styles.bold}>1.55%</span>
                  <small> Per transaction</small>
                </p>
                <p>Web SDK</p>
                <p>Mobile SDK (iOS, Android)</p>
              </div>
            </div>

            <div className={styles.product_card}>
              <h5 className={"card-title text-center mt-5"}>Bulk Payout</h5>
              <div className={styles.product_card_content}>
                <p className={"mb-5 "}>
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
          <h2>Integrate our service on your website/app with ease.</h2>
          <p>
            View our various SDK (Software Development Kit) documentations
            below.
          </p>
          <div className={styles.documentation_container}>
            <div className={"text-center " + styles.documentation_card}>
              <img
                alt="Web browser icon"
                className=""
                src={AndroidIcon}
                width="60"
              />
              <p className={styles.android_sdk}>Android SDK</p>
              <p className={styles.view_doc}>
                <a href={URLS.KONGA_PAY_ANDROID_SDK}>VIEW DOCUMENTATION</a>
              </p>
            </div>
            <div className={"text-center " + styles.documentation_card}>
              <img alt="POS icon" height="110" src={IosIcon} width="60" />
              <p className={styles.ios_sdk}>IOS SDK</p>
              <p className={styles.view_doc}>
                <a href={URLS.KONGA_PAY_IOS_SDK}>VIEW DOCUMENTATION</a>
              </p>
            </div>
            <div className={"text-center " + styles.documentation_card}>
              <img alt="POS icon" height="110" src={WebPluginIcon} width="60" />
              <p className={"mt-4 " + styles.web_plugin}>WEB PAYMENT PLUGIN</p>
              <p className={styles.view_doc}>
                <a href={URLS.KONGA_PAY_WEB_PAYMENT}>VIEW DOCUMENTATION</a>
              </p>
            </div>
          </div>
        </section>
      </BasePageLayout>
    </Fragment>
  );
};

export default Personal;
