/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";

import Icon from "../Icons/icon";
import Button from "Components/Button/button";
import Input from "Components/Form/inputs/Input/Input";
import SupportLink from "Components/Footer/utils/supportLink";
import styles from "./mobileFooter.module.scss";
import { connect } from "react-redux";
import IUser from "dto/Authentication/IUser";
import UserService from "Http/Services/UserService";
import { NotifyUserAction } from "Http/Redux/Actions/NotificationAction";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";
import INotification from "dto/Notification/INotification";
import {
  aboutUsData,
  paymentData,
  appStoreData,
  buyingData,
  moreInfoData,
} from "Components/Footer/footer";
import { useHistory } from "react-router-dom";
import { SOCIAL_MEDIA_URLS } from "Helpers/Constants";

export const mobileData = [
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
    name: "mobileIg",
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

const sectionHeaderData = [
  {
    id: 1,
    title: "about konga",
    body: aboutUsData,
  },
  {
    id: 2,
    title: "payment",
    body: paymentData,
  },
  {
    id: 3,
    title: "buying on konga",
    body: buyingData,
  },
  {
    id: 4,
    title: "more info",
    body: moreInfoData,
  },
  {
    id: 5,
    title: "download & shop on the go",
    body: appStoreData,
  },
  {
    id: 6,
    title: "connect with us",
    body: mobileData,
  },
];
const supportData = [
  {
    header: "help center",
    icon: "ft-help",
    text: "help.konga.com",
  },
  {
    header: "PHONE SUPPORT",
    icon: "ft-phone",
    text: "0809 460 5555",
  },
  {
    header: "WHATSAPP US",
    icon: "ft-whatsapp",
    text: "09070038400, 08094605555",
  },
];

const supportListItems = supportData.map((e, i) => {
  return (
    <div className={styles.contactData} key={i}>
      <SupportLink
        contact={e.text}
        header={e.header}
        icon={e.icon}
        styles={styles}
      />
    </div>
  );
});

interface IProps {
  user?: IUser;
  NotifyUserAction: Function;
  hideFooterOnMobile?: string;
}
const Footer: React.FunctionComponent<IProps> = (props: IProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  const [showBodyOptions, setShowBodyOptions] = useState<boolean>(false);
  const [activeDropDown, setActiveDropDown] = useState<number>(0);

  const history = useHistory();

  const handleBodyOptions = () => {
    if (!showMoreOptions) {
      setShowBodyOptions(false);
    }
  };

  const handleBodyOptionsClose = (id: number) => {
    if (activeDropDown === id && showBodyOptions) {
      setShowBodyOptions(false);
    }
  };

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
        props.NotifyUserAction(notification);
      });
  };

  return (
    <div
      className={
        props.hideFooterOnMobile === "true" ? styles.tabletAndAboveOnly : ""
      }
    >
      <div className={styles.footer}>
        <div className={styles.footer_top}>
          <div className={styles.footer_topBand}>
            {supportListItems}
            <div className={styles.latestDeals}>
              <p>GET LATEST DEALS</p>
            </div>
            <div className={styles.newsLetter}>
              <Input
                name={"emailAddress"}
                onChange={(e: any) => setEmailAddress(e.target.value)}
                placeholder="Email Address"
                readOnly={props.user ? false : true}
                type="email"
                value={emailAddress}
              />
              <div className={styles.subscribeBtn}>
                <Button
                  btnClass={"btn-primary text-white"}
                  handleClick={handleSubscribeEvent}
                  isDisable={props.user ? false : true}
                  isSubmitting={isSubmitting}
                  title="Subscribe"
                />
              </div>
            </div>
          </div>
        </div>
        <>
          <div
            className={styles.footer_moreOptions}
            onClick={() => {
              setShowMoreOptions(!showMoreOptions);
              handleBodyOptions();
            }}
          >
            <p>{showMoreOptions ? "less options" : "more options"}</p>
            <div className={styles.arrowBottom}>
              {showMoreOptions ? (
                <Icon name="ft-arrowUp" />
              ) : (
                <Icon name="ft-arrowBottom" />
              )}
            </div>
          </div>
          {showMoreOptions && (
            <>
              {sectionHeaderData.map((header, index) => {
                return (
                  <>
                    <div
                      className={styles.footer_moreOptions}
                      key={index}
                      onClick={() => {
                        setActiveDropDown(header.id);
                        setShowBodyOptions(true);
                        handleBodyOptionsClose(header.id);
                      }}
                    >
                      <p
                        className={`${
                          activeDropDown === header.id && styles.active
                        }`}
                      >
                        {header.title}
                      </p>
                    </div>
                    <div
                      className={`${
                        header.id !== 5 && header.id !== 6
                          ? styles.flexIt2
                          : styles.flexIt
                      }`}
                    >
                      {header.body.map((body, index) => {
                        return (
                          activeDropDown === header.id &&
                          showBodyOptions && (
                            <div
                              className={`${
                                header.id !== 5 && header.id !== 6
                                  ? ""
                                  : styles.container
                              }`}
                            >
                              {header.id === 5 ? (
                                <div className={styles.storeLabelContainer}>
                                  <div
                                    className={styles.storeLabel}
                                    key={index}
                                  >
                                    <a
                                      href={body.route}
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      <div className={styles.icon}>
                                        <Icon name={body.icon} />
                                      </div>
                                      <div className={styles.text}>
                                        <p className={styles.heading}>
                                          Download on
                                        </p>
                                        <p className={styles.label}>
                                          {body.name}
                                        </p>
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              ) : header.id === 6 ? (
                                <div className={styles.footerIcons}>
                                  <div className={styles.footerIconWrapper}>
                                    <div className={styles.img}>
                                      <a
                                        href={body.route}
                                        rel="noreferrer"
                                        target="_blank"
                                      >
                                        <Icon name={body.name} />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className={styles.bodyTexts}
                                  key={index}
                                  onClick={() => history.push(body.route)}
                                >
                                  <p>{body.name}</p>
                                  <Icon name="ft-instagram" />
                                </div>
                              )}
                            </div>
                          )
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </>
          )}
        </>
      </div>
      {showMoreOptions && (
        <div className={styles.footerBottom}>
          <p>
            Copyright &copy; {new Date().getFullYear()} Konga. All Rights
            Reserved.
          </p>
        </div>
      )}
    </div>
  );
};

Footer.defaultProps = {
  user: undefined,
  hideFooterOnMobile: "false",
};

const mapStateToProps = (state: any) => ({ user: state.auth.CurrentUser });
export default connect(mapStateToProps, { NotifyUserAction })(Footer);
