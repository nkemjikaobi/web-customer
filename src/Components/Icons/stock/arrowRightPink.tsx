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
    height="30"
    viewBox="0 0 30 30"
    width="30"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d)">
      <circle cx="14" cy="12" fill="white" r="12" />
    </g>
    <path
      d="M10.5781 7.11424C10.2176 6.75376 10.2176 6.1693 10.5781 5.80882C10.9386 5.44833 11.523 5.44833 11.8835 5.80882L17.422 11.3473C17.7714 11.6967 17.7836 12.2594 17.4497 12.6237L12.3728 18.1622C12.0283 18.538 11.4444 18.5634 11.0686 18.2189C10.6928 17.8744 10.6674 17.2905 11.0119 16.9147L15.4916 12.0278L10.5781 7.11424Z"
      fill="#ED017F"
    />
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="30"
        id="filter0_d"
        width="30"
        x="0"
        y="0"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx="1" dy="3" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
        />
        <feBlend
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow"
          mode="normal"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default SVG;
