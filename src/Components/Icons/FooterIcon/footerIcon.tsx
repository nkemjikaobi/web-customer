/* eslint-disable prettier/prettier */
import React from "react";
import Icon from "Components/Icons/index";
import styles from "./footerIcon.module.scss";

interface IProps {
  name: string;
  route: string;
}

const footerIcon: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <div className={styles.footerIconWrapper}>
      <div className={styles.img}>
        <a href={props.route} rel="noreferrer"target="_blank">
          <Icon name={props.name} />
        </a>
      </div>
    </div>
  );
};

export default footerIcon;
