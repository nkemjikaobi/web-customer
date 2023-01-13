/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */

export interface IBuyDataForm {
  value: number;
  amount: number;
  text: string;
}

class BuyDataForm {
  productCode = null;
  operator = null;
  countryCode = "+234";
  phoneNumber = "";
  dataPlan = 0;
  amount = 0;
  saveBeneficiary = false;
  policyAgree = false;
}

export default BuyDataForm;
