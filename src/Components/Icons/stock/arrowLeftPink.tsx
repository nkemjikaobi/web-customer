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
      <circle
        cx="14"
        cy="12"
        fill="white"
        r="12"
        transform="rotate(180 14 12)"
      />
    </g>
    <path
      d="M17.4219 16.8858C17.7824 17.2462 17.7824 17.8307 17.4219 18.1912C17.0614 18.5517 16.477 18.5517 16.1165 18.1912L10.578 12.6527C10.2286 12.3033 10.2164 11.7406 10.5503 11.3763L15.6272 5.8378C15.9717 5.462 16.5556 5.43661 16.9314 5.7811C17.3072 6.12558 17.3326 6.70949 16.9881 7.08529L12.5084 11.9722L17.4219 16.8858Z"
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
