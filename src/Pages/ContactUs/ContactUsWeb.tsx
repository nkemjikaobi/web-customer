import React, { Fragment } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { goToWhatsApp } from "libs/utils/utils";

import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import Icon from "Components/Icons";
import { Input } from "Components/Form/inputs";
import Button from "Components/Button/button";
import styles from "./ContactUsWeb.module.scss";
import { KONGA_ONLINE_CONTACT_US_NUMBER } from "Helpers/Constants";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "Contact Us", Url: "/contact-us" },
];

const ContactUsWeb: React.FunctionComponent = () => {
  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <div>
              <h1>Get in touch.</h1>
              <p>We’d love to hear from you!</p>
            </div>
          </div>
          <div className={styles.contact}>
            <div className={styles.contentLeft}>
              <div className={styles.textLeft}>
                <h1>To speak with an agent, Phone Support</h1>
                <p>0708 063 5700, 0809 460 5555, 01 888 3435</p>
                <div className={styles.time}>
                  <span>8am - 7pm (Monday - Friday)</span> <br />
                  <span>8am - 6pm Weekends</span>
                </div>
                <div
                  className={styles.chat}
                  onClick={() => goToWhatsApp(KONGA_ONLINE_CONTACT_US_NUMBER)}
                >
                  <Icon name="whatsappColored" />
                  <span>Click here to send us a message on Whatsapp</span>
                </div>
              </div>
            </div>
            <div className={styles.formHolder}>
              <div className={styles.content}>
                <h1>How can we help?</h1>
                <form className={styles.form}>
                  <div>
                    <Input
                      cla
                      label={"Full Name:"}
                      name={"user_identifier"}
                      //onChange={onChange}
                      placeholder={"Enter Full Name"}
                      type={"text"}
                      value={""}
                    />
                  </div>
                  <div className={"mt-3"}>
                    <Input
                      label={"Email Address:"}
                      name={"email_address"}
                      //onChange={onChange}
                      placeholder={"Enter Email Address"}
                      type={"text"}
                    />
                  </div>
                  <div className={"mt-3"}>
                    <Input
                      label={"Your Messages:"}
                      name={"email_address"}
                      //onChange={onChange}
                      placeholder={"Your Messages"}
                      rows={6}
                      type={"textarea"}
                    />
                  </div>
                  <div className={styles.send}>
                    <div className={""}>
                      <input
                        className={"form-check-input"}
                        id={"i-am-not-a-robot"}
                        name={"IAmNotARobot"}
                        type={"checkbox"}
                      />
                      <label
                        className={"ps-1 pe-3"}
                        htmlFor={"i-am-not-a-robot"}
                      >
                        I&apos;m not a robot
                      </label>
                    </div>
                    <Button
                      className={"btn-primary text-white"}
                      //isSubmitting={IsSubmitting}
                      title={"Send Message"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.seoText}>
          <div>
            <h2>
              Online Shopping on Konga.com – Nigeria’s Largest Online Mall
            </h2>
            <p>
              Konga Travels is a leading Omni-channel travel agency in Africa
              based in Lagos, Nigeria. We seek to make your travel process more
              seamless and affordable, from flight booking to hotel booking and
              all other aspects of your journey. We offer both online and
              offline flight ticket and hotel bookings to cater to all groups of
              travelers, our website offers easy booking and payment experience
              with the ability to search for flights, compare offers and book
              the flight of your choosing. We aim to take away the stress of
              travel planning from you and save you some money and time
              simultaneously. Konga Travels also offers mouthwatering vacation
              packages you can’t afford to miss, Book your next trip with Konga
              Travels and enjoy the best travel experience!
            </p>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default ContactUsWeb;
