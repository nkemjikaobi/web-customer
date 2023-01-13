/* eslint-disable @typescript-eslint/ban-types */
import Icon from "Components/Icons";
import IProduct from "dto/KongaOnline/IProduct";
import { PRODUCTS_IMAGES_BASE_URL } from "Http/Routes/Marketplace";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./ImageMagnifier.module.scss";

interface IProps {
  onCloseMagnifier: Function;
  image: string | undefined;
  selectedProduct?: IProduct;
}

const ImageMagnifier: React.FunctionComponent<IProps> = (
  properties: IProps
) => {
  const [displayingImage, setDisplayingImage] = useState<string>();
  const [images, setImages] = useState<Array<string> | null>(null);

  useEffect(() => {
    let mounted = true;
    if (mounted && properties.selectedProduct && properties.image) {
      setImages(properties.selectedProduct.images);
      setDisplayingImage(properties.image);
    }
    return () => {
      mounted = false;
    };
  }, [properties.selectedProduct]);

  const adjustImageURL = (image: string) => {
    return PRODUCTS_IMAGES_BASE_URL + "/" + image;
  };

  return (
    <Fragment>
      <div className={styles.imageMagnifier}>
        <div
          className={styles.closeMagnifier}
          onClick={() => properties.onCloseMagnifier()}
        >
          <Icon name="closeDark" />
        </div>
        <div className={styles.image}>
          <img alt="Product image" src={displayingImage} />
        </div>
        <div className={styles.extraImages}>
          {images && images.length > 0 ? (
            <div className={styles.images}>
              {images.map((image: string, index: number) => {
                return (
                  <div
                    className={styles.extra}
                    key={index}
                    onClick={() => setDisplayingImage(adjustImageURL(image))}
                  >
                    <img alt="Product image" src={adjustImageURL(image)} />
                  </div>
                );
              })}
            </div>
          ) : (
            <Fragment />
          )}
        </div>
      </div>
    </Fragment>
  );
};

ImageMagnifier.defaultProps = {
  selectedProduct: undefined,
};

export default ImageMagnifier;
