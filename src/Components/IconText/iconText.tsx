/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/ban-types */
import React from "react";
import Icon from "Components/Icons/icon";
import {
  OpenModalAction,
  CloseModalAction,
  SetComponentAction,
} from "Http/Redux/Actions/ModalActions/ModalActions";
import { connect } from "react-redux";

import styles from "./iconText.module.scss";
import { useHistory } from "react-router-dom";
interface IProps {
  title: string;
  icon: string;
  component: string;
  isMore?: boolean;
  destination?: any;
  OpenModalAction?: Function | undefined;
  CloseModalAction?: Function | undefined;
  SetComponentAction?: Function | undefined;
}

const IconText: React.FunctionComponent<IProps> = ({
  icon,
  title,
  component,
  isMore,
  destination,
  OpenModalAction,
  CloseModalAction,
  SetComponentAction,
}) => {
  const handleModalAction = () => {
    OpenModalAction && OpenModalAction(true);
    CloseModalAction && CloseModalAction(false);
    SetComponentAction && SetComponentAction(component);
  };
  // const { icon, title } = props;

  const history = useHistory();
  return (
    <div
      className={styles.iconText}
      onClick={() => {
        isMore ? history.push(destination) : component && handleModalAction();
      }}
    >
      <div>
        <Icon name={icon} />
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
};

export default connect(null, {
  CloseModalAction,
  OpenModalAction,
  SetComponentAction,
})(IconText);
