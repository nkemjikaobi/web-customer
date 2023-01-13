/* eslint-disable max-len */
import React from "react";
/**
 * Account Profile Icon
 * @param {Object} props Component props
 * @returns {React.Component} React component
 */
const SVG = (props: any): unknown => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
      fill="white"
    />
    <rect fill="black" height="3" rx="1.5" width="16" x="4" y="5" />
    <path
      clipRule="evenodd"
      d="M5.5 10C4.67157 10 4 10.6716 4 11.5C4 12.3284 4.67157 13 5.5 13H18.5C19.3284 13 20 12.3284 20 11.5C20 10.6716 19.3284 10 18.5 10H5.5ZM5.5 15C4.67157 15 4 15.6716 4 16.5C4 17.3284 4.67157 18 5.5 18H18.5C19.3284 18 20 17.3284 20 16.5C20 15.6716 19.3284 15 18.5 15H5.5Z"
      fill="black"
      fillRule="evenodd"
    />
  </svg>
);

export default SVG;
