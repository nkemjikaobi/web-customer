import IDate from "dto/Utils/IDate";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./TrackPackageInfo.module.scss";

export interface ITrackPackageInfo {
  text: string;
  ts: IDate;
}

const TrackPackageInfo: React.FunctionComponent<ITrackPackageInfo> = ({
  text,
  ts,
}: ITrackPackageInfo) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    let mounted = true;
    setTitle(text);
    return () => {
      mounted = false;
    };
  }, [text]);

  useEffect(() => {
    let mounted = true;
    if (ts) {
      setDate(`${ts.day}, ${ts.month} ${ts.date}, ${ts.year}`);
    }
    return () => {
      mounted = false;
    };
  }, [ts]);

  return (
    <Fragment>
      <div className={styles.trackPackageInfo}>
        <div className={styles.left}>
          <div className={styles.checkmarkWrapper}>
            <span>&#10003;</span>
          </div>
          <div className={styles.dashedLine} />
        </div>
        <div className={styles.right}>
          <p className={styles.heading}>{text}</p>
          <p className={styles.date}>{date}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default TrackPackageInfo;
