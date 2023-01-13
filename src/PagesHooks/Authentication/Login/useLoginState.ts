import { useForm } from "CustomHooks/FormHook";
import IMarketplaceCart from "dto/Cart/IMarketplaceCart";
import { SignInFailure } from "Http/Redux/Actions/ActionCreators/SignInActionCreator";
import AuthService from "Http/Services/AuthService";
import LoginForm from "Models/FormModels/Authentication/LoginForm";
import { ILoginPageProperties } from "Pages/Authentication/Login/ILoginPageProperties";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { IUseLoginState } from "./IUseLoginState";
import styles from "./useLoginState.module.scss";

export const useLoginState = (
  properties: ILoginPageProperties
): IUseLoginState => {
  const { Error, SignInAction } = properties;
  const [errorMessage, setErrorMessage] = useState(Error);
  const [currentCart, setCurrentCart] = useState<IMarketplaceCart | null>(null);

  const dispatch = useDispatch();

  // set the state holder for the response from the server
  const [IsSubmitting, SetIsSubmitting] = useState<boolean>(false);
  const history = useHistory();
  const authenticatedUser = AuthService.GetLoggedInUser();

  const displayLoginAlert: (className: string) => Promise<() => void> = async (
    className: string
  ) => {
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

  const handleShowLoginNotification = (className: string) => {
    const target = document.getElementById(className);
    target?.classList.remove(styles.loginNotificationRemove);
    target?.classList.add(styles.loginNotificationShow);
  };

  const handleRemoveLoginNotification = (className: string) => {
    const target = document.getElementById(className);
    target?.classList.remove(styles.loginNotificationShow);
    target?.classList.add(styles.loginNotificationRemove);
    if (className === "notification_success") history.push("/");
  };

  // initialize the login form
  const initialForm: LoginForm = new LoginForm();

  // method to authenticate user
  const authenticateUser = async () => {
    SetIsSubmitting(true);
    // send the userdetails to the backend server for authentication
    SignInAction(Values, currentCart).finally(() => SetIsSubmitting(false));

    return () => {
      // cleanup function resides here
      return null;
    };
  };

  useEffect(() => {
    if (properties.AuthenticatedUser) {
      setErrorMessage("");
      displayLoginAlert("notification_success");
    }
  }, [properties.AuthenticatedUser]);

  useEffect(() => {
    let mounted = true;
    if (mounted && properties.current_cart) {
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

  return {
    errorMessage,
    onChange,
    onSubmit,
    IsSubmitting,
    handleRemoveLoginNotification,
    authenticatedUser,
  };
};
