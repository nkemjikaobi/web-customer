import React from "react";
import PropTypes from "prop-types";

import {
  composeClasses,
  handleDOMEvent,
  noOp,
  isNotEmptyArray,
} from "libs/utils/utils";

import styles from "./selectBox.module.scss";
import Icon from "Components/Icons/icon";

const { selectBox, selectBoxWithError } = styles;

import constants from "Components/constants";

const { selectBoxIconVariants } = constants;

/**
 * Ensures a valid icon variant name is used
 * @param {*} variant
 */
const getIconName = (variant: any) =>
  Object.values(selectBoxIconVariants).findIndex(
    (_variant) => _variant === variant
  ) > -1
    ? variant
    : selectBoxIconVariants.triangle;

/**
 * Component for Select Box
 * @param {*} param0
 * @returns {*} React Component
 */
export interface ISelectBox {
  className: any;
  disabled: any;
  hasError: any;
  inputName: any;
  label: any;
  onChange: any;
  options: any;
  placeHolder: any;
  renderLabel: any;
  value: any;
  iconVariant: any;
  required: any;
}
const SelectBox: React.FunctionComponent<ISelectBox> = ({
  className,
  disabled,
  hasError,
  inputName,
  label,
  onChange,
  options,
  placeHolder,
  renderLabel,
  value,
  iconVariant,
  required,
}) => (
  <div
    className={composeClasses(
      selectBox,
      className,
      hasError && selectBoxWithError
    )}
  >
    {(label || typeof renderLabel === "function") && (
      <label className={styles.label}>
        {typeof renderLabel === "function" ? renderLabel() : `${label}:`}
      </label>
    )}
    <div>
      <select
        disabled={disabled}
        name={inputName}
        onChange={
          typeof onChange === "function"
            ? (evt) => handleDOMEvent(evt, () => onChange(evt.target.value))
            : noOp
        }
        required={required}
        value={value}
      >
        {!value && (
          <option key={`${label}_default`} value="">
            {placeHolder || `Select ${label}`}
          </option>
        )}
        {isNotEmptyArray(options) &&
          options.map((option: any) => (
            <option key={option.id} value={option.id || option.key}>
              {option.label || option.value || option.name}
            </option>
          ))}
      </select>
      <Icon
        className={styles.selectIcon}
        name={`${getIconName(iconVariant)}-down`}
      />
    </div>
  </div>
);

SelectBox.defaultProps = {
  className: "",
  disabled: undefined,
  onChange: noOp,
  placeHolder: "",
  value: undefined, // Same as not passing the prop at all
  iconVariant: selectBoxIconVariants.triangle,
  inputName: undefined,
  label: "",
  hasError: false,
  renderLabel: null,
  required: false,
};

SelectBox.propTypes = {
  disabled: PropTypes.bool,
  inputName: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeHolder: PropTypes.string,
  renderLabel: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  iconVariant: PropTypes.oneOf(Object.values(selectBoxIconVariants)),
  hasError: PropTypes.bool,
  required: PropTypes.bool,
};

export default SelectBox;
