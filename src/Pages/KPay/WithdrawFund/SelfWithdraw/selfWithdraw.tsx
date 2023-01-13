/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import WithdrawalLayout from "Components/WithdrawLayout/withdrawalLayout";
import Input from "Components/Form/inputs/Input/Input";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import BankAccount from "../../../../PagesComponents/Kpay/BankAccount/bankAccount";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import Button from "Components/Button/button";
import styles from "./selfWithdraw.module.scss";
import { CURRENCIES } from "Helpers/Constants";
import TransactionService from "Http/Services/TransactionService";
import IBankAccount from "dto/Kongapay/IBankAccount";
import IPersonBankAccount from "dto/Authentication/IPersonBankAccount";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { SelfWithdrawAction } from "Http/Redux/Actions/ActionCreators/SelfWithdraw/SelfWithdrawCreator";

const accountInfoData = [
  {
    img: "jjj",
    accountNumber: " 0121314896",
    accountName: "John Snow Martins ",
  },
];

const BankAccounts = accountInfoData.map((e, i) => {
  return (
    <BankAccount
      accountName={e.accountName}
      accountNumber={e.accountNumber}
      key={i}
    />
  );
});

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/pay-bills/" },
  { Text: "Cashout From Wallet" },
];

interface ISelfWithdraw {
  SelfWithdrawAction: Function;
}

const SelfWithdraw = (props: ISelfWithdraw) => {
  const [accounts, setAccounts] = useState<Array<IPersonBankAccount>>([]);
  const [selectedAccount, selectAccount] = useState<IPersonBankAccount>();
  const [amount, setAmount] = useState<number>(0);

  const history = useHistory();
  const dispatch = useDispatch();

  const loadUserAccounts = async () => {
    // fetch the bank accounts and send to display
    const userAccounts = await TransactionService.GetUserAccounts();
    setAccounts(userAccounts);

    /**
     * TODO:
     * create a selct option to select other accounts
     */
    selectAccount(userAccounts[0]);
  };

  useEffect(() => {
    let mounted = true;

    mounted && loadUserAccounts();

    return () => {
      mounted = false;
    };
  }, []);

  const enableButton = () => selectedAccount === undefined || amount >= 2000;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // send the call to the back end
    // /transcationdetails
    const transaction = { ...accounts, amount };
    dispatch(props.SelfWithdrawAction(transaction));
    history.push("/transfer/transcationdetails");
  };

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <WithdrawalLayout activePage={0}>
        <Fragment>
          <div className={styles.selfWithdraw}>
            <h1>Pay to</h1>
            <div className={styles.content}>
              <div className={styles.noAccount} hidden={accounts.length > 0}>
                Please add an account.
              </div>
              {accounts.map((account: IPersonBankAccount, key: number) => (
                <BankAccount
                  accountName={account.account_name}
                  accountNumber={account.account_number}
                  img={account.bank_logo_url}
                  key={key}
                />
              ))}
              <form>
                <Input
                  label={`Enter amount to withdraw (${CURRENCIES.NAIRA})`}
                  onChange={(e: any) => setAmount(e.target.value)}
                  type="number"
                  value={amount}
                />
                <p className={styles.min}>
                  Minimum amount to transfer: {CURRENCIES.NAIRA} 2,000
                </p>
                <div className={styles.button}>
                  <Button
                    btnClass={"btn-primary text-white"}
                    handleClick={handleSubmit}
                    isDisable={!enableButton()}
                    title="Continue"
                  />
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      </WithdrawalLayout>
    </BasePageLayout>
  );
};

export default connect(null, { SelfWithdrawAction })(SelfWithdraw);
