/* eslint-disable @typescript-eslint/ban-types */
import Asset from "Components/Asset/asset";
import Icons from "Components/Icons";
import cloudinaryConstants from "Helpers/cloudinaryConstants";
import { PRODUCTS_IMAGES_BASE_URL } from "Http/Routes/Marketplace";
import { composeClasses } from "libs/utils/utils";
import React, { Fragment, useState, useEffect } from "react";
import styles from "./MagnifiedProductImage.module.scss";

interface IMagnifiedProductImage {
  extraImages: Array<string> | null;
  baseImage: string;
  handleVisibility: Function;
  magnifyImage: boolean;
}

const MagnifiedProductImage: React.FunctionComponent<
  IMagnifiedProductImage
> = ({
  extraImages,
  baseImage,
  handleVisibility,
  magnifyImage,
}: IMagnifiedProductImage) => {
  const handleBackdropClick = (event: any, backdropRef: any, handler: any) => {
    if (event.target && event.target === backdropRef) {
      if (typeof handler === "function") handler();
    }
  };

  let backdropRef: HTMLDivElement | null;
  const [magnifyBaseImage, setMagnifyBaseImage] = useState<string>("");
  const [magnifyExtraImages, setMagnifyExtraImages] =
    useState<Array<string> | null>(null);
  const [magnifyBaseImageIndex, setManageBaseImageIndex] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    if (mounted && baseImage && extraImages) {
      setMagnifyBaseImage(baseImage);
      setMagnifyExtraImages(extraImages);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const handleMagnifyBaseImage = (currentImage: string, index: number) => {
    setMagnifyBaseImage(`${PRODUCTS_IMAGES_BASE_URL}${currentImage}`);
    setManageBaseImageIndex(index);
  };
  const handleNextImage = () => {
    if (magnifyExtraImages) {
      if (magnifyBaseImageIndex < magnifyExtraImages.length - 1) {
        const nextImage: any = magnifyExtraImages.find(
          (image) => image === magnifyExtraImages[magnifyBaseImageIndex + 1]
        );
        setMagnifyBaseImage(nextImage);
        setManageBaseImageIndex(magnifyBaseImageIndex + 1);
      } else {
        const previousImage: any = magnifyExtraImages.find(
          (image) => image === magnifyExtraImages[magnifyExtraImages.length - 1]
        );
        setMagnifyBaseImage(previousImage);
      }
    }
  };

  const handlePreviousImage = () => {
    if (magnifyExtraImages) {
      if (magnifyBaseImageIndex > 0) {
        const previousImage: any = magnifyExtraImages.find(
          (image) => image === magnifyExtraImages[magnifyBaseImageIndex - 1]
        );
        setMagnifyBaseImage(previousImage);
        setManageBaseImageIndex(magnifyBaseImageIndex - 1);
      } else {
        const previousImage: any = magnifyExtraImages.find(
          (image) => image === magnifyExtraImages[0]
        );
        setMagnifyBaseImage(previousImage);
      }
    }
  };
  return (
    <>
      <div
        className={magnifyImage ? styles.overlay : undefined}
        onClick={(event) =>
          handleBackdropClick(event, backdropRef, handleVisibility(false))
        }
        ref={(node) => (backdropRef = node)}
      />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p>Product Images</p>
          <div className={styles.icon} onClick={() => handleVisibility(false)}>
            <Icons name="close" />
          </div>
        </div>
        <hr />
        <div className={styles.sectionWrapper}>
          <div className={styles.icon} onClick={() => handlePreviousImage()}>
            <Icons name="leftMagnify" />
          </div>

          <div className={styles.imgCarousel}>
            <div className={styles.mainImg}>
              <Asset
                alt={"Product Image."}
                name={magnifyBaseImage}
                type={cloudinaryConstants.asset.cloudinaryType}
              />
            </div>
            <div className={styles.extraImages}>
              {magnifyExtraImages && magnifyExtraImages.length > 0 ? (
                <div
                  className={composeClasses(
                    styles.subImgList,
                    styles.customScroll
                  )}
                >
                  {magnifyExtraImages.map(
                    (extraImage: string, index: number) => (
                      <div
                        className={composeClasses(
                          styles.subImg,
                          `${
                            index === magnifyBaseImageIndex &&
                            styles.activeBaseImage
                          }`
                        )}
                        key={index}
                        onClick={() =>
                          handleMagnifyBaseImage(extraImage, index)
                        }
                      >
                        <img
                          alt={`${index}`}
                          src={`${PRODUCTS_IMAGES_BASE_URL}/${extraImage}`}
                        />
                      </div>
                    )
                  )}
                </div>
              ) : (
                <Fragment />
              )}
            </div>
          </div>
          <div className={styles.icon} onClick={() => handleNextImage()}>
            <Icons name="rightMagnify" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MagnifiedProductImage;
