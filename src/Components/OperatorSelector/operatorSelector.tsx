/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, MouseEvent, useEffect, useState } from "react";
import styles from "./operatorSelector.module.scss";
import IDgProduct from "dto/Kongapay/IDgProduct";
import { connect } from "react-redux";
import { OperatorSelected } from "Http/Redux/Actions/KPayActions/DGActionEvent";

export interface IOperatorSelectorProperties {
  operator: IDgProduct;
  selectedOperator?: IDgProduct;
  OperatorSelected: Function;
}

const OperatorSelector: React.FunctionComponent<IOperatorSelectorProperties> = (
  properties: IOperatorSelectorProperties
) => {
  const [active, SetActive] = useState(false);
  const handleClickcEvent = (event: MouseEvent) =>
    properties.OperatorSelected(properties.operator);

  useEffect(() => {
    SetActive(properties.selectedOperator?.id === properties.operator.id);
  }, [properties.selectedOperator]);

  return (
    <Fragment>
      <div className={styles.operatorContainer} onClick={handleClickcEvent}>
        {active === false ? (
          <>
            <div className={styles.operator}>
              <div className={styles.activetick} />
              <img
                alt={properties.operator.name}
                className={styles.logo}
                src={properties.operator.image_url}
              />
              <div className={styles.title}>{properties.operator.name}</div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.operatorActive}>
              <img
                alt={properties.operator.name}
                className={styles.logo}
                src={properties.operator.image_url}
              />
              <div className={styles.title}>{properties.operator.name}</div>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  selectedOperator: state.kpay.SelectedOperator,
});

OperatorSelector.defaultProps = {
  selectedOperator: undefined,
};

export default connect(mapStateToProps, { OperatorSelected })(OperatorSelector);
