import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import Icon from "Components/Icons";
import Nav from "Components/TravelInfo/Nav/nav";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import styles from "./FailedBooking.module.scss";

const TravelCallback: React.FunctionComponent = () => {
  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/travel/booking" },
    { Text: "Flight", Url: "" },
    { Text: "Travelers Details" },
  ];

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.travelCallback}>
          <Nav currentStep={2} />
          <div className={styles.content}>
            <div className={styles.message}>
              <div className={styles.icon}>
                <Icon name="cancelLuggage" />
              </div>
              <p>
                Oops something went wrong. <br />
                Please try again
              </p>
              <Link to="/travel/booking">
                <span>Return to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default TravelCallback;
