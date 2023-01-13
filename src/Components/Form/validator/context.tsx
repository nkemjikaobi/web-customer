/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

const FormContext = React.createContext({
  attachToForm: (_params: any) => {},
  detachFromForm: (_params: any) => {},
  instantValidate: false,
});

export default FormContext;
