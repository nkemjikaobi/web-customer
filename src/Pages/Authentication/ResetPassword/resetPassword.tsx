import React, { Fragment } from "react";
import Icon from "Components/Icons/icon";
import { Link } from "react-router-dom";
import styles from "./resetPassword.module.scss";
const ResetPasswordPage: React.FunctionComponent = () => {
  return (
    <Fragment>
      <div className={styles.logo}>
        <Icon name="kongaPayLogo" />
      </div>
      <div className={styles.resetPasswordCard}>
        <h1>Reset Password</h1>
        <Icon name="resetPassword" />
        <p>
          Check your email, a recovery password link has been sent to your
          email.
        </p>
        <Link className={styles.link} to={"/login"}>
          Back to Login
        </Link>
      </div>
    </Fragment>
  );
};

export default ResetPasswordPage;
