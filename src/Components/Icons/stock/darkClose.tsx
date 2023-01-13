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
  >
    <path
      d="M0 2C0 0.89543 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22V2Z"
      fill="#5A5A5A"
    />
    <rect
      fill="white"
      height="2"
      rx="1"
      transform="rotate(-45 5.63602 16.9492)"
      width="16"
      x="5.63602"
      y="16.9492"
    />
    <rect
      fill="white"
      height="2"
      rx="1"
      transform="rotate(45 7.05023 5.63672)"
      width="16"
      x="7.05023"
      y="5.63672"
    />
  </svg>
);

export default SVG;
