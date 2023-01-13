import React from "react";
import styles from "./imageSlider.module.scss";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

interface IProp {
  imageData: Array<any>;
}

const ImageSlider: React.FunctionComponent<IProp> = (props: IProp) => {
  return (
    <Carousel controls={false} fade={true}>
      {props.imageData.map((slide, index) => {
        return (
          <Carousel.Item interval={1000} key={index}>
            <Link to={`${slide.link}`}>
              <img alt="Popup ad" className={styles.image} src={slide.image} />
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default ImageSlider;
