import ImageSlider from "Components/ImageSlider/imageSlider";
import React from "react";
import styles from "./popupAds.module.scss";

interface IProps {
  trigger: boolean;
  setTrigger: any;
  imageData: Array<any>;
}
const Popup: React.FunctionComponent<IProps> = (props: IProps) => {
  if (props.trigger) {
    return (
      <div className={styles.popup} onClick={() => props.setTrigger()}>
        <div className={styles.popupInner}>
          <div className={styles.closeButton}>
            <span onClick={() => props.setTrigger()}>X</span>
          </div>

          <ImageSlider imageData={props.imageData} />
        </div>
      </div>
    );
  }
  return null;
};

export default Popup;
