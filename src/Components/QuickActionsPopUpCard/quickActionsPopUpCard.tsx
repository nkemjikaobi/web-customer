/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import Icon from "Components/Icons/icon";
import {
  OpenModalAction,
  CloseModalAction,
  SetComponentAction,
} from "Http/Redux/Actions/ModalActions/ModalActions";
import { connect } from "react-redux";
import styles from "./quickActionsPopUpCard.module.scss";

const data = [
  {
    icon: "tablet",
    text: "Buy Airime",
    component: "buyAirtime",
  },
  {
    icon: "lte",
    text: "Buy Data",
    component: "buyData",
  },
  {
    icon: "bulb",
    text: "Electricity",
    component: "buyElectricity",
  },
  {
    icon: "electronics",
    text: "Cable Tv",
    component: "cableSubscription",
  },
  {
    icon: "router",
    text: "Internet",
    component: "internetService",
  },
  // {
  //   icon: "creditCard2",
  //   text: "E-Pin",
  // },
];
interface IProps {
  component?: string;
  OpenModalAction?: Function | undefined;
  CloseModalAction?: Function | undefined;
  SetComponentAction?: Function | undefined;
  hidePopUp: Function;
}

const quickActionsPopUpCard: React.FunctionComponent<IProps> = ({
  component,
  OpenModalAction,
  CloseModalAction,
  SetComponentAction,
  hidePopUp,
}) => {
  const handleModalAction = (component: any) => {
    OpenModalAction && OpenModalAction(true);
    CloseModalAction && CloseModalAction(false);
    SetComponentAction && SetComponentAction(component);
  };

  const listItems = data.map((e, i) => {
    return (
      <div
        className={styles.listItem}
        key={i}
        onClick={() => {
          e.component && handleModalAction(e.component);
        }}
      >
        <div className={styles.icon}>
          <Icon name={e.icon} />
        </div>
        <p> {e.text}</p>
      </div>
    );
  });
  return (
    <Fragment>
      <div className={styles.quickActionsPopUp}>
        <div className={styles.heading}>
          <h1>Quick Actions</h1>
          <div className={styles.closeButtonWrapper}>
            <p onClick={() => hidePopUp()}>x</p>
          </div>
        </div>
        <div className={styles.listItems}>{listItems}</div>
      </div>
    </Fragment>
  );
};

export default connect(null, {
  OpenModalAction,
  CloseModalAction,
  SetComponentAction,
})(quickActionsPopUpCard);
