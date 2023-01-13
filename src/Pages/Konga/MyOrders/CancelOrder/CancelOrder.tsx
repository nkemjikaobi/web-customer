/* eslint-disable @typescript-eslint/ban-types */
import Button from "Components/Button/button";
import { Select } from "Components/Form/inputs";
import Icon from "Components/Icons/icon";
import { useForm } from "CustomHooks/FormHook";
import useClickOutSide from "CustomHooks/useClickOutSide";
import ICancelOrderReason from "dto/KongaOnline/ICancelOrderReason";
import MarketplaceService from "Http/Services/MarketplaceService";
import CancelOrderForm from "Models/FormModels/Marketplace/CancelOrderForm";
import React, { useEffect, useState } from "react";
import styles from "./CancelOrder.module.scss";
import { reasonsData } from "./data";
import toast from "react-hot-toast";

interface IProps {
  onCloseModal: Function;
  orderId: string;
}

const CancelOrder: React.FunctionComponent<IProps> = (properties: IProps) => {
  const [reasonsData, setReasonsData] = useState<Array<ICancelOrderReason>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const closeModal = useClickOutSide(() => {
    properties.onCloseModal();
  });
  const initialForm: CancelOrderForm = new CancelOrderForm();

  const handleCancelOrder = async () => {
    setLoading(true);
    if (Values.reason !== "" && Values.details !== "") {
      try {
        const cancelOrderResponse: any = await MarketplaceService.CancelOrder(
          properties.orderId,
          Values.reason,
          Values.details
        );
        if (cancelOrderResponse.ok === false) {
          toast.success("Order Cancelled");
          properties.onCloseModal();
        } else {
          toast.error("Order could not be cancelled");
        }
      } catch (error) {
        toast.error("Order could not be cancelled");
      }
      setLoading(false);
      return;
    }
    toast.error("All fields are required");
    setLoading(false);
  };
  const { Values, onChange, SetValues } = useForm(
    handleCancelOrder,
    initialForm
  );

  const fetchCancelOrderReasons = async () => {
    const response = await MarketplaceService.GetCancelOrderReasons();
    setReasonsData(response);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const target = document.getElementById("form");
      target?.classList.add(styles.slideIn);
      fetchCancelOrderReasons();
    }
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const tempValues = {
        ...Values,
        ["reason"]: Values.reason,
        ["details"]: Values.details,
      };

      SetValues({ ...tempValues });
    }
    return () => {
      mounted = false;
    };
  }, [Values.reason, Values.details]);

  return (
    <div className={styles.cancelOrder}>
      <div className={styles.formWrapper} id="form" ref={closeModal}>
        <div className={styles.header}>
          <span>Cancel Order Request</span>
          <div
            className={styles.close}
            onClick={() => properties.onCloseModal()}
          >
            <Icon name="close2" />
            <p>Close</p>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.whyCancel}>
            <span>Why are you canceling this order?</span>
          </div>

          <div className={styles.reason}>
            <Select
              className={styles.select}
              label="Provide Reason"
              name="reason"
              onChange={onChange}
              options={reasonsData}
              placeholder="Select Reason:"
              value={Values.reason}
            />
          </div>

          <div className={styles.reasonDetails}>
            <span>More Details:</span>
            <textarea
              className={styles.textarea}
              name="details"
              onChange={onChange}
              placeholder="Please provide more informations why you want to return the product"
              value={Values.details}
            />
          </div>
          <div className={styles.cancelButton}>
            <Button
              btnClass={"border-0"}
              handleClick={handleCancelOrder}
              isDisable={loading}
              isSubmitting={loading}
              title={"Submit"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
