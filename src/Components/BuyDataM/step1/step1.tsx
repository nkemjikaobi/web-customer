/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useCallback, useEffect, useState } from "react";
import styles from "./step1.module.scss";
import { Input, Select } from "Components/Form/inputs";
import Button from "Components/Button/button";
import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import OperatorSelectorList from "Components/OperatorSelector/operatorSelectorList";
import IDgProduct from "dto/Kongapay/IDgProduct";
import BuyDataForm, {
  IBuyDataForm,
} from "Models/FormModels/KPay/AirtimeData/BuyDataForm";
import { connect } from "react-redux";
import { LoadProductsByCategory } from "Http/Redux/Actions/KPayActions/DGActionRequest";
import { chunkArray, composeClasses } from "libs/utils/utils";
import {
  InitiateOrderAction,
  FinalStepForOrderRequest,
} from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { useForm } from "CustomHooks/FormHook";
import { CURRENCIES, SUCCESS } from "Helpers/Constants";
import { debounce } from "lodash";
import AuthService from "Http/Services/AuthService";
import TermsAndConditionsCheckBox from "PagesComponents/Kpay/TermAndConditionsCheckBox/TermsAndConditionsCheckBox";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

// statically setting the product category for this form
const __PRODUCT_CATEGORY__ = "mobile-data";
export interface IProps {
  kpay: any;
  InitiateOrderAction: Function;
  LoadProductsByCategory: Function;
  FinalStepForOrderRequest: Function;
  setCurrentStep: Function;
  ManageCartAlert: Function;
}

const step1: React.FunctionComponent<IProps> = (props: IProps) => {
  const [loadingOperators, setLoadingOperators] = useState<boolean>(false);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [dataPlans, setDataPlans] = useState<Array<IBuyDataForm>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>("");
  // initialize the form
  const initialForm: BuyDataForm = new BuyDataForm();
  const [operators, setOperators] = useState<Map<number, Array<IDgProduct>>>(
    new Map<number, Array<IDgProduct>>()
  );
  const [finalRequestPayload, setFinalRequestPayload] = useState<any | null>(
    null
  );
  const [showHideTermsConditions, setshowHideTermsConditions] = useState(false);

  // function to handle api request to buy data
  const handleBuyData: Function = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (Values.operator) {
      const mobileNumber = `${Values.countryCode}${parseInt(
        Values.phoneNumber
      )}`;
      const response = await props.FinalStepForOrderRequest(
        Values,
        mobileNumber,
        finalRequestPayload
      );
      if (response) {
        setErrorMessage(response);
      } else {
        props.setCurrentStep(1);
      }
    } else {
      setErrorMessage("Select an operator");
    }
    setIsSubmitting(false);
  };

  const { Values, onChange, SetValues } = useForm(handleBuyData, initialForm);

  const handleContinueButton = () => {
    let validator: boolean =
      Values.amount >= 50 &&
      Values.operator &&
      Values.phoneNumber !== "" &&
      Values.dataPlan !== 0;

    if (showHideTermsConditions) {
      validator = validator && Values.policyAgree === true;
    }
    return !validator;
  };

  const handleDataPlanLoading = (
    innerValues: any,
    customerId: string
  ): Promise<Array<any>> =>
    props
      .InitiateOrderAction(innerValues, customerId)
      .then((data: any) => {
        const response = data.data;
        if (
          data.status === SUCCESS &&
          response &&
          response.form_elements &&
          response.form_elements.product_code &&
          response.form_elements.product_code.list_options
        ) {
          const options: Array<IBuyDataForm> =
            response.form_elements.product_code.list_options.map(
              (option: any) => {
                const key: string = Object.keys(option)[0];
                const values: string[] = option[key]
                  .split(",")
                  .map((optionKey: string) => optionKey.trim());
                return {
                  value: values[0],
                  amount: parseInt(values[1]) / 100,
                  text: key,
                };
              }
            );
          setDataPlans(options);
          setFinalRequestPayload(response);
          if (options.length > 0)
            SetValues({
              ...innerValues,
              ["dataPlan"]: options[0].value,
            });
        }
      })
      .finally(() => setLoadingPlans(false));

  const dataPlansLoader = useCallback(
    debounce(handleDataPlanLoading, 2000),
    []
  );

  // load the operators
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (!AuthService.GetLoggedInUser()) {
        setshowHideTermsConditions(true);
      } else {
        setshowHideTermsConditions(false);
      }
      setLoadingOperators(true);
      props
        .LoadProductsByCategory(__PRODUCT_CATEGORY__)
        .then((success: any) => {
          const {
            data: { products },
          } = success;
          if (products) {
            const chunked: Map<number, Array<IDgProduct>> = chunkArray(
              products,
              4
            );
            setOperators(chunked);
          }
        })
        .catch((error: any) => console.log(error))
        .finally(() => setLoadingOperators(false));
    }

    return () => {
      mounted = false;
    };
  }, []);

  // set the operator when any is selected
  useEffect(() => {
    let mounted = props.kpay;
    if (mounted) {
      SetValues({ ...Values, ["operator"]: mounted.SelectedOperator });
      if (mounted.OrderResponseStatus === false) {
        mounted.OrderResponseMessage &&
          setErrorMessage(mounted.OrderResponseMessage);
        setTimeout(() => {
          setErrorMessage("");
        }, 50000);
      }
    }
    return () => {
      mounted = false;
    };
  }, [props.kpay]);

  // populate the dataplans
  useEffect(() => {
    let mounted = true;
    mounted && setLoadingPlans(true);
    if (mounted && Values.phoneNumber.length >= 9 && Values.operator !== null) {
      const customerId = `${Values.phoneNumber}`;
      dataPlansLoader(Values, customerId);
    } else {
      setLoadingPlans(false);
    }

    return () => {
      mounted = false;
    };
  }, [Values.phoneNumber, Values.operator]);

  // set the amount when the data plan changes
  useEffect(() => {
    let mounted = true;

    const selectedOption = dataPlans.find(
      (plan: IBuyDataForm) => plan.value === Values.dataPlan
    );

    if (mounted) {
      const tempValues = { ...Values };

      if (selectedOption) {
        tempValues["amount"] = selectedOption.amount;
      }

      if (Values.dataPlan) {
        tempValues["productCode"] = Values.dataPlan;
      }

      SetValues({ ...tempValues });
    }
    return () => {
      mounted = false;
    };
  }, [Values.dataPlan]);

  useEffect(() => {
    let mounted = true;

    if (mounted && props && errorMessage && errorMessage.length > 1) {
      props.ManageCartAlert(
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
      <div className={styles.buyData}>
        <div className={composeClasses("mt-4", styles.header)}>
          <h1>Buy Data</h1>
        </div>
        <div className={styles.formWrapper}>
          <form className={styles.form}>
            <div className={styles.form_heading}>
              <h1>Select Network Operator</h1>
            </div>
            <div className={styles.operatorHolder}>
              <OperatorSelectorList
                isLoading={loadingOperators}
                operators={operators}
                value={Values.operator}
              />
            </div>
            <div className={styles.inputWrapper}>
              <Input
                className={"form-control"}
                label="Phone Number"
                maxLength={11}
                name={"phoneNumber"}
                onChange={onChange}
                placeholder={"Enter Phone Number"}
                required={true}
                type={"tel"}
                value={Values.phoneNumber}
              />

              {loadingPlans === true ? (
                <Input
                  className={"form-control py-2"}
                  disabled={true}
                  label={"Select Data Plan"}
                  type={"text"}
                  value={"Loading Data Plans"}
                />
              ) : (
                <Select
                  className={"form-select mb-4"}
                  label={"Select Data Plan"}
                  name={"dataPlan"}
                  onChange={onChange}
                  options={dataPlans}
                  value={Values.dataPlan}
                />
              )}
              {/* <label>{`Amount (${CURRENCIES.NAIRA})`}</label>
            {/* <div className={"form-control mb-4"}>
              {accounting.formatNumber(Values.amount)}
            </div> */}
              <label htmlFor={"amount"}>{`Amount (${CURRENCIES.NAIRA})`}</label>
              <input
                className={"form-control"}
                name={"amount"}
                onChange={onChange}
                placeholder="Enter an amount (e.g 20,000)"
                readOnly={true}
                required={true}
                type={"text"}
                value={Values.amount}
              />
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
                handleClick={handleBuyData}
                isDisable={handleContinueButton()}
                isSubmitting={isSubmitting}
                title="Continue"
                type={"button"}
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return { kpay: state.kpay };
};

export default connect(mapStateToProps, {
  FinalStepForOrderRequest,
  LoadProductsByCategory,
  InitiateOrderAction,
  ManageCartAlert,
})(step1);
