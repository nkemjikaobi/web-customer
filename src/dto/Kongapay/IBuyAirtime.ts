/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import IDgProduct from "./IDgProduct";

interface IBuyAirtime {
  countryCode: string;
  saveBeneficiary: boolean;
  phoneNumber: string;
  amount: number;
  operator: IDgProduct;
}

export default IBuyAirtime;
