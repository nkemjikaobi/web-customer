import React, { useState, useEffect } from "react";
import { formatCountDownTimer } from "libs/utils/dateUtils";

/**
 * CountDown
 */

export interface IProps {
  endTime: any;
  className: any;
}
const CountDown: React.FunctionComponent<IProps> = (props: IProps) => {
  const [currentEndTime, setCurrentEndTime] = useState(
    formatCountDownTimer(props.endTime)
  );

  /**
   * Updates the state with the formatted end time
   * @memberof CountDown
   * @param {function} cb [An optional callback]
   * @returns {*} undefined
   * */
  const setEndTime = (cb?: any) => {
    setCurrentEndTime(formatCountDownTimer(props.endTime));
    if (typeof cb === "function") {
      cb();
    }
  };

  let countdownInterval: any = null;
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      countdownInterval = setInterval(() => {
        setEndTime();
      }, 1000);
      setCurrentEndTime(countdownInterval);
    }
    return () => {
      mounted = false;
      clearInterval(countdownInterval);
    };
  }, []);

  /**
   * Render method
   * @returns {React.Component} Component
   */
  return (
    <time className={props.className} dateTime={currentEndTime}>
      {currentEndTime}
    </time>
  );
};

export default CountDown;
