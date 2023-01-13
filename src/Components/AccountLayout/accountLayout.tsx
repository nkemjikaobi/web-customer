/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import { composeClasses } from "libs/utils/utils";
import accountLayoutData from "./accountLayoutData";
import styles from "./accountLayout.module.scss";
import MoreInforComponent from "./MoreInfoComponent";
import SettingsItemsComponent from "./SettingsItemComponent";

const { Settings, MoreInfo } = accountLayoutData;
interface IProps {
  children: React.ReactNode;
}

const AccountLayout: React.FunctionComponent<IProps> = (props: IProps) => {
  const [children, setChildren] = useState<React.ReactNode>(<Fragment />);
  const [active, setActive] = useState(1);

  useEffect(() => {
    let mounted = props.children;
    if (props && mounted) setChildren(mounted);
    return () => {
      mounted = null;
    };
  }, [props]);

  const handleSetActive = (id: number) => {
    setActive(id);
  };

  return (
    <Fragment>
      <div className={styles.accountLayout}>
        <div className={composeClasses(styles.settingsWrapper, styles.hiden)}>
          <div className={styles.heading}>
            <h1>Settings</h1>
          </div>
          {Settings.map((menuItem, key: number) => {
            return (
              <SettingsItemsComponent
                active={active}
                handleSetActive={handleSetActive}
                key={key}
                menuItem={menuItem}
                setActive={setActive}
              />
            );
          })}
          <div className={styles.heading}>
            <h2>MoreInformation</h2>
          </div>
          {MoreInfo.map((menuItem, i) => (
            <MoreInforComponent
              active={active}
              handleSetActive={handleSetActive}
              key={i}
              menuItem={menuItem}
            />
          ))}
        </div>
        <div
          className={composeClasses(
            styles.accountLayoutContent,
            styles.contentClass
          )}
        >
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default AccountLayout;
