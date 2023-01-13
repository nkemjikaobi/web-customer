/* eslint-disable @typescript-eslint/ban-types */
import Icon from "Components/Icons";
import BusinessDropDown from "Components/MobileNavSideDropDown/mobileNavDropDown";
import { PersistUser, SignOutAction } from "Http/Redux/Actions/AuthAction";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import styles from "./loggedInContent.module.scss";

interface IProp {
  sideMenuData: Array<any>;
  forBusinessData: Array<any>;
  faqData: Array<any>;
  walletData: Array<any>;
  myOrdersData: Array<any>;
  SignOutAction: Function;
}

const LoggedInContent: React.FunctionComponent<IProp> = (props: IProp) => {
  const [displayForBusinessChildren, setDisplayForBusinessChildren] =
    useState<boolean>(false);
  const [displayFAQChildren, setDisplayFAQChildren] = useState<boolean>(false);
  const [displayWalletOptions, setDisplayWalletOptions] =
    useState<boolean>(false);
  const [displayMyOrders, setDisplayMyOrders] = useState<boolean>(false);
  const history = useHistory();
  const { pathname } = useLocation();
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setDisplayForBusinessChildren(false);
      setDisplayFAQChildren(false);
      setDisplayWalletOptions(false);
      setDisplayMyOrders(false);
    }

    return () => {
      mounted = false;
    };
  }, []);

  const handleForBusinessChildren = () => {
    setDisplayForBusinessChildren(!displayForBusinessChildren);
  };
  const handleFAQChildren = () => {
    setDisplayFAQChildren(!displayFAQChildren);
  };
  const handleWalletOptions = () => {
    setDisplayWalletOptions(!displayWalletOptions);
  };
  const handleMyOrders = () => {
    setDisplayMyOrders(!displayMyOrders);
  };

  const logoutUser = (event: any) => {
    event.preventDefault();
    props.SignOutAction(history, pathname);
  };

  return (
    <div>
      {props.sideMenuData.map((e: any, i: number) => {
        if (e.isWalletOptions) {
          return (
            <div className={styles.contentWrapper} key={i}>
              <Link key={i} onClick={handleWalletOptions} to={`${e.route}`}>
                <div className={styles.listItem}>
                  <Icon name={e.icon} />
                  <p>{e.name}</p>
                  <div className={styles.arrowIcon}>
                    <Icon name="smallCaret" />
                  </div>
                </div>
              </Link>
              <BusinessDropDown
                display={displayWalletOptions}
                dropDownData={props.walletData}
              />
            </div>
          );
        }
        if (e.isMyOrders) {
          return (
            <div className={styles.contentWrapper} key={i}>
              <Link key={i} onClick={handleMyOrders} to={`${e.route}`}>
                <div className={styles.listItem}>
                  <Icon name={e.icon} />
                  <p>{e.name}</p>
                  <div className={styles.arrowIcon}>
                    <Icon name="smallCaret" />
                  </div>
                </div>
              </Link>
              <BusinessDropDown
                display={displayMyOrders}
                dropDownData={props.myOrdersData}
              />
            </div>
          );
        }
        if (e.isForBusiness) {
          return (
            <div className={styles.contentWrapper} key={i}>
              <Link
                key={i}
                onClick={handleForBusinessChildren}
                to={`${e.route}`}
              >
                <div className={styles.listItem}>
                  <Icon name={e.icon} />
                  <p>{e.name}</p>
                  <div className={styles.arrowIcon}>
                    <Icon name="smallCaret" />
                  </div>
                </div>
              </Link>
              <BusinessDropDown
                display={displayForBusinessChildren}
                dropDownData={props.forBusinessData}
              />
            </div>
          );
        }

        if (e.isFAQ) {
          return (
            <div className={styles.contentWrapper} key={i}>
              <Link key={i} onClick={handleFAQChildren} to={`${e.route}`}>
                <div className={styles.listItem}>
                  <Icon name={e.icon} />
                  <p>{e.name}</p>
                  <div className={styles.arrowIcon}>
                    <Icon name="smallCaret" />
                  </div>
                </div>
              </Link>
              <BusinessDropDown
                display={displayFAQChildren}
                dropDownData={props.faqData}
              />
            </div>
          );
        }

        if (e.isTransactions) {
          return (
            <div className={styles.contentWrapper} key={i}>
              <Link key={i} to={`${e.route}`}>
                <div className={styles.listItem}>
                  <Icon name={e.icon} />
                  <p>{e.name}</p>
                </div>
              </Link>
              <hr />
            </div>
          );
        }

        return (
          <div className={styles.contentWrapper} key={i}>
            <Link key={i} to={`${e.route}`}>
              <div className={styles.listItem}>
                <Icon name={e.icon} />
                <p>{e.name}</p>
              </div>
            </Link>
          </div>
        );
      })}
      <div className={styles.logoutContainer}>
        <div className={styles.logout}>
          <Link onClick={(e) => logoutUser(e)} to="#">
            <Icon name="mn-logout" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({ auth: state.auth });

export default connect(mapStateToProps, { PersistUser, SignOutAction })(
  LoggedInContent
);
