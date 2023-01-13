/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import TransactionFlowComponent from "PagesComponents/Kpay/TransactionFlowComponent";
import { CURRENCIES } from "Helpers/Constants";
import { connect } from "react-redux";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { useHistory } from "react-router-dom";
import IFundInitAccountResponse from "dto/Kongapay/IFundInitAccountResponse";
import accounting from "accounting";
import Button from "Components/Button/button";
import ITransferDetails from "dto/Kongapay/ITransferDetails";
import styles from "./OrderDetailsPage.module.scss";
import Icon from "Components/Icons/icon";

interface IOrderDetailsPage {
  wallet?: IFundInitAccountResponse;
  transferDetails?: ITransferDetails;
}

const TransactionDetailsPage: React.FunctionComponent<IOrderDetailsPage> = (
  properties: IOrderDetailsPage
) => {
  const history = useHistory();

  const [amount, setAmount] = useState<number>(0);
  const [charges, setCharges] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasPersonlDetails, setHasPersonlDetails] = useState<boolean>(false);

  const [customerName, setCustomerName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");

  useEffect(() => {
    let { wallet, transferDetails } = properties;

    if (wallet) {
      setHasPersonlDetails(false);
      setAmount(wallet.request?.amount ?? 0);
      setCharges(0);
    } else if (transferDetails) {
      setHasPersonlDetails(true);
      setAmount(transferDetails.transfer.amount ?? 0);
      setCharges(transferDetails.charges);
      setCustomerName(transferDetails.transfer.account_name);
      setBankName(transferDetails.bank_name);
      setDescription(transferDetails.transfer.comment);
      setAccountNumber(transferDetails.transfer.recipient_id);
    }
    return () => {
      wallet = transferDetails = undefined;
    };
  }, [properties]);

  useEffect(() => {
    let wallet = properties.wallet;
    setTotal(parseFloat(amount.toString()) + parseFloat(charges.toString()));
    return () => {
      wallet = undefined;
    };
  }, [amount, charges]);

  const handleBtnClickEvent = (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    history.push("/pay-bills/otpverification/0");
    setIsSubmitting(false);
  };

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
              <div className={"card"}>
                <div className={"card-body p-5"}>
                  <div className={styles.goBack}>
                    <div
                      className={styles.icon}
                      onClick={() => history.goBack()}
                    >
                      <Icon name="arrowLeft" />
                    </div>
                    <h6 className={"h6"}>Transaction Details</h6>
                  </div>
                  {hasPersonlDetails ? (
                    <table className={"table border-0 table-borderless my-3"}>
                      <tbody>
                        <tr>
                          <td className={"text-start h6 w-50"}>Name</td>
                          <td className={"text-muted text-end"}>
                            <small>{customerName}</small>
                          </td>
                        </tr>
                        <tr>
                          <td className={"text-start h6"}>Bank</td>
                          <td className={"text-muted text-end"}>
                            <small>{bankName}</small>
                          </td>
                        </tr>
                        <tr>
                          <td className={"text-start h6"}>Account Number</td>
                          <td className={"text-muted text-end"}>
                            <small>{accountNumber}</small>
                          </td>
                        </tr>
                        <tr>
                          <td className={"text-start h6"}>Description</td>
                          <td className={"text-muted text-end"}>
                            <small>{description}</small>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    <Fragment />
                  )}
                  <hr />
                  <Fragment>
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
                          <td className={"text-start"}>Transaction Charges</td>
                          <td className={"fw-bold text-end"}>
                            {accounting.formatMoney(charges, CURRENCIES.NAIRA)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr />
                    <div className={"row"}>
                      <div className={"col text-start fw-bold"}>Total</div>
                      <div className={"col text-end fw-bold"}>
                        {accounting.formatMoney(total, CURRENCIES.NAIRA)}
                      </div>
                    </div>

                    <div className={"row my-4"}>
                      <div className={"col"}>
                        <div className={"d-grid"}>
                          <Button
                            btnClass={"btn-primary text-white"}
                            handleClick={handleBtnClickEvent}
                            isSubmitting={isSubmitting}
                            title={"Continue"}
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
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

TransactionDetailsPage.defaultProps = {
  wallet: undefined,
  transferDetails: undefined,
};

const mapStateToProps = (state: any) => ({
  wallet: state.kpay?.Wallet?.FundingInit,
  transferDetails: state.kpay?.Transfer?.TransferDetails,
});
export default connect(mapStateToProps, null)(TransactionDetailsPage);
