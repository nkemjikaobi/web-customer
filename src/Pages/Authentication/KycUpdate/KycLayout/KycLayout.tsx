/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import Icon from "Components/Icons/icon";
import { composeClasses } from "libs/utils/utils";
import { kycData } from "../kycData";
import styles from "./KycLayout.module.scss";

const KycLayout: React.FunctionComponent = () => {
  const [active, setActive] = useState(1);
  const [activeComponent, setActiveComponent] = useState();

  const whatToDisplay = (id: number) => {
    return kycData.find((data) => data.id === id);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const kycObj: any = whatToDisplay(active);
      setActiveComponent(kycObj.component);
    }
    return () => {
      mounted = false;
    };
  }, [active]);

  const handleSetActive = (id: number) => {
    setActive(id);
  };

  const kycSteps = kycData.map((menuItem, i) => {
    return (
      <div key={i} onClick={() => handleSetActive(menuItem.id)}>
        <div
          className={composeClasses(
            active === menuItem.id ? styles.active : "",
            styles.menuItem
          )}
        >
          <div className={styles.menuItemLeft}>
            <Icon name={menuItem.icon} />
            <p>{menuItem.name}</p>
          </div>
          <div>
            <Icon name="arrowRight" />
          </div>
        </div>
      </div>
    );
  });

  return (
    <Fragment>
      <div className={styles.kycContainer}>
        <div className={styles.sideMenu}>
          <div className={styles.header}>
            <h1>Account Upgrade</h1>
          </div>
          {kycSteps}
        </div>
        <div className={styles.componentsHolder}>{activeComponent}</div>
      </div>
    </Fragment>
  );
};

export default KycLayout;
