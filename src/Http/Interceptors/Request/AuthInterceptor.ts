/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "axios";
import { ERROR } from "Helpers/Constants";

axios.interceptors.request.use(
  (config: any) => config,
  (error: any) => Promise.reject(error)
);

axios.interceptors.response.use(
  (config: any) => {
    // if (config.data.status === ERROR) window.location.href = "/login";
    return config;
  },
  (error: any) => Promise.reject(error)
);

export default axios;
