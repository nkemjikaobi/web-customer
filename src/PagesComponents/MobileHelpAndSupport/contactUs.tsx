/* eslint-disable react/no-unescaped-entities */
import Button from "Components/Button/button";
import { Input } from "Components/Form/inputs";
import React from "react";
import styles from "./contactUs.module.scss";
import { composeClasses } from "libs/utils/utils";

const ContactUs: React.FunctionComponent = () => {
  return (
    <div className={styles.contactUs}>
      <div className={styles.howCaWeHelp}>
        <span>How can we help?</span>
      </div>
      <form>
        <div className={composeClasses(styles.yourMessage, styles.inputFields)}>
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
        <div className={composeClasses(styles.yourMessage, styles.inputFields)}>
          <Input
            label={"Email Address:"}
            name={"email_address"}
            //onChange={onChange}
            placeholder={"Enter Email Address"}
            type={"text"}
          />
        </div>
        <div className={composeClasses(styles.yourMessage, styles.inputFields)}>
          <Input
            label={"Your Messages:"}
            name={"email_address"}
            //onChange={onChange}
            placeholder={"Your Messages"}
            rows={30}
            type={"textarea"}
          />
        </div>
        <div className={composeClasses(styles.yourMessage, styles.inputFields)}>
          <div className={styles.options}>
            <div className={styles.checkbox}>
              <div className={styles.checkBoxInput}>
                <input
                  className={"form-check-input"}
                  id={"i-am-not-a-robot"}
                  name={"IAmNotARobot"}
                  type={"checkbox"}
                />
                <label className={"ps-1 pe-3"} htmlFor={"i-am-not-a-robot"}>
                  I'm not a robot
                </label>
              </div>
            </div>
            <Button
              btnClass={"btn-primary text-white"}
              //isSubmitting={IsSubmitting}
              title={"Send Message"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
