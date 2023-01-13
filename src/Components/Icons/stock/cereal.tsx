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
    height="44"
    viewBox="0 0 42 44"
    width="42"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M16.8901 20.2907C17.3341 20.2907 17.6944 19.9312 17.6944 19.4864V16.5443C17.6944 16.4245 17.6848 16.3062 17.6767 16.1888L17.9245 16.4365C18.0813 16.5934 18.2872 16.6722 18.4931 16.6722C18.699 16.6722 18.9049 16.5934 19.0617 16.4365L19.3223 16.1759C19.3135 16.2982 19.3038 16.4204 19.3038 16.5451V19.4872C19.3038 19.932 19.6641 20.2915 20.1081 20.2915H23.0502C25.8628 20.2915 28.151 18.0033 28.151 15.1915V12.2486C28.151 11.8038 27.7907 11.4443 27.3467 11.4443H24.4046C23.7387 11.4443 23.1041 11.5762 22.5202 11.8094C22.8644 10.1775 22.4076 8.40809 21.1424 7.14294L19.0617 5.06223C18.7473 4.74776 18.2389 4.74776 17.9245 5.06223L15.843 7.14213C14.5794 8.40568 14.1218 10.1727 14.4644 11.803C13.8845 11.573 13.2547 11.4427 12.5936 11.4427H9.65151C9.20755 11.4427 8.84722 11.8022 8.84722 12.247V15.1899C8.84722 18.0017 11.1354 20.2899 13.948 20.2899H16.8901V20.2907ZM26.5416 13.0521V15.1907C26.5416 17.1162 24.9749 18.6821 23.0494 18.6821H20.9116V16.5443C20.9116 14.618 22.4784 13.0521 24.4038 13.0521H26.5416ZM16.9802 8.27936L18.4923 6.76729L20.0044 8.27936C21.3652 9.64022 21.3652 11.856 20.0044 13.2177L18.4923 14.7298L16.9802 13.2177C15.6194 11.856 15.6194 9.64022 16.9802 8.27936ZM33.3902 24.288L36.1658 13.8805C36.1835 13.8129 36.1931 13.7429 36.1931 13.673C36.1931 12.7858 35.4717 12.0644 34.5846 12.0644H32.976C32.6824 12.0644 32.4089 12.148 32.1717 12.2856V0.804292C32.1717 0.359518 31.8114 0 31.3674 0H6.43916C6.43514 0 6.43112 0.00241288 6.4271 0.00241288C6.42308 0.00241288 6.41905 0 6.41503 0H0.804292C0.360323 0 0 0.359518 0 0.804292V37.8017C0 38.1226 0.191421 38.4138 0.486597 38.5409L6.09734 40.9537C6.19948 40.9972 6.30726 41.0189 6.41503 41.0189C6.41986 41.0189 6.42468 41.0173 6.42951 41.0173C6.43273 41.0173 6.43594 41.0189 6.43916 41.0189H18.7561C21.0869 42.4907 23.8376 43.3562 26.7926 43.3562C35.1234 43.3562 41.902 36.5784 41.902 28.2475V28.1639C41.902 25.7631 36.9363 24.7239 33.3902 24.288ZM20.9116 26.5416C19.5813 26.5416 18.4987 27.6242 18.4987 28.9545H20.1073C20.1073 28.5106 20.4684 28.1502 20.9116 28.1502C21.3548 28.1502 21.7159 28.5106 21.7159 28.9545H23.3245C23.3245 27.6242 22.2419 26.5416 20.9116 26.5416ZM27.3459 27.3459C26.0156 27.3459 24.933 28.4285 24.933 29.7588H26.5416C26.5416 29.3148 26.9028 28.9545 27.3459 28.9545C27.7891 28.9545 28.1502 29.3148 28.1502 29.7588H29.7588C29.7588 28.4285 28.6762 27.3459 27.3459 27.3459ZM32.976 13.6729H34.5564L31.5958 24.7762V24.7778C31.5958 24.7794 31.595 24.7802 31.595 24.7802L31.1156 26.6212C31.0038 27.0507 31.2612 27.4899 31.6915 27.6025C31.7591 27.6193 31.8274 27.6282 31.8942 27.6282C32.2513 27.6282 32.5778 27.3885 32.6719 27.0266L32.9752 25.862C38.4653 26.5094 40.2934 27.7802 40.2934 28.1647C40.2934 28.9561 35.7001 30.8132 26.7926 30.8132C17.885 30.8132 13.2917 28.9561 13.2917 28.1647C13.2917 27.3724 17.885 25.5153 26.7926 25.5153C27.2687 25.5153 27.7247 25.5338 28.188 25.5459L28.0376 26.1443C27.929 26.5754 28.1904 27.0121 28.6215 27.1207C28.6875 27.1376 28.7534 27.1448 28.8186 27.1448C29.1781 27.1448 29.5054 26.9011 29.5979 26.5368L29.992 24.9716L32.9494 13.8804C32.9671 13.8129 32.976 13.7429 32.976 13.6729ZM5.61075 38.9929L1.60859 37.2717V1.60861H5.61075V38.9929ZM10.4558 15.1907V13.0521H12.5936C14.5191 13.0521 16.0858 14.618 16.0858 16.5443V18.6821H13.948C12.0226 18.6821 10.4558 17.1154 10.4558 15.1907ZM16.6199 39.4103H7.24345V1.60861H30.5631V16.5837L28.6022 23.9374C28.0095 23.9189 27.407 23.9068 26.7926 23.9068C21.5663 23.9068 11.6831 24.7963 11.6831 28.1647V28.2484C11.6831 28.7792 11.7121 29.3036 11.766 29.82C11.7821 29.9736 11.815 30.1232 11.836 30.276C11.8842 30.6363 11.9325 30.9966 12.0065 31.3481C12.0483 31.5484 12.1094 31.7414 12.1585 31.9393C12.2333 32.2352 12.3032 32.532 12.3949 32.8208C12.4681 33.0508 12.5598 33.2728 12.6435 33.498C12.7343 33.7425 12.8204 33.9902 12.9234 34.2283C13.0287 34.472 13.151 34.7076 13.2692 34.9457C13.373 35.1548 13.4727 35.3663 13.5861 35.5698C13.7204 35.8119 13.8692 36.0444 14.0164 36.2784C14.1354 36.4674 14.2529 36.658 14.3799 36.8414C14.536 37.0658 14.7024 37.2814 14.8705 37.4977C15.0137 37.6819 15.1569 37.8653 15.3081 38.0422C15.4746 38.2369 15.6491 38.4251 15.826 38.6125C16.0046 38.8015 16.1856 38.9857 16.3738 39.165C16.4598 39.2438 16.5338 39.3323 16.6199 39.4103ZM26.7934 41.7476C24.0443 41.7476 21.4875 40.9176 19.3521 39.5012C19.2499 39.4336 19.1518 39.3613 19.0521 39.2913C18.822 39.1296 18.596 38.9615 18.3764 38.7862C18.2968 38.7226 18.2148 38.6607 18.1368 38.5948C17.8504 38.3551 17.5738 38.1041 17.3092 37.8419C17.2601 37.7929 17.2126 37.743 17.1644 37.6932C16.903 37.4269 16.6504 37.1527 16.4124 36.8655C16.3979 36.8486 16.3826 36.8318 16.3689 36.8149C16.1116 36.502 15.8695 36.1771 15.6411 35.8417C15.6137 35.8015 15.5864 35.7604 15.5598 35.7194C15.1134 35.0503 14.7266 34.3393 14.4032 33.5937C14.3767 33.5317 14.3494 33.4698 14.3236 33.4079C14.1724 33.0452 14.0349 32.6744 13.9158 32.2964C13.9006 32.2489 13.8885 32.1998 13.874 32.1524C13.7695 31.809 13.6802 31.4583 13.6038 31.1036C13.5885 31.0328 13.5708 30.9628 13.5563 30.8913C13.5193 30.7071 13.5 30.5181 13.4703 30.3315C16.5588 31.9352 22.94 32.4202 26.7926 32.4202C30.6459 32.4202 37.0264 31.9352 40.1149 30.3315C39.1079 36.7875 33.5269 41.7476 26.7934 41.7476Z"
      fill="#CCCCCC"
      fillRule="evenodd"
    />
  </svg>
);

export default SVG;
