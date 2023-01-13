/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/ban-types */
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { Input, Select } from "Components/Form/inputs";
import { useForm } from "CustomHooks/FormHook";
import { CURRENCIES, SUCCESS } from "Helpers/Constants";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import { ManageCartAlert } from "Http/Redux/Actions/Cart/IMarketplaceCartAction";
import {
  InitiateOrderAction,
  FinalStepForOrderRequest,
} from "Http/Redux/Actions/KPayActions/DGActionEvent";
import { LoadProductsByCategory } from "Http/Redux/Actions/KPayActions/DGActionRequest";
import IDgProduct from "dto/Kongapay/IDgProduct";
import BuyEPinForm from "Models/FormModels/KPay/EPin/BuyEPinForm";

import styles from "./epin.module.scss";
import { useHistory } from "react-router-dom";
import { NotificationAlertType } from "Components/NotificationAlert/NotificationAlert";

// statically setting the product category for this form
const __PRODUCT_CATEGORY__ = "e-pin";

export interface IEPinPage {
  kpay: any;
  InitiateOrderAction: Function;
  FinalStepForOrderRequest: Function;
  LoadProductsByCategory: Function;
  ManageCartAlert: Function;
}

const EPinPage: React.FunctionComponent<IEPinPage> = (
  properties: IEPinPage
) => {
  const [finalRequestPayload, setFinalRequestPayload] = useState<any | null>(
    null
  );
  const history = useHistory();
  const [operators, setOperators] = useState<Array<any>>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [unMappedOperators, setUnMappedOperators] = useState<Array<any>>([]);
  const [serviceOptions, setServiceOptions] = useState<Array<any>>([]);
  const [loadingserviceOptions, setLoadingServiceOptions] =
    useState<boolean>(false);
  const initialForm: BuyEPinForm = new BuyEPinForm();
  const handleEPinPurchase: Function = async (): Promise<any> => {
    const response = await properties.FinalStepForOrderRequest(
      Values,
      "",
      finalRequestPayload
    );
    response === null
      ? history.push("/pay-bills/order-details/1")
      : setErrorMessage(response);
  };

  const { Values, onChange, onSubmit, IsSubmitting, SetValues } = useForm(
    handleEPinPurchase,
    initialForm
  );

  // load epin vendors
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      properties
        .LoadProductsByCategory(__PRODUCT_CATEGORY__)
        .then((success: any) => {
          const { status, data } = success;
          if (status === SUCCESS) {
            if (data.products.length > 0) {
              setUnMappedOperators(data.products);
              const mappedOperators = data.products.map(
                (product: IDgProduct) => ({
                  text: product.name,
                  value: product.product_id,
                  amount: 0,
                })
              );
              setOperators(mappedOperators);
              if (mappedOperators.length > 0) {
                SetValues({
                  ...Values,
                  ["operator"]: unMappedOperators[0],
                  ["provider"]: mappedOperators[0].value,
                });
              }
            }
          }
        });
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted && Values.provider !== "") {
      const selectedOperatorFilter = unMappedOperators.filter(
        (operator: any) =>
          parseInt(operator.product_id) === parseInt(Values.provider)
      );
      const selectedOperator =
        selectedOperatorFilter.length > 0 ? selectedOperatorFilter[0] : null;
      SetValues({
        ...Values,
        ["productCode"]: Values.provider,
        ["operator"]: selectedOperator,
      });
    }
    return () => {
      mounted = false;
    };
  }, [Values.provider]);

  useEffect(() => {
    let mounted = true;
    if (mounted && Values.serviceOption !== "") {
      SetValues({
        ...Values,
        ["amount"]: Values.serviceOption * Values.quantity,
      });
    }
    return () => {
      mounted = false;
    };
  }, [Values.serviceOption, Values.quantity]);

  useEffect(() => {
    let mounted = true;
    if (mounted && Values.productCode) {
      setLoadingServiceOptions(true);
      SetValues({ ...Values, ["amount"]: 0, ["quantity"]: 0 });
      // fetch the service options
      properties
        .InitiateOrderAction(Values)
        .then((data: any) => {
          if (data.status === SUCCESS) {
            const response = data.data;
            setFinalRequestPayload(response);
            const tempServiceOptions = response.list_options.map(
              (option: any) => ({
                text: option.description,
                value: option.amount,
                amount: option.amount,
              })
            );

            const tempServiceOption =
              tempServiceOptions.length > 0 ? tempServiceOptions : null;

            if (tempServiceOption) {
              setServiceOptions(tempServiceOptions);
              SetValues({
                ...Values,
                ["serviceOption"]: tempServiceOptions[0].value,
              });
            }
          }
        })
        .finally(() => {
          setLoadingServiceOptions(false);
        });
    }
    return () => {
      mounted = false;
    };
  }, [Values.productCode]);

  useEffect(() => {
    let mounted = true;

    if (
      mounted &&
      properties &&
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

  const breadcrumb: Array<IBreadcrumbProp> = [
    { Text: "Home", Url: "/pay-bills/" },
    { Text: "Pay Bills", Url: "/pay-bills" },
    { Text: "E Pins" },
  ];

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.container}>
          <form onSubmit={onSubmit}>
            <div className={"card"}>
              <div className={"card-body " + styles.cardBody}>
                <h6 className={"h6 text-danger pb-3"}>Buy E Pin</h6>
                <div className={"row pb-3"}>
                  <div className={"col"}>
                    <Select
                      label={"Service Provider"}
                      name={"provider"}
                      onChange={onChange}
                      options={operators}
                      value={Values.provider}
                    />
                  </div>
                  <div className={"col"}>
                    <Select
                      disabled={
                        loadingserviceOptions || serviceOptions.length <= 0
                      }
                      label={"Service Option"}
                      name={"serviceOption"}
                      onChange={onChange}
                      options={loadingserviceOptions ? [] : serviceOptions}
                      value={Values.serviceOption}
                    />
                  </div>
                </div>
                <hr />
                <div className={"row"}>
                  <div className={"col"}>
                    <Input
                      className={"form-control"}
                      label={"quantity"}
                      min={0}
                      name={"quantity"}
                      onChange={onChange}
                      placeholder={"quantity"}
                      readOnly={
                        loadingserviceOptions || serviceOptions.length <= 0
                      }
                      type={"number"}
                      value={Values.quantity}
                    />
                  </div>
                  <div className={"col"}>
                    <label className={"form-label"}>Amount: </label>
                    <div
                      className={`form-control align-middle ${styles.divInput}`}
                    >{`${CURRENCIES.NAIRA} ${
                      Values && Values.amount ? Values.amount : 0
                    }`}</div>
                  </div>
                </div>
                <div className={"row pt-5"}>
                  <div className={"col"}>
                    <div className={"d-grid"}>
                      {IsSubmitting === false ? (
                        <button
                          className={"btn btn-danger text-white btn-block"}
                          disabled={
                            loadingserviceOptions || serviceOptions.length <= 0
                          }
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          className={"btn btn-danger text-white btn-block"}
                          disabled
                        >
                          <span
                            aria-hidden="true"
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                          />
                          &nbsp; Submitting...
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({ kpay: state.kpay });

export default connect(mapStateToProps, {
  FinalStepForOrderRequest,
  InitiateOrderAction,
  LoadProductsByCategory,
  ManageCartAlert,
})(EPinPage);
