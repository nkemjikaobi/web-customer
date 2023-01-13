import accounting from "accounting";
import Button from "Components/Button/button";
import { CURRENCIES } from "Helpers/Constants";
import MarketplaceService from "Http/Services/MarketplaceService";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styles from "./cart.module.scss";

interface ISubTotal {
  id: number;
  total: number;
}
const SubTotal: React.FunctionComponent<ISubTotal> = (props: ISubTotal) => {
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const history = useHistory();

  const handleCheckout = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    const route = `/online-shopping/checkout/shopping-cart/${
      props.id || MarketplaceService.STORE_ID
    }`;
    history.push(route);
  };

  useEffect(() => {
    let amt = props.total;
    if (amt) {
      setTotal(amt);
    }
    return () => {
      amt = 0;
    };
  }, [props]);
  return (
    <div className={styles.subTotal}>
      <div className={styles.info}>
        <p>Sub-total</p>
        <p>{accounting.formatMoney(total, CURRENCIES.NAIRA)}</p>
      </div>
      <div className={styles.button}>
        <Button
          btnClass={"btn-primary text-white"}
          handleClick={handleCheckout}
          isSubmitting={isLoading}
          title="View Cart and Continue"
        />
      </div>
    </div>
  );
};

export default SubTotal;
