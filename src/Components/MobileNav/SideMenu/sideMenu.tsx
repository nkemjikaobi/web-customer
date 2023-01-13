import Icon from "Components/Icons";
import React, { Fragment, useState } from "react";
import styles from "./sideMenu.module.scss";
import {
  sideMenuData,
  notLoggedInSideMenuData,
  forBusinessData,
  faqData,
  walletData,
  myOrdersData,
} from "./data";
import { CURRENCIES } from "Helpers/Constants";
import accounting from "accounting";
import LoggedOutContent from "PagesComponents/Navbar/LoggedOutContent/LoggedOutContent";
import LoggedInContent from "PagesComponents/Navbar/LoggedInContent/loggedInContent";
import { composeClasses } from "libs/utils/utils";

const renderHeading = (
  loggedIn: boolean,
  firstName: string,
  walletBalance: number
) => {
  const [showBalance, setShowBalance] = useState<boolean>(false);
  return (
    <div className={styles.header}>
      <div className={styles.profileIcon}>
        <Icon name="mn-profile" />
      </div>
      {loggedIn ? (
        <div className={styles.loggedInHeader}>
          <p>Hi, {firstName} </p>
          <span className={styles.walletHeading}>Wallet Balance</span>
          <br />
          <div className={styles.viewBalance}>
            <span className={styles.fontBold}>
              {showBalance
                ? accounting.formatMoney(walletBalance, CURRENCIES.NAIRA)
                : "************"}
            </span>
            {showBalance ? (
              <div
                className={styles.balance}
                onClick={() => setShowBalance(false)}
              >
                <Icon name="eyeOff" />
              </div>
            ) : (
              <div
                className={styles.balance}
                onClick={() => setShowBalance(true)}
              >
                <Icon name="eye" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Hello Sign In</p>
      )}
    </div>
  );
};

interface IProps {
  className: any;
  closeSideMenu: any;
  isLoggedIn: boolean;
  firstName: string;
  walletBalance: number;
}
const mobileNav: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <Fragment>
      <div className={styles.sideMenuWrapper}>
        <div className={composeClasses(styles.sideMenu, props.className)}>
          <div>
            {renderHeading(
              props.isLoggedIn,
              props.firstName,
              props.walletBalance
            )}
          </div>
          {/* <div className={styles.closeButton} onClick={props.closeSideMenu}>
            <p>X</p>
          </div> */}
          <div className={styles.sideMenu_content}>
            {props.isLoggedIn ? (
              <LoggedInContent
                faqData={faqData}
                forBusinessData={forBusinessData}
                myOrdersData={myOrdersData}
                sideMenuData={sideMenuData}
                walletData={walletData}
              />
            ) : (
              <LoggedOutContent
                faqData={faqData}
                forBusinessData={forBusinessData}
                notLoggedInSideMenuData={notLoggedInSideMenuData}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default mobileNav;
