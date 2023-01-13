import React, { Fragment } from "react";
import Button from "Components/Button/button";
// PNG images
import image2 from "Assets/images/png/ussd.png";
import Alert from "Assets/images/png/alert.png";
// Svg images
import cash from "Assets/images/svg/cash.svg";
import cast from "Assets/images/svg/cast.svg";
import phone from "Assets/images/svg/phone.svg";
import arrow from "Assets/images/svg/arrow-clockwise.svg";
import hand from "Assets/images/svg/hand-thumbs-up.svg";
import card from "Assets/images/svg/credit-card-2-back.svg";

import BasePageLayout from "Components/BasePageLayout/basePageLayout";

import styles from "./personal.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";

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
              <h1>We make it easy to accept payment from your users. </h1>
              <p>
                Create a delightful and seamless payment experience on any
                platform.
              </p>
            </div>
          </div>
        </section>
        <div className={styles.buttonDiv}>
          <Button
            btnClass={"btn-primary text-white"}
            className={styles.current_button}
            title={"Personal"}
          />
          <Button
            btnClass={"btn-primary text-white"}
            className={styles.button}
            title={"Agent"}
          />
          <Button
            btnClass={"btn-primary text-white"}
            className={styles.button}
            title={"Merchants"}
          />
          <Button
            btnClass={"btn-primary text-white"}
            className={styles.button}
            title={"Documentation"}
          />
        </div>
        <div className={"row"}>
          <div className={"col"}>
            <div className={styles.image1}>
              <img alt="phone" className={styles.image2} src={image2} />
            </div>
          </div>
          <div className={"col"}>
            <div className={styles.ussd_section}>
              <p className={styles.easy_access}>
                Need easy access for all transaction?{" "}
              </p>
              <br />
              <p className={styles.ussd}>{"*574#"}</p>
              <p className={styles.easy_access}>
                Start making your transaction today!{" "}
              </p>
            </div>
          </div>
        </div>
        <section className={styles.benefit}>
          <p>Benefits of using KongaPay</p>
          <div className={"container mt-5"}>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              <div className={"col"}>
                <div
                  className={"card"}
                  style={{
                    background: "#FEF9F6",
                    width: "300px",
                    height: "280px",
                  }}
                >
                  <div className={"card-body"}>
                    <img alt="thumb" className={styles.svg} src={hand} />
                    <br />
                    <h4 className={styles.card_header}>Quick Signup</h4>
                    <p
                      className={"card-text mt-5"}
                      style={{
                        fontSize: "20px",
                        lineHeight: "34px",
                      }}
                    >
                      Lorem Khaled Ipsum is a or key to success. Stay focused.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className={"card"}
                  style={{
                    background: "#FEF9F6",
                    width: "300px",
                    height: "280px",
                  }}
                >
                  <div className={"card-body"}>
                    <img
                      alt="arrowClockWise"
                      className={styles.svg}
                      src={arrow}
                    />

                    <h4 className={styles.card_header}>Recurring Payment</h4>
                    <p
                      className={"card-text mt-5"}
                      style={{
                        fontSize: "20px",
                        lineHeight: "34px",
                      }}
                    >
                      Lorem Khaled Ipsum is a or key to success. Stay focused.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className={"card"}
                  style={{
                    background: "#FEF9F6",
                    width: "300px",
                    height: "280px",
                  }}
                >
                  <div className={"card-body"}>
                    <img alt="creditCard" className={styles.svg} src={card} />

                    <h4 className={styles.card_header}>Seamless Process</h4>
                    <p
                      className={"card-text mt-5"}
                      style={{
                        fontSize: "20px",
                        lineHeight: "34px",
                      }}
                    >
                      Lorem Khaled Ipsum is a or key to success. Stay focused.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className={"card"}
                  style={{
                    background: "#FEF9F6",
                    width: "300px",
                    height: "280px",
                  }}
                >
                  <div className={"card-body"}>
                    <img alt="cast" className={styles.svg} src={cast} />

                    <h4 className={styles.card_header}>Bill & Airtime</h4>
                    <p
                      className={"card-text mt-5"}
                      style={{
                        fontSize: "20px",
                        lineHeight: "34px",
                      }}
                    >
                      Lorem Khaled Ipsum is a or key to success. Stay focused.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className={"card"}
                  style={{
                    background: "#FEF9F6",
                    width: "300px",
                    height: "280px",
                  }}
                >
                  <div className={"card-body"}>
                    <img alt="phone" className={styles.svg} src={phone} />

                    <h4 className={styles.card_header}>Easy Baking</h4>
                    <p
                      className={"card-text mt-5"}
                      style={{
                        fontSize: "20px",
                        lineHeight: "34px",
                      }}
                    >
                      Lorem Khaled Ipsum is a or key to success. Stay focused.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className={"card"}
                  style={{
                    background: "#FEF9F6",
                    width: "300px",
                    height: "280px",
                  }}
                >
                  <div className={"card-body"}>
                    <img alt="cash" className={styles.svg} src={cash} />
                    <h4 className={styles.card_header}>Save Money</h4>
                    <p
                      className={"card-text mt-5"}
                      style={{
                        fontSize: "20px",
                        lineHeight: "34px",
                      }}
                    >
                      Lorem Khaled Ipsum is a or key to success. Stay focused.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6">
              <h4 className={styles.payments}>
                The payment solution for your Business
              </h4>
              <p className={styles.payments_writeup}>
                {" "}
                Get access to amazing features that will give your customers a
                painless payments expereince.
              </p>
              <h6 className={styles.payment_subheader}>
                We make it easy to accept payment from your users
              </h6>
              <div className="form-check">
                <input
                  checked
                  className="form-check-input"
                  id="flexCheckDefault"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Create a delightful and seamless payment experience on any
                  platform.
                </label>
              </div>
              <div className="form-check">
                <input
                  checked
                  className="form-check-input"
                  id="flexCheckDefault"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Use KongaPay to process online and offline transactions.
                </label>
              </div>
              <div className="form-check">
                <input
                  checked
                  className="form-check-input"
                  id="flexCheckDefault"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  No payment redirections away from your app or website. Ever.
                </label>
              </div>
              <div className="form-check">
                <input
                  checked
                  className="form-check-input"
                  id="flexCheckDefault"
                  type="checkbox"
                  value=""
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  It &apos;s a POS and more!
                </label>
              </div>
              <a className="btn btn-primary mt-2 text-white me-5" href="#">
                Become a Merchant
              </a>
              <a className="btn btn-outline-primary mt-2" href="#">
                Demo
              </a>
            </div>
            <div className="col-sm-6">
              <div className={styles.image3}>
                {/* <div className={styles.imageDiv}>
                  <img alt="kongapay" className={styles.image4} src={image4} />
                
                <img alt="kongawallet" className={styles.image5} src={image5} />
                <img alt="barcode" className={styles.image6} src={barcode} />
                <img alt="cicle" className={styles.image7} src={recycle} />
                <img alt="pay_attitude" className={styles.image8} src={attitude} />
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6">
              <h4 className={styles.payments}>Become an Agent</h4>
              <p className={styles.payments_writeup}>
                {" "}
                make seamless transactions and payment at cheaper rate.
              </p>
              <a className="btn btn-outline-primary mt-4" href="#">
                Learn More
              </a>
            </div>
            <div className="col-sm-6">
              <div className={styles.pos}>
                <p className={styles.pos_writeup}>No go dull yourself</p>
                <p className={styles.pos_writeup2}>Become an Agent today </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-6">
              <h4 className={styles.airtime}>
                Pay bills, buy airtime, spend, send and receive money with just
                your phone number.
              </h4>
              <a className="btn btn-primary mt-4 text-white" href="#">
                Create a free account
              </a>
            </div>
            <div className="col-sm-6">
              <div className={styles.phone3}>
                <img alt="phone" className={styles.alert} src={Alert} />
              </div>
            </div>
          </div>
        </div>
        <section className={styles.banner}>
          <div className={"container"}>
            <h4 className={styles.banner_header}>100 % Safe & Secure</h4>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div
                  className="card"
                  style={{
                    background: "#335C88",
                    width: "524px",
                    height: "115px",
                  }}
                >
                  <div className="card-body">
                    <p className="card-text text-white">
                      Sensitive payment information is not stored on KongaPay.
                      In fact, nothing can happen unless you authorize it.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{
                    background: "#335C88",
                    width: "524px",
                    height: "115px",
                  }}
                >
                  <div className="card-body">
                    <p className="card-text text-white">
                      To maintain the integrity of transactions between parties
                      on the platform, all personal and business accounts are
                      verified and logged with the BVN service.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{
                    background: "#335C88",
                    width: "524px",
                    height: "115px",
                  }}
                >
                  <div className="card-body">
                    <p className="card-text text-white">
                      Our technology is constantly monitoring, evolving, and
                      adapting in real-time to new forms of fraud as they arise.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div
                  className="card"
                  style={{
                    background: "#335C88",
                    width: "524px",
                    height: "115px",
                  }}
                >
                  <div className="card-body">
                    <p className="card-text text-white">
                      We have ensured that transactions do not go through public
                      networks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <img alt="banner" src={BannerImg}>
            Sensitive payment information is not stored on KongaPay. In fact, nothing can happen unless you authorize it.
          </img> */}
        </section>
      </BasePageLayout>
    </Fragment>
  );
};

export default Personal;
