/* eslint-disable @typescript-eslint/ban-types */
import Button from "Components/Button/button";
import Icons from "Components/Icons";
import React, { useState, useEffect } from "react";
import styles from "./oldWebSite.module.scss";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { connect } from "react-redux";
import config from "Configurations/configurations";

// Config variablesspreadsheet
const SPREADSHEET_ID = config.spreadsheet.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = config.spreadsheet.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = config.spreadsheet.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = config.spreadsheet.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
interface IOldWebsite {
  handlePopUpClose: Function;
  email: string;
}

const OldWebSite = (props: IOldWebsite) => {
  const [showFeedback, setShowFeedBack] = useState<boolean>(false);
  const [ratingsChoice, setRatingsChoice] = useState<string>("");
  const [easeOfUse, setEaseOfUse] = useState<number | null>(null);
  const [lookAndFeel, setLookAndFeel] = useState<number | null>(null);
  const [liketoRecommend, setLikeToRecommend] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [done, setDone] = useState<boolean>(false);
  const isComplete = () => {
    if (
      ratingsChoice !== "" &&
      easeOfUse !== null &&
      lookAndFeel !== null &&
      liketoRecommend !== null
    ) {
      return false;
    }
    return true;
  };

  const appendSpreadsheet = async (row: any) => {
    try {
      const key = PRIVATE_KEY.replace(/\\n/g, "\n");
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: key,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const result = await sheet.addRow(row);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile: boolean = width <= 768;

  const submitFeedBack = async () => {
    setShowFeedBack(false);
    setDone(true);
    const d = new Date();
    const data = {
      Timestamp: `${d.toDateString()} ${d.toLocaleTimeString()}`,
      Rating: `${ratingsChoice}`,
      EaseOfUse: `${easeOfUse}`,
      LookAndFeel: `${lookAndFeel}`,
      Recommend: `${liketoRecommend}`,
      Comment: `${message}`,
      Device: isMobile ? "mobile" : "web",
      Email: props.email ? props.email : "anonymous",
    };
    console.log(data);
    await appendSpreadsheet(data);
  };

  return (
    <div className={styles.oldWebsite}>
      <div
        className={styles.iconWrapper}
        onClick={() => props.handlePopUpClose()}
      >
        <Icons name="darkClose" />
      </div>
      {done ? (
        <h4 className={"text-black"}>
          Thanks you for sharing your feedback with us
        </h4>
      ) : (
        <h4>Return to Old Website</h4>
      )}
      {done ? (
        <p className={styles.done}>What would you like to do?</p>
      ) : (
        <p>
          Would you like to give a feedback of your experience on our
          Beta-testing SuperApp
        </p>
      )}
      <a
        className={styles.backButton}
        href="https://www.konga.com"
        rel="noreferrer"
        target="_blank"
      >
        Switch Back to Old Website
      </a>
      {done ? (
        <Button
          className={styles.continueButton}
          handleClick={() => props.handlePopUpClose()}
          title={"Continue on new website"}
          type={"button"}
        />
      ) : (
        <Button
          className={styles.feedBackButton}
          handleClick={() => setShowFeedBack(true)}
          title={"Leave a feedback"}
          type={"button"}
        />
      )}
      <div className={styles.bottomContainer}>
        {!done && showFeedback && (
          <div className={styles.ratings}>
            <h4>How would you rate your experience?</h4>
            <p>Please rate your experience on the page</p>
            <div className={styles.reactions}>
              <div onClick={() => setRatingsChoice("1 star")}>
                <Icons
                  className={`${
                    ratingsChoice === "1 star" ? styles.hateColor : ""
                  } 
              }`}
                  name="confused"
                />
              </div>
              <div onClick={() => setRatingsChoice("2 stars")}>
                <Icons
                  className={`${
                    ratingsChoice === "2 stars" ? styles.dontLikeColor : ""
                  } 
              }`}
                  name="sad"
                />
              </div>
              <div onClick={() => setRatingsChoice("3 stars")}>
                <Icons
                  className={`${
                    ratingsChoice === "3 stars" ? styles.neutralColor : ""
                  } 
              }`}
                  name="straight"
                />
              </div>
              <div onClick={() => setRatingsChoice("4 stars")}>
                <Icons
                  className={`${
                    ratingsChoice === "4 stars" ? styles.likeColor : ""
                  } 
              }`}
                  name="happy"
                />
              </div>
              <div onClick={() => setRatingsChoice("5 stars")}>
                <Icons
                  className={`${
                    ratingsChoice === "5 stars" ? styles.loveColor : ""
                  } 
              }`}
                  name="glad"
                />
              </div>
            </div>
          </div>
        )}
        {!done && ratingsChoice !== "" && (
          <div className={styles.satisfaction}>
            <span>
              On a scale of 1-5, where 1 is very dissatisfied and 5 is very
              satisfied, kindly rate your satisfaction with the following (Where
              applicable)
            </span>
            <div className={styles.satisfactoryItem}>
              <span>Ease of use?</span>
              <div className={styles.satisfactoryScore}>
                <div
                  className={`${
                    easeOfUse === 0 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setEaseOfUse(0)}
                >
                  0
                </div>
                <div
                  className={`${
                    easeOfUse === 1 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setEaseOfUse(1)}
                >
                  1
                </div>
                <div
                  className={`${
                    easeOfUse === 2 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setEaseOfUse(2)}
                >
                  2
                </div>
                <div
                  className={`${
                    easeOfUse === 3 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setEaseOfUse(3)}
                >
                  3
                </div>
                <div
                  className={`${
                    easeOfUse === 4 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setEaseOfUse(4)}
                >
                  4
                </div>
                <div
                  className={`${
                    easeOfUse === 5 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setEaseOfUse(5)}
                >
                  5
                </div>
              </div>
              <div className={styles.finalEmotion}>
                <p>Dissatisfied</p>
                <p>Very Satisfied</p>
              </div>
            </div>
            <div className={styles.satisfactoryItem}>
              <span>Look and feel of the app?</span>
              <div className={styles.satisfactoryScore}>
                <div
                  className={`${
                    lookAndFeel === 0 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setLookAndFeel(0)}
                >
                  0
                </div>
                <div
                  className={`${
                    lookAndFeel === 1 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setLookAndFeel(1)}
                >
                  1
                </div>
                <div
                  className={`${
                    lookAndFeel === 2 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setLookAndFeel(2)}
                >
                  2
                </div>
                <div
                  className={`${
                    lookAndFeel === 3 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setLookAndFeel(3)}
                >
                  3
                </div>
                <div
                  className={`${
                    lookAndFeel === 4 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setLookAndFeel(4)}
                >
                  4
                </div>
                <div
                  className={`${
                    lookAndFeel === 5 ? styles.selectedColor : styles.bgColor
                  }`}
                  onClick={() => setLookAndFeel(5)}
                >
                  5
                </div>
              </div>
              <div className={styles.finalEmotion}>
                <p>Dissatisfied</p>
                <p>Very Satisfied</p>
              </div>
            </div>
            <div className={styles.satisfactoryItem}>
              <span>Like to recommend the app to others?</span>
              <div className={styles.satisfactoryScore}>
                <div
                  className={`${
                    liketoRecommend === 0
                      ? styles.selectedColor
                      : styles.bgColor
                  }`}
                  onClick={() => setLikeToRecommend(0)}
                >
                  0
                </div>
                <div
                  className={`${
                    liketoRecommend === 1
                      ? styles.selectedColor
                      : styles.bgColor
                  }`}
                  onClick={() => setLikeToRecommend(1)}
                >
                  1
                </div>
                <div
                  className={`${
                    liketoRecommend === 2
                      ? styles.selectedColor
                      : styles.bgColor
                  }`}
                  onClick={() => setLikeToRecommend(2)}
                >
                  2
                </div>
                <div
                  className={`${
                    liketoRecommend === 3
                      ? styles.selectedColor
                      : styles.bgColor
                  }`}
                  onClick={() => setLikeToRecommend(3)}
                >
                  3
                </div>
                <div
                  className={`${
                    liketoRecommend === 4
                      ? styles.selectedColor
                      : styles.bgColor
                  }`}
                  onClick={() => setLikeToRecommend(4)}
                >
                  4
                </div>
                <div
                  className={`${
                    liketoRecommend === 5
                      ? styles.selectedColor
                      : styles.bgColor
                  }`}
                  onClick={() => setLikeToRecommend(5)}
                >
                  5
                </div>
              </div>
              <div className={styles.finalEmotion}>
                <p>Dissatisfied</p>
                <p>Very Satisfied</p>
              </div>
            </div>
            <div className={styles.satisfactoryItem}>
              <span>
                Do you have any suggesttions about what we could do better?
              </span>
              <div className={styles.messageBox}>
                <textarea
                  className={styles.messageBoxx}
                  id=""
                  name=""
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={"Write your message"}
                />
              </div>
            </div>
            <div>
              <Button
                className={styles.submitButton}
                handleClick={() => submitFeedBack()}
                isDisable={isComplete()}
                title={"Submit"}
                type={"submit"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    email: state?.auth?.CurrentUser?.emailAddress,
  };
};

export default connect(mapStateToProps)(OldWebSite);
