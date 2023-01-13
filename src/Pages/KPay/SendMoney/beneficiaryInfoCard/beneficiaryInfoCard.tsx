import React from "react";
import Icon from "Components/Icons/icon";
interface Props {
  styles: any;
}
const BeneficiaryInfoCard: React.FunctionComponent<Props> = ({ styles }) => {
  return (
    <div className={styles.benficiaryInfoCard}>
      <div className={styles.icon}>
        <Icon name="building" />
      </div>
      <div className={styles.beneficiaryInfo}>
        <h1>Anifowose POS Ventures</h1>
        <p>Access Bank - 0012234456</p>
      </div>
    </div>
  );
};

export default BeneficiaryInfoCard;
