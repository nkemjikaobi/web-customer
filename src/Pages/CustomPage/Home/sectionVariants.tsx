import React, { Fragment } from "react";
import styles from "./Home.module.scss";
import IProduct from "dto/KongaOnline/IProduct";
import CategoryListingCard from "Components/ProductCard/CategoryListingCard";
import { getSanitizedHtml } from "libs/utils/utils";
import HealthService from "Http/Services/CustomPageService";

export const composeClasses = (...styles: (string | boolean)[]) => {
  let classes = "";

  styles.forEach((arg) => {
    if (arg) classes += `${arg} `;
  });

  return classes.trim();
};

const backgroundProperties = (bgImageUrl: any) =>
  `center / cover no-repeat url(${bgImageUrl})`;

const applyBackgroundStyle = (sectionData: any, index = 1) =>
  sectionData.bgImageUrl
    ? backgroundProperties(sectionData.bgImageUrl)
    : sectionData[`bgColor${index}`];

export const VariantOne = ({ sectionData }: any): any => {
  const sectionDataProducts =
    sectionData && sectionData.length > 0
      ? sectionData.products.filters((p: any) => !!p)
      : null;
  return (
    <Fragment>
      <section
        className={
          (styles.sectionWrapper,
          styles.flexSection,
          sectionData.theme === 1 ? styles.lightText : styles.darkText)
        }
        style={{
          background: applyBackgroundStyle(sectionData),
        }}
      >
        <div className={styles.leftColumn}>
          <div className={styles.leftColumnContent}>
            {sectionData.subtitle1 && (
              <header>
                <h1 className={styles.heading}>{sectionData.subtitle1}</h1>
              </header>
            )}
            {sectionData.subtitle2 && (
              <div className={styles.subheading}>{sectionData.subtitle2}</div>
            )}

            <div
              className={composeClasses(
                styles.ctaLinkWrapper,
                sectionData.theme === 2 && styles.ctaLinkWrapperLight
              )}
            >
              {new Array(5).fill(1).map((_, index) => (
                <a
                  className={styles.ctaLink}
                  href={sectionData[`linkUrl${index + 1}`]}
                  key={index}
                >
                  {sectionData[`link${index + 1}`]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export const VariantEight = ({ sectionData }: any): any => {
  const tempProductList = sectionData.products.map(
    (product: IProduct, index: number) => {
      return (
        <Fragment key={index}>
          <div className={styles.productCardWrapper}>
            <CategoryListingCard
              key={product.sku}
              product={product}
              store_id={HealthService.STORE_ID}
            />
          </div>
        </Fragment>
      );
    }
  );

  return (
    <Fragment>
      <div className={styles.healthCarousel}>{tempProductList}</div>
    </Fragment>
  );
};

export const VariantEighteen = ({ sectionData }: any): any => {
  return (
    <section dangerouslySetInnerHTML={getSanitizedHtml(sectionData.html_box)} />
  );
};
