/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./imgCarousel.module.scss";
import IProduct from "dto/KongaOnline/IProduct";
import { PRODUCTS_IMAGES_BASE_URL } from "Http/Routes/Marketplace";
import Asset from "Components/Asset/asset";
import cloudinaryConstants from "Helpers/cloudinaryConstants";
import { composeClasses } from "libs/utils/utils";
import MagnifiedProductImage from "Components/MagnifiedProductImage/MagnifiedProductImage";
import Icons from "Components/Icons";

export interface ICarouselImage {
  selectedProduct?: IProduct;
}

const ImgCarousel: React.FunctionComponent<ICarouselImage> = ({
  selectedProduct,
}: ICarouselImage) => {
  const [baseImage, setBaseImage] = useState<string>("");
  const [extraImages, setExtraImages] = useState<Array<string> | null>(null);
  const [baseImageIndex, setBaseImageIndex] = useState<number>(0);
  const [magnifyImage, setMagnifyImage] = useState<boolean>(false);
  const [isScrollable, setIsScrollable] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    if (selectedProduct && mounted) {
      const finalProductImage =
        selectedProduct.image ||
        selectedProduct.image_thumbnail ||
        selectedProduct.image_thumbnail_path;
      setBaseImage(`${PRODUCTS_IMAGES_BASE_URL}${finalProductImage}`);
      setExtraImages(selectedProduct.images);
    }
    return () => {
      mounted = false;
    };
  }, [selectedProduct]);

  const handleBaseImage = (currentImage: string, index: number) => {
    setBaseImage(`${PRODUCTS_IMAGES_BASE_URL}${currentImage}`);
    setBaseImageIndex(index);
  };

  const handleVisibility = (visibility: boolean) => {
    setMagnifyImage(visibility);
  };

  const handleNextImage = () => {
    if (extraImages) {
      if (baseImageIndex <= extraImages.length - 1) {
        const nextImage: any = extraImages.find(
          (image) => image === extraImages[baseImageIndex + 1]
        );
        setBaseImage(nextImage);
        setBaseImageIndex(baseImageIndex + 1);
      } else {
        const previousImage: any = extraImages.find(
          (image) => image === extraImages[extraImages.length - 1]
        );
        setBaseImage(previousImage);
      }
    }
  };

  const handlePreviousImage = () => {
    if (extraImages) {
      if (baseImageIndex > 0) {
        const previousImage: any = extraImages.find(
          (image) => image === extraImages[baseImageIndex - 1]
        );
        setBaseImage(previousImage);
        setBaseImageIndex(baseImageIndex - 1);
      } else {
        const previousImage: any = extraImages.find(
          (image) => image === extraImages[0]
        );
        setBaseImage(previousImage);
      }
    }
  };

  const handleScrollable = (visibility: boolean) => {
    if (visibility === true && extraImages && extraImages.length) {
      return setIsScrollable(visibility);
    }
    if (visibility === false) {
      return setIsScrollable(visibility);
    }
  };

  return (
    <>
      <div
        className={styles.wrapper}
        onMouseEnter={() => handleScrollable(true)}
        onMouseLeave={() => handleScrollable(false)}
      >
        {isScrollable ? (
          <div className={styles.icon} onClick={() => handlePreviousImage()}>
            <Icons name="leftMagnify" />
          </div>
        ) : (
          <div className={styles.icon} />
        )}

        <div className={styles.imgCarousel}>
          <div
            className={styles.mainImg}
            onClick={() => handleVisibility(true)}
          >
            <Asset
              alt={"Product Image."}
              name={baseImage}
              type={cloudinaryConstants.asset.cloudinaryType}
            />
          </div>
          <div className={styles.extraImages}>
            {extraImages && extraImages.length > 0 ? (
              <div
                className={composeClasses(
                  styles.subImgList,
                  styles.customScroll
                )}
              >
                {extraImages.map((extraImage: string, index: number) => (
                  <div
                    className={composeClasses(
                      styles.subImg,
                      `${index === baseImageIndex && styles.activeBaseImage}`
                    )}
                    key={index}
                    onClick={() => handleBaseImage(extraImage, index)}
                  >
                    <img
                      alt={`${index}`}
                      src={`${PRODUCTS_IMAGES_BASE_URL}/${extraImage}`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Fragment />
            )}
          </div>
        </div>
        {isScrollable ? (
          <div className={styles.icon} onClick={() => handleNextImage()}>
            <Icons name="rightMagnify" />
          </div>
        ) : (
          <div className={styles.icon} />
        )}
      </div>
      {magnifyImage && (
        <MagnifiedProductImage
          baseImage={baseImage}
          extraImages={extraImages}
          handleVisibility={handleVisibility}
          magnifyImage={magnifyImage}
        />
      )}
    </>
  );
};

ImgCarousel.defaultProps = {
  selectedProduct: undefined,
};

export default ImgCarousel;
