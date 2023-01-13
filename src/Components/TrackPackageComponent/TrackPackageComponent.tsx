/* eslint-disable @typescript-eslint/ban-types */
import Button from "Components/Button/button";
import ErrorAlert from "Components/ErrorAlert/ErrorAlert";
import { Input } from "Components/Form/inputs";
import Icon from "Components/Icons";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { TrackParcelAction } from "Http/Redux/Actions/KExpress/LogisticsActionEvent";
import styles from "./TrackPackageComponent.module.scss";
import { composeClasses } from "libs/utils/utils";

export interface ITrackPackage {
  columnClassName?: string;
  classNameForError?: string;
  TrackParcelAction: Function;
}

const TrackPackageComponent: React.FunctionComponent<ITrackPackage> = ({
  columnClassName,
  classNameForError,
  TrackParcelAction,
}: ITrackPackage) => {
  const history = useHistory();
  const [classNameForColumn, setClassNameForColumn] = useState("");

  const handleTrackPackageEvent = async (event: any) => {
    event.preventDefault();
    setSubmitting(true);
    setShowTrackingError(false);
    const data = await TrackParcelAction(trackingNumber);
    setSubmitting(false);
    setShowTrackingError(!data);
    if (data === true) {
      history.push("/send-package/track-package/");
    }
  };

  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [showTrackingError, setShowTrackingError] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    if (showTrackingError === true) {
      setTimeout(() => {
        setShowTrackingError(false);
      }, 5000);
    }

    return () => {
      mounted = false;
    };
  }, [showTrackingError]);

  useEffect(() => {
    let mounted = true;

    setClassNameForColumn(columnClassName ?? "");
    return () => {
      mounted = false;
    };
  }, [columnClassName]);

  return (
    <Fragment>
      <div className={styles.row}>
        <div
          className={composeClasses(
            classNameForColumn ?? "col",
            styles.trackPackageWrapper
          )}
        >
          <div className={styles.trackPackage}>
            <Icon className={styles.trackPackage_icon} name="mapMarker" />
            <Input
              className={`ps-5 ${styles.trackPackage_input}`}
              name={"tracking_number"}
              onChange={(e: any) => setTrackingNumber(e.target.value)}
              placeholder="Enter Tracking Number"
              type="text"
              value={trackingNumber}
            />
            <div className={styles.trackPackage_button}>
              {submitting === true ? (
                <Button
                  btnClass={"btn-primary text-white"}
                  className={"btn"}
                  isDisable={true}
                  title={"Tracking Package..."}
                />
              ) : (
                <Button
                  btnClass={"btn-primary text-white"}
                  className={"btn"}
                  handleClick={handleTrackPackageEvent}
                  isDisable={trackingNumber.trim().length <= 1}
                  title={"Track Package"}
                  type={"button"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={"row"}>
        <div className={`${classNameForError ?? "col"}`}>
          <ErrorAlert
            message={"No tracking Information Available yet!"}
            show={showTrackingError}
          />
        </div>
      </div>
    </Fragment>
  );
};

TrackPackageComponent.defaultProps = {
  columnClassName: "",
  classNameForError: "",
};

export default connect(null, {
  TrackParcelAction,
})(TrackPackageComponent);
