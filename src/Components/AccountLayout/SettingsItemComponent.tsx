import Icon from "Components/Icons";
import { composeClasses } from "libs/utils/utils";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./accountLayout.module.scss";

interface ISettingsItemsComponent {
  active: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setActive: Function;
  handleSetActive: any;
  menuItem: any;
}

const SettingsItemsComponent: React.FunctionComponent<
  ISettingsItemsComponent
> = ({ setActive, active, menuItem, handleSetActive }) => {
  return (
    <>
      <div
        className={composeClasses(
          styles.menuItem,
          active === menuItem.id ? styles.active : styles.menuItem
        )}
        onClick={() => handleSetActive(menuItem.id)}
      >
        <div className={composeClasses(styles.menuItem_left)}>
          <Icon name={menuItem.icon} />
          {menuItem.icon2 !== "toggle" ? (
            <Link className={"ms-3"} to={menuItem.route}>
              {menuItem.name}
            </Link>
          ) : (
            <span className={"ms-3"}>{menuItem.name}</span>
          )}
        </div>
        <div className={styles.menuItem_right}>
          {menuItem.icon2 === "toggle" ? (
            <>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  id="flexSwitchCheckDefault"
                  type="checkbox"
                />
              </div>
            </>
          ) : (
            <Icon name={menuItem.icon2} />
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsItemsComponent;
