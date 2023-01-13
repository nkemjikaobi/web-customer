import React, { Fragment, useEffect, useState } from "react";
import styles from "./ErrorAlert.module.scss";

export interface IErrorAlert {
  message: string;
  show: boolean;
}

const ErrorAlert: React.FunctionComponent<IErrorAlert> = ({
  message,
  show,
}: IErrorAlert) => {
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    let mounted = true;

    setVisibility(show);

    return () => {
      mounted = false;
    };
  }, [show]);

  return (
    <Fragment>
      {visibility === true ? (
        <div className={"row mt-3"}>
          <div
            className={`col text-center py-3 px-5 text-white rounded-1 ${styles.mainComponent_error}`}
          >
            {message}
          </div>
        </div>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
};

export default ErrorAlert;
