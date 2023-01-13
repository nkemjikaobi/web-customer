import accounting from "accounting";
import Button from "Components/Button/button";
import Icon from "Components/Icons";
import { CURRENCIES } from "Helpers/Constants";
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import styles from "./shippingFeeComponent.module.scss";

export interface IShippingFeeComponent {
  weight: number;
  stateFrom: string;
  stateTo: string;
  estimatedFee: number;
}

const ShippingFeeComponent: React.FunctionComponent<IShippingFeeComponent> = ({
  weight,
  stateFrom,
  stateTo,
  estimatedFee,
}: IShippingFeeComponent) => {
  const val = false;
  const history = useHistory();

  const handleSendPackage = () => {
    history.push("/send-package/ship-now/");
  };

  const checkIfValid = () => {
    if (weight > 0 && stateFrom !== "" && stateTo !== "") {
      return false;
    }
    return true;
  };

  return (
    <Fragment>
      <div className={styles.shippingFee}>
        {val && (
          <>
            <div className={styles.shippingFee_default}>
              <p className={styles.price}>0.00</p>
              <p>Estimated Shipping Fee</p>
            </div>
            <div className={styles.warningBand}>
              <Icon name="warning" />{" "}
              <p>Note: The above is an estimate, actual charges may vary</p>
            </div>
          </>
        )}
        <div className={styles.shippingFee_active}>
          <div className={styles.shippingDetails}>
            <h3>Shipping Rate</h3>
            <div className={styles.direction}>
              <div>
                <p className={styles.title}>From</p>
                <p>{stateFrom}</p>
              </div>
              <div>
                <p className={styles.title}>To</p>
                <p>{stateTo}</p>
              </div>
              <div>
                <p className={styles.title}>Weight</p>
                <p>{accounting.formatNumber(weight || 0)} kg</p>
              </div>
            </div>
          </div>
          <div className={styles.estimatedFee}>
            <h4>{accounting.formatMoney(estimatedFee, CURRENCIES.NAIRA)}</h4>
            <p>Estimated Shipping Fee</p>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <div className={styles.sendPackageButton}>
            {/* {weight > 0 && stateFrom.length > 0 && stateTo.length > 0 && ( */}
            <Button
              className={`btn btn-danger text-white w-100 ${
                weight > 0 && stateFrom.length > 0 && stateTo.length > 0
              } ${styles.hoverState}`}
              handleClick={() => handleSendPackage()}
              isDisable={checkIfValid()}
              title={"Send Package"}
            />
            {/* )} */}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ShippingFeeComponent;
