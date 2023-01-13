/* eslint-disable react/require-default-props */

import { composeClasses } from "libs/utils/utils";
import React from "react";
import Label from "../Label";
import styles from "./select.module.scss";
import SelectOption from "./SelectOption";

export interface ISelect {
  text: string;
  value: number;
}

export interface ISelectType {
  type?: string;
  label?: string;
  value?: any;
  options?: Array<any>;
  placeholder?: string;
  defaultValue?: any;
  [propName: string]: any;
}

const Select = ({
  label,
  value,
  options,
  placeholder,
  defaultValue,
  ...props
}: ISelectType) => {
  let hasOptions = false;
  let selectOptions: any = [];
  if (placeholder) {
    hasOptions = true;
    selectOptions = [
      <SelectOption disabled={true} key={0} selected={true} value={""}>
        {placeholder}
      </SelectOption>,
    ];
  }
  if (options && options.length > 0) {
    hasOptions = true;
    selectOptions = [
      ...selectOptions,
      ...options.map((option: any, index: number) => (
        <SelectOption
          key={index + 1}
          selected={option.value === value || option.status === value}
          value={option.value || option.status}
        >
          {option.text || option.label}
        </SelectOption>
      )),
    ];
  }

  return (
    <div>
      {label && <Label title={label} />}
      <div
        className={composeClasses(
          styles.selectContainer,
          "select-container mt-2"
        )}
      >
        <select
          className={composeClasses("form-select")}
          defaultValue={defaultValue}
          value={value}
          {...props}
        >
          {hasOptions ? selectOptions : props.children}
        </select>
      </div>
    </div>
  );
};

export default Select;
