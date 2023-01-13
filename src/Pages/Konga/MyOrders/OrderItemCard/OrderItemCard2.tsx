import React, { useEffect, useState } from "react";
import Button from "Components/Button/button";
import Asset from "Components/Asset/asset";
import { Link } from "react-router-dom";
import styles from "./OrderItemCard.module.scss";
import cloudinaryConstants from "Helpers/cloudinaryConstants";
import accounting from "accounting";
import { CURRENCIES } from "Helpers/Constants";
import CancelOrder from "../CancelOrder/CancelOrder";
import MarketplaceService from "Http/Services/MarketplaceService";

interface IProps {
  item: any;
  orderIsCancellable: boolean;
  orderId: string;
}
const OrderItemCard: React.FunctionComponent<IProps> = ({
  item,
  orderIsCancellable,
  orderId,
}) => {
  const [showCancelOrder, setShowCancelOrder] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number>(0);

  const getCategoryId = async (sku: string) => {
    const data = await MarketplaceService.GetProductByUrlOrID(sku);
    const categories: any = data?.categories;
    const length: any = categories?.length;
    categories && setCategoryId(categories[length - 1].id);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted && item) {
      getCategoryId(item.product_id);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={styles.orderItem}>
      <div className={styles.orderItem_details}>
        <div className={styles.imageContainer}>
          <Asset
            alt={`${item.name}.`}
            name={item.image_url}
            type={cloudinaryConstants.asset.cloudinaryType}
          />
        </div>
        <div className={styles.textInfo}>
          <p className={styles.title}>{item.name}</p>
          <p className={styles.price}>
            {accounting.formatMoney(item.base_price, CURRENCIES.NAIRA)}
          </p>
          <p className={styles.quantity}>{`Quantity: ${parseInt(
            item.qty_ordered
          )}`}</p>
        </div>
      </div>
      <div className={styles.orderItem_actionButtons}>
        {showCancelOrder && (
          <CancelOrder
            onCloseModal={() => setShowCancelOrder(false)}
            orderId={orderId}
          />
        )}
        {orderIsCancellable ? (
          <Button
            className={styles.cancelBtn}
            handleClick={() => setShowCancelOrder(true)}
            title="Cancel"
          />
        ) : (
          <Link
            to={`/online-shopping/product-detail/${categoryId}/${item.product_id}`}
          >
            <Button className={styles.buyBtn} title="Buy Again" />
          </Link>
        )}
        {/* {rate && (      TODO
          <Link to={`/account/pendingRatings/${orderId}/${item.product_id}`}>
            <Button className={styles.rateBtn} title="Rate this Product" />
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default OrderItemCard;
