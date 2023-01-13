/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import TransactionFlowComponent from "PagesComponents/Kpay/TransactionFlowComponent";
import { CURRENCIES } from "Helpers/Constants";
import { connect } from "react-redux";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IOrderDetails } from "dto/Kongapay/IOrderDetails";
import { useHistory, useParams } from "react-router-dom";
import Button from "Components/Button/button";
import accounting from "accounting";
import Icon from "Components/Icons/icon";
import styles from "./OrderDetailsPage.module.scss";

interface IOrderDetailsPage {
  OrderDetails?: IOrderDetails;
}

const OrderDetailsPage: React.FunctionComponent<IOrderDetailsPage> = (
  properties: IOrderDetailsPage
) => {
  const { OrderDetails } = properties;
  const history = useHistory();
  const { dgstatus }: any = useParams();

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (OrderDetails === null || OrderDetails === undefined) {
        history.push("/pay-bills/");
      } else {
        setPhoneNumber(OrderDetails.phoneNumber);
      }
    }
    return () => {
      mounted = false;
    };
  }, [OrderDetails]);

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
              <div className={"card ms-5 ps-5"}>
                <div className={"card-body p-5"}>
                  <div className={styles.goBack}>
                    <div
                      className={styles.icon}
                      onClick={() => history.goBack()}
                    >
                      <Icon name="arrowLeft" />
                    </div>
                    <h6 className={"h6"}>Order Details</h6>
                  </div>
                  <hr />
                  {OrderDetails && (
                    <Fragment>
                      <table className={"table border-0 table-borderless my-5"}>
                        <tbody>
                          <tr>
                            <td>Phone Number</td>
                            <td className={"fw-bold"}>
                              {OrderDetails.phoneNumber}
                            </td>
                          </tr>
                          <tr>
                            <td>Operator</td>
                            <td className={"fw-bold"}>
                              {OrderDetails.operator}
                            </td>
                          </tr>
                          <tr>
                            <td>Amount ({CURRENCIES.NAIRA})</td>
                            <td className={"fw-bold"}>
                              {accounting.formatMoney(
                                OrderDetails.amount,
                                CURRENCIES.NAIRA
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <div className={"row my-1"}>
                        <div className={"col"}>
                          <div className={"d-grid"}>
                            <Button
                              btnClass={"btn-primary text-white"}
                              handleClick={() =>
                                history.push(
                                  `/pay-bills/otpverification/${dgstatus}`
                                )
                              }
                              title="Continue"
                            />
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>

          <TransactionFlowComponent />
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

OrderDetailsPage.defaultProps = {
  OrderDetails: undefined,
};

const mapStateToProps = (state: any) => {
  return { OrderDetails: state.kpay.OrderDetails };
};
export default connect(mapStateToProps, null)(OrderDetailsPage);
