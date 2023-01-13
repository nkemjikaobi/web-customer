/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./ForgotStep2.module.scss";
import { composeClasses } from "libs/utils/utils";
import config from "Configurations/configurations";

interface ForgotStep2Props {
  email: string;
}
const ForgotStep2 = ({ email }: ForgotStep2Props) => {
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
        <h1>Password Link Sent</h1>
        <p>
          We have sent a reset password link to <b>{email}</b>
        </p>
        <p>
          To create a new password, click the link in the email and enter a new
          password
        </p>
      </div>
    </Fragment>
  );
};

export default ForgotStep2;
