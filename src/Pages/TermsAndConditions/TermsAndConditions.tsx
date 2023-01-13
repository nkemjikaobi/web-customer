import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import ContentManagementService from "Http/Services/ContentManagementService";
import { composeClasses, normalizePageContent } from "libs/utils/utils";
import pageData from "./data";
import styles from "./TermsAndConditions.module.scss";
import Asset from "Components/Asset/asset";
import constants from "Helpers/cloudinaryConstants";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import KongaOnlineTermsAndConditions from "./Terms/KongaOnline";
import { channelsData } from "./data";
import Kxpress from "./Terms/Kxpress";
import KongaPay from "./Terms/KongaPay";
import KongaTravels from "./Terms/KongaTravels";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Terms and Conditions", Url: "/terms-and-conditions" },
];

const TermsAndConditions: React.FunctionComponent = () => {
  const [sectionData, setsectionData] = useState<any>([]);
  const [activeTabType, setActiveTabType] = useState<string>();

  let pageContent: any = [];
  useEffect(() => {
    setActiveTabType("OnlineShopping");
    (async function () {
      pageContent = await ContentManagementService.GetPageContent(
        "2-superapp-terms-and-conditions"
      )
        .then(normalizePageContent)
        .catch((err) => {
          console.log("Error fetching - ", err);
          return {};
        });
      setsectionData(pageContent);
    })();
  }, []);

  const { image, bannerText, title } = pageData;

  const channels = channelsData.map((channel, i) => {
    return (
      <span
        className={
          activeTabType === channel.text
            ? composeClasses(styles.channelStyles, styles.active)
            : styles.channelStyles
        }
        key={i}
        onClick={(e) => handleChangeTab(e, channel.text)}
      >
        {channel.text}
      </span>
    );
  });

  const handleChangeTab = (event: any, tabString: string) => {
    setActiveTabType(tabString);
  };

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
            <div className={styles.mainContentWrapper}>
              <div className={styles.contentWrapper}>
                <div className={styles.filterButtons}>{channels}</div>
                {activeTabType === "OnlineShopping" ? (
                  <KongaOnlineTermsAndConditions sectionData={sectionData} />
                ) : (
                  ""
                )}
                {activeTabType === "KongaLogistics" ? (
                  <Kxpress sectionData={sectionData} />
                ) : (
                  ""
                )}
                {activeTabType === "KongaPay" ? (
                  <KongaPay sectionData={sectionData} />
                ) : (
                  ""
                )}
                {activeTabType === "KongaTravels" ? (
                  <KongaTravels sectionData={sectionData} />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default TermsAndConditions;
