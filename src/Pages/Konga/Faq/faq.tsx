import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import ContentManagementService from "Http/Services/ContentManagementService";
import {
  getSanitizedHtml,
  isNotEmptyArray,
  normalizePageContent,
} from "libs/utils/utils";
import pageData from "./data";
import styles from "./faq.module.scss";
import Asset from "Components/Asset/asset";
import constants from "Helpers/cloudinaryConstants";
import Icon from "Components/Icons";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";

const KongaFaq: React.FunctionComponent = () => {
  const [sectionData, setsectionData] = useState<any>([]);
  const [clicked, setClicked] = useState<any>(0);

  const toggle = (index: any) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const { image, bannerText, title } = pageData;
  let pageContent: any = [];

  useEffect(() => {
    (async function () {
      pageContent = await ContentManagementService.GetPageContent("2-faqs")
        .then(normalizePageContent)
        .catch((err) => {
          console.log("[FAQ.getInitialProps] Error fetching FAQs - ", err);
          return {};
        });
      setsectionData(pageContent.faqs);
    })();
  }, []);

  if (isNotEmptyArray(sectionData)) {
    try {
      const pageContentString =
        sectionData[0].content && sectionData[0].content[0].data;
      pageContent = JSON.parse(pageContentString);
    } catch (error) {
      console.log("[FAQ.getInitialProps] Error parsing page data - ", error);
    }
  }

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/" },
    { Text: "FAQ" },
    { Text: "Konga", Url: "/faq-konga" },
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
            <div className={styles.mainContentWrapper}>
              <div className={styles.contentWrapper}>
                {isNotEmptyArray(pageContent) &&
                  pageContent.map((contentItem: any, index: number) => (
                    <div className={styles.content} key={contentItem.id}>
                      <div
                        className={
                          clicked === index
                            ? styles.titleWrapperWhite
                            : styles.titleWrapper
                        }
                        onClick={() => toggle(index)}
                      >
                        {index === 0 ? (
                          <div>
                            <p
                              className={
                                clicked === index
                                  ? styles.redTitle
                                  : styles.title
                              }
                            >
                              {contentItem.title}
                            </p>
                          </div>
                        ) : (
                          <p
                            className={
                              clicked === index ? styles.redTitle : styles.title
                            }
                          >
                            {contentItem.title}
                          </p>
                        )}
                        <div className={styles.arrow}>
                          {clicked === index ? (
                            <Icon name="arrow-down" />
                          ) : (
                            <Icon name="arrowRight" />
                          )}
                        </div>
                      </div>

                      {clicked === index ? (
                        <div className={styles.dropdown}>
                          <p
                            dangerouslySetInnerHTML={getSanitizedHtml(
                              contentItem.content
                            )}
                          />
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default KongaFaq;
