/* eslint-disable @typescript-eslint/ban-types */
import React from "react";

interface IProp {
  setBeneficiary: Function;
}

const BeneficiaryBuyButton: React.FunctionComponent<IProp> = (props: IProp) => {
  return <button onClick={(e) => props.setBeneficiary(e)}>Buy</button>;
};

export default BeneficiaryBuyButton;
