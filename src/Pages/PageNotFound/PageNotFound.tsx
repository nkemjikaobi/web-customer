import Icon from "Components/Icons";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.scss";

const PageNotFound: React.FunctionComponent = () => {
  return (
    <Fragment>
      <div className={styles.pageNotFound}>
        <div className={styles.content}>
          <div className={styles.pageNotFoundIcon}>
            <Icon name="pageNotFound" />
          </div>
          <div className={styles.header}>
            <h2>Page Not Found</h2>
          </div>
          <div className={styles.message}>
            <p>
              We can’t find the page you’re looking for. You can either return
              to the previous page or go back to Homepage
            </p>
          </div>
          <div className={styles.homePage}>
            <Link to="/">
              <div className={styles.homePageInner}>
                <span>HOMEPAGE</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PageNotFound;
