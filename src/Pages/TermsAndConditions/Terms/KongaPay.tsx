import React, { useState } from "react";
import { getSanitizedHtml, isNotEmptyArray } from "libs/utils/utils";
import styles from "./Terms.module.scss";
import Icon from "Components/Icons";

interface IProps {
  sectionData: any;
}

const KongaPay: React.FunctionComponent<IProps> = ({ sectionData }) => {
  //const [showContent, setShowContent] = useState<boolean>(false);
  const [clicked, setClicked] = useState<any>(0);

  const toggle = (index: any) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const contents =
    sectionData &&
    isNotEmptyArray(sectionData.kongaPayTermsAndConditions) &&
    sectionData.kongaPayTermsAndConditions[0].content[0].data;
  const pageData = JSON.parse(contents);

  const pageContents =
    pageData &&
    isNotEmptyArray(pageData) &&
    pageData.map((contentItem: any, index: number) => {
      return (
        <div className={styles.content} key={contentItem.id}>
          <div
            className={
              clicked === index ? styles.titleWrapperWhite : styles.titleWrapper
            }
            onClick={() => toggle(index)}
          >
            {index === 0 ? (
              <div>
                <p
                  className={clicked === index ? styles.redTitle : styles.title}
                >
                  {contentItem.title}
                </p>
              </div>
            ) : (
              <p className={clicked === index ? styles.redTitle : styles.title}>
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
                dangerouslySetInnerHTML={getSanitizedHtml(contentItem.content)}
              />
            </div>
          ) : null}
        </div>
      );
    });
  return <div>{pageContents}</div>;
};

export default KongaPay;
