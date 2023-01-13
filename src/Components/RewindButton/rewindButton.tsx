/* eslint-disable @typescript-eslint/ban-types */
import Icons from "Components/Icons";
import OldWebSite from "Components/OldWebsite/oldWebSite";
import useClickOutside from "CustomHooks/useClickOutSide";
import React, { useState } from "react";
import styles from "./rewindButton.module.scss";

interface IRewindButton {
  openPopUp: Function;
  closePopUp: Function;
  showPopUp: boolean;
}
const RewindButton = (props: IRewindButton) => {
  const { closePopUp, openPopUp, showPopUp } = props;
  const [close, setClose] = useState(true);

  const handleBackdropClick = (event: any, backdropRef: any, handler: any) => {
    if (event.target && event.target === backdropRef) {
      if (typeof handler === "function") handler();
    }
  };

  let backdropRef: HTMLDivElement | null;

  const handlePopUpClose = () => {
    closePopUp(false);
    setClose(true);
  };

  const handlePopUpOpen = () => {
    openPopUp(true);
    setClose(false);
  };
  const oldWebSiteNode = useClickOutside(() => handlePopUpClose());

  return (
    <>
      <div
        className={!close ? styles.overlay : undefined}
        onClick={(event) =>
          handleBackdropClick(event, backdropRef, handlePopUpClose())
        }
        ref={(node) => (backdropRef = node)}
      />
      <div onClick={() => handlePopUpOpen()}>
        <Icons name="rewind" />
      </div>
      {showPopUp && (
        <div className={styles.oldWebsiteContainer} ref={oldWebSiteNode}>
          <OldWebSite handlePopUpClose={handlePopUpClose} />
        </div>
      )}
    </>
  );
};

export default RewindButton;
