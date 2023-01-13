/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useState } from "react";
import Input from "Components/Form/inputs/Input/Input";
import Button from "Components/Button/button";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import styles from "./fundWallet.module.scss";
import { CURRENCIES } from "Helpers/Constants";
import { InitiateFundWalletAction } from "Http/Redux/Actions/KPayActions/DGActionRequest";
import { v4 as uuidv4 } from "uuid";
import IUser from "dto/Authentication/IUser";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/pay-bills/" },
  { Text: "Fund Account" },
];

interface IFundWallet {
  user: IUser;
  InitiateFundWalletAction: Function;
}

const FundWallet: React.FunctionComponent<IFundWallet> = (
  props: IFundWallet
) => {
  const history = useHistory();
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFundWallet = async (event: any) => {
    setIsSubmitting(true);
    event.preventDefault();
    const reference = uuidv4();
    const payment = await props.InitiateFundWalletAction({
      amount: amount,
      payment_reference: reference,
    });
    setIsSubmitting(false);
    if (payment === null) {
      setErrorMessage("");
      history.push("/pay-bills/transaction-details");
    } else setErrorMessage(payment);
  };

  const checkAmount = () => {
    if (amount > 0) {
      return false;
    }
    return true;
  };

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <Fragment>
        <div className={styles.fundWalletWrapper}>
          <div className={styles.fundWallet}>
            <h1>Fund Wallet</h1>
            <form>
              {errorMessage ? (
                <div className={"alert alert-danger"}>{errorMessage}</div>
              ) : (
                <Fragment />
              )}
              <div className={styles.input}>
                <Input
                  inputprops={{ inputMode: "numeric" }}
                  label={`Enter amount to send (${CURRENCIES.NAIRA}) `}
                  name={"amount"}
                  onChange={(event: any) => setAmount(event.target.value)}
                  placeholder={"Enter an amount ( e.g 10,000)"}
                  required={true}
                  type={"tel"}
                  value={amount}
                />
              </div>
              <div className={styles.button}>
                <Button
                  btnClass={"btn-primary text-white"}
                  handleClick={handleFundWallet}
                  isDisable={checkAmount() && errorMessage.length > 0}
                  isSubmitting={isSubmitting}
                  title={"Continue"}
                />
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    </BasePageLayout>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.auth.CurrentUser,
});

export default connect(mapStateToProps, { InitiateFundWalletAction })(
  FundWallet
);
