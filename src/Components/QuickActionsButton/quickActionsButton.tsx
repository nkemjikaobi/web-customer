/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import Icon from "Components/Icons/icon";
import { useLocation } from "react-router-dom";
import QuickActionsPopUpCard from "Components/QuickActionsPopUpCard/quickActionsPopUpCard";
import useClickOutSide from "CustomHooks/useClickOutSide";

import styles from "./quickActionsButton.module.scss";

interface IProps {
  quickActionsCard: boolean;
  setQuickActionsCard: any;
}
const quickActionsButton: React.FunctionComponent<IProps> = ({
  quickActionsCard,
  setQuickActionsCard,
}) => {
  let backdropRef: HTMLDivElement | null;
  const target = document.getElementById("side");
  const [visible, setVisible] = useState(false);
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    backdropRef: any
  ) => {
    if (event.target && event.target === backdropRef) {
      setQuickActionsCard(false);
      target?.classList.remove(styles.moveSideBar);
      target?.classList.add(styles.removeSideBar);
    }
  };
  const handleSideBarAction = () => {
    setVisible(!visible);
    //setQuickActionsCard(true);
    target?.classList.remove(styles.removeSideBar);
    target?.classList.add(styles.moveSideBar);
  };
  const location = useLocation();
  let className = styles.quickActionButton;
  if (location.pathname === "/") {
    className = styles.homeQuickActionButton;
  }

  const popUpNode = useClickOutSide(() => {
    setVisible(false);
    setQuickActionsCard(false);
  });

  const hidePopUp: Function = () => {
    setVisible(false);
  };

  return (
    <>
      <div className={styles.container} ref={popUpNode}>
        <div className={quickActionsCard ? styles.overlay : undefined} />
        <div className={className} onClick={handleSideBarAction}>
          <div className={styles.sideMenu}>
            <div id="side">
              {visible && <QuickActionsPopUpCard hidePopUp={hidePopUp} />}
            </div>
          </div>
          <div className={styles.content}>
            <Icon name="quickActionsButton" />
            <p>Quick Actions</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default quickActionsButton;
