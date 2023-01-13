/* eslint-disable @typescript-eslint/ban-types */
import { composeClasses } from "libs/utils/utils";
import React from "react";
import styles from "./WebGiftBox.module.scss";
import GiftBox from "Assets/images/giftbox.gif";

interface IProps {
  onPopTrigger: Function;
}

const WebGiftBox: React.FunctionComponent<IProps> = (properties: IProps) => {
  return (
    <div
      className={composeClasses(styles.promoWrapper, styles.tabletAndAboveOnly)}
    >
      <div
        className={styles.promoWrapper_icon}
        onClick={() => properties.onPopTrigger()}
      >
        <img src={GiftBox} />
      </div>
      <p>Promo</p>
    </div>
  );
};

export default WebGiftBox;
