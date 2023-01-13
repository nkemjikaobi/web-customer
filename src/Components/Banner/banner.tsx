import React from "react";

import { composeClasses } from "libs/utils/utils";
import styles from "./banner.module.scss";
import URLConfigurator from "Components/URLConfigurator";

/**
 * Banner component
 * @param {Object}
 * @param {String} alternativeText alternative text
 * @param {String} href Image link
 * @param {String} name Link to the image
 * @returns {React.Component} Banner Component
 */

interface IProps {
  // eslint-disable-next-line react/require-default-props
  alternativeText?: string;
  href: string;
  image: string;
  isStaticBanner: string;
}

const Banner: React.FunctionComponent<IProps> = ({
  alternativeText,
  href,
  image,
  isStaticBanner,
}: IProps) =>
  href ? (
    <URLConfigurator
      className={composeClasses(
        styles.banner,
        isStaticBanner && styles.staticBanners
      )}
      to={href}
    >
      <img alt={alternativeText} src={image} />
    </URLConfigurator>
  ) : (
    <span
      className={composeClasses(
        styles.banner,
        isStaticBanner && styles.staticBanners
      )}
    >
      <img alt={alternativeText} src={image} />
    </span>
  );

export default Banner;
