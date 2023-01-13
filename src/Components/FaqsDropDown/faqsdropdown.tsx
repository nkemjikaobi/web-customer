import React, { useState } from "react";
import styles from "./faqsdropdown.module.scss";
import { Link } from "react-router-dom";

const FaqsDropDown: React.FunctionComponent = () => {
  const [showFaqs, setShowFaqs] = useState<boolean>(false);

  return (
    <div className={styles.faqs}>
      <Link
        className={"dropdown-item dropdown-toggle"}
        onClick={() => setShowFaqs(!showFaqs)}
        onMouseEnter={() => setShowFaqs(true)}
        to="#"
      >
        FAQS
      </Link>
      {showFaqs && (
        <div className={styles.faqsContainer}>
          <Link
            className={"dropdown-item " + styles.standardFont}
            to="/faq-konga"
          >
            Konga Online
          </Link>
          <Link
            className={"dropdown-item " + styles.standardFont}
            to="/faq-kongapay"
          >
            Konga Pay
          </Link>
          <Link className={"dropdown-item " + styles.standardFont} to="/food">
            Konga Food
          </Link>
        </div>
      )}
      <Link
        className={"dropdown-item " + styles.standardFont}
        to={"/send-package/our-locations"}
      >
        Store Locator
      </Link>
      <Link
        className={"dropdown-item " + styles.standardFont}
        to={"/help-support"}
      >
        Contact Us
      </Link>
    </div>
  );
};

export default FaqsDropDown;
