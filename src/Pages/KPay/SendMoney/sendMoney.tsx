/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Button from "Components/Button/button";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import Input from "Components/Form/inputs/Input/Input";
import Select from "Components/Form/inputs/Select/Select";
import styles from "./sendMoney.module.scss";
import { CURRENCIES, ERROR, SUCCESS } from "Helpers/Constants";
import Icon from "Components/Icons";
import IBank from "dto/Kongapay/IBank";
import DigitalGoodService from "Http/Services/DigitalGoodService";
import IGetBankAcctNameQuery from "dto/Kongapay/IGetBankAcctNameQuery";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { TransferFundsAction } from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { v4 as uuidv4 } from "uuid";
import IKPayCustomerDetail from "dto/Kongapay/IKPayCustomerDetail";
import ITransfer from "dto/Kongapay/ITransfer";
import spinner from "../../../Assets/images/loader.gif";
import { composeClasses } from "libs/utils/utils";
import NoBeneficiary from "Components/NoBeneficiary/NoBeneficiary";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/pay-bills/" },
  { Text: "Send Money" },
];

interface ISendMoney {
  TransferFundsAction: Function;
}

const SendMoney: React.FunctionComponent<ISendMoney> = (props: ISendMoney) => {
  const history = useHistory();
  const [banks, setBanks] = useState<Array<IBank>>([]);
  const [bank, setBank] = useState<number>(0);
  const [selectedBank, setSelectedBank] = useState<IBank>();
  const [userIdentifier, setUserIdentifier] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [charges, setCharges] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadBanks = async () => {
    const kpayBank: IBank = {
      id: 0,
      code: "",
      is_bvn_mandate: "",
      is_mandate: 0,
      logo_url: "",
      name: "Konga Pay",
      nip_bank_code: "",
      status: "",
    };
    const response = await DigitalGoodService.GetBanks();
    setBanks([kpayBank, ...response]);
    setSelectedBank(kpayBank);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (
        amount &&
        selectedBank &&
        userIdentifier &&
        userIdentifier.length >= 9
      ) {
        handleCustomerDetailsFetching();
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, [amount, selectedBank, userIdentifier]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setIsValid(false);
      loadBanks();
      setErrorMessage(null);
    }
    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Method that fetches customer details
   * either from konga pay or from the bank
   */
  const handleCustomerDetailsFetching = async () => {
    if (selectedBank && userIdentifier && userIdentifier.trim().length >= 10) {
      setLoading(true);
      if (selectedBank?.id > 0) {
        /**
         * get details via the request to the bank
         */
        const payload: IGetBankAcctNameQuery = {
          account_number: userIdentifier,
          bank_id: selectedBank.id,
        };
        const {
          data: { data, status, message },
        } = await DigitalGoodService.GetAcctNameFromBank(payload);
        if (status === SUCCESS) {
          setCustomerName(data);
          setErrorMessage("");
          setIsValid(true);
        } else if (status === ERROR) {
          setIsValid(false);
          setErrorMessage(message);
        }
      } else {
        /**
         * get details via kongapay
         */
        const { data, status } = await DigitalGoodService.GetKPayAcctNameQuery(
          userIdentifier
        );

        if (data && status === SUCCESS) {
          const name = [
            data.first_name ?? "",
            data.other_name ?? "",
            data.last_name ?? "",
          ]
            .map((datum: string) => datum.trim())
            .join(" ");
          setCustomerName(name);
          setErrorMessage("");
          setIsValid(true);
        } else if (status === ERROR) {
          setErrorMessage(data.message);
          setIsValid(false);
        }
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setErrorMessage(null);
      const selected = banks.find((i: IBank) => i.id === bank);
      if (selected) {
        setSelectedBank(selected);
      }
    }
    return () => {
      mounted = false;
    };
  }, [bank]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (
      selectedBank &&
      customerName &&
      customerName.trim().length > 0 &&
      userIdentifier
    ) {
      const payload: ITransfer = {
        account_name: customerName,
        bank_id: selectedBank.id,
        recipient_id: userIdentifier,
        comment: `You are making a transfer to ${userIdentifier} (${selectedBank.name}) ${customerName}`,
        amount: amount,
        payment_reference: uuidv4(),
      };

      const response = await props.TransferFundsAction(
        payload,
        selectedBank.name,
        charges,
        selectedBank.id > 0
      );

      if (response === "") {
        history.push("/pay-bills/transaction-details");
      } else {
        setErrorMessage(response);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <BasePageLayout
      breadcrumbs={breadcrumb}
      hideFooterOnMobile={"false"}
      hideNavigation={0}
      showNavigation={"no"}
    >
      <div className={styles.sendMoney}>
        <div className={styles.sendMoney_Form}>
          {errorMessage ? (
            <div className={"alert alert-danger alert-sm"}>{errorMessage}</div>
          ) : (
            <Fragment />
          )}
          <form method={"post"} onSubmit={handleSubmit}>
            <Input
              label={`Enter amount to send (${CURRENCIES.NAIRA})`}
              name={"amount"}
              onChange={(e: any) => setAmount(e.target.value)}
              type={"number"}
              value={amount}
            />

            <Input
              label={"Reciever's Phone/Account Number"}
              name={"setUserIdentifier"}
              onChange={(e: any) => setUserIdentifier(e.target.value)}
              type={"text"}
              value={userIdentifier}
            />
            {customerName && customerName.trim()?.length >= 1 ? (
              <small className={"text-danger"}>
                {"Account Holder's Name: "} - ({customerName})
              </small>
            ) : (
              <Fragment />
            )}
            <div className={composeClasses(styles.selectBankRow, "col px-0")}>
              {loading && (
                <img className={styles.spinner} src={spinner} width="24" />
              )}
              <Select
                disabled={loading}
                label={"Select Bank"}
                onChange={(e: any) => setBank(e.target.value)}
                options={banks.map((bank: IBank) => ({
                  value: bank.id,
                  text: bank.name,
                }))}
                value={bank}
              />
            </div>
            <div className={styles.checkbox}>
              <div className={styles.checkBoxInput}>
                <input
                  className={"form-check-input"}
                  id={"saved-beneficiary"}
                  name={"SaveBeneficiary"}
                  type={"checkbox"}
                />
                <label className={"ps-1 pe-3"} htmlFor={"saved-beneficiary"}>
                  Save Beneficiary
                </label>
              </div>
            </div>
            <div className={styles.button}>
              <Button
                btnClass={"btn-primary text-white"}
                handleClick={handleSubmit}
                isDisable={!isValid}
                isSubmitting={isSubmitting}
                title={"Continue"}
              />
            </div>
          </form>
        </div>
        <div className={styles.sendMoney_savedBeneficiary}>
          <div className={styles.heading}>
            <h1>Saved Beneficiary </h1>
          </div>
          <NoBeneficiary />
        </div>
      </div>
    </BasePageLayout>
  );
};

export default connect(null, { TransferFundsAction })(SendMoney);
