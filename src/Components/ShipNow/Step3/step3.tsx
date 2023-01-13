/* eslint-disable @typescript-eslint/ban-types */
import { ISelect } from "Components/Form/inputs/Select/Select";
import Icon from "Components/Icons";
import IState from "dto/KongaExpress/IState";
import { CURRENCIES } from "Helpers/Constants";
import LogisticsService from "Http/Services/LogisticsService";
import AddressComponent from "PagesComponents/KExpress/AddressComponent";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./step3.module.scss";
import { MoveSteperAction } from "Http/Redux/Actions/KExpress/LogisticsActionEvent";
import accounting from "accounting";
import IWaybill from "dto/KongaExpress/IWaybill";

export interface IStepThree {
  wayBillRequest: IWaybill;
  wayBillRequestAmount?: number;
  httpResponse: {
    message: string;
    data: any;
  } | null;
  MoveSteperAction: Function;
}

const Step3: React.FunctionComponent<IStepThree> = ({
  wayBillRequest,
  wayBillRequestAmount,
  MoveSteperAction,
  httpResponse,
}: IStepThree) => {
  const [states, setStates] = useState<Array<IState>>([]);
  const [mappedStates, setMappedStates] = useState<Array<ISelect>>([]);

  useEffect(() => {
    let mounted = true;
    LogisticsService.GetStates().then((states: any) => setStates(states));
    return () => {
      mounted = false;
    };
  }, []);

  const editBtnClickEventListener: Function = (event: any, index: number) => {
    event.preventDefault();
    MoveSteperAction(index);
  };

  return (
    <Fragment>
      {httpResponse !== null && httpResponse.data.data !== null ? (
        <Fragment>
          <div className={"row my-4 py-4"}>
            <div className={"col"}>
              <h4 className={"h4"}>Delivery ID</h4>
              <p className={"fw-bolder h2 my-2"}>{httpResponse?.data ?? ""}</p>
              <p className={"my-2"}>Follow up instructions:</p>
              <ol>
                <li>Save the delivery ID code</li>
                <li>
                  Search & Select for a nearby store location Drop your package
                  to the location.
                </li>
                <li>Provide them with the delivery ID code</li>
                <li>Make Payment</li>
              </ol>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className={styles.transactionalDetails}>
            <div className={"row mt-3"}>
              <div className={"col-md-8"}>
                <AddressComponent
                  city={wayBillRequest?.shipper_city ?? ""}
                  firstname={wayBillRequest?.shipper_firstname ?? ""}
                  lastname={wayBillRequest?.shipper_lastname ?? ""}
                  selectedState={wayBillRequest?.shipper_state ?? ""}
                  states={states}
                  street={wayBillRequest?.shipper_street ?? ""}
                  telephone={wayBillRequest?.shipper_telephone ?? ""}
                  title={"Source Address"}
                />
              </div>
              <div className={"col text-end"}>
                <button
                  className={"text-primary btn mt-3"}
                  onClick={(e: any) => editBtnClickEventListener(e, 0)}
                >
                  <Icon name={"edit"} />
                  <span className={"ms-2"}>Edit</span>
                </button>
              </div>
            </div>
            <hr className={"dropdown-divider"} />
            <div className={"row mb-3"}>
              <div className={"col-md-8"}>
                <AddressComponent
                  city={wayBillRequest.receiver_city ?? ""}
                  firstname={wayBillRequest.receiver_firstname ?? ""}
                  lastname={wayBillRequest.receiver_lastname ?? ""}
                  selectedState={wayBillRequest.receiver_state ?? ""}
                  states={states}
                  street={wayBillRequest.receiver_street ?? ""}
                  telephone={wayBillRequest.receiver_telephone ?? ""}
                  title={"destination address"}
                />
              </div>
              <div className={"col text-end"}>
                <button
                  className={"text-primary btn mt-3"}
                  onClick={(e: any) => editBtnClickEventListener(e, 1)}
                >
                  <Icon name={"edit"} />
                  <span className={"ms-2"}>Edit</span>
                </button>
              </div>
            </div>

            <hr className={"dropdown-divider"} />
            <div className={"row my-3 py-3"}>
              <div className={"col"}>
                <p className={"row h6"}>
                  <span className={"col text-start"}>Shipment type</span>
                  <span className={"col text-end"}>
                    {wayBillRequest.delivery_type}
                  </span>
                </p>
                <p className={"row h6"}>
                  <span className={"col text-start"}>Item Description</span>
                  <span className={"col text-end"}>
                    {wayBillRequest.description}
                  </span>
                </p>
                <p className={"row h6"}>
                  <span className={"col text-start"}>Package Weight</span>
                  <span className={"col text-end"}>
                    {accounting.formatNumber(
                      wayBillRequest?.package_weight ?? 0
                    )}{" "}
                    KG
                  </span>
                </p>
                <p className={"row h6"}>
                  <span className={"col text-start"}>Shipment Amount</span>
                  <span className={"col text-end"}>
                    {accounting.formatMoney(
                      wayBillRequestAmount ?? 0,
                      CURRENCIES.NAIRA
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  wayBillRequest: state.logistics.WayBillRequest,
  wayBillRequestAmount: state.logistics.WayBillRequestAmount,
});

Step3.defaultProps = {
  wayBillRequestAmount: 0,
};

export default connect(mapStateToProps, { MoveSteperAction })(Step3);
