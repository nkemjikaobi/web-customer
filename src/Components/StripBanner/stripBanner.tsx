import React from "react";
import styles from "./stripBanner.module.scss";
import { composeClasses, isNotEmptyArray } from "libs/utils/utils";
import URLConfigurator from "Components/URLConfigurator";

export interface IProps {
  content: any;
  isMobile: boolean;
}

const StripBanner: React.FunctionComponent<IProps> = ({
  isMobile,
  content,
}) => {
  if (!isNotEmptyArray(content)) return null;

  const bgImage = content[0] && content[0].data;
  const alternativeText = content[1] && content[1].data;
  const buttonLink = content[2] && content[2].data;

  return (
    <div
      className={composeClasses(
        styles.stripBanner,
        isMobile ? styles.stripBannerMobile : styles.stripBannerDesktop
      )}
    >
      <URLConfigurator to={buttonLink}>
        <img
          alt={alternativeText}
          className={styles.stripBannerImage}
          src={bgImage}
        />
      </URLConfigurator>
    </div>
  );
};
export default StripBanner;
