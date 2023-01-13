import BrandPartnerItem from "Components/BrandPartnerItem/BrandPartnerItem";
import styles from "./BrandPartnerList.module.scss";
import React from "react";

interface IProps {
  brandList: any;
}
const BrandPartnerList: React.FunctionComponent<IProps> = (props: IProps) => {
  return (
    <div className={styles.brandPartnerList}>
      <h1 className={styles.brandPartnerListHeading}>Brand Partners</h1>
      <div className={styles.brandPartnerListContent}>
        {props.brandList &&
          props.brandList.map((e: any, index: number) => {
            return (
              <div key={index}>
                <BrandPartnerItem
                  alternativeText="brand-item"
                  brandImage={e.brandimage}
                  brandLogo={e.brandlogo}
                  storeId={e.storeid}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BrandPartnerList;
