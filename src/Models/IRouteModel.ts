/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

interface IRouteModel {
  path: string;
  exact: boolean;
  auth: boolean;
  component: React.FunctionComponent<any>;
}
export interface IProtectedRouteModel {
  path: string;
  exact: boolean;
  auth: boolean;
  PersistUser: Function;
  component: React.FunctionComponent<any>;
}
export default IRouteModel;
