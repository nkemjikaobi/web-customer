import React, { useEffect, useState } from "react";
import { getSanitizedHtml, isNotEmptyArray } from "libs/utils/utils";
import styles from "./Terms.module.scss";
import Icon from "Components/Icons";

interface IProps {
  sectionData: any;
}

const KongaOnlineTermsAndConditions: React.FunctionComponent<IProps> = ({
  sectionData,
}) => {
  const [clicked, setClicked] = useState<any>(0);

  const toggle = (index: any) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };
  const contents =
    sectionData &&
    isNotEmptyArray(sectionData.kongaOnlineTermsAndConditions) &&
    sectionData.kongaOnlineTermsAndConditions[0].content[0].data;
  const pageData = JSON.parse(contents);

  const pageContents =
    pageData &&
    isNotEmptyArray(pageData) &&
    pageData.map((contentItem: any) => (
      <div className={styles.content} key={contentItem.id}>
        <div
          className={
            clicked === contentItem.id
              ? styles.titleWrapperWhite
              : styles.titleWrapper
          }
          onClick={() => toggle(contentItem.id)}
        >
          {contentItem.id === 0 ? (
            <div>
              <p
                className={
                  clicked === contentItem.id ? styles.redTitle : styles.title
                }
              >
                {contentItem.title}
              </p>
            </div>
          ) : (
            <p
              className={
                clicked === contentItem.id ? styles.redTitle : styles.title
              }
            >
              {contentItem.title}
            </p>
          )}
          <div className={styles.arrow}>
            {clicked === contentItem.id ? (
              <Icon name="arrow-down" />
            ) : (
              <Icon name="arrowRight" />
            )}
          </div>
        </div>

        {clicked === contentItem.id ? (
          <div className={styles.dropdown}>
            <p
              dangerouslySetInnerHTML={getSanitizedHtml(contentItem.content)}
            />
          </div>
        ) : null}
      </div>
    ));
  return <div>{pageContents}</div>;
};

export default KongaOnlineTermsAndConditions;
