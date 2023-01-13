import React from "react";
import Icon from "Components/Icons/icon";
import sharedStyles from "./shared.module.scss";

interface ILabel {
  product?: any;
  labelInfo?: any;
}
const Label: React.FunctionComponent<ILabel> = ({ product, labelInfo }) => {
  let label;
  if (product) {
    label = product.label;
  }
  if (!label && !labelInfo) return null;
  return (
    <>
      {product ? (
        <span
          className={`${sharedStyles.productLabel} ${
            sharedStyles[label.type.toLowerCase()]
          }`}
        >
          {label.type.toLowerCase() === "promo" && (
            <Icon className={sharedStyles.promoIcon} name="package" />
          )}
          {label.text}
        </span>
      ) : labelInfo && labelInfo > 0 ? (
        <span
          className={`${sharedStyles.productLabel} ${sharedStyles.percentage_off}`}
        >{`${labelInfo}% OFF`}</span>
      ) : null}
    </>
  );
};

Label.defaultProps = {
  product: null,
  labelInfo: "",
};

export default Label;
