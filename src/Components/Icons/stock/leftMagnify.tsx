/* eslint-disable max-len */
/* eslint-disable react/no-unknown-property */
import React from "react";
/**
 * Account Profile Icon
 * @param {Object} props Component props
 * @returns {React.Component} React component
 */
const SVG = (props: any): unknown => (
  <svg
    aria-label="Previous slide"
    className=""
    name="left-arrow"
    viewBox="0 0 79 79"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <circle cx="28.5" cy="28.5" id="b" r="28.5" />
      <filter
        filterUnits="objectBoundingBox"
        height="161.4%"
        id="a"
        width="161.4%"
        x="-30.7%"
        y="-27.2%"
      >
        <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur
          in="shadowOffsetOuter1"
          result="shadowBlurOuter1"
          stdDeviation="5.5"
        />
        <feColorMatrix
          in="shadowBlurOuter1"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.238337862 0"
        />
      </filter>
    </defs>
    <g fill="none" fillRule="evenodd">
      <g transform="matrix(-1 0 0 1 68 9)">
        <use
          fill="#000"
          filter="url(#a)"
          xlinkHref="#b"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        />
        <use
          fill="#FFF"
          xlinkHref="#b"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        />
      </g>
      <path
        d="M42.326 46.316a.668.668 0 0 0 0-.9L34.92 37.51l7.406-7.924a.668.668 0 0 0 0-.899.568.568 0 0 0-.84 0l-7.812 8.358a.671.671 0 0 0 0 .9l7.812 8.356a.556.556 0 0 0 .84.016z"
        fill="#7E859B"
        fillRule="nonzero"
        stroke="#7E859B"
        strokeWidth="3"
      />
    </g>
  </svg>
);

export default SVG;
