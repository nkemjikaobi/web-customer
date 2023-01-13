/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./step1.module.scss";
import { Select } from "Components/Form/inputs";
import Button from "Components/Button/button";

import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import {
  InitiateOrderAction,
  FinalStepForOrderRequest,
} from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { LoadProductsByCategory } from "Http/Redux/Actions/KPayActions/DGActionRequest";
import IDgProduct from "dto/Kongapay/IDgProduct";
import { useForm } from "CustomHooks/FormHook";
import { chunkArray, composeClasses } from "libs/utils/utils";
import { connect } from "react-redux";

import OperatorSelectorList from "Components/OperatorSelector/operatorSelectorList";
import BuyCableTvForm from "Models/FormModels/KPay/AirtimeData/BuyCableTvForm";
import IUser from "dto/Authentication/IUser";
import AuthService from "Http/Services/AuthService";
import TermsAndConditionsCheckBox from "PagesComponents/Kpay/TermAndConditionsCheckBox/TermsAndConditionsCheckBox";
import CustomerInfo from "./CustomerInfo/CustomerInfo";
import spinner from "../../../Assets/images/loader.gif";
import { mockData } from "../tvMockData";
import config from "Configurations/configurations";
import { SUCCESS } from "Helpers/Constants";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

// statically setting the product category for this form
const __PRODUCT_CATEGORY__ = "tv";
export interface IProps {
  kpay: any;
  user?: IUser;
  InitiateOrderAction: Function;
  FinalStepForOrderRequest: Function;
  LoadProductsByCategory: Function;
  setCurrentStep: Function;
  ManageCartAlert: Function;
  IsAuthenticated?: boolean;
}

const planRenewal = "planRenewal";
const changePlan = "changePlan";

const step1: React.FunctionComponent<IProps> = (properties: IProps) => {
  const [loadingOperators, SetLoadingOperators] = useState<boolean>(false);

  // initialize the form
  const initialForm: BuyCableTvForm = new BuyCableTvForm();
  const [operators, setOperators] = useState<Map<number, Array<IDgProduct>>>(
    new Map<number, Array<IDgProduct>>()
  );

  const [bouquests, setBouquests] = useState<Array<any>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  const [customerInfo, setCustomerInfo] = useState<any>(<></>);
  const [hasCustomerInfo, setHasCustomerInfo] = useState<boolean>(false);
  const [isLoggedIn, setIsloggedIn] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showHideTermsConditions, setshowHideTermsConditions] = useState(false);
  const [finalRequestPayload, setFinalRequestPayload] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [showInputFields, setShowInputFields] = useState<boolean>(false);
  const [subscriptionType, setSubscriptionType] = useState<string>(planRenewal);
  const [selectedProvider, setSelectedProvider] = useState<any>();

  // function to handle api request to the server for forgot password
  const handleBuyCableTv: Function = async (): Promise<any> => {
    setIsSubmitting(true);
    const response = await properties.FinalStepForOrderRequest(
      Values,
      Values.cardNumber,
      finalRequestPayload
    );
    response === null
      ? properties.setCurrentStep(1)
      : setErrorMessage(response);
    setIsSubmitting(false);
  };

  const { Values, onChange, onSubmit, SetValues } = useForm(
    handleBuyCableTv,
    initialForm
  );

  useEffect(() => {
    let mounted = true;

    if (mounted && properties.IsAuthenticated) {
      Values.policyAgree = true;
    }

    return () => {
      mounted = false;
    };
  }, [Values]);

  const handleContinueButton = () => {
    if (
      subscriptionType === planRenewal &&
      hasCustomerInfo &&
      Values.policyAgree !== false &&
      showHideTermsConditions
    ) {
      return false;
    } else if (
      subscriptionType === planRenewal &&
      hasCustomerInfo &&
      Values.policyAgree !== false &&
      !showHideTermsConditions
    ) {
      return false;
    } else if (
      subscriptionType === changePlan &&
      hasCustomerInfo &&
      Values.policyAgree !== false &&
      Values.cardNumber !== "" &&
      Values.operator !== null &&
      Values.productCode !== null &&
      !showHideTermsConditions
    ) {
      return false;
    } else if (
      Values.cardNumber !== "" &&
      Values.operator !== null &&
      Values.phoneNumber !== "" &&
      Values.productCode !== null &&
      Values.useEmail &&
      Values.policyAgree !== false
    ) {
      return false;
    } else {
      return true;
    }
  };

  const getPrice = (item: any) => {
    for (const [key, value] of Object.entries(item)) {
      const response = JSON.parse(`${value}`);
      return response["price"];
    }
  };

  const getProductCode = (item: any) => {
    for (const [key, value] of Object.entries(item)) {
      const response = JSON.parse(`${value}`);
      return response["productCode"];
    }
  };

  const setUser = () => {
    const loggedInUser = properties.user;
    if (!isLoggedIn) {
      if (loggedInUser) {
        setIsloggedIn(true);
        if (Values.userEmail.length <= 0) {
          const newValues = {
            ...Values,
            ["phoneNumber"]: loggedInUser.phoneNumber ?? "",
            ["userEmail"]: loggedInUser.emailAddress ?? "",
          };
          SetValues({ ...newValues });
        }
      } else setIsloggedIn(false);
    }
    return loggedInUser;
  };

  const mapBouquests = (items: Array<any>) =>
    [...items].map((result: any) => {
      for (const [key, value] of Object.entries(result)) {
        const response = { value: "", text: "" };
        const obj = JSON.parse(`${value}`);
        response["value"] = obj["productCode"] ?? "";
        response["text"] = key;
        return response;
      }
    });

  const getBouquest = (items: Array<any>, productCode: string) =>
    [...items].filter((bouquest: any) => {
      for (const [, value] of Object.entries(bouquest)) {
        const response = JSON.parse(`${value}`);
        return response["productCode"] === productCode;
      }
    });

  const loadBouquets = () => {
    setErrorMessage("");

    properties
      .InitiateOrderAction({ operator: selectedProvider }, Values.cardNumber)
      .then((data: any) => {
        let response = null;

        if (config.app.env === "development") {
          response = mockData;
        } else if (data.status === SUCCESS) {
          response = data.data;
        }

        if (response) {
          setHasCustomerInfo(true);

          setCustomerInfo(response);
          const listOptions = [...(response["list_options"] ?? [])];
          if (listOptions.length > 0) {
            let extraData = {};
            if (subscriptionType === planRenewal) {
              extraData = {
                ...extraData,
                ["amount"]: response.OutstandingBalance,
                ["productCode"]: 0,
              };
            } else {
              extraData = {
                ...extraData,
                ["amount"]: getPrice(listOptions[0]),
                ["productCode"]: getProductCode(listOptions[0]),
              };
            }

            SetValues({
              ...Values,
              ...extraData,
              ["operator"]: selectedProvider,
              ["service_type"]: response.product_code,
            });
            setBouquests(listOptions);
            setFinalRequestPayload(response);
          }
        }
      })
      .catch((error: any) => error && setErrorMessage(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setSubscriptionType(planRenewal);

      SetLoadingOperators(mounted);

      setUser();
      properties
        .LoadProductsByCategory(__PRODUCT_CATEGORY__)
        .then((resp: any) => {
          const {
            data: { products },
          } = resp;
          // change the names of the products
          if (products) {
            const newProducts = products.map((product: IDgProduct) => {
              product.name = product.name.split(" ")[0];
              return product;
            });
            setOperators(chunkArray(newProducts, 4));
          }
        })
        .catch((error: any) => console.log(error))
        .finally(() => SetLoadingOperators(false));

      if (!AuthService.GetLoggedInUser()) {
        setshowHideTermsConditions(true);
      } else {
        setshowHideTermsConditions(false);
      }
    }

    return () => {
      mounted = true;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setUser();
    }

    return () => {
      mounted = false;
    };
  }, [properties]);

  // load the bouquests
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setErrorMessage("");

      if (Values.cardNumber?.length >= 10 && selectedProvider) {
        setLoading(true);
        // make api call to validate customer
        setBouquests([]);
        loadBouquets();
      }
    }
    return () => {
      mounted = false;
    };
  }, [Values.cardNumber, selectedProvider]);

  // set the operator when any is selected
  useEffect(() => {
    let mounted = true;

    if (mounted && properties.kpay.SelectedOperator) {
      setSelectedProvider(properties.kpay.SelectedOperator);
    }
    return () => {
      mounted = false;
    };
  }, [properties.kpay]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      try {
        const findB = getBouquest(bouquests, Values.productCode);
        if (findB.length > 0) {
          mounted = getPrice(findB[0]);
        }
      } catch (err) {}
    }

    return () => {
      mounted = false;
    };
  }, [Values.productCode, bouquests]);

  const handleChangePlan = () => {
    setSubscriptionType(changePlan);
    setShowInputFields(true);
  };

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
      <div className={styles.tvSubscription}>
        <div className={styles.header}>
          <h1>TV Subscription</h1>
        </div>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={onSubmit}>
            <div className={styles.inputWrapper}>
              <p>Select Network Operator</p>
              <div className={styles.operatorHolder}>
                <OperatorSelectorList
                  isLoading={loadingOperators}
                  operators={operators}
                  value={selectedProvider}
                />
              </div>
              <div className={"row"}>
                <div className={"form-group"}>
                  <label className={"form-label m-0"}>
                    Enter your Smart Card/IUC Number
                  </label>
                  <div className={"row m-0"}>
                    <div className={composeClasses(styles.iucRow, "col px-0")}>
                      {loading && (
                        <img
                          className={styles.spinner}
                          src={spinner}
                          width="24"
                        />
                      )}
                      <input
                        className={"form-control " + styles.IucInput}
                        disabled={loading}
                        name={"cardNumber"}
                        onChange={onChange}
                        placeholder={"Enter IUC number (e.g 8394837493)"}
                        type={"text"}
                        value={Values.cardNumber}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {
                <CustomerInfo
                  handleChangePlan={handleChangePlan}
                  hasData={hasCustomerInfo}
                  responseData={customerInfo}
                />
              }

              <div>
                {!showHideTermsConditions && showInputFields && (
                  <div className={"row"}>
                    <div className={"col"}>
                      <div className={"form-group"}>
                        <Select
                          id={"productCode"}
                          label={"Select a Bouquet"}
                          name={"productCode"}
                          onChange={onChange}
                          options={mapBouquests(bouquests)}
                          value={Values.productCode}
                        />
                      </div>
                    </div>
                    {/* <div className={"row"}>
                      <div className={"form-group"}>
                        <label htmlFor={"userEmail"}>Email Address</label>
                        <input
                          className={"form-control"}
                          id={"userEmail"}
                          name={"userEmail"}
                          onChange={onChange}
                          placeholder={"Enter Email Address"}
                          type={"email"}
                          value={Values.userEmail}
                        />
                      </div>
                    </div>

                    <div className={"row"}>
                      <div className={"form-group"}>
                        <label htmlFor={"phoneNumber"}>Phone Number</label>
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
                    </div> */}
                  </div>
                )}

                {showHideTermsConditions && (
                  <>
                    {showInputFields && (
                      <div className={"col"}>
                        <div className={"form-group"}>
                          <Select
                            id={"productCode"}
                            label={"Select a Bouquet"}
                            name={"productCode"}
                            onChange={onChange}
                            options={mapBouquests(bouquests)}
                            value={Values.productCode}
                          />
                        </div>
                      </div>
                    )}
                    <div className={"row"}>
                      <div className={"form-group"}>
                        <label htmlFor={"userEmail"}>Email Address</label>
                        <input
                          className={"form-control"}
                          id={"userEmail"}
                          name={"userEmail"}
                          onChange={onChange}
                          placeholder={"Enter Email Address"}
                          type={"email"}
                          value={Values.userEmail}
                        />
                      </div>
                    </div>

                    <div className={"row"}>
                      <div className={"form-group"}>
                        <label htmlFor={"phoneNumber"}>Phone Number</label>
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
                    </div>
                  </>
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
                  className="submitButton"
                  handleClick={handleBuyCableTv}
                  isDisable={handleContinueButton()}
                  isSubmitting={isSubmitting}
                  title={
                    hasCustomerInfo &&
                    Values.cardNumber &&
                    showHideTermsConditions
                      ? "continue"
                      : hasCustomerInfo &&
                        Values.cardNumber &&
                        !showHideTermsConditions
                      ? "Renew Subscription"
                      : "continue"
                  }
                  type={"button"}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    kpay: state.kpay,
    user: state.auth.CurrentUser,
    IsAuthenticated: state.auth.IsAuthenticated,
  };
};

step1.defaultProps = {
  user: undefined,
  IsAuthenticated: false,
};

export default connect(mapStateToProps, {
  FinalStepForOrderRequest,
  InitiateOrderAction,
  LoadProductsByCategory,
  ManageCartAlert,
})(step1);
