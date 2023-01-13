import React from "react";
import styles from "./KongaPrimeTermsInfo.module.scss";

/**
 * @returns {string} TermsInformation
 */
function TermsInfo() {
  return (
    <div className={styles.Termsinfocontainter}>
      <p className={styles.Termsinfotext}>
        By selecting a the K-Prime membership above, you agree to our
        <a href="https://www-konga-com-res.cloudinary.com/image/upload/v1614610744/newsletter/KONGA_PRIME_Terms_Conditions_2.pdf">
          <span className={styles.highlight}> Terms & Conditions</span>
        </a>
      </p>
    </div>
  );
}

export default TermsInfo;
