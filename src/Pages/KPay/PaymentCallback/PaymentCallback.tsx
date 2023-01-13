/* eslint-disable @typescript-eslint/ban-types */
import IMap from "dto/Utils/IMap";
import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import { IOrderResponse } from "dto/Kongapay/IOrderDetails";
import { ICompleteOrderRequestParams } from "dto/Kongapay/ICompleteOrderRequestType";
import AirtimeService from "Http/Services/AirtimeService";
import styles from "./PaymentCallBack.module.scss";

import {
  CompleteOrderPostFailed,
  CompleteOrderPost,
  OtpVerified,
} from "Http/Redux/Actions/ActionCreators/KPayActionCreator/DGActionEventCreator";

export interface IProps {
  OrderResponse?: IOrderResponse;

  CompleteOrderPostFailed?: Function;
  OtpVerified?: Function;
  CompleteOrderPost?: Function;
}

const PaymentCallback: React.FunctionComponent<IProps> = (props: IProps) => {
  const history = useHistory();
  const [mappedItems, setMappedItems] = useState<IMap>({});
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const searchParams = new URLSearchParams(location.search);
  const origin: any = searchParams.get("origin");

  const { payload }: any = useParams();
  const { store_id }: any = useParams();

  const mapRequests = (query: string) => {
    const mapped: IMap = { ...mappedItems };
    query
      .split("&")
      .map((query: string) => decodeURI(query))
      .forEach((query: string) => {
        const q = query.split("=");
        if (q.length > 1) {
          mapped[q[0]] = q[1];
        }
      });
    setMappedItems(mapped);
    return mapped;
  };

  useEffect(() => {
    let mounted = true;
    const query = history.location.search.substring(1);

    if (mounted && query) {
      mapRequests(query);
    }

    if (payload) {
      const newParams: any = {};
      payload
        .split("&")
        .map((item: any) => {
          try {
            const q: Array<string> = item.split("=");
            newParams[q[0]] = q[1] ? JSON.parse(q[1]) : "";
          } catch (e) {
            return item;
          }
        })
        .filter((item: any) => item !== null);

      const params: ICompleteOrderRequestParams = {
        guest_vending: 1,
        guest_paid: 1,
        form_data: {},
        order_response: newParams.orderResponse,
      };
      setShowLoading(true);
      if (origin === "online") {
        AirtimeService.RawOrderCompletion(params)
          .then((response: any) => {
            // TODO: handle the order completion response here
            const { data }: any = response;
            if (data.status === "success") {
              props.OtpVerified && props.OtpVerified(data.data.receipt_number);
              props.CompleteOrderPost &&
                props.CompleteOrderPost(newParams["orderDetails"]);
              history.push("/pay-bills/transaction-successful");
            } else {
              props.CompleteOrderPostFailed &&
                props.CompleteOrderPostFailed(data.data.message);
              history.push("/pay-bills/transaction-failed");
            }
          })
          .finally(() => setShowLoading(false));
      }
      if (origin === "travel") {
        /* TODO when book flight is working */
        if (true) {
          history.push("/travel/failed-booking");
        }
      }
    }

    return () => {
      mounted = false;
    };
  }, [history]);

  return (
    <Fragment>{showLoading && <div className={styles.container} />}</Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  OrderResponse: state.kpay.OrderResponse,
});

PaymentCallback.defaultProps = {
  OrderResponse: undefined,
  OtpVerified: undefined,
  CompleteOrderPostFailed: undefined,
  CompleteOrderPost: undefined,
};

export default connect(mapStateToProps, {
  OtpVerified,
  CompleteOrderPostFailed,
  CompleteOrderPost,
})(PaymentCallback);
