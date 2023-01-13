/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Input from "Components/Form/inputs/Input/Input";
import Button from "Components/Button/button";
import styles from "./ForgotStep1.module.scss";
import { composeClasses } from "libs/utils/utils";
import config from "Configurations/configurations";
import AuthService from "Http/Services/AuthService";

interface IForgotStep1 {
  setEmail: Function;
  setCurrentStep: Function;
  email: string;
  currentStep: number;
}
const ForgotStep1 = (props: IForgotStep1) => {
  const handleForgotPassword: Function = async () => {
    SetIsSubmitting(true);
    await AuthService.ForgotPasswordRequest(props.email);
    SetIsSubmitting(false);
    props.setCurrentStep(props.currentStep + 1);
  };

  const [IsSubmitting, SetIsSubmitting] = useState(false);

  return (
    <Fragment>
      <div className={composeClasses(styles.logo)}>
        <Link className={"navbar-brand mb-0 pr-5 me-5"} to={"/"}>
          <img
            alt={"KongaPay"}
            className={"nav-logo"}
            src={config.web.public_url + "/logo.svg"}
          />
        </Link>
      </div>
      <div className={styles.forgotPasswordCard}>
        <h1>Forgot Password?</h1>
        <p>
          Can’t remember your login credentials? Enter your details below and
          we’ll send instructions if your account exists.
        </p>
        <div className={styles.input}>
          <Input
            label={"Email or Phone Number"}
            name={"UserId"}
            onChange={(e: any) => props.setEmail(e.target.value)}
            placeholder={"Email Address or Phone Number"}
            type={"text"}
          />
        </div>
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={handleForgotPassword}
            isDisable={props.email === "" ? true : false}
            isSubmitting={IsSubmitting}
            title={"Reset Password"}
          />
        </div>
        <Link className={styles.link} to={"/login"}>
          Back to Login
        </Link>
      </div>
    </Fragment>
  );
};

export default ForgotStep1;
