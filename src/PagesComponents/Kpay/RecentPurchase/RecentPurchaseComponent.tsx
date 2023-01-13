import React, { useEffect, useState } from "react";
import RecentPurchaseItemComponent from "./RecentPurchaseItemComponent";
import styles from "./recentPurchaseComponent.module.scss";
import AirtimeService from "Http/Services/AirtimeService";
import IBeneficiary from "dto/Kongapay/IBeneficiary";
export interface IRecentPurchaseComponentProperty {
  service: string;
}

const RecentPurchaseComponent: React.FunctionComponent<
  IRecentPurchaseComponentProperty
> = (properties: IRecentPurchaseComponentProperty) => {
  const [savedBeneficiaries, setSavedBeneficiaries] = useState<
    Array<IBeneficiary>
  >([]);

  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<IBeneficiary>();

  useEffect(() => {
    let mounted = true;

    if (mounted && properties.service) {
      AirtimeService.GetSavedBeneficiaries(properties.service).then(
        (beneficiaries: Array<IBeneficiary>) =>
          setSavedBeneficiaries(beneficiaries)
      );
    }

    return () => {
      mounted = false;
    };
  }, [properties.service]);

  return (
    <div className={styles.purchasesWrapper}>
      <div className={"card"}>
        <div className={"card-body " + styles.container}>
          <h6 className={"h6 pb-4"}>Recent Purchase</h6>
          <div className={"list-group"}>
            {savedBeneficiaries.map(
              (beneficiary: IBeneficiary, key: number) => (
                <RecentPurchaseItemComponent
                  accountNumber={beneficiary.beneficiary_value}
                  handleChange={setSelectedBeneficiary}
                  key={key}
                  name={beneficiary.beneficiary_name}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPurchaseComponent;
