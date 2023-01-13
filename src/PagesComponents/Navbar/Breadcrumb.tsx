import ICartAlert from "dto/Cart/ICartAlert";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./Breadcrumb.module.scss";
import { getSanitizedHtml } from "libs/utils/utils";
import { Link } from "react-router-dom";

export interface IBreadcrumbProp {
  Text: string;
  Url?: string;
}

export interface IBreadcrumbProperties {
  props: Array<IBreadcrumbProp>;
  alert?: ICartAlert | null;
  title: string;
  breadCrumbClass?: string;
  visible?: boolean;
  hasLocation?: boolean;
}

const Breadcrumb: React.FunctionComponent<IBreadcrumbProperties> = ({
  props,
  alert,
  title,
  breadCrumbClass,
  visible,
  hasLocation,
}: IBreadcrumbProperties) => {
  const [headerTitle, setHeaderTitle] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [crumbs, setCrumbs] = useState<Array<any>>();

  useEffect(() => {
    let mounted = title;
    setHeaderTitle(mounted);
    return () => {
      mounted = "";
    };
  }, [title]);

  useEffect(() => {
    let show: boolean = showAlert;
    if (alert) {
      show = alert.show === true ? true : false;
    } else {
      show = false;
    }
    setShowAlert(show);

    return () => {
      show = false;
    };
  }, [alert]);

  useEffect(() => {
    let mounted = title;
    setHeaderTitle(mounted);
    return () => {
      mounted = "";
    };
  }, [title]);

  useEffect(() => {
    let mounted = true;
    if (mounted && props) {
      setCrumbs(props);
      const length = crumbs && crumbs.length;
      const actual = length && length - 1;
      crumbs && actual && setCurrentLocation(crumbs[actual].Text);
    }

    return () => {
      mounted = false;
    };
  });

  return (
    <>
      <nav aria-label={"breadcrumb"}>
        <ol
          className={`breadcrumb mt-1 py-2 ${styles.breadCrumbClass} ${
            breadCrumbClass ?? ""
          }`}
        >
          {props &&
            Object.entries(props).map(
              ([index, prop]: [string, IBreadcrumbProp]) => {
                if (parseInt(index) === Object.entries(props).length - 1) {
                  return (
                    <li
                      aria-current={"page"}
                      className={"breadcrumb-item active"}
                      dangerouslySetInnerHTML={getSanitizedHtml(
                        prop.Text ?? ""
                      )}
                      key={index}
                    />
                  );
                }

                return (
                  <li className={"breadcrumb-item"} key={index}>
                    <Link
                      dangerouslySetInnerHTML={getSanitizedHtml(
                        prop.Text ?? ""
                      )}
                      to={prop.Url ? prop.Url : "#"}
                    />
                  </li>
                );
              }
            )}
        </ol>
      </nav>
      {headerTitle.trim().length > 0 ? (
        <h6 className={"breadcrumb ps-11 py-2 my-0 h3"}>{headerTitle}</h6>
      ) : (
        <></>
      )}
      <div className={styles.currentLocation}>
        <h1>{hasLocation && currentLocation !== "" && currentLocation}</h1>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  alert: state.cart.Marketplace?.alertMessage,
});

Breadcrumb.defaultProps = {
  alert: undefined,
  breadCrumbClass: undefined,
  visible: true,
  hasLocation: false,
};

export default connect(mapStateToProps, null)(Breadcrumb);
