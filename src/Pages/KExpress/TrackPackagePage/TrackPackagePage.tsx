/* eslint-disable @typescript-eslint/ban-types */

import React, { Fragment, useEffect, useState } from "react";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import TrackPackageInfo from "Components/TrackPackageInfo/TrackPackageInfo";
import TrackImg from "Assets/images/png/trackingImg.png";
import SeoText from "Components/SeoText/seoText";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./TrackPackagePage.module.scss";
import TrackPackageComponent from "Components/TrackPackageComponent/TrackPackageComponent";
import { connect } from "react-redux";
import ITracking from "dto/KongaExpress/ITracking";
import ITrackingResult from "dto/KongaExpress/ITrackingResult";
import { formatDate } from "libs/utils/utils";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/send-package/" },
  { Text: "Send Package", Url: "/send-package/ship-now/" },
  { Text: "Track Package" },
];
const data = [1, 2, 3, 4];

// const deliveryInfoList = data.map((i) => {
//   return (
//     <Fragment key={i}>
//       <TrackPackageInfo />
//     </Fragment>
//   );
// });

export interface ITrackPackagePage {
  trackingResult: ITracking;
}

const TrackPackagePage: React.FunctionComponent<ITrackPackagePage> = ({
  trackingResult,
}: ITrackPackagePage) => {
  const [packageNumber, setPackageNumber] = useState<string>("");
  const [finalStatus, setFinalStatus] = useState<string>("");
  const [isStatusGood, setIsStatusGood] = useState<boolean>(false);
  const [trackingInformation, setTrackingInformation] = useState<
    Array<ITrackingResult>
  >([]);

  useEffect(() => {
    let mounted = true;
    if (trackingResult) {
      const status = trackingResult.tracking_status in ["Delivered"];
      setPackageNumber(trackingResult?.tracking_no ?? "");
      setFinalStatus(trackingResult.tracking_status);
      setIsStatusGood(status);
      setTrackingInformation(trackingResult.results);
    }
    return () => {
      mounted = false;
    };
  }, [trackingResult]);

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <React.Fragment>
        <div className={styles.trackPackage}>
          <div className={styles.trackPackageWrapper}>
            <div className={"row"}>
              <div className={"col-md-6"}>
                <div className={"w-80"}>
                  <TrackPackageComponent
                    classNameForError={"col-md-10 offset-md-1"}
                  />
                </div>
              </div>
            </div>

            <section className={styles.mainContent}>
              <div className={styles.left}>
                {packageNumber.trim().length > 0 ? (
                  <Fragment>
                    <div className={styles.heading}>
                      <h1>
                        <span>Package Number:</span> {packageNumber}
                      </h1>
                    </div>
                    <div className={styles.deliveryInfo}>
                      {trackingInformation.map(
                        (trackingInfo: ITrackingResult, index: number) => (
                          <Fragment key={index}>
                            <TrackPackageInfo
                              text={`${trackingInfo.status} ${trackingInfo.location_name}`}
                              ts={formatDate(trackingInfo.date)}
                            />
                          </Fragment>
                        )
                      )}
                    </div>
                  </Fragment>
                ) : (
                  <Fragment />
                )}
              </div>
              <div className={styles.right}>
                <div className={styles.imgWrapper}>
                  <img
                    alt="image showing the kexpress logistics processes"
                    src={TrackImg}
                  />
                </div>
                <div className={styles.bottom}>
                  <div className={"row w-100"}>
                    <div className={"col-md-8"}>
                      <div className={"row"}>
                        <div className={"col"}>
                          <p className={styles.trackingLabel}>
                            Tracking
                            <br />
                            Number
                          </p>
                        </div>
                      </div>
                      <div className={"row"}>
                        <div className={"col fw-bolder"}>{packageNumber}</div>
                      </div>
                    </div>
                    <div className={"col-md-4 text-end"}>
                      <span
                        className={`btn btn-sm ${
                          isStatusGood ? "btn-success" : "btn-danger"
                        } disabled`}
                      >
                        {finalStatus}
                      </span>
                      {/* <div className={styles.label}>
                            <p>{finalStatus}</p>
                          </div> */}
                    </div>
                  </div>
                </div>
                {/* <div className={styles.trackingNumber}>
                        <p className={styles.trackingLabel}>
                          Tracking
                          <br />
                          Number
                        </p>
                        <p className={styles.number}>{packageNumber}</p>
                      </div>
                      <div className={"btn btn-success btn-sm"}>
                        <p>{finalStatus}</p>
                      </div> */}
              </div>
            </section>
            <section className={styles.seoText}>
              <SeoText
                text={
                  "Konga.com is Nigeria’s number one online Shopping destination" +
                  ".We pride ourselves in having everything you could possibly need " +
                  "for life and living at the best prices than anywhere else." +
                  "Our access to Original Equipment Manufacturers and premium sellers " +
                  "gives us a wide range of products at very low prices. Some of our popular " +
                  "categories include electronics, mobile phones, computers, fashion, beauty " +
                  "products, home and kitchen, Building and construction materials and " +
                  "a whole lot more from premium brands. Some of our other categories " +
                  "include Food and drinks, automotive and industrial, books, musical " +
                  "equipment, babies and kids items, sports and fitness, to mention a few. " +
                  "To make your shopping experience swift and memorable, there are also " +
                  "added services like gift vouchers, consumer promotion activities " +
                  "across different categories and bulk purchases with hassle-free delivery. " +
                  "Enjoy free shipping rates for certain products and with the bulk purchase " +
                  "option, you can enjoy low shipping rates, discounted prices and flexible " +
                  "payment. When you shop on our platform, you can pay with your debit card " +
                  "or via KongaPay, which is a convenient and secured payment solution. " +
                  "Get the best of lifestyle services online. Don't miss out on the biggest " +
                  "sales online which takes place on special dates yearly"
                }
                title={
                  "Online Shopping on Konga.com – Nigeria’s Largest Online Mall"
                }
              />
            </section>
          </div>
        </div>
      </React.Fragment>
    </BasePageLayout>
  );
};

const mapStateToProps = (state: any) => ({
  trackingResult: state.logistics.TrackingResult,
});

export default connect(mapStateToProps, null)(TrackPackagePage);
