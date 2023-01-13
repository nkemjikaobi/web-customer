/* eslint-disable @typescript-eslint/ban-types */
import React, { useState, useEffect } from "react";

import Icon from "Components/Icons/icon";
import { composeClasses, isObjectEmpty, noOp } from "libs/utils/utils";
import { showFlashBannerAction } from "Http/Redux/Actions/FlashBannerActions/FlashBannerActions";
import { Link } from "react-router-dom";
import styles from "./flashBanner.module.scss";
import { connect } from "react-redux";
import URLConfigurator from "Components/URLConfigurator";

interface XProps {
  customClass: string;
  isMobile: boolean;
  content?: any;
  showFlashBannerAction?: Function;
}
const FlashBanner: React.FunctionComponent<XProps> = ({
  customClass,
  isMobile,
  content,
  showFlashBannerAction,
}) => {
  /**
   * Hides the flash banner
   * @returns{*} undefined
   */
  const hideFlashBanner = () => {
    setFlashHidden(true);
    showFlashBannerAction && showFlashBannerAction(true);
  };

  const renderAsset = (flashBannerImage: any, alternativeText: any) => {
    return (
      <img
        alt={alternativeText}
        className={styles.flashBannerImage}
        src={flashBannerImage}
      />
    );
  };
  const [isFlashHidden, setFlashHidden] = useState(false);

  if (isObjectEmpty(content)) return null;

  const flashBannerImage = content.image;
  const flashBannerLink = content.url;
  const iconBackground = content.close_icon_background;
  const iconVisible = content.show_close_icon_yesno;
  const alternativeText = content.alt;

  return (
    flashBannerImage && (
      <div
        className={composeClasses(
          styles.flashBanner,
          isFlashHidden ? styles.flashBannerHidden : " ",
          isMobile ? styles.flashBannerMobile : styles.flashBannerDesktop,
          customClass
        )}
      >
        {iconVisible === "yes" && (
          <div
            onClick={() => hideFlashBanner()}
            style={{
              backgroundColor: iconBackground,
              borderColor: iconBackground,
            }}
          >
            <Icon className={styles.flashBannerIcon} name="close" />
          </div>
        )}
        {flashBannerLink ? (
          <div>
            <URLConfigurator to={flashBannerLink}>
              {renderAsset(flashBannerImage, alternativeText)}
            </URLConfigurator>
          </div>
        ) : (
          <div>{renderAsset(flashBannerImage, alternativeText)}</div>
        )}
      </div>
    )
  );
};

FlashBanner.defaultProps = {
  content: undefined,
  showFlashBannerAction: undefined,
};

export default connect(null, {
  showFlashBannerAction,
})(FlashBanner);
