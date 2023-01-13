/* eslint-disable @typescript-eslint/ban-types */
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import Icon from "Components/Icons";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TransactionSuccessful: React.FunctionComponent = (props: any) => {
  const [orderNumber, setOrderNumber] = useState("");
  const { order_number }: any = useParams();

  useEffect(() => {
    let mounted = true;
    setOrderNumber(order_number);
    return () => {
      mounted = false;
    };
  }, [order_number]);

  return (
    <Fragment>
      <BasePageLayout
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={"container my-5"}>
          <div className={"row"}>
            <div className={"col-md-6 offset-md-3 my-5"}>
              <div className={"text-center mb-5"}>
                <Icon className={"my-4"} name={"check"} />
                <p className={"text-success h5"}>Thank you for your order</p>
                <small className={"text-muted"}>
                  We’ve sent you an Email & SMS with all the details of your
                  order.
                </small>
              </div>
              <div className={"card py-3"}>
                <div className={"card-body text-center"}>
                  <p className={"text"}>
                    Your Order Number is{" "}
                    <span className={"h6 fw-bold"}>{orderNumber}</span>{" "}
                  </p>
                  <Link
                    className={"btn btn-danger text-white w-50 mt-4"}
                    to={"/"}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default TransactionSuccessful;
