/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Icon from "Components/Icons/icon";
import Input from "Components/Form/inputs/Input/Input";
import Button from "Components/Button/button";
import { Link, useHistory } from "react-router-dom";
import styles from "./login.module.scss";
import { SignInAction } from "Http/Redux/Actions/AuthAction";
import { connect, useDispatch } from "react-redux";
import { composeClasses } from "libs/utils/utils";
import config from "Configurations/configurations";
import AuthNotification from "PagesComponents/NotificationComponent/NotificationComponent";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";
import { SignInFailure } from "Http/Redux/Actions/ActionCreators/SignInActionCreator";
import { ILoginPageProperties } from "./ILoginPageProperties";
import { useLoginState } from "PagesHooks/Authentication/Login/useLoginState";
import { useForm } from "CustomHooks/FormHook";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import AuthService from "Http/Services/AuthService";
import LoginForm from "Models/FormModels/Authentication/LoginForm";

export const LoginPage: React.FunctionComponent<ILoginPageProperties> = (
  properties: ILoginPageProperties
) => {
  // const {
  //   errorMessage,
  //   onChange,
  //   onSubmit,
  //   IsSubmitting,
  //   handleRemoveLoginNotification,
  //   authenticatedUser,
  // } = useLoginState(properties);
  const { Error, SignInAction } = properties;
  const [errorMessage, setErrorMessage] = useState(Error);
  const [currentCart, setCurrentCart] = useState<any>(null);

  const dispatch = useDispatch();

  // set the state holder for the response from the server
  const [IsSubmitting, SetIsSubmitting] = useState(false);
  const history: any = useHistory();
  const authenticatedUser = AuthService.GetLoggedInUser();

  const displayLoginAlert = async (className: string) => {
    const timeout = setTimeout(
      () => handleShowLoginNotification(className),
      500
    );
    const timeout2 = setTimeout(() => {
      dispatch(SignInFailure(""));
      handleRemoveLoginNotification(className);
    }, 2500);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  };

  useEffect(() => {
    if (properties.AuthenticatedUser) {
      setErrorMessage("");
      displayLoginAlert("notification_success");
    }
  }, [properties.AuthenticatedUser]);

  const handleShowLoginNotification = (className: string) => {
    const target = document.getElementById(className);
    target?.classList.remove(styles.loginNotificationRemove);
    target?.classList.add(styles.loginNotificationShow);
  };

  const handleRemoveLoginNotification = (className: string) => {
    const target = document.getElementById(className);
    target?.classList.remove(styles.loginNotificationShow);
    target?.classList.add(styles.loginNotificationRemove);
    if (className === "notification_success") {
      history.push(
        history.location &&
          history.location.state &&
          history.location.state.from
          ? history.location.state.from
          : "/"
      );
    }
  };

  // initialize the login form
  const initialForm: LoginForm = new LoginForm();

  // method to authenticate user
  const authenticateUser: Function = async () => {
    SetIsSubmitting(true);
    // send the userdetails to the backend server for authentication
    SignInAction(Values, currentCart).finally(() => SetIsSubmitting(false));

    return () => {
      // cleanup function resides here
      return null;
    };
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setCurrentCart(properties.current_cart);
    }
    return () => {
      mounted = false;
    };
  }, [properties]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setErrorMessage(Error);
      displayLoginAlert("notification_error");
    }
    return () => {
      mounted = false;
    };
  }, [Error]);

  const { onChange, onSubmit, Values } = useForm(authenticateUser, initialForm);

  return (
    <>
      <div
        className={composeClasses(styles.logo, styles.tabletAndAboveOnly)}
        data-testid="LoginForm"
      >
        <Link
          className={"navbar-brand mb-0 pr-5 me-5"}
          data-testid="logo-link"
          to={"/"}
        >
          <img
            alt={"KongaPay"}
            className={"nav-logo"}
            data-testid="logo-img"
            src={config.web.public_url + "/logo.svg"}
          />
        </Link>
      </div>
      <div className={styles.backWrapper}>
        <Link to="/">
          <Icon className={styles.icons} name={"arrowLeft"} />
        </Link>
      </div>
      <div
        className={`${styles.loginCard} ${
          errorMessage.length > 0 ? styles.errorPadding : ""
        }`}
      >
        <h1>Log In</h1>
        {errorMessage.length > 0 ? (
          <div className={styles.loginNotificationBase} id="notification_error">
            <AuthNotification
              closeNotification={handleRemoveLoginNotification}
              message={errorMessage}
              messageHeader="Login"
              type={NotificationAlertType.Error}
            />
          </div>
        ) : (
          <Fragment />
        )}
        {authenticatedUser && (
          <div
            className={styles.loginNotificationBase}
            id="notification_success"
          >
            <AuthNotification
              closeNotification={handleRemoveLoginNotification}
              message="Login Successful"
              messageHeader="Login"
              type={NotificationAlertType.Success}
            />
          </div>
        )}
        <form onSubmit={onSubmit}>
          <div className={styles.input}>
            <Input
              label={"Email or Phone Number:"}
              name={"user_identifier"}
              onChange={onChange}
              placeholder={"Email Address or Phone Number"}
              type={"text"}
              value={""}
            />
          </div>
          <div className={styles.input}>
            <Input
              label={"Password:"}
              name={"password"}
              onChange={onChange}
              placeholder={"******"}
              type={"password"}
            />
          </div>
          <div className={styles.forgotPasswordLink}>
            <Icon name={"forgotPasswordLock"} />
            <span className={styles.link}>
              <Link data-testid="forgotPassword" to={"/forgotpassword"}>
                Forgot Password
              </Link>
            </span>
          </div>
          <div className={styles.button}>
            <Button
              btnClass={"btn-primary text-white"}
              isSubmitting={IsSubmitting}
              title={"Login"}
            />
          </div>
        </form>
        <p className={styles.bottomLink}>
          {"Don't have an account?"}{" "}
          <Link
            className={"btn-link text-primary"}
            data-testid="signUp"
            to={"/signup"}
          >
            Create Account
          </Link>
        </p>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  current_cart: state.cart?.Marketplace,
  Error: state.auth.Error,
  IsAuthenticated: state.kpay.Error,
  AuthenticatedUser: state.auth.IsAuthenticated,
});

export default connect(mapStateToProps, { SignInAction, SignInFailure })(
  LoginPage
);
