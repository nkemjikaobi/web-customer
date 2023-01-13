/* eslint-disable react/jsx-max-props-per-line */
import React from "react";
import { composeClasses } from "libs/utils/utils";
import Icon from "Components/Icons/icon";
import Data from "./data";
import styles from "./withdrawalLayout.module.scss";
import { Link } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  activePage: number;
}

const { data } = Data;

const WithdrawalLayout: React.FunctionComponent<IProps> = ({
  children,
  activePage,
}: IProps) => {
  const WithdrawlItems = data.map((menuItem, i: number) => {
    return (
      <Link className={styles.menuItem} key={i} to={menuItem.route}>
        <div className={composeClasses(styles.menuItem_left)}>
          <Icon name={menuItem.icon} />
          <p className={activePage === i ? "text-primary" : ""}>
            {menuItem.name}
          </p>
        </div>
        <div className={styles.menuItem_right}>
          <Icon name={menuItem.icon2} />
        </div>
      </Link>
    );
  });
  return (
    <div className={styles.withdrawalLayout}>
      <div className={styles.left}>
        <div className={styles.heading}>
          <h1>Withdraw From Wallet</h1>
        </div>
        {WithdrawlItems}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default WithdrawalLayout;
