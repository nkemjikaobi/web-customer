/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { HideCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import { OpenCartAction } from "Http/Redux/Actions/Cart/ICartAction";
import ICartAlert from "dto/Cart/ICartAlert";
import NotificationComponent from "PagesComponents/NotificationComponent/NotificationComponent";

export interface ICartAlertComponent {
  alertMessage?: ICartAlert;
  CartToOpen: string;
  HideCartAlert: Function;
  OpenCartAction: Function;
}

const CartAlertComponent: React.FunctionComponent<ICartAlertComponent> = (
  props: ICartAlertComponent
) => {
  const [text, setText] = useState<string>("");

  const handleCloseAlert = (event: any) => {
    event.preventDefault();
    props.HideCartAlert();
  };

  useEffect(() => {
    let mounted = props.alertMessage?.message;
    if (mounted) {
      setText(mounted);
    }
    return () => {
      mounted = "";
    };
  }, []);

  return (
    <Fragment>
      <NotificationComponent
        closeNotification={handleCloseAlert}
        message={text}
      />
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  cart_id: state.cart.Marketplace?.id ?? null,
  alertMessage: state.cart.Marketplace?.alertMessage,
  CartToOpen: state.cart.CartToOpen,
});

export default connect(mapStateToProps, { HideCartAlert, OpenCartAction })(
  CartAlertComponent
);
