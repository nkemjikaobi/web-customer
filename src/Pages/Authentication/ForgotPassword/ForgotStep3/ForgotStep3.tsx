/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Input from "Components/Form/inputs/Input/Input";
import Button from "Components/Button/button";
import styles from "./ForgotStep3.module.scss";
import { composeClasses } from "libs/utils/utils";
import config from "Configurations/configurations";
import AuthService from "Http/Services/AuthService";
import { useHistory } from "react-router-dom";
import Icons from "Components/Icons";
import * as CONSTANTS from "Helpers/Constants";

const ForgotStep3: React.FunctionComponent = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Change Password");
  const [info, setInfo] = useState<string>("");
  const [type, setType] = useState<string>("");

  const searchParams = new URLSearchParams(location.search);
  const otp: any = searchParams.get("otp");
  const email: any = searchParams.get("email");

  const handleChangePassword: Function = async () => {
    if (password !== passwordConfirm) {
      return handleMessage("Passwords dont match", CONSTANTS.ERROR);
    }
    setMessage("Validating OTP...");
    try {
      const response = await AuthService.VerifyPasswordOTP(otp, email);
      if (response.request_id) {
        setMessage("OTP Validated...");
        setMessage("Resetting Password...");
        const res: any = await AuthService.ResetPassword(
          password,
          passwordConfirm,
          email,
          response.request_id
        );
        if (res === true) {
          handleMessage("Password Changed..Please wait..", CONSTANTS.SUCCESS);
          setTimeout(() => {
            history.push("/login");
          }, 2000);
          return;
        }
        return;
      }
    } catch (error) {
      setMessage("Change Password");
      return handleMessage("OTP could not be verified", CONSTANTS.ERROR);
    }
  };

  const handleMessage = (text: string, type: string) => {
    setType(type);
    setInfo(text);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
  // const handleResendOTP = async () => {
  //   const response = await AuthService.ForgotPasswordRequest(props.email);
  //   if (response === true) {
  //     const text = `We've sent a new link to ${props.email} Please check
  //               your email address.`;
  //     handleMessage(text, CONSTANTS.SUCCESS);
  //   }
  // };

  const handleDisableButton = () => {
    if (passwordConfirm === "" || password === "" || otp === "") {
      return true;
    }
    return false;
  };

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
        <h1>Set a New Password </h1>
        {showMessage && (
          <div
            className={composeClasses(
              styles.alert,
              `${type === "success" && styles.success}`,
              `${type === "error" && styles.error}`
            )}
          >
            <div className={styles.icon}>
              {type === "success" ? (
                <Icons name="check" />
              ) : (
                <Icons name="redClose" />
              )}
            </div>
            <div>
              <p>{info}</p>
            </div>
          </div>
        )}
        <div className={styles.input}>
          <Input
            label={"New Password:"}
            name={"password"}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder={"Enter Password"}
            type={"password"}
          />
        </div>
        <div className={styles.input}>
          <Input
            label={"Re-type Password:"}
            name={"password"}
            onChange={(e: any) => setPasswordConfirm(e.target.value)}
            placeholder={"Enter Password"}
            type={"password"}
          />
        </div>
        {/* <div className={composeClasses(styles.input, styles.otp)}>
          <Link
            className={composeClasses(styles.link, styles.otpLink)}
            onClick={() => handleResendOTP()}
            to={"#"}
          >
            Resend Link
          </Link>
        </div> */}
        <div className={styles.button}>
          <Button
            btnClass={"btn-primary text-white"}
            handleClick={handleChangePassword}
            isDisable={handleDisableButton()}
            title={message}
          />
        </div>
        <Link className={styles.link} to={"/login"}>
          Back to Login
        </Link>
      </div>
    </Fragment>
  );
};

export default ForgotStep3;
