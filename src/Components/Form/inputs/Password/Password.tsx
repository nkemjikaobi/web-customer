/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import Label from "../Label";
import Icon from "Components/Icons/icon";
import styles from "./Password.module.scss";

interface IPasswordType {
  toggle?: boolean;
  label?: string;
  value?: any;
  [propName: string]: any;
}

const Password = ({ toggle, label, ...props }: IPasswordType) => {
  const [visible, showPasswoord] = useState(false);

  const togglePassword = (e: any) => {
    e.preventDefault();
    showPasswoord(!visible);
  };

  return (
    <div className={styles.password}>
      {label && <Label title={label} />}
      <div className={toggle ? styles.togglePassword : ""}>
        <input {...props} type={visible ? "text" : "password"} />
        {toggle && (
          <div>
            <a
              href="/"
              onClick={togglePassword}
              onKeyDown={togglePassword}
              role="button"
              type="button"
            >
              {visible ? (
                <div className={styles.displayPasswordIcon}>
                  <Icon name={"showPassword"} />
                </div>
              ) : (
                <div className={styles.displayPasswordIcon}>
                  <Icon name={"showPassword"} />
                </div>
              )}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Password;
