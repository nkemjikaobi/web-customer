/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Icon from "Components/Icons/icon";
import Button from "Components/Button/button";
import styles from "./transactionDetails.module.scss";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import accounting from "accounting";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import IPersonBankAccount from "dto/Authentication/IPersonBankAccount";
import { CURRENCIES } from "Helpers/Constants";

interface ITransactionDetails {
  SelfWithdraw: any;
}
const TransactionDetails = (props: ITransactionDetails) => {
  const history = useHistory();
  const [details, setDetails] = useState<IPersonBankAccount>();
  const [amount, setAmount] = useState<number>(0);
  const data = [
    {
      name: "Subtotal",
      price: "0",
    },
    {
      name: "Transaction Charges",
      price: "0",
    },
  ];

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (props.SelfWithdraw !== null) {
        setDetails(props.SelfWithdraw[0]);
        setAmount(props.SelfWithdraw.amount || 0);
      } else {
        history.push("/transfer/selfWithdraw");
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Fragment>
      <BasePageLayout
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={"container-fluid my-4 mx-0 px-0"}>
          <div className={"row pt-4"}>
            <div className={"col-md-6 col-sm-12 offset-md-3"}>
              <div className={"card my-5"}>
                <div className={"card-body px-5 py-3"}>
                  <div className={styles.transactionalDetails}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ cursor: "pointer" }}>
                        <Icon
                          name={"arrowLeft"}
                          onClick={() => history.goBack()}
                        />
                      </div>

                      <h2 style={{ marginLeft: "10px" }}>
                        Transaction details
                      </h2>
                    </div>
                    <hr />
                    <div className={"py-3"}>
                      <table
                        className={
                          "table border-0 table-borderless my-3 text-muted"
                        }
                      >
                        <tbody>
                          <tr>
                            <td className={"text-start"}>Name</td>
                            <td className={"fw-bold text-end"}>
                              {details?.account_name}
                            </td>
                          </tr>
                          <tr>
                            <td className={"text-start"}>Bank</td>
                            <td className={"fw-bold text-end"}>
                              {details?.bank_name}
                            </td>
                          </tr>
                          <tr>
                            <td className={"text-start"}>Account Number</td>
                            <td className={"fw-bold text-end"}>
                              {details?.account_number}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <hr />
                      <table
                        className={
                          "table border-0 table-borderless my-3 text-muted"
                        }
                      >
                        <tbody>
                          <tr>
                            <td className={"text-start"}>Amount</td>
                            <td className={"fw-bold text-end"}>
                              {accounting.formatMoney(amount, CURRENCIES.NAIRA)}
                            </td>
                          </tr>
                          <tr>
                            <td className={"text-start"}>
                              Transaction Charges
                            </td>
                            <td className={"fw-bold text-end"}>
                              {" "}
                              {accounting.formatMoney(0, CURRENCIES.NAIRA)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr />
                      <table
                        className={
                          "table border-0 table-borderless my-3 text-muted"
                        }
                      >
                        <tbody>
                          <tr>
                            <td className={"text-start"}>Total</td>
                            <td className={"fw-bold text-end"}>
                              {accounting.formatMoney(amount, CURRENCIES.NAIRA)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <Button
                      btnClass={"btn-primary text-white"}
                      title="contine"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  SelfWithdraw: state.kpay.SelfWithdraw,
});

export default connect(mapStateToProps, null)(TransactionDetails);
