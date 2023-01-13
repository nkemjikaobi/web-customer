import IProduct from "dto/KongaOnline/IProduct";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./sellerBand.module.scss";

export interface ISoldByBand {
  selectedProduct?: IProduct;
}

const SoldByBand: React.FunctionComponent<ISoldByBand> = ({
  selectedProduct,
}: ISoldByBand) => {
  const [brandName, setBrandName] = useState<string>("");
  useEffect(() => {
    let mounted = true;
    if (selectedProduct && selectedProduct.seller) {
      setBrandName(selectedProduct.seller.name ?? "");
    }
    return () => {
      mounted = false;
    };
  }, [selectedProduct]);
  return (
    <div className={styles.soldBy}>
      <div className={styles.imageWrapper}>
        <img src="" />
      </div>
      <div className={styles.text}>
        <p>Sold By</p>
        <p className={styles.brandName}>{brandName}</p>
        <Link className={styles.link} to="#">
          View Official Store
        </Link>
      </div>
    </div>
  );
};

const mapStatesToProps = (state: any) => ({
  selectedProduct: state.marketplace.SelectedProduct,
});

export default connect(mapStatesToProps, null)(SoldByBand);
