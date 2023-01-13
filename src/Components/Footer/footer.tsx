/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";

import Icon from "../Icons/icon";
import Button from "Components/Button/button";
import Input from "Components/Form/inputs/Input/Input";
import { composeClasses } from "libs/utils/utils";
import FooterIcon from "Components/Icons/FooterIcon/footerIcon";
import SupportLink from "./utils/supportLink";
import styles from "./footer.module.scss";
import { Link } from "react-router-dom";
import {
  MOBILE_APP_URLS,
  SOCIAL_MEDIA_URLS,
  PAYMENT_URLS,
} from "Helpers/Constants";
import { connect } from "react-redux";
import IUser from "dto/Authentication/IUser";
import UserService from "Http/Services/UserService";
import { NotifyUserAction } from "Http/Redux/Actions/NotificationAction";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";
import INotification from "dto/Notification/INotification";

export const data = [
  {
    route: SOCIAL_MEDIA_URLS.FACEBOOK,
    name: "facebook",
    icon: "",
  },
  {
    route: SOCIAL_MEDIA_URLS.TWITTER,
    name: "twitter",
    icon: "",
  },
  {
    route: SOCIAL_MEDIA_URLS.INSTAGRAM,
    name: "ft-instagram",
    icon: "",
  },
  {
    route: SOCIAL_MEDIA_URLS.YOUTUBE,
    name: "youtube",
    icon: "",
  },
  {
    route: "#",
    name: "googlePlus",
    icon: "",
  },
];

export const aboutUsData = [
  {
    route: "/contact-us",
    name: "Contact Us",
    icon: "",
  },
  {
    route: "/about-us",
    name: "About Us",
    icon: "",
  },
  {
    route: "#",
    name: "Forum",
    icon: "",
  },
  {
    route: "#",
    name: "Careers",
    icon: "",
  },
  {
    route: "#",
    name: "Our Blog",
    icon: "",
  },
  {
    route: "/terms-and-conditions",
    name: "Terms & Conditions",
    icon: "",
  },
];

export const paymentData = [
  {
    route: "/pay-bills",
    name: "kongapay",
    icon: "",
  },
  {
    route: "/pay-bills",
    name: "wallet",
    icon: "",
  },
  {
    route: PAYMENT_URLS.VERVE,
    name: "Verve",
    icon: "",
  },
  {
    route: PAYMENT_URLS.MASTERCARD,
    name: "Mastercard",
    icon: "",
  },
  {
    route: PAYMENT_URLS.VISA,
    name: "visa",
    icon: "",
  },
];

export const appStoreData = [
  {
    icon: "apple",
    name: "App Store",
    route: MOBILE_APP_URLS.IOS,
  },
  {
    icon: "android",
    name: "playStore",
    route: MOBILE_APP_URLS.ANDROID,
  },
];

const supportData = [
  {
    name: "help center",
    icon: "ft-help",
    text: "help.konga.com",
  },
  {
    name: "PHONE SUPPORT",
    icon: "ft-phone",
    text: "0809 460 5555",
  },
  {
    name: "WHATSAPP US",
    icon: "ft-whatsapp",
    text: "09070038400, 08094605555",
  },
];

export const buyingData = [
  {
    route: "#",
    name: "Buyer Safety Centre",
    icon: "",
  },
  {
    route: "/faq-konga",
    name: "FAQs",
    icon: "",
  },
  {
    route: "/send-package",
    name: "Delivery",
    icon: "",
  },
  {
    route: "#",
    name: "Konga Return Policy",
    icon: "",
  },
  {
    route: "#",
    name: "Digital Services",
    icon: "",
  },
  {
    route: "#",
    name: "Bulk purchase",
    icon: "",
  },
];

export const moreInfoData = [
  {
    route: "#",
    name: "Site Map",
    icon: "",
  },
  {
    route: "/send-package/track-package/",
    name: "Track My Order",
    icon: "",
  },
  {
    route: "#",
    name: "Privacy Policy",
    icon: "",
  },
  {
    route: "#",
    name: "Authentic Items",
    icon: "",
  },
];

export const makeMoneyOnKonga = [
  {
    route: "#",
    name: "Become a Konga Affiliate",
    icon: "",
  },
];

const socialIcons = data.map((e, i) => (
  <div className={styles.socialIcon} key={i}>
    <FooterIcon key={i} name={e.name} route={e.route} />
  </div>
));
const appStoreList = appStoreData.map((e, i) => {
  return (
    <div className={styles.storeLabel} key={i}>
      <a href={e.route} rel="noreferrer" target="_blank">
        <div className={styles.icon}>
          <Icon name={e.icon} />
        </div>
        <div className={styles.text}>
          <p className={styles.heading}>Download on</p>
          <p className={styles.label}>{e.name}</p>
        </div>
      </a>
    </div>
  );
});

const aboutUsList = aboutUsData.map((e, i) => {
  return (
    <ul key={i}>
      <li>
        <Link to={e.route}>{e.name}</Link>
      </li>
    </ul>
  );
});
const paymentList = paymentData.map((e, i) => {
  return (
    <ul key={i}>
      <li>
        <a href={e.route} rel="noreferrer">
          {e.name}
        </a>
      </li>
    </ul>
  );
});
const buyingInfoList = buyingData.map((e, i) => {
  return (
    <ul key={i}>
      <li>
        <Link to={e.route}>{e.name}</Link>
      </li>
    </ul>
  );
});

const moreInfoList = moreInfoData.map((e, i) => {
  return (
    <ul key={i}>
      <li>
        <Link to={e.route}>{e.name}</Link>
      </li>
    </ul>
  );
});

const makeMoney = makeMoneyOnKonga.map((e, i) => {
  return (
    <ul key={i}>
      <li>
        <Link to={e.route}>{e.name}</Link>
      </li>
    </ul>
  );
});

const supportListItems = supportData.map((e, i) => {
  return (
    <div className={styles.contactData} key={i}>
      <SupportLink
        contact={e.text}
        header={e.name}
        icon={e.icon}
        styles={styles}
      />
    </div>
  );
});

interface IProps {
  user?: IUser;
  hideFooterOnMobile: string;
  NotifyUserAction: Function;
}
const Footer: React.FunctionComponent<IProps> = ({
  user,
  NotifyUserAction,
  hideFooterOnMobile,
}) => {
  const hideFooterOnMobileVal = hideFooterOnMobile ? false : true;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");

  const handleSubscribeEvent = (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    const notification: INotification = {
      body: "Subscription unsuccessful",
      show: true,
      title: "Subscription Status",
      type: NotificationAlertType.Error,
    };
    UserService.SubscribeForNewsLetter(emailAddress)
      .then((success: boolean) => {
        if (success === true) {
          notification.body = "Subscription successful";
          notification.type = NotificationAlertType.Success;
        }
      })
      .catch((err: any) => console.log(err))
      .finally(() => {
        setIsSubmitting(false);
        NotifyUserAction(notification);
      });
  };

  return (
    <div className={hideFooterOnMobileVal ? styles.tabletAndAboveOnly : ""}>
      <div className={styles.footer}>
        <div className={styles.footer_topBand}>
          <div className={styles.topBandContainer}>
            <div className={styles.containerItems}>
              {supportListItems}
              <div className={styles.latestDeals}>
                <p>GET LATEST DEALS</p>
                <p>Our best promotions sent to your inbox.</p>
              </div>
            </div>
            <div className={styles.newsLetter}>
              <Input
                name={"emailAddress"}
                onChange={(e: any) => setEmailAddress(e.target.value)}
                placeholder="Email Address"
                readOnly={user ? true : false}
                type="email"
                value={emailAddress}
              />
              <div className={styles.subscribeBtn}>
                <Button
                  btnClass={"btn-primary text-white"}
                  handleClick={handleSubscribeEvent}
                  isDisable={user ? true : false}
                  isSubmitting={isSubmitting}
                  title="Subscribe"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer_mainContent}>
          <div className={styles.mainContentContainer}>
            <div className={styles.left}>
              <div className={styles.row}>
                <p className={styles.row_header}>About konga</p>
                <div className={styles.listItems}>{aboutUsList}</div>
              </div>
              <div className={styles.row}>
                <p className={styles.row_header}>Payment</p>
                <div className={styles.listItems}>{paymentList}</div>
              </div>
              <div className={styles.row}>
                <p className={styles.row_header}>Buying on Konga</p>
                <div className={styles.listItems}>{buyingInfoList}</div>
              </div>
              <div className={styles.row}>
                <p className={styles.row_header}>More info</p>
                <div className={styles.listItems}>{moreInfoList}</div>
              </div>
              <div className={styles.row}>
                <p className={styles.row_header}>Make Money on Konga</p>
                <div className={styles.listItems}>{makeMoney}</div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.row}>
                <p className={styles.row_header}>Download & Shop On The Go</p>
                <div className={styles.appStoreLabelList}>{appStoreList}</div>
              </div>
              <div className={composeClasses(styles.row, styles.connect)}>
                <p className={styles.row_header}>Connect with us</p>
                <div className={styles.socialIcons}>{socialIcons}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer_bottom}>
          <div className={styles.footerRule} />
          <p>
            Copyright &copy; {new Date().getFullYear()} Konga. All Rights
            Reserved.
          </p>
          <div className={styles.footerRule} />
        </div>
        <div />
      </div>
    </div>
  );
};

Footer.defaultProps = {
  user: undefined,
};

const mapStateToProps = (state: any) => ({ user: state.auth.CurrentUser });
export default connect(mapStateToProps, { NotifyUserAction })(Footer);
