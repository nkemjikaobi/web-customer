/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import IDgProduct from "dto/Kongapay/IDgProduct";
import OperatorSelector from "./operatorSelector";
import styles from "./operatorSelector.module.scss";
import OperatorSelectorSkeletonList from "./OperatorSelectorSkeletonList";

interface IOperatorSelectorList {
  operators: Map<number, Array<IDgProduct>>;
  value?: string;
  isLoading: boolean;
}

const OperatorSelectorList: React.FunctionComponent<IOperatorSelectorList> = (
  properties: IOperatorSelectorList
) => {
  const [children, setChildren] = useState<Array<any>>([]);

  useEffect(() => {
    const holders = [<OperatorSelectorSkeletonList key={1} />];
    setChildren(holders);
  }, []);

  useEffect(() => {
    let holders: Array<any> = [];

    if (properties.isLoading === false) {
      holders = [<OperatorSelectorSkeletonList key={1} />];
    } else {
      holders = [];
      let datas: Array<IDgProduct> = [];
      properties.operators.forEach(
        (operator: Array<IDgProduct>, iKey: number) => {
          datas = datas.concat(operator);
        }
      );

      <div className={styles.operatorHolder}>
        {datas.map((operator: IDgProduct, key: number) =>
          holders.push(<OperatorSelector key={key} operator={operator} />)
        )}
      </div>;
    }
    setChildren(holders);
  }, [properties.operators]);

  return <Fragment>{children}</Fragment>;
};

const mapStateToProps = (state: any) => ({
  value: state.kpay.SelectedOperator,
});

OperatorSelectorList.defaultProps = {
  value: "",
};

export default connect(mapStateToProps, null)(OperatorSelectorList);
