/* eslint-disable max-len */
import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { composeClasses, normalizePageContent } from "libs/utils/utils";
import styles from "./KxpressBusiness.module.scss";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import Icon from "Components/Icons";
import ContentManagementService from "Http/Services/ContentManagementService";

const breadCrumbs: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Kxpress" },
];

const KxpressBusiness: React.FunctionComponent = () => {
  const [image, setImage] = useState<any>([]);

  let pageImage: any = [];
  useEffect(() => {
    (async function () {
      pageImage = await ContentManagementService.GetPageContent("2-pwakxpress")
        .then((res) => normalizePageContent(res, true))
        .catch((err) => {
          console.log("Error fetching", err);
          return {};
        });
      setImage(pageImage);
    })();
  }, []);

  const imageUrl =
    image && image.kXpressHomeImage && image.kXpressHomeImage[0].name;

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
            <div className={styles.container}>
              <div className={styles.header_Text}>
                <h1>Kxpress for Business</h1>
                <p>
                  Thank You for choosing Kxpress Deliveries as your logistics
                  partner. To become a partner please signup, if already a
                  partner login to your portal.
                </p>
                <a
                  className={composeClasses(styles.sellButton, "btn")}
                  href={"#"}
                >
                  Become a partner
                </a>
              </div>
              <div className={styles.header_icon}>
                <Icon name="logistic" />
              </div>
            </div>
          </section>
        </div>
        <section className={styles.benefitsContainer}>
          <div className={styles.benefits}>
            <div className={styles.img}>
              <img alt="Image of a payloader" src={imageUrl} />
            </div>
            <div className={styles.benefitContent}>
              <h2>Benefit of Shipping with Kxpress</h2>
              <p className={styles.text}>
                Whether you are shipping small packages or large cargo, we offer
                our shippers a range of benefits to make shipping more
                efficient.{" "}
              </p>
              <div className={styles.cardConatiner}>
                <div className={styles.card}>
                  <div className="my-5">
                    <div className={styles.centerIcon}>
                      <Icon name="kxpressRates" />
                    </div>
                    <p className={styles.center}>Preferential rates</p>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className="my-5">
                    <div className={styles.centerIcon}>
                      <Icon
                        className={styles.centerIcon}
                        name="deliveryTruck"
                      />
                    </div>
                    <p className={styles.center}>
                      Fast and reliable delivery services
                    </p>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className="my-5">
                    <div className={styles.centerIcon}>
                      <Icon
                        className={styles.centerIcon}
                        name="shippingManager"
                      />
                    </div>
                    <p className={styles.center}>Access to shipping manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BasePageLayout>
    </Fragment>
  );
};

export default KxpressBusiness;
