/* eslint-disable react/require-default-props */
import React from "react";

interface ILabelType {
  title?: string;
  [propName: string]: any;
}

const Label = ({ title, props }: ILabelType) => {
  return <label {...props}>{title}</label>;
};

export default Label;
