/* eslint-disable max-len */
import React from "react";
/**
 * Account Profile Icon
 * @param {Object} props Component props
 * @returns {React.Component} React component
 */
const SVG = (props: any): unknown => (
  <svg
    className="icon"
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2ZM6.5 20V4H17.5V20H6.5Z"
      fill="black"
      fillRule="evenodd"
    />
    <path
      clipRule="evenodd"
      d="M6.5 4V20H17.5V4H6.5Z"
      fill="black"
      fillRule="evenodd"
      opacity="0.3"
    />
  </svg>
);

export default SVG;
