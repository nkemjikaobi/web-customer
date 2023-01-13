import Icon from "Components/Icons";
import BusinessDropDown from "Components/MobileNavSideDropDown/mobileNavDropDown";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./loggedOutContent.module.scss";

interface IProp {
  notLoggedInSideMenuData: Array<any>;
  forBusinessData: Array<any>;
  faqData: Array<any>;
}

const LoggedOutContent: React.FunctionComponent<IProp> = (props: IProp) => {
  const [displayForBusinessChildren, setdisplayForBusinessChildren] =
    useState(false);
  const [displayFAQChildren, setdisplayFAQChildren] = useState(false);

  const handleForBusinessChildren = () => {
    setdisplayForBusinessChildren(!displayForBusinessChildren);
  };
  const handleFAQChildren = () => {
    setdisplayFAQChildren(!displayFAQChildren);
  };

  return (
    <div>
      {props.notLoggedInSideMenuData.map((e: any, i: number) => {
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
                    <Icon name="arrow-down" />
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
                    <Icon name="arrow-down" />
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
    </div>
  );
};

export default LoggedOutContent;
