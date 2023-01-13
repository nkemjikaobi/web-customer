import IProduct from "dto/KongaOnline/IProduct";
import { PRODUCTS_IMAGES_BASE_URL } from "Http/Routes/Marketplace";
import { composeClasses } from "libs/utils/utils";
import React, { Fragment, useState } from "react";
import { Carousel } from "react-bootstrap";
import ImageMagnifier from "../ImageManifier/ImageMagnifier";
import "./ImageCarouselMobile.scss";

export interface ICarouselImage {
  selectedProduct?: IProduct;
}

const ImageCarouselMobile: React.FunctionComponent<ICarouselImage> = (
  properties: ICarouselImage
) => {
  const [currentImage, setCurrentImage] = useState<string>();
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const handleCloseMagnifier = () => {
    setShowMagnifier(false);
  };

  const handleMagnifyImage = (image: string) => {
    const image_url = PRODUCTS_IMAGES_BASE_URL + "/" + image;
    setCurrentImage(image_url);
    setShowMagnifier(true);
  };
  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };
  return (
    <Fragment>
      {showMagnifier && (
        <ImageMagnifier
          image={currentImage}
          onCloseMagnifier={handleCloseMagnifier}
          selectedProduct={properties.selectedProduct}
        />
      )}

      <Carousel
        activeIndex={index}
        className="imagesCarousel"
        controls={false}
        indicators={true}
        interval={null}
        onSelect={handleSelect}
        slide={true}
      >
        {properties.selectedProduct?.images.map(
          (extraImage: string, index: number) => {
            return (
              <Carousel.Item key={index} style={{ marginTop: "5%" }}>
                <img
                  alt={`${index}`}
                  onClick={() => handleMagnifyImage(extraImage)}
                  src={`${PRODUCTS_IMAGES_BASE_URL}/${extraImage}`}
                />
              </Carousel.Item>
            );
          }
        )}
      </Carousel>
    </Fragment>
  );
};

ImageCarouselMobile.defaultProps = {
  selectedProduct: undefined,
};

export default ImageCarouselMobile;
