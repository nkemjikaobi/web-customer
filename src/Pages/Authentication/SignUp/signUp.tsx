/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState } from "react";
import Input from "Components/Form/inputs/Input/Input";
import Icon from "Components/Icons/icon";
import Button from "Components/Button/button";
import { Link, useHistory } from "react-router-dom";
import FormDivider from "Components/FormDivider/formDivider";
import { composeClasses } from "libs/utils/utils";
import { useForm } from "CustomHooks/FormHook";
import SignupForm from "Models/FormModels/Authentication/SignupForm";
import styles from "./signUp.module.scss";
import { SignUpAction } from "Http/Redux/Actions/AuthAction";
import { connect } from "react-redux";
import config from "Configurations/configurations";
import AuthNotification from "PagesComponents/NotificationComponent/NotificationComponent";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

interface ISignUpPageProperties {
  SignUpAction: Function;
}

const SignUp: React.FunctionComponent<ISignUpPageProperties> = (
  properties: ISignUpPageProperties
) => {
  // initialize the registration form
  const initialForm: SignupForm = new SignupForm();

  // initialize the server response message
  const [IsSubmitting, SetIsSubmitting] = useState(false);
  const history = useHistory();

  // method to handle signup request
  const handleSignup: Function = async () => {
    SetIsSubmitting(true);

    // send user details
    properties
      .SignUpAction(Values, history)
      .then((res: boolean) => {
        if (res) {
          handleNotifications();
        }
      })
      .finally(() => SetIsSubmitting(false));
  };

  const handleNotifications = () => {
    const timeout = setTimeout(() => handleShowSignUpNotification(), 500);
    const timeout2 = setTimeout(() => handleRemoveSignUpNotification(), 2500);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  };

  const handleShowSignUpNotification = () => {
    const target = document.getElementById("notification");
    target?.classList.remove(styles.signUpNotificationRemove);
    target?.classList.add(styles.signUpNotificationShow);
  };

  const handleRemoveSignUpNotification = () => {
    const target = document.getElementById("notification");
    target?.classList.remove(styles.signUpNotificationShow);
    target?.classList.add(styles.signUpNotificationRemove);
    history.push("/login");
  };

  const { onChange, onSubmit, Values } = useForm(handleSignup, initialForm);

  return (
    <Fragment>
      <div className={composeClasses(styles.logo, styles.tabletAndAboveOnly)}>
        <Link className={"navbar-brand mb-0 pr-5 me-5"} to={"/"}>
          <img
            alt={"KongaPay"}
            className={"nav-logo"}
            src={config.web.public_url + "/logo.svg"}
          />
        </Link>
      </div>
      <div className={styles.signUpNotificationBase} id="notification">
        <AuthNotification
          closeNotification={handleRemoveSignUpNotification}
          message="Signup Successful"
          messageHeader="Signup"
          type={NotificationAlertType.Success}
        />
      </div>
      <div className={styles.signUpCard}>
        <h1>Create an Account</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.signUpCard_names}>
            <div className={composeClasses(styles.nameInput, styles.input)}>
              <Input
                label={"First Name:"}
                name={"firstname"}
                onChange={onChange}
                required={true}
                type={"text"}
              />
            </div>
            <div className={composeClasses(styles.nameInput, styles.input)}>
              <Input
                label={"Last Name:"}
                name={"lastname"}
                onChange={onChange}
                required={true}
                type={"text"}
              />
            </div>
          </div>
          <div className={styles.input}>
            <Input
              label={"Email Address:"}
              name={"email"}
              onChange={onChange}
              required={true}
              type={"email"}
            />
          </div>
          <div className={styles.input}>
            <Input
              label={"Phone Number:"}
              name={"phone_number"}
              onChange={onChange}
              placeholder={"(+234)"}
              required={true}
              type={"text"}
            />
          </div>
          <div className={styles.input}>
            <Input
              label={"Password:"}
              name={"password"}
              onChange={onChange}
              placeholder={"******"}
              required={true}
              type={"password"}
            />
          </div>
          <div className={styles.input}>
            <Input
              label={"Confirm Password:"}
              name={"confirm_password"}
              onChange={onChange}
              placeholder={"******"}
              required={true}
              type={"password"}
            />
          </div>
          <div className={styles.button}>
            <Button
              btnClass={"btn-primary text-white"}
              isSubmitting={IsSubmitting}
              title={"Create Account"}
            />
          </div>
        </form>
        {/* <div className={styles.signUpCardFormDivider}>
          <FormDivider text={"Sign up"} />
        </div> */}
        {/* <div className={styles.bottomIcons}>
          <Icon className={styles.icons} name={"facebookAuthPage"} />
          <Icon className={styles.icons} name={"googleAuthPage"} />
        </div> */}
        <p className={styles.bottomLink}>
          I have an account?{" "}
          <Link className={"btn-link text-primary"} to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default connect(null, { SignUpAction })(SignUp);
