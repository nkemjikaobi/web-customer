/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import styles from "./step1.module.scss";
import { Input } from "Components/Form/inputs";
import Button from "Components/Button/button";
import OperatorSelectorList from "Components/OperatorSelector/operatorSelectorList";
import BuyAirtimeForm from "Models/FormModels/KPay/AirtimeData/BuyAirtimeForm";
import IDgProduct from "dto/Kongapay/IDgProduct";
import { useForm } from "CustomHooks/FormHook";
import { connect } from "react-redux";
import { LoadProductsByCategory } from "Http/Redux/Actions/KPayActions/DGActionRequest";
import { CompleteOrderRequestAction } from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { chunkArray, composeClasses } from "libs/utils/utils";
import { CURRENCIES } from "Helpers/Constants";
import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";

const __PRODUCT_CATEGORY__ = "airtime";
import AuthService from "Http/Services/AuthService";
import TermsAndConditionsCheckBox from "PagesComponents/Kpay/TermAndConditionsCheckBox/TermsAndConditionsCheckBox";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

interface IBuyAirtime {
  kpay: any;
  setCurrentStep: Function;
  LoadProductsByCategory: Function;
  CompleteOrderRequestAction: Function;
  ManageCartAlert: Function;
  beneficiaryData?: BuyAirtimeForm;
  IsAuthenticated?: boolean;
}

const step1: React.FunctionComponent<IBuyAirtime> = (
  properties: IBuyAirtime
) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingOperators, SetLoadingOperators] = useState<boolean>(false);
  const [hideTermsConditions, setHideTermsConditions] = useState(false);

  // initialize the form
  const initialForm: BuyAirtimeForm = new BuyAirtimeForm();

  const [operators, setOperators] = useState<Map<number, Array<IDgProduct>>>(
    new Map<number, Array<IDgProduct>>()
  );

  // function to handle api request to the server for forgot password
  const handleBuyAirtime: Function = async (e: any): Promise<any> => {
    if (Values.operator) {
      const mobileNumber = `${Values.phoneNumber}`;
      SetValues({ ...Values, ["productCode"]: Values.amount });
      const response = await properties.CompleteOrderRequestAction(
        Values,
        mobileNumber
      );
      response === null
        ? properties.setCurrentStep(1)
        : setErrorMessage(response);
    } else {
      setErrorMessage("Select an operator");
    }
  };

  const { Values, onChange, onSubmit, IsSubmitting, SetValues } = useForm(
    handleBuyAirtime,
    initialForm
  );

  const handleContinueButton = () => {
    /**
     * Re-enable amount validation
     * taken off due to allow konga pay error / bug to be fixed.
     */
    if (
      Values.operator &&
      Values.phoneNumber !== "" &&
      Values.policyAgree !== false &&
      Values.amount >= 50
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

    if (mounted) {
      // load saved airtime beneficiaries
      // SetSavedBeneficiaries(AirtimeService.loadBeneficiaries());
      SetLoadingOperators(true);

      properties
        .LoadProductsByCategory(__PRODUCT_CATEGORY__)
        .then((success: any) => {
          const {
            data: { products },
          } = success;
          setOperators(chunkArray(products, 4));
        })
        .catch((error: any) => console.log(error))
        .finally(() => SetLoadingOperators(false));

      if (!authenticatedUser) {
        setHideTermsConditions(true);
      } else {
        setHideTermsConditions(false);
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted && properties.beneficiaryData) {
      SetValues({
        ...Values,
        ["phoneNumber"]: properties.beneficiaryData.phoneNumber,
      });
    }

    return () => {
      mounted = false;
    };
  }, [properties.beneficiaryData]);

  useEffect(() => {
    let mounted = true;
    if (mounted && properties.kpay.SelectedOperator) {
      SetValues({ ...Values, ["operator"]: properties.kpay.SelectedOperator });
    }
    return () => {
      mounted = false;
    };
  }, [properties.kpay]);

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

  const authenticatedUser = AuthService.GetLoggedInUser();

  return (
    <Fragment>
      <div className={styles.buyAirtime}>
        <div className={composeClasses("mt-4", styles.header)}>
          <h1>Buy Airtime</h1>
        </div>
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={onSubmit}>
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
            <div className={composeClasses(styles.inputWrapper, "pt-5")}>
              <div className={styles.beneficiaryWrapper}>
                <label htmlFor={"phoneNumber"}>Phone Number</label>
                {/* <label className={styles.beneficiaryLabel}>Beneficiary</label> */}
              </div>
              <input
                className={"form-control"}
                maxLength={11}
                name={"phoneNumber"}
                onChange={onChange}
                placeholder="Enter Phone Number"
                required={true}
                type={"tel"}
                value={Values.phoneNumber}
              />
              <Input
                className={"form-control"}
                label={`Amount (${CURRENCIES.NAIRA})`}
                min={0}
                name={"amount"}
                onChange={onChange}
                placeholder="Enter an amount (e.g 20,000)"
                required={true}
                type={"tel"}
                value={Values.amount}
              />
              {!hideTermsConditions && (
                <div className={styles.saveAsBeneficiary}>
                  <input
                    name={"saveBeneficiary"}
                    onChange={onChange}
                    type="checkbox"
                    value={Values.saveBeneficiary}
                  />
                  <span>Save as beneficiary</span>
                </div>
              )}
            </div>
            {hideTermsConditions && (
              <TermsAndConditionsCheckBox
                isChecked={Values.policyAgree}
                onChange={onChange}
              />
            )}
            <div className={styles.button}>
              <Button
                btnClass={"btn-primary text-white"}
                isDisable={handleContinueButton()}
                isSubmitting={IsSubmitting}
                title="Continue"
                type={"submit"}
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  kpay: state.kpay,
  IsAuthenticated: state.auth.IsAuthenticated,
});

step1.defaultProps = {
  IsAuthenticated: false,
};

export default connect(mapStateToProps, {
  LoadProductsByCategory,
  CompleteOrderRequestAction,
  ManageCartAlert,
})(step1);
