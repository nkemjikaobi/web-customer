/* eslint-disable max-len */
import React, { Fragment } from "react";

import Testimonal from "Assets/images/png/testimonal.png";
import Support from "Assets/images/svg/support.svg";
import Control from "Assets/images/svg/control.svg";
import Earn from "Assets/images/svg/earn.svg";
import Easy from "Assets/images/svg/easy.svg";
import Guarantee from "Assets/images/svg/guarantee.svg";
import Low from "Assets/images/svg/commission.svg";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { URLS } from "Helpers/Constants";
import { composeClasses } from "libs/utils/utils";
import styles from "./sell.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";

const Personal: React.FunctionComponent = () => {
  const breadCrumbs: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "Sell on Konga" },
  ];
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadCrumbs}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={"container"}>
          <section className={styles.header}>
            <div>
              <div className={styles.header_Text}>
                -<h1>Grow your business Online </h1>
                <p>
                  Reach millions of buyers in every state in Nigeria easily, get
                  your store in Konga today!
                </p>
                <a
                  className={composeClasses(styles.sellButton, "btn")}
                  href={URLS.SHQ}
                >
                  Start selling on Konga
                </a>
              </div>
            </div>
          </section>
        </div>
        <section className={styles.sell}>
          <div>
            <p className={styles.sell_benefits}>Why sell on Konga?</p>
            <div className={styles.container}>
              <div className={styles.items}>
                <img
                  alt="phone"
                  className={styles.sellPic}
                  src={Earn}
                  width="120px"
                />
                <h4 className={"mt-4"}>EARN MORE MONEY</h4>
                <p className={"mt-4"}>
                  Konga is one of the largest websites in Nigeria. Sell to over
                  50 million buyers across every state in Nigeria.{" "}
                </p>
              </div>

              <div className={styles.items}>
                <img
                  alt="phone"
                  className={styles.sellPic}
                  src={Low}
                  width="120"
                />
                <h4 className={"mt-4"}>LOW COMMISSIONS</h4>
                <p className={"mt-4"}>
                  Commission fees are as low as 3%, and you only pay when you
                  successfully sell your product.{" "}
                </p>
              </div>

              <div className={styles.items}>
                <img
                  alt="phone"
                  className={styles.sellPic}
                  src={Control}
                  width="120"
                />
                <h4 className={"mt-4"}>YOU’RE IN CONTROL</h4>
                <p className={"mt-4"}>
                  You choose the price for your listings, whether or not you
                  accept POD, your return policy and delivery method.
                </p>
              </div>

              <div className={styles.items}>
                <img alt="phone" className={styles.sellPic} src={Easy} />
                <h4 className={"mt-4"}>EARN MORE MONEY</h4>
                <p className={"mt-4"}>
                  We make it easy to exchange messages with buyers who may have
                  questions.
                </p>
              </div>

              <div className={styles.items}>
                <img alt="phone" className={styles.sellPic} src={Support} />
                <h4 className={"mt-4"}>24/7 SUPPORT</h4>
                <p className={"mt-4"}>
                  We provide various tools to support you including our Seller
                  community and our dedicated merchant support teams.{" "}
                </p>
              </div>

              <div className={styles.items}>
                <img alt="phone" className={styles.sellPic} src={Guarantee} />
                <h4 className={"mt-4"}>GUARANTEED SAFETY</h4>
                <p className={"mt-4"}>
                  We’ve built a community that takes safety & security seriously
                  for both buyers and sellers.{" "}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.testimonals}>
          <h4 className={styles.testimonals_header}>Testimonals</h4>
          <div className={"container"}>
            <div className="row">
              <div className="card-group">
                <div className="col-sm-6">
                  <div className="card" style={{ height: "430px" }}>
                    <div className="card-body">
                      <p className={styles.quote}>
                        &quot;I was looking for an opportunity where I could
                        work from home and still do my business and then also be
                        able to sell to multiple people.&quot;
                      </p>
                      <p className={styles.testimonial_name}>
                        Tolulope Adegbite
                      </p>
                      <p className={"text-center"}>STORE: KIDDIES TREASURE</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="card">
                    <img
                      alt="phone"
                      className={styles.testimonalPic}
                      src={Testimonal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.how_it_work}>
          <p className={styles.how_it_work_header}>How it works</p>
          <div className="row row-cols-1 row-cols-md-3 g-5">
            <div className={"col"}>
              <h5 className={"mb-4"}>
                Step 1: <span className={styles.color}>CREATE YOUR STORE</span>
              </h5>
              <p>
                Register your store with a unique Store URL for your store on
                Konga.com. Go through the orientation guide Submit The Required
                Documents
              </p>
            </div>
            <div className={"col"}>
              <h5 className={"mb-4"}>
                Step 2: <span>LIST YOUR PRODUCTS</span>
              </h5>
              <p>
                Create your products, set your own prices, and make them
                available for purchase.
              </p>
            </div>

            <div className={"col"}>
              <h5 className={"mb-4"}>
                Step 3: <span>SELL TO MILLIONS OF BUYERS</span>
              </h5>
              <p>
                Manage your orders, choose your own shipping method, and receive
                sales proceeds.
              </p>
            </div>
          </div>

          <div className={styles.downButton}>
            <a
              className={composeClasses(styles.getStartedButton, "btn")}
              href={URLS.SHQ}
            >
              Start selling on Konga
            </a>
          </div>
        </section>
      </BasePageLayout>
    </Fragment>
  );
};

export default Personal;
