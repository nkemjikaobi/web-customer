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
    height="50"
    viewBox="0 0 49 50"
    width="49"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M38.9788 9.34297L38.9751 9.34022C38.9595 9.32919 38.9402 9.32368 38.9246 9.31357C38.965 8.76139 38.7216 8.2285 38.2346 7.91704C35.8697 6.40107 31.2942 4.18775 26.7619 6.00324V2.55969C26.7619 1.14846 25.7393 0 24.4825 0L22.44 0C21.1822 0 20.1597 1.14846 20.1597 2.55969V6.33124C18.1163 5.96741 13.6649 5.60725 9.38707 8.16235C8.73842 8.54824 8.47198 9.31541 8.73934 10.0256C8.76598 10.0982 8.8156 10.1524 8.85143 10.2176C8.75772 10.2424 8.66033 10.2636 8.56753 10.2884C8.3507 10.3463 8.14306 10.4538 7.96298 10.6017C2.90239 14.8124 0 20.8157 0 27.0706C0 39.3381 10.8994 49.3177 24.2978 49.3177C37.6962 49.3177 48.5956 39.3381 48.5956 27.0706C48.5956 20.0531 45.0905 13.5914 38.9788 9.34297ZM20.156 8.20281C20.6071 8.29744 21.072 8.18351 21.4303 7.89043C21.7914 7.59734 21.9972 7.16092 21.9972 6.69511V2.55972C21.9972 2.15363 22.2361 1.83757 22.44 1.83757H24.4825C24.6874 1.83757 24.9244 2.15363 24.9244 2.55972V6.46358C24.9244 6.98728 25.1872 7.46963 25.6282 7.75261C26.0701 8.03743 26.6204 8.07694 27.1 7.85643C30.4581 6.32117 34.0101 7.62766 36.2822 8.88913C34.1397 8.86157 32.3958 9.03154 31.0599 9.36046C30.4554 9.50838 30.0061 10.0008 29.9152 10.6155C29.8224 11.2449 30.1191 11.8595 30.6695 12.1848C32.0054 12.9703 32.88 13.8523 33.4607 14.7187C33.8787 15.3426 34.1479 15.9581 34.306 16.5232C32.2929 14.8749 30.0355 14.2694 28.4883 14.0526C27.9729 13.98 27.5355 13.9516 27.213 13.9405C26.7904 13.9267 26.3898 14.082 26.0866 14.3797C25.7862 14.6746 25.6171 15.0872 25.6236 15.5107C25.6971 20.2295 24.0663 23.3947 23.1181 24.827C22.2131 22.9086 21.9338 18.7815 21.9843 15.3903C21.9972 14.6076 21.4138 13.9414 20.6255 13.8395C20.3893 13.8091 20.1505 13.7944 19.9107 13.7944C19.8647 13.7944 19.8179 13.8027 19.7729 13.8045C19.6479 13.8073 19.522 13.8211 19.3962 13.8312C19.2069 13.8468 19.0176 13.8652 18.8274 13.8973C18.7043 13.9176 18.5812 13.9442 18.4581 13.9708C18.2624 14.0131 18.0676 14.0609 17.8728 14.1169C17.7543 14.1509 17.6367 14.1877 17.5191 14.2272C17.3179 14.2943 17.1185 14.3668 16.9192 14.4468C16.8071 14.4918 16.6959 14.5359 16.5847 14.5846C16.3808 14.6737 16.1786 14.7683 15.9783 14.8685C15.8736 14.9199 15.7689 14.9705 15.665 15.0247C15.4583 15.1331 15.2562 15.2479 15.054 15.3655C14.9594 15.4207 14.8648 15.4721 14.7711 15.5291C14.5515 15.6623 14.3383 15.8001 14.127 15.9398C14.0581 15.9857 13.9864 16.0289 13.9184 16.0748C13.6401 16.2632 13.369 16.4552 13.1072 16.6491C13.4361 16.0528 13.7871 15.5217 14.1445 15.044C14.1638 15.0182 14.1821 14.9888 14.2005 14.964C14.5763 14.4688 14.9576 14.0361 15.3288 13.6603C15.3306 13.6585 15.3324 13.6566 15.3343 13.6548C15.824 13.1587 16.288 12.7719 16.6968 12.465C16.7556 12.4209 16.8181 12.3703 16.8741 12.3299C16.9072 12.306 16.9339 12.2895 16.966 12.2665C17.079 12.1866 17.1911 12.1085 17.2903 12.0433C17.7718 11.7281 18.0364 11.1769 17.9767 10.6026C17.9188 10.0275 17.5485 9.5387 17.011 9.32646C16.9642 9.30809 16.9063 9.2989 16.8576 9.28144C16.6555 9.20978 16.4396 9.14639 16.2117 9.09034C16.072 9.05543 15.9306 9.02235 15.7817 8.99479C15.7606 8.99111 15.7422 8.98468 15.7202 8.98101C15.7064 8.97825 15.6935 8.98193 15.6797 8.98009C14.6314 8.79633 13.3947 8.76877 11.9532 8.92312C15.4188 7.48617 18.753 7.91248 20.156 8.20281ZM24.2969 47.481C11.9128 47.481 1.83662 38.3255 1.83662 27.0715C1.83662 21.3797 4.48359 15.9057 9.09398 12.0505C11.0758 11.5231 13.2082 11.1005 15.3683 10.7936C15.4408 10.8065 15.5208 10.8138 15.5906 10.8285C15.6485 10.8405 15.7082 10.8515 15.7633 10.8644C15.6806 10.9241 15.5888 10.9994 15.5015 11.0656C15.4059 11.1391 15.315 11.2052 15.2148 11.2861C15.1275 11.3568 15.0347 11.4413 14.9447 11.5176C14.8335 11.6122 14.726 11.6995 14.6112 11.8033C14.5028 11.9017 14.3907 12.0156 14.2795 12.1231C14.1775 12.2214 14.0783 12.3114 13.9745 12.4171C13.7889 12.6064 13.6015 12.8149 13.414 13.029C13.3828 13.0648 13.3525 13.0942 13.3212 13.13C12.4411 14.1536 11.5572 15.4591 10.8415 17.0918C10.5539 17.7505 10.7459 18.4856 11.3202 18.9192C11.8935 19.3529 12.6809 19.3363 13.2349 18.8806C14.8051 17.5879 17.7387 15.4784 20.1449 15.6374C20.1211 18.2219 20.258 23.8282 21.7941 26.2207C22.0698 26.6497 22.5393 26.9153 23.0464 26.93H23.0924C23.583 26.93 24.0451 26.6957 24.3364 26.296C25.2891 24.9868 27.4721 21.3751 27.4648 15.7908C28.8071 15.879 31.5368 16.3301 33.7069 18.4497C34.181 18.9119 34.8701 19.0212 35.459 18.7263C36.0544 18.4304 36.386 17.8121 36.3024 17.1497C36.2491 16.7316 36.1545 16.2722 36.0048 15.7908C35.9983 15.7697 35.9946 15.7504 35.9882 15.7283C35.8467 15.2846 35.6446 14.8206 35.3892 14.3511C35.3543 14.2859 35.3285 14.2225 35.2909 14.1572C35.176 13.9579 35.0354 13.7576 34.8958 13.5582C34.8471 13.4884 34.8094 13.4185 34.758 13.3487C34.6385 13.1889 34.4934 13.0299 34.3565 12.871C34.2628 12.7616 34.1828 12.6514 34.0809 12.543C33.9614 12.4162 33.8144 12.2921 33.6821 12.1672C33.5369 12.0294 33.4046 11.8897 33.2439 11.7537C33.1051 11.637 32.937 11.525 32.7854 11.4101C32.6026 11.2714 32.4335 11.1299 32.2314 10.9948C32.6908 10.9158 33.2641 10.8441 33.9623 10.7936C33.9899 10.7918 34.0184 10.7899 34.0469 10.7881C34.1847 10.7789 34.3289 10.7706 34.4759 10.7633C34.5549 10.7596 34.6349 10.7559 34.7166 10.7523C34.8306 10.7477 34.9454 10.7431 35.0649 10.7394C35.21 10.7348 35.3598 10.7321 35.5132 10.7302C35.584 10.7293 35.6538 10.7275 35.7264 10.7265C36.0066 10.7238 36.3034 10.7256 36.6111 10.7302L36.941 10.7596C37.2129 10.7964 37.4858 10.8285 37.7587 10.8616L37.9865 10.8883C43.5616 14.7884 46.758 20.6823 46.758 27.0687C46.758 38.3255 36.6819 47.481 24.2969 47.481ZM5.5659 28.2144C5.4924 27.7127 5.03394 27.359 4.5231 27.4389C4.02145 27.5124 3.67416 27.9792 3.74766 28.4817C3.94887 29.8489 4.39907 31.1315 5.08631 32.291C5.25812 32.5804 5.56407 32.7411 5.87737 32.7411C6.03631 32.7411 6.19802 32.6998 6.34502 32.6125C6.78236 32.3543 6.92568 31.7893 6.66751 31.3538C6.10982 30.4148 5.72853 29.3288 5.5659 28.2144ZM4.70778 25.4279C4.72891 25.4298 4.75096 25.4307 4.77209 25.4307C5.25077 25.4307 5.65411 25.0604 5.68719 24.5753C5.76069 23.5288 5.97476 22.5136 6.32482 21.5572C6.49846 21.0794 6.25407 20.552 5.77723 20.3784C5.29763 20.2057 4.77209 20.4491 4.59845 20.926C4.19051 22.045 3.93969 23.2293 3.85332 24.4485C3.81933 24.9539 4.20062 25.393 4.70778 25.4279Z"
      fill="#CCCCCC"
      fillRule="evenodd"
    />
  </svg>
);

export default SVG;