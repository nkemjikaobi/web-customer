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
      clipRule="evenodd"
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="#ED017F"
      fillRule="evenodd"
      opacity="0.3"
    />
    <rect fill="#ED017F" height="7" rx="1" width="2" x="11" y="10" />
    <rect fill="#ED017F" height="2" rx="1" width="2" x="11" y="7" />
  </svg>
);

export default SVG;
