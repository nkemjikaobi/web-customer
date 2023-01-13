/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./DeliveryTypeComponent.module.scss";

export interface IDeliveryTypeComponent {
  onChange: Function;
}

const DeliveryTypeComponent: React.FunctionComponent<
  IDeliveryTypeComponent
> = ({ onChange }: IDeliveryTypeComponent) => {
  const [deliveryType, setDeliveryType] = useState<string>("standard");

  useEffect(() => {
    let mounted = true;

    mounted && onChange(deliveryType);

    return () => {
      mounted = false;
    };
  }, [deliveryType]);
  return (
    <Fragment>
      <div className={"row mt-2"}>
        <div className={"col-md-6"}>
          <div className={"ms-0 ps-0"}>
            <input
              checked={deliveryType === "standard"}
              className={styles.check}
              id={"deliveryTypeStandard"}
              name={"deliveryType"}
              onChange={(e: any) => setDeliveryType("standard")}
              type={"radio"}
              value={"standard"}
            />
            <label className={"py-4"} htmlFor={"deliveryTypeStandard"}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p className={`fw-bold ${styles.font12}`}>
                        Standard Delivery
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <small className={`text-muted ${styles.font12}`}>
                        4-5 Business Days
                      </small>
                    </td>
                  </tr>
                </tbody>
              </table>
            </label>
          </div>
        </div>
        <div className={"col-md-6"}>
          <div className={"ms-0 ps-0"}>
            <input
              checked={deliveryType === "express"}
              className={styles.check}
              id={"deliveryTypeExpress"}
              name={"deliveryType"}
              onChange={(e: any) => setDeliveryType("express")}
              type={"radio"}
              value={"express"}
            />
            <label className={"py-4"} htmlFor={"deliveryTypeExpress"}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <p className={`fw-bold ${styles.font12}`}>
                        Express Delivery
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className={`text-muted ${styles.font12}`}>
                        2-4 Business Days
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DeliveryTypeComponent;
