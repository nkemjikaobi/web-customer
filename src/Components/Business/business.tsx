import React, { useState } from "react";
import styles from "./business.module.scss";
import { Link } from "react-router-dom";

const Business: React.FunctionComponent = () => {
  const [showKongaPay, setShowKongaPay] = useState<boolean>(false);

  return (
    <div className={styles.business}>
      <Link
        className={"dropdown-item " + styles.standardFont}
        to={"/business/sell-on-konga"}
      >
        Sell on Konga
      </Link>
      <Link
        aria-expanded={"false"}
        className={"dropdown-toggle dropdown-item " + styles.standardFont}
        data-bs-toggle={"dropdown"}
        id={"business-dropdown"}
        onClick={() => setShowKongaPay(!showKongaPay)}
        onMouseEnter={() => setShowKongaPay(true)}
        role={"button"}
        to={"#"}
      >
        KongaPay Business
      </Link>
      {showKongaPay && (
        <div className={styles.kongaPayBusiness}>
          <Link
            className={"dropdown-item " + styles.standardFont}
            to="/business/become-an-agent"
          >
            Become an Agent
          </Link>
          <Link
            className={"dropdown-item " + styles.standardFont}
            to="/business/merchant"
          >
            Become a Merchant
          </Link>
          <Link className={"dropdown-item " + styles.standardFont} to="#">
            Documentation
          </Link>
        </div>
      )}

      <Link
        className={"dropdown-item " + styles.standardFont}
        to={"/konga-prime"}
      >
        Konga Prime
      </Link>
      <Link className={"dropdown-item " + styles.standardFont} to={"/kxpress"}>
        Kxpress
      </Link>
    </div>
  );
};

export default Business;
