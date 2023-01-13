/* eslint-disable react/no-unknown-property */
import React, { Component, Fragment } from "react";
import config from "Configurations/configurations";
import cloudinaryConstants from "Helpers/cloudinaryConstants";
import images from "./images";
import {
  composeClasses,
  isServer,
  omit,
  cloudinaryImage,
} from "libs/utils/utils";

import styles from "./asset.module.scss";

interface IProps {
  alt: string;
  className: string;
  name: any;
  responsive: boolean;
  width: any;
  type: any;
  isLowEndBrowser: boolean;
  isLogo: boolean;
  isProduct: boolean;
  isPromo: boolean;
  isBanner: boolean;
}

interface IState {
  isErrored: boolean;
  isLoading: any;
}

/**
 * Handles getting app assets, mainly images
 */
class Asset extends Component<IProps, IState> {
  imgRef: any;
  static defaultProps: {
    alt: string;
    className: string;
    name: string;
    responsive: boolean;
    width: null;
    isLowEndBrowser: boolean;
    isLogo: boolean;
    isProduct: boolean;
    isPromo: boolean;
    isBanner: boolean;
  };
  /**
   * ObjectRef
   * @param {Object} props Props
   */
  constructor(props: any) {
    super(props);
    this.state = {
      isErrored: false,
      isLoading: true,
    };
    this.imgRef = React.createRef();
  }

  /**
   * Handles the error event for an image
   * @return {null} {null}
   */
  handleImageLoadingError() {
    this.setState({
      isErrored: true,
    });
  }

  /**
   * Handles toggling the loading state when the image is done loading
   * @returns {null} null
   */
  handleOnload() {
    this.setState({
      isLoading: false,
    });
  }

  /**
   * Render the error image fallback
   * @param {String} src Image source
   * @returns {Component} Error component
   */
  renderErrorImage(src: any) {
    return (
      <img
        className={composeClasses(
          this.props.className,
          styles.assetErrorContainer
        )}
        src={src}
      />
    );
  }

  /**
   * Attach the error event listener to the image after the component is mounted
   * @returns {null} Null
   */
  componentDidMount() {
    if (this.imgRef.current)
      this.imgRef.current.onerror = (e: any) => this.handleImageLoadingError();
  }

  /**
   * Cleanup error event listener
   * @returns {null} Null
   */
  componentWillUnmount() {
    if (this.imgRef.current) this.imgRef.current.onerror = null;
  }

  /**
   * Wraps lazy loaded images to add fallback for non-JS environments
   * @param {Object} props Props
   * @returns {React.Component} Image component
   */
  render() {
    // Remove unwanted props from rendering in component
    const filteredProps = omit(this.props, [
      "type",
      "name",
      "className",
      "responsive",
      "width",
      "isLowEndBrowser",
      "isProduct",
      "isPromo",
      "isLogo",
      "isBanner",
    ]);

    const {
      alt,
      className,
      name,
      type,
      responsive,
      width,
      isLowEndBrowser,
      isLogo,
      isProduct,
      isPromo,
      isBanner,
    } = this.props;

    // Map image types to the transform to get the images
    const ImageTypeMaps = {
      [cloudinaryConstants.asset.cloudinaryType]: (srcSet: any) =>
        cloudinaryImage(name, srcSet, config.images.cloudinaryBaseImageUrl),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      [cloudinaryConstants.asset.imageType]: () => images[name] || name,
    };

    const isCloudinary: any =
      type === cloudinaryConstants.asset.cloudinaryType ||
      (name && name.indexOf("res.cloudinary.com") > -1);
    let imageUrl: any = isCloudinary
      ? ImageTypeMaps[cloudinaryConstants.asset.cloudinaryType]
      : ImageTypeMaps[type];

    if (!imageUrl || typeof imageUrl !== "function") {
      // eslint-disable-next-line no-console
      imageUrl = config.images.fallbackImage;
    }

    const imageClasses = composeClasses(styles.asset, "lazyload", className);

    const imageProps = {
      alt: alt || name,
      className: imageClasses,
      ...filteredProps,
    };

    if (this.state.isErrored) {
      return this.renderErrorImage(imageUrl());
    } else if (!isServer()) {
      imageProps.className = composeClasses(
        imageProps.className,
        this.state.isLoading && styles.assetLoading
      );

      const dataSrc = width ? imageUrl(width) : imageUrl();

      const image = (
        <img
          data-expand={100}
          data-src={dataSrc}
          key={dataSrc}
          // https://github.com/facebook/react-native/issues/9195 ¯\_(ツ)_/¯
          onError={() => this.handleImageLoadingError()}
          onLoad={() => this.handleOnload()}
          ref={this.imgRef}
          src={dataSrc}
          {...imageProps}
        />
      );

      const { imgSrcSetMap, imgCategorySize } = cloudinaryConstants;

      let imageCategory;
      switch (true) {
        case isLogo:
          imageCategory = "isLogo";
          break;
        case isPromo:
          imageCategory = "isPromo";
          break;
        case isProduct:
          imageCategory = "isProduct";
          break;
        case isBanner:
          imageCategory = "isBanner";
          break;
        default:
          break;
      }

      return isCloudinary && !width && responsive ? (
        <picture>
          {imageCategory && (
            <source
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              data-srcset={imageUrl(imgCategorySize[imageCategory])}
              media="(max-width: 576px)"
            />
          )}
          <source
            data-srcset={imageUrl(imgSrcSetMap.md)}
            media="(max-width: 600px)"
          />
          <source
            data-srcset={imageUrl(imgSrcSetMap.lg)}
            media="(max-width: 799px)"
          />
          {image}
        </picture>
      ) : (
        image
      );
    }

    return isLowEndBrowser ? (
      <img src={imageUrl()} {...imageProps} />
    ) : (
      <Fragment>
        <noscript>
          <img
            className={imageProps.className.replace("lazyload", "")}
            src={imageUrl()} // Remove the lazyload class from the no-js fallback as it is not needed
            {...omit(imageProps, ["className"])}
          />
        </noscript>
        <div className={composeClasses(styles.placeHolder, "jsonly")} />
      </Fragment>
    );
  }
}

export default Asset;
