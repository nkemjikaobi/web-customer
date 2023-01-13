/* eslint-disable @typescript-eslint/ban-types */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./sessionTimeOut.module.scss";
import { SignOutAction } from "Http/Redux/Actions/AuthAction";
import moment from "moment";
import { connect } from "react-redux";
import SessionTimeoutModal from "Components/SessionTimeoutModal/sessionTimeoutModal";
interface ISessionTimeOut {
  children: any;
  auth: any;
  SignOutAction: Function;
}
const SessionTimeout: React.FunctionComponent<ISessionTimeOut> = (
  properties: ISessionTimeOut
) => {
  const [events, setEvents] = useState<Array<string>>([
    "click",
    "load",
    "scroll",
  ]);
  const [second, setSecond] = useState(0);
  const [modal, setModal] = useState<boolean>(false);

  let timeStamp: any;
  const warningInactiveInterval: any = useRef();
  const startTimerInterval: any = useRef();
  const history = useHistory();
  const { pathname } = useLocation();

  // start inactive check
  const timeChecker = () => {
    startTimerInterval.current = setTimeout(() => {
      const storedTimeStamp =
        sessionStorage.getItem("lastTimeStamp") || moment();
      warningInactive(storedTimeStamp);
    }, 60000);
  };
  const logoutUser = () => {
    setModal(false);
    properties.SignOutAction(history, pathname);
  };

  const closeModal = () => {
    resetTimer();
    setModal(false);
  };

  // warning timer
  const warningInactive = (timeString: any) => {
    clearTimeout(startTimerInterval.current);

    warningInactiveInterval.current = setInterval(() => {
      const maxTime = 1; // Maximum ideal time given before logout
      const popTime = 1; // remaining time (notification) left to logout.

      const diff = moment.duration(moment().diff(moment(timeString)));
      const minPast = diff.minutes();
      const leftSecond = 60 - diff.seconds();
      setSecond(leftSecond);
      if (maxTime === popTime) {
        setModal(true);
      }

      if (minPast === maxTime) {
        clearInterval(warningInactiveInterval.current);
        properties.SignOutAction(history, pathname);
        logoutUser();
        clearInterval(warningInactiveInterval.current);
        sessionStorage.removeItem("lastTimeStamp");
        // your logout function here
      }
    }, 1000);
  };

  const resetTimer = useCallback(() => {
    clearTimeout(startTimerInterval.current);
    clearInterval(warningInactiveInterval.current);
    if (properties.auth.IsAuthenticated) {
      timeStamp = moment();
      sessionStorage.setItem("lastTimeStamp", timeStamp);
    } else {
      clearInterval(warningInactiveInterval.current);
      sessionStorage.removeItem("lastTimeStamp");
    }
    timeChecker();
  }, [properties.auth.IsAuthenticated]);

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, () => resetTimer(), true);
    });
    timeChecker();

    return () => {
      clearTimeout(startTimerInterval.current);
    };
  }, [resetTimer, events, timeChecker]);
  return (
    <Fragment>
      <div className={styles.sessionTimeout}>
        {modal && (
          <>
            <div className={styles.backdrop} />
            <div className={styles.sessionTimeoutModal}>
              <SessionTimeoutModal
                closeModal={closeModal}
                logoutUser={logoutUser}
                second={second}
              />
            </div>
          </>
        )}
        {properties.children}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { SignOutAction })(SessionTimeout);
