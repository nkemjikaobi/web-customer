/* eslint-disable @typescript-eslint/ban-types */
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import Icon from "Components/Icons";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { CURRENCIES } from "Helpers/Constants";

export interface ITransactionSuccessful {
  kpay: any;
}

const TransactionFailed: React.FunctionComponent<ITransactionSuccessful> = ({
  kpay,
}: ITransactionSuccessful) => {
  const [amount, setAmount] = useState("");
  const [operator, setOperator] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  // useEffect(() => {
  //   let mounted = true;

  //   // if (mounted) {
  //   //   if (kpay.OrderDetails === null) {
  //   //     history.push("/pay-bills");
  //   //   } else {
  //   //     setAmount(kpay.OrderDetails.amount);
  //   //     setOperator(kpay.OrderDetails.operator);
  //   //     setReferenceCode(kpay.OrderRefenceNumber);
  //   //   }
  //   // }
  //   return () => {
  //     mounted = false;
  //   };
  // }, [kpay]);

  return (
    <Fragment>
      <BasePageLayout
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={"container my-4 mb-5 mx-0 px-0 pt-5 pb-5"}>
          <div className={"row pt-4"}>
            <div className={"col-md-6 offset-md-3"}>
              <div className={"card py-3"}>
                <div className={"card-body text-center mt-5"}>
                  <Icon className={"my- 4"} name={"transactionFailed"} />
                  <p className={"text-danger h5 mt-3"}>
                    Transaction Failed, kindly review your details and try
                    again.
                  </p>
                  <Link
                    className={"btn btn-danger text-white w-50 mt-4"}
                    to={"/"}
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return { kpay: state.kpay };
};
export default connect(mapStateToProps, null)(TransactionFailed);
