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
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0)">
      <path
        d="M5.04883 14.3751H10.9511L8.00008 9.65332L5.04883 14.3751ZM5.95133 13.8751L8.00008 10.5968L10.0488 13.8751H5.95133Z"
        fill="#555555"
      />
      <path
        d="M0.5 1.625V11.625H6C6.13825 11.625 6.25 11.5133 6.25 11.375C6.25 11.2367 6.13825 11.125 6 11.125H1V2.125H15V11.125H10C9.86175 11.125 9.75 11.2367 9.75 11.375C9.75 11.5133 9.86175 11.625 10 11.625H15.5V1.625H0.5Z"
        fill="#555555"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          fill="white"
          height="15"
          transform="translate(0.5 0.5)"
          width="15"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SVG;
