/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import Icon from "Components/Icons/icon";
import styles from "./modal.module.scss";
import { CloseModalAction } from "Http/Redux/Actions/ModalActions/ModalActions";
import { Fragment } from "react";
import { composeClasses } from "libs/utils/utils";
import { connect } from "react-redux";

export interface IModal {
  children: React.ReactNode;
  header: any;
  onBackdropClick: any;
  CloseModalAction?: Function | undefined;
  close: boolean;
}
const Modal: React.FunctionComponent<IModal> = ({
  onBackdropClick,
  header,
  children,
  CloseModalAction,
  close,
}) => {
  const handleModalClose = () => {
    CloseModalAction && CloseModalAction(true);
  };

  const handleBackdropClick = (event: any, backdropRef: any, handler: any) => {
    if (event.target && event.target === backdropRef) {
      if (typeof handler === "function") handler();
      handleModalClose();
    }
  };

  let backdropRef: HTMLDivElement | null;
  const className = composeClasses(
    styles.modal,
    close ? styles.modalHidden : " "
  );
  return (
    <Fragment>
      <div
        className={!close ? styles.overlay : undefined}
        onClick={(event) =>
          handleBackdropClick(event, backdropRef, onBackdropClick)
        }
        ref={(node) => (backdropRef = node)}
      />
      {!close && (
        <section className={className}>
          <div className={styles.header}>
            <div
              className={styles.closeIcon}
              onClick={() => handleModalClose()}
            >
              <Icon name="close" />
              <p>close</p>
            </div>
          </div>
          <div className={styles.children}>{children}</div>
        </section>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state: any) => ({
  close: state.modal.close,
});

Modal.defaultProps = {
  CloseModalAction: undefined,
};

export default connect(mapStateToProps, { CloseModalAction })(Modal);
