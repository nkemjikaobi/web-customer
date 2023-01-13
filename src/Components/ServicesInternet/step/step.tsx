/* eslint-disable @typescript-eslint/ban-types */
import { useForm } from "CustomHooks/FormHook";
import IDgProduct from "dto/Kongapay/IDgProduct";
import { chunkArray } from "libs/utils/utils";
import BuyDataForm, {
  IBuyDataForm,
} from "Models/FormModels/KPay/AirtimeData/BuyDataForm";
import React, { Fragment, useEffect, useState } from "react";

import OperatorSelectorList from "Components/OperatorSelector/operatorSelectorList";
import { Input, Select } from "Components/Form/inputs";
import Button from "Components/Button/button";

import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import {
  InitiateOrderAction,
  FinalStepForOrderRequest,
} from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { LoadProductsByCategory } from "Http/Redux/Actions/KPayActions/DGActionRequest";
import { connect } from "react-redux";
import styles from "./step.module.scss";
import AuthService from "Http/Services/AuthService";
import TermsAndConditionsCheckBox from "PagesComponents/Kpay/TermAndConditionsCheckBox/TermsAndConditionsCheckBox";
import { ERROR, SUCCESS } from "Helpers/Constants";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

// statically setting the product category for this form
const __PRODUCT_CATEGORY__ = "internet";
interface IStep {
  kpay?: any;
  InitiateOrderAction: Function;
  LoadProductsByCategory: Function;
  FinalStepForOrderRequest: Function;
  ManageCartAlert: Function;
  setCurrentStep: Function;
  IsAuthenticated?: boolean;
}

const Step: React.FunctionComponent<IStep> = (properties: IStep) => {
  const [loadingOperators, setLoadingOperators] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
  const [dataPlans, setDataPlans] = useState<Array<IBuyDataForm>>([]);
  const [error, setErrorMessage] = useState<string | null>("");
  const [finalRequestPayload, setFinalRequestPayload] = useState<any | null>(
    null
  );
  const [showHideTermsConditions, setshowHideTermsConditions] = useState(false);

  // initialize the form
  const initialForm: BuyDataForm = new BuyDataForm();
  const [operators, setOperators] = useState<Map<number, Array<IDgProduct>>>(
    new Map<number, Array<IDgProduct>>()
  );

  // function to handle api request to the server for forgot password
  const handleBuyData: Function = async (): Promise<any> => {
    setIsSubmitting(true);
    const response = await properties.FinalStepForOrderRequest(
      Values,
      Values.phoneNumber,
      finalRequestPayload
    );
    setIsSubmitting(false);
    response === null
      ? properties.setCurrentStep(1)
      : setErrorMessage(response);
  };

  const { Values, onChange, onSubmit, SetValues } = useForm(
    handleBuyData,
    initialForm
  );

  const handleContinueButton = () => {
    if (
      Values.operator !== null &&
      Values.policyAgree !== false &&
      Values.dataPlan !== 0
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

  // load the operators
  useEffect(() => {
    let mounted = true;
    setLoadingOperators(mounted);
    SetValues({ ...Values, ["countryCode"]: "" });
    properties
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
      .finally(() => setLoadingOperators(!mounted));

    if (!AuthService.GetLoggedInUser()) {
      setshowHideTermsConditions(true);
    } else {
      setshowHideTermsConditions(false);
    }

    return () => {
      mounted = !mounted;
    };
  }, []);

  // populate the dataplans
  useEffect(() => {
    let mounted = true;

    if (mounted && Values.phoneNumber.length >= 9 && Values.operator !== null) {
      setLoadingPlans(true);
      const customerId = `${Values.phoneNumber}`;
      properties
        .InitiateOrderAction(Values, customerId)
        .then((data: any) => {
          if (data.status === SUCCESS && data.data.list_options) {
            const options: Array<IBuyDataForm> = data.data.list_options.map(
              (option: any) => ({
                value: option.BundleTypeCode,
                amount: option.BundlePrice,
                text: option.BundleDescription,
              })
            );
            setDataPlans(options);
            setFinalRequestPayload(data.data);
            if (options.length > 0)
              SetValues({
                ...Values,
                ["dataPlan"]: options[0].value,
              });
          } else if (data.status === ERROR) {
            setErrorMessage("Kindly recheck entered details");
          }
        })
        .catch((error: any) => console.log(error.message))
        .finally(() => setLoadingPlans(false));
    }

    return () => {
      mounted = false;
    };
  }, [Values.phoneNumber, Values.operator]);

  // set the operator when any is selected
  useEffect(() => {
    let mounted = { ...Values, ["operator"]: properties.kpay.SelectedOperator };
    SetValues(mounted);
    return () => {
      mounted = false;
    };
  }, [properties.kpay]);

  // set the amount when the data plan changes
  useEffect(() => {
    let selectedOption = dataPlans.find(
      (plan: IBuyDataForm) => plan.value === Values.dataPlan
    );
    SetValues({
      ...Values,
      ["amount"]: selectedOption?.amount,
      ["productCode"]: Values.dataPlan,
    });
    return () => {
      selectedOption = undefined;
    };
  }, [Values.dataPlan]);

  useEffect(() => {
    let mounted = true;
    if (mounted && properties && error && error.trim().length > 1) {
      properties.ManageCartAlert(
        null,
        { message: error },
        NotificationAlertType.Error
      );
    }

    return () => {
      mounted = false;
    };
  }, [error]);

  return (
    <Fragment>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.buyInternet}>
          <h6 className={"h6 text-danger pb-3"}>Internet Services</h6>
          <hr className={"dropdown-divider"} />
          <p className={"py-2"}>Select Network Operator</p>
          <div className={styles.operatorHolder}>
            <OperatorSelectorList
              isLoading={loadingOperators}
              operators={operators}
              value={Values.operator}
            />
          </div>

          <div className={"row my-2"}>
            <div className={"col"}>
              <div className={"form-group"}>
                <label className={"form-label m-0"}>
                  Enter your phone number
                </label>
                <div className={"row m-0"}>
                  <div className={"col px-0"}>
                    <Input
                      className={"form-control"}
                      name={"phoneNumber"}
                      onChange={onChange}
                      placeholder={"enter phone number"}
                      type={"text"}
                      value={Values.phoneNumber}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={"row"}>
            <div className={"col"}>
              <div className={"form-group"}>
                {loadingPlans === true ? (
                  <Input
                    disabled={true}
                    label={"Select Data Plan"}
                    type={"text"}
                    value={"Loading Data Plans"}
                  />
                ) : (
                  <Select
                    className={"form-select"}
                    label={"Select Data Plan"}
                    name={"dataPlan"}
                    onChange={onChange}
                    options={dataPlans}
                    value={Values.dataPlan}
                  />
                )}
              </div>
            </div>
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

          <div className={"row py-3"}>
            <div className={"col"}>
              <div className={"d-grid"}>
                <Button
                  btnClass={"btn-primary text-white"}
                  isDisable={handleContinueButton()}
                  isSubmitting={isSubmitting}
                  title={"Continue"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  kpay: state.kpay,
  IsAuthenticated: state.auth.IsAuthenticated,
});

Step.defaultProps = {
  kpay: undefined,
  IsAuthenticated: false,
};

export default connect(mapStateToProps, {
  FinalStepForOrderRequest,
  LoadProductsByCategory,
  InitiateOrderAction,
  ManageCartAlert,
})(Step);
