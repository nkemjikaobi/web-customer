import React, { useState } from "react";
import styles from "./adSlideShow.module.scss";
interface IProps {
  items: any;
  useImages: boolean;
  active: number;
}
const Images: React.FunctionComponent<IProps> = ({
  items,
  useImages,
  active,
}) => {
  const divStyle = {
    left: active * -100 + "%",
    // width: 100 + "%",
    width: 8 * 100 + "%",
  };
  const width = {
    width: 100 / items.length + "%",
  };
  return (
    <div className={styles.sliderWrapper}>
      <ul className={styles.slides} style={divStyle}>
        {items.map((m: any, index: any) => {
          if (useImages === true) {
            return (
              <li>
                <img src={m} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

interface SProps {
  active: number;
  useImages: boolean;
  slides: any;
}
const Slider: React.FunctionComponent<SProps> = ({
  useImages,
  slides,
  active,
}) => {
  return (
    <div className="imgSlider">
      <Images active={active} items={slides} useImages={useImages} />
    </div>
  );
};

export default Slider;
