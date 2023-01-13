/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./step1.module.scss";
import { Input, Select } from "Components/Form/inputs";
import Button from "Components/Button/button";
import ElectricityForm from "Models/FormModels/KPay/Electricity/ElectricityForm";
import { useForm } from "CustomHooks/FormHook";
import IDgProduct from "dto/Kongapay/IDgProduct";
import { composeClasses } from "libs/utils/utils";

import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import {
  InitiateOrderAction,
  FinalStepForOrderRequest,
} from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { LoadProductsByCategory } from "Http/Redux/Actions/KPayActions/DGActionRequest";
import { connect } from "react-redux";
import { CURRENCIES, ERROR, SUCCESS } from "Helpers/Constants";
import AuthService from "Http/Services/AuthService";
import TermsAndConditionsCheckBox from "PagesComponents/Kpay/TermAndConditionsCheckBox/TermsAndConditionsCheckBox";
import spinner from "../../../Assets/images/loader.gif";
import useDebounce from "Helpers/Hooks/useDebounce";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

// statically setting the product category for this form
const __PRODUCT_CATEGORY__ = "electricity";

export interface IProps {
  auth: any;
  kpay: any;
  InitiateOrderAction: Function;
  FinalStepForOrderRequest: Function;
  LoadProductsByCategory: Function;
  setCurrentStep: Function;
  ManageCartAlert: Function;
  IsAuthenticated?: boolean;
}

const step1: React.FunctionComponent<IProps> = (properties: IProps) => {
  const [loadingOperators, setLoadingOperators] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [finalRequestPayload, setFinalRequestPayload] = useState<any | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [hasDetails, setHasDetails] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerAddress, setCustomerAddress] = useState<string>("");
  const [showHideTermsConditions, setshowHideTermsConditions] = useState(false);
  const [recentPurchases, setRecentPurchases] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOperator, setSelectedOperator] = useState<any>();
  const [providers, setProviders] = useState<Array<any>>([]);

  // initialize the form
  const initialForm: ElectricityForm = new ElectricityForm();

  const [operators, setOperators] = useState<
    Array<{ text: string; value: string }>
  >(new Array<{ text: string; value: string }>());

  // function to handle api request purchase electricity
  const handleElectricityPurchase: Function = async () => {
    setIsSubmitting(true);
    if (Values.operator && Values.meterNumber.length > 0) {
      const response = await properties.FinalStepForOrderRequest(
        Values,
        Values.meterNumber,
        finalRequestPayload
      );
      response === null
        ? properties.setCurrentStep(1)
        : setErrorMessage(response);
    }
    setIsSubmitting(false);
  };

  const { Values, onChange, onSubmit, SetValues } = useForm(
    handleElectricityPurchase,
    initialForm
  );

  const handleContinueButton = () => {
    if (
      Values.operator !== null &&
      Values.policyAgree !== false &&
      Values.amount >= 50 &&
      Values.meterNumber !== null
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && properties.IsAuthenticated) {
      Values.policyAgree = true;
    }

    return () => {
      mounted = false;
    };
  }, [Values]);

  useEffect(() => {
    let mounted = true;
    if (mounted && properties.auth.CurrentUser) {
      const { phoneNumber, emailAddress } = properties.auth.CurrentUser;
      SetValues({
        ...Values,
        ["phoneNumber"]: phoneNumber,
        ["email"]: emailAddress,
      });
    }
    return () => {
      mounted = false;
    };
  }, [properties]);

  useEffect(() => {
    /**
     * TODO:
     * change the source of recent purchases.
     */
    let purchasesMounted = [1, 2, 3, 4].map((item: any) => {
      return {
        accountNumber: "223432343",
        name: "IKEDC LTD",
      };
    });
    setRecentPurchases(purchasesMounted);
    /**
     * TODO:
     * /change the source of recent purchases.
     */

    let mounted = true;

    if (mounted) {
      // Load the vendors or operators
      properties
        .LoadProductsByCategory(__PRODUCT_CATEGORY__)
        .then((success: any) => {
          const { data } = success;
          if (data.products) {
            const products = data.products.map((product: IDgProduct) => ({
              text: product.name,
              value: product.product_id,
            }));

            setOperators(products);
            setProviders(data.products);
          }
        })
        .catch((error: any) => console.log(error))
        .finally(() => setLoadingOperators(false));

      if (!AuthService.GetLoggedInUser()) {
        setshowHideTermsConditions(true);
      } else {
        setshowHideTermsConditions(false);
      }
    }
    return () => {
      mounted = false;
      purchasesMounted = [];
    };
  }, []);

  // allow the change of meter number to take effect after 500 milliseconds
  const meterNumber = useDebounce<string>(Values.meterNumber, 500);

  useEffect(() => {
    //TODO: validate the customer details
    let mounted = Values;
    if (mounted && meterNumber.length >= 10 && selectedOperator) {
      setLoading(true);
      SetValues({
        ...Values,
        ["operator"]: providers.find(
          (provider: any) => provider.product_id === parseInt(selectedOperator)
        ),
      });
      properties
        .InitiateOrderAction(
          { operator: { product_id: selectedOperator } },
          meterNumber
        )
        .then((data: any) => {
          const response = data.data;
          if (data.status === SUCCESS && response) {
            setFinalRequestPayload(response);
            setHasDetails(response.CustomerName || response.CustomerAddress);
            setCustomerName(response.CustomerName ?? "");
            setCustomerAddress(response.CustomerAddress ?? "");
          } else if (data.status === ERROR) {
            setErrorMessage(data.message);
          }
        })
        .finally(() => setLoading(false));
    }
    return () => {
      mounted = undefined;
    };
  }, [meterNumber, selectedOperator]);

  useEffect(() => {
    let mounted = true;

    if (
      mounted &&
      properties &&
      errorMessage &&
      errorMessage !== null &&
      errorMessage.length > 1
    ) {
      properties.ManageCartAlert(
        null,
        { message: errorMessage },
        NotificationAlertType.Error
      );
    }

    return () => {
      mounted = false;
    };
  }, [errorMessage]);

  return (
    <Fragment>
      <div className={styles.buyElectricity}>
        <div className={composeClasses("mt-4", styles.header)}>
          <h1>Buy Electricity</h1>
        </div>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputWrapper}>
              <Select
                className={"mt-3 mb-4"}
                label={"Service Provider"}
                name={"operator"}
                onChange={(e: any) => setSelectedOperator(e.target.value)}
                options={operators}
                placeholder={"Select a Service Provider"}
                value={selectedOperator}
              />
              <div
                className={composeClasses(styles.meterNumberRow, "col px-0")}
              >
                {loading && (
                  <img className={styles.spinner} src={spinner} width="24" />
                )}
                <Input
                  className={"form-control mb-4"}
                  disabled={loading}
                  label={"Meter Number"}
                  maxLength={10}
                  name={"meterNumber"}
                  onChange={onChange}
                  placeholder={"Enter Meter Number"}
                  type={"text"}
                  value={Values.meterNumber}
                />
              </div>
              {hasDetails ? (
                <Fragment>
                  <div className={"row"}>
                    <div className={"col"}>
                      <div className="alert alert-warning" role="alert">
                        <p>{`Customer Name: ${customerName}`}</p>
                        <p>{`Physical Address: ${customerAddress}`}</p>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment />
              )}

              <div className={"row"}>
                <Input
                  className={"form-control"}
                  label={`Enter Amount (${CURRENCIES.NAIRA})`}
                  min={100}
                  name={"amount"}
                  onChange={onChange}
                  placeholder={"Enter an amount (eg 10,000)"}
                  type={"number"}
                  value={Values.amount}
                />
              </div>

              {!properties.IsAuthenticated && (
                <div className={"row mx-0"}>
                  <label htmlFor={"email"}>Email Address</label>
                  <input
                    className={"form-control"}
                    id={"email"}
                    name={"email"}
                    onChange={onChange}
                    placeholder={"Enter Email Address"}
                    type={"text"}
                    value={Values.email}
                  />
                </div>
              )}

              {!properties.IsAuthenticated && (
                <div className={"row mx-0"}>
                  <label htmlFor={"phoneNumber"}>{"Phone Number"}</label>
                  <input
                    className={"form-control"}
                    id={"phoneNumber"}
                    name={"phoneNumber"}
                    onChange={onChange}
                    placeholder={"Enter Phone Number"}
                    type={"tel"}
                    value={Values.phoneNumber}
                  />
                </div>
              )}

              {!showHideTermsConditions && (
                <div className={styles.saveAsBeneficiary}>
                  <input type="checkbox" value={Values.saveBeneficiary} />
                  <span>Save as beneficiary</span>
                </div>
              )}
            </div>
            {showHideTermsConditions && (
              <TermsAndConditionsCheckBox
                isChecked={Values.policyAgree}
                onChange={onChange}
              />
            )}
            <div className={styles.button}>
              <Button
                btnClass={"btn-primary text-white"}
                isDisable={handleContinueButton()}
                isSubmitting={isSubmitting}
                title="Continue"
                type={"submit"}
              />
            </div>
            {/* {!showHideTermsConditions && (
              <div className={styles.recentPurchases}>
                <RecentPurchaseComponent service={recentPurchases} />
              </div>
            )} */}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    kpay: state.kpay,
    auth: state.auth,
    IsAuthenticated: state.auth.IsAuthenticated,
  };
};

step1.defaultProps = {
  IsAuthenticated: false,
};

export default connect(mapStateToProps, {
  FinalStepForOrderRequest,
  InitiateOrderAction,
  LoadProductsByCategory,
  ManageCartAlert,
})(step1);
