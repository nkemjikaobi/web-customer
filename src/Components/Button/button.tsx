import Icon from "Components/Icons";
import { getSanitizedHtml } from "libs/utils/utils";
import React, { Fragment } from "react";
import styles from "./button.module.scss";

interface IButtonType {
  btnClass?: string;
  className?: string;
  title?: string;
  isDisable?: boolean;
  isSubmitting?: boolean;
  handleClick?: any;
  loadingText?: string;
  value?: string;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: string;
  iconClass?: string;
}
const defaultProps: IButtonType = {
  btnClass: "",
  type: "button",
  className: "",
  title: " ",
  isDisable: false,
  handleClick: () => {
    return null;
  },
  value: " ",
  isSubmitting: false,
  loadingText: "",
  icon: "",
  iconClass: "",
};
/**
 * Renders the actual content of the Button
 * @param {Object} children Render Data
 * @param {boolean} loading Loading state
 * @returns {React.Component} Button component
 */
const renderContent = (title: any, isSubmitting: any) => (
  <Fragment>
    {isSubmitting ? <Icon name="loader" /> : <Fragment>{title}</Fragment>}
  </Fragment>
);
const Button = ({
  btnClass,
  className,
  title,
  isDisable,
  isSubmitting,
  handleClick,
  loadingText,
  value,
  type,
  icon,
  iconClass,
}: IButtonType): any => {
  const content = (
    <Fragment>
      {icon ? <Icon name={icon} /> : ""}
      {iconClass ? <i className={iconClass} /> : ""}
      {renderContent(title, isSubmitting)}
    </Fragment>
  );

  const finalClasses = [btnClass, className].join(" ");
  const displayClasses =
    finalClasses.trim().length < 1 ? "btn-primary text-white" : finalClasses;

  return isDisable ? (
    <button
      className={`btn ${styles.btn} ${displayClasses}`}
      disabled
      onClick={handleClick}
      value={value}
    >
      {content}
    </button>
  ) : (
    <button
      className={`btn ${btnClass} ${styles.btn} ${className}`}
      onClick={handleClick}
      value={value}
    >
      {content}
    </button>
  );
};

Button.defaultProps = defaultProps;
export default Button;
