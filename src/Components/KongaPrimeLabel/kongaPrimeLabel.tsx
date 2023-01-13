import Button from "Components/Button/button";
import Logo from "Assets/images/png/logo.png";
import React from "react";
import styles from "./kongaPrimeLabel.module.scss";
import { Link } from "react-router-dom";

const KongaPrimeLabel: React.FunctionComponent = () => {
  return (
    <div className={styles.kongaPrimeLabel}>
      <div className={styles.text}>
        <p>
          Enjoy free delivery on your order and all Konga orders excluding heavy
          items. Signup for Konga Prime.
        </p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.logo}>
          <div className={styles.img}>
            <img alt="ajhfkha" src={Logo} />
          </div>
          <p>Prime</p>
        </div>
        <div className={styles.button}>
          <Link to="/konga-prime">
            <Button
              btnClass={"btn-primary text-white"}
              className={"p-0"}
              title="Sign up"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default KongaPrimeLabel;
