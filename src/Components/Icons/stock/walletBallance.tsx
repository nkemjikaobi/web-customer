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
    <rect
      fill="black"
      height="12"
      opacity="0.3"
      rx="2"
      width="10"
      x="2"
      y="2"
    />
    <path
      clipRule="evenodd"
      d="M4 6C2.89543 6 2 6.89543 2 8V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V8C22 6.89543 21.1046 6 20 6H4ZM20 14C20 15.1046 19.1046 16 18 16C16.8954 16 16 15.1046 16 14C16 12.8954 16.8954 12 18 12C19.1046 12 20 12.8954 20 14Z"
      fill="black"
      fillRule="evenodd"
    />
  </svg>
);

export default SVG;
