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
    height="18"
    viewBox="0 0 18 18"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5 4.5L4.5 13.5"
      stroke="#101010"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
    />
    <path
      d="M4.5 4.5L13.5 13.5"
      stroke="#101010"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.3"
    />
  </svg>
);

export default SVG;
