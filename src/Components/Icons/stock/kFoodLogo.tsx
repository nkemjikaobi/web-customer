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
    height="40"
    viewBox="0 0 100 40"
    width="100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        d="M39.7711 14.1794V18.9706H35.7776V3H39.7711V11.0993H41.5961L44.1047 6.87781H48.3262L44.9042 12.6963L48.3262 18.9706H44.1047L41.4822 14.1794H39.7711Z"
        fill="#E5087F"
      />
      <path
        d="M60.6451 15.5486C60.6451 16.6881 60.3219 17.5816 59.6756 18.2291C59.0293 18.8766 58.1358 19.1998 56.9952 19.1986H51.75C50.6081 19.1986 49.7146 18.8754 49.0695 18.2291C48.4245 17.5828 48.1013 16.6893 48.1001 15.5486V10.3035C48.1001 9.16401 48.4232 8.27053 49.0695 7.62302C49.7158 6.97551 50.6093 6.65236 51.75 6.65357H56.9952C58.1371 6.65357 59.0305 6.97672 59.6756 7.62302C60.3207 8.26932 60.6439 9.16281 60.6451 10.3035V15.5486ZM56.6533 10.6435C56.6533 10.0346 56.3489 9.73314 55.74 9.73917H53.0034C52.3933 9.73917 52.0888 10.0406 52.09 10.6435V15.2068C52.09 15.8097 52.3945 16.1111 53.0034 16.1111H55.74C56.3501 16.1111 56.6545 15.8097 56.6533 15.2068V10.6435Z"
        fill="#E5087F"
      />
      <path
        d="M68.5165 9.95795C67.5865 9.97859 66.6643 10.1327 65.7781 10.4155V18.9706H61.7864V6.87777H65.3223L65.5502 8.01905C66.2281 7.5648 66.97 7.21428 67.7514 6.97906C68.3685 6.78115 69.0101 6.66976 69.6577 6.64807H70.6833C71.7178 6.64807 72.5468 6.95977 73.1702 7.58316C73.7936 8.20655 74.1059 9.03553 74.1071 10.0701V18.9706H70.1135V10.7574C70.1163 10.6518 70.0975 10.5468 70.0584 10.4487C70.0193 10.3506 69.9607 10.2614 69.8861 10.1867C69.8115 10.1119 69.7225 10.0531 69.6245 10.0138C69.5265 9.97446 69.4215 9.95547 69.3159 9.95795H68.5165Z"
        fill="#E5087F"
      />
      <path
        d="M83.1178 18.0571C81.8438 18.3394 80.5447 18.4927 79.24 18.5147H78.4406C77.406 18.5147 76.577 18.2024 75.9536 17.5778C75.3303 16.9532 75.0186 16.1242 75.0186 15.0909V10.5294C75.0186 9.38753 75.3417 8.49404 75.988 7.84895C76.6343 7.20385 77.5308 6.8801 78.6775 6.87769H87.1186V19.6542C87.1186 20.6888 86.8069 21.5177 86.1835 22.1411C85.5601 22.7645 84.7281 23.0762 83.6876 23.0762C81.0197 23.0599 78.3545 22.9072 75.7022 22.6186V19.6542C78.6094 19.8857 80.8154 20.0015 82.3202 20.0015C82.4257 20.0037 82.5306 19.9845 82.6285 19.9451C82.7264 19.9057 82.8153 19.8469 82.8898 19.7721C82.9643 19.6974 83.023 19.6084 83.0622 19.5104C83.1014 19.4124 83.1203 19.3075 83.1178 19.202V18.0571ZM80.3795 15.4345C81.2971 15.438 82.2134 15.3618 83.1178 15.2066V9.96148H79.9237C79.316 9.96148 79.0103 10.2671 79.0103 10.8749V14.6351C79.0078 14.7408 79.0268 14.8458 79.0661 14.9439C79.1054 15.0421 79.1642 15.1312 79.2389 15.2059C79.3137 15.2806 79.4028 15.3394 79.5009 15.3787C79.599 15.418 79.7041 15.437 79.8097 15.4345H80.3795Z"
        fill="#E5087F"
      />
      <path
        d="M89.0504 7.1075C91.5513 6.81873 94.066 6.66597 96.5835 6.6499C97.6181 6.6499 98.4471 6.9616 99.0704 7.58499C99.6938 8.20838 100.006 9.03736 100.006 10.0719V18.9706H96.4641L96.2362 17.8312C95.5587 18.2856 94.8167 18.6355 94.0351 18.8693C93.418 19.0674 92.7764 19.1788 92.1287 19.2003H91.3383C90.3038 19.2003 89.4748 18.8886 88.8514 18.2652C88.228 17.6418 87.9115 16.8123 87.9019 15.7765V14.7564C87.9019 13.7242 88.2136 12.8953 88.8369 12.2695C89.4603 11.6437 90.2941 11.3271 91.3383 11.3199H96.0156V10.4156C96.0183 10.3098 95.9995 10.2047 95.9603 10.1064C95.9211 10.0082 95.8623 9.91898 95.7875 9.8442C95.7127 9.76941 95.6235 9.71062 95.5253 9.67142C95.4271 9.63221 95.3219 9.6134 95.2161 9.61613C94.2286 9.61613 93.1374 9.66195 91.9424 9.75359C90.7475 9.84523 89.7859 9.91336 89.0576 9.95797L89.0504 7.1075ZM93.27 16.0044C94.1999 15.9844 95.1221 15.8309 96.0084 15.5486V14.1794H92.7003C92.5947 14.1767 92.4897 14.1955 92.3916 14.2346C92.2935 14.2737 92.2043 14.3323 92.1296 14.4069C92.0548 14.4815 91.996 14.5705 91.9567 14.6685C91.9174 14.7665 91.8984 14.8715 91.9008 14.9771V15.2068C91.8984 15.3123 91.9174 15.4173 91.9567 15.5153C91.996 15.6134 92.0548 15.7024 92.1296 15.7769C92.2043 15.8515 92.2935 15.9102 92.3916 15.9493C92.4897 15.9884 92.5947 16.0071 92.7003 16.0044H93.27Z"
        fill="#E5087F"
      />
      <path
        d="M50.1528 36.0609H46.0471V20.092H58.7079V23.2862H50.1528V27.05H56.8829V30.2442H50.1528V36.0609Z"
        fill="#F9A024"
      />
      <path
        d="M71.4845 32.6388C71.4845 33.7807 71.1613 34.6748 70.515 35.3211C69.8687 35.9674 68.9752 36.2906 67.8345 36.2906H62.5803C61.4409 36.2906 60.5474 35.9674 59.8999 35.3211C59.2524 34.6748 58.9292 33.7807 58.9304 32.6388V27.3937C58.9304 26.2542 59.2536 25.3607 59.8999 24.7132C60.5462 24.0657 61.4397 23.7419 62.5803 23.7419H67.8255C68.965 23.7419 69.8585 24.0651 70.506 24.7114C71.1535 25.3577 71.4766 26.2512 71.4754 27.3919L71.4845 32.6388ZM67.4909 27.7355C67.4909 27.1254 67.1894 26.8239 66.5866 26.8312H63.8464C63.2435 26.8312 62.9421 27.1326 62.9421 27.7355V32.3006C62.9421 32.9107 63.2435 33.2152 63.8464 33.214H66.5847C67.1876 33.214 67.4891 32.9095 67.4891 32.3006L67.4909 27.7355Z"
        fill="#F9A024"
      />
      <path
        d="M85.8563 32.6389C85.8563 33.7807 85.5331 34.6748 84.8868 35.3211C84.2405 35.9674 83.347 36.2906 82.2064 36.2906H76.9612C75.8193 36.2906 74.9258 35.9674 74.2807 35.3211C73.6356 34.6748 73.3125 33.7807 73.3113 32.6389V27.3937C73.3113 26.2542 73.6344 25.3607 74.2807 24.7132C74.927 24.0657 75.8205 23.7426 76.9612 23.7438H82.2064C83.3482 23.7438 84.2417 24.0669 84.8868 24.7132C85.5319 25.3595 85.8551 26.253 85.8563 27.3937V32.6389ZM81.8645 27.7355C81.8645 27.126 81.5589 26.8312 80.9511 26.8312H78.2146C77.6045 26.8312 77.3 27.1326 77.3012 27.7355V32.3006C77.3012 32.9108 77.6057 33.2152 78.2146 33.214H80.9511C81.5589 33.214 81.8645 32.9102 81.8645 32.3006V27.7355Z"
        fill="#F9A024"
      />
      <path
        d="M96.4641 36.0627L96.2362 34.9214C95.5587 35.3758 94.8166 35.7258 94.035 35.9596C93.4186 36.1575 92.7776 36.2688 92.1305 36.2906H91.1032C90.0686 36.2906 89.2396 35.9783 88.6162 35.3537C87.9929 34.7291 87.6812 33.9007 87.6812 32.8685V27.6234C87.6812 26.4839 88.0043 25.5904 88.6506 24.9429C89.2969 24.2954 90.1928 23.9711 91.3383 23.9698H96.0155V20.092H100.007V36.0627H96.4641ZM93.27 32.9879C94.2 32.9682 95.1224 32.814 96.0083 32.5303V27.0555H92.5863C91.9786 27.0555 91.6819 27.3593 91.6819 27.9688V32.1885C91.68 32.294 91.6993 32.3988 91.7388 32.4967C91.7783 32.5946 91.8371 32.6835 91.9117 32.7581C91.9864 32.8328 92.0753 32.8916 92.1731 32.9311C92.271 32.9705 92.3759 32.9899 92.4814 32.9879H93.27Z"
        fill="#F9A024"
      />
      <path
        d="M29.2391 8.33204C25.9835 5.07642 21.9242 3.44861 17.0613 3.44861C12.1983 3.44861 8.13905 5.07642 4.88343 8.33204C1.62781 11.5877 0 15.6475 0 20.5117C0 25.3565 1.62781 29.4104 4.88343 32.6732C8.13905 35.9361 12.1983 37.5699 17.0613 37.5747C21.9242 37.5747 25.9835 35.9469 29.2391 32.6913C32.4947 29.4357 34.1225 25.3758 34.1225 20.5117C34.1225 15.6499 32.4947 11.5901 29.2391 8.33204"
        fill="#F9A024"
      />
      <path
        d="M8.21321 14.7383C8.83781 14.2082 9.63324 13.9223 10.4524 13.9334C11.3534 13.9178 12.2482 14.0858 13.0822 14.4272C13.9899 14.7969 14.8513 15.2716 15.6487 15.8416L16.043 15.5305C15.5072 14.5375 14.7209 13.702 13.7622 13.1069C12.7614 12.4689 11.5976 12.1335 10.4108 12.141C9.78126 12.1356 9.15766 12.2626 8.58037 12.5136C7.99337 12.7727 7.47771 13.1698 7.07736 13.6712C6.34666 14.6026 6.00098 15.7788 6.11153 16.9575L6.61072 17.0172C7.04481 16.1129 7.57294 15.2755 8.21321 14.7347"
        fill="#E5087F"
      />
      <path
        d="M19.2986 13.1431C20.0331 12.6205 20.8654 12.2514 21.7458 12.0579C22.5411 11.8616 23.3806 11.9592 24.1097 12.3328C24.8567 12.7126 25.5566 13.4054 26.1897 14.1885L26.6636 14.0076C26.5025 12.8341 25.8972 11.7672 24.9724 11.0269C24.4676 10.6307 23.8754 10.361 23.2452 10.2402C22.6251 10.1302 21.9891 10.1493 21.3768 10.2962C20.2197 10.5612 19.1635 11.154 18.3346 12.0036C17.5369 12.8021 16.9619 13.7954 16.667 14.8848L17.1228 15.0983C17.7666 14.3606 18.4951 13.7013 19.2932 13.134"
        fill="#E5087F"
      />
      <path
        d="M27.1447 24.5992C26.7851 25.4588 26.2783 26.249 25.6471 26.9342C25.345 27.2741 25.0133 27.5865 24.6559 27.8675C24.3085 28.1558 23.939 28.4165 23.5508 28.6471C21.9972 29.5731 20.2319 30.1067 18.3943 30.3979C16.585 30.6994 14.7349 30.6534 12.9429 30.2622C12.0409 30.0565 11.164 29.7533 10.3276 29.3579C9.47143 28.9569 8.66678 28.454 7.93107 27.8603L7.65796 28.0846C8.23317 28.9322 8.95828 29.6677 9.79762 30.255C10.6368 30.8565 11.5585 31.3335 12.5342 31.6712C14.5105 32.3456 16.6228 32.522 18.6837 32.1848C20.6895 31.8828 22.7387 31.1991 24.4136 29.9041C26.0812 28.638 27.3563 26.7461 27.4973 24.668L27.1447 24.5992Z"
        fill="#E5087F"
      />
      <path
        d="M21.9084 29.8554C21.6136 29.915 21.3025 29.9747 21.004 30.0236C20.8394 30.0489 20.6749 30.0724 20.5103 30.0905C20.3855 30.105 20.2046 30.1628 20.1069 30.0561C20.6694 29.2567 20.8575 28.3596 20.8467 27.4046C20.8467 26.9072 20.8087 26.4098 20.8467 25.9142C20.9136 24.9737 21.2934 23.7095 22.366 23.5087C23.5814 23.279 24.3302 24.5288 24.6124 25.5181C24.7872 26.1358 24.8719 26.7754 24.8638 27.4173C24.8602 27.7035 24.8384 27.9893 24.7986 28.2728C24.7881 28.4371 24.759 28.5997 24.7118 28.7575C24.6377 28.9492 24.5002 28.9962 24.3212 29.0704C23.8718 29.2586 23.413 29.4234 22.9466 29.5642C22.989 29.5239 23.0165 29.4703 23.0243 29.4122C23.1405 28.947 23.2156 28.4726 23.2486 27.9942C23.2922 27.3811 23.2539 26.765 23.1347 26.162C23.0967 25.9812 22.9538 25.7768 22.7566 25.7695C22.4817 25.7695 22.5089 26.1711 22.5251 26.3483C22.614 27.0181 22.6297 27.6955 22.5722 28.3686C22.5267 28.6866 22.4435 28.9981 22.3244 29.2965C22.2502 29.4864 22.1435 29.8101 21.9084 29.8572"
        fill="#E5087F"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          fill="white"
          height="34.5747"
          transform="translate(0 3)"
          width="100"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SVG;