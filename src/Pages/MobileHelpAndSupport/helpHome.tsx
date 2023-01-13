/* eslint-disable react/no-unescaped-entities */
import React from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import Icon from "Components/Icons/icon";
import Button from "Components/Button/button";
import styles from "./helpHome.module.scss";
import ContactUs from "PagesComponents/MobileHelpAndSupport/contactUs";
import { composeClasses, goToWhatsApp } from "libs/utils/utils";
import { KONGA_ONLINE_CONTACT_US_NUMBER } from "Helpers/Constants";

const HelpAndSupport: React.FunctionComponent = () => {
  return (
    <BasePageLayout
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div>
        <div className={composeClasses(styles.helpHome)}>
          <div className={styles.getInTouchWrapper}>
            <div className={styles.getInTouch}>
              <span>Get in Touch</span>
              <p className={styles.tableAndAboveOnly}>
                We'd love to hear from you
              </p>
            </div>
          </div>
          <div className={styles.subSections}>
            <div className={styles.speakWithAgent}>
              <span>To speak with an agent, Phone Support</span>
              <p>
                0708 063 5700, 0809 460 5555, <br />
                01 888 3435
              </p>
              <p>
                8am - 7pm (Monday - Friday) <br />
                8am - 6pm Weekends
              </p>
              <div
                className={styles.whatsApp}
                onClick={() => goToWhatsApp(KONGA_ONLINE_CONTACT_US_NUMBER)}
              >
                <Icon name="whatsapp" />
                <p>Click here to send us a message on Whatsapp</p>
              </div>
              <div className={composeClasses(styles.button, styles.mobileOnly)}>
                <Button
                  btnClass={"btn-primary text-white"}
                  //isSubmitting={IsSubmitting}
                  title={"Chat with us"}
                />
              </div>
            </div>
            <ContactUs />
          </div>
        </div>
      </div>
    </BasePageLayout>
  );
};

export default HelpAndSupport;
