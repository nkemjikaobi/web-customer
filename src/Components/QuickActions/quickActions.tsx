/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from "react";
import Icon from "Components/Icons/icon";
import IconText from "../IconText/iconText";
import styles from "./quickActions.module.scss";
import constStyles from "Components/IconText/iconText.module.scss";
import { composeClasses } from "libs/utils/utils";
import useClickOutSide from "CustomHooks/useClickOutSide";
import { Link } from "react-router-dom";

interface IProps {
  moreQuickLinksData: any[];
  title: string;
  quickLinksData: any[];
  setPopUpTrigger: Function;
}
const QuickActions: React.FunctionComponent<IProps> = (props: IProps) => {
  const { moreQuickLinksData, quickLinksData }: IProps = props;
  const [showQuickLinks, setShowQuickLinks] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleClick = () => {
    setShowQuickLinks(!showQuickLinks);
    setShowMore(!showMore);
  };

  const cards =
    quickLinksData &&
    quickLinksData.map(
      (
        e: { id: number; icon: string; title: string; component: string },
        i
      ) => {
        return (
          <IconText
            component={e.component}
            icon={e.icon}
            key={e.id}
            title={e.title}
          />
        );
      }
    );

  const more =
    moreQuickLinksData &&
    moreQuickLinksData.map(
      (
        e: {
          id: number;
          icon: string;
          title: string;
          component: string;
          link: string;
        },
        i
      ) => {
        return (
          <IconText
            component={e.component}
            destination={e.link}
            icon={e.icon}
            isMore={true}
            key={e.id}
            title={e.title}
          />
        );
      }
    );

  const quickActionsNode = useClickOutSide(() => {
    setShowQuickLinks(true);
  });

  const handleActionsScroll = () => {
    const target = document.getElementById("main-div");
    const scrolled_left = target?.scrollLeft;
    scrolled_left === 0 ? setShowQuickLinks(true) : setShowQuickLinks(false);
  };

  return (
    <div
      className={styles.quickActions}
      id="main-div"
      onScroll={handleActionsScroll}
      ref={quickActionsNode}
    >
      <div
        className={composeClasses(constStyles.iconText, styles.fixedIconText)}
      >
        <div className={styles.quickActionsContainer}>
          <Icon name="quickActions" />
          <p className={constStyles.title}>Quick Actions</p>
        </div>
      </div>
      <div className={styles.quickLinks}>
        <div
          className={composeClasses(
            styles.tabletAndAboveOnly,
            styles.webQuickLinks
          )}
        >
          {showQuickLinks ? cards : more}
        </div>
        <div
          className={composeClasses(styles.mobileOnly, styles.mobileQuickLinks)}
        >
          {cards.concat(more)}
          <Link to="#">
            <IconText component="" icon="" title="" />
          </Link>
        </div>

        <div className={styles.moreIcon}>
          <div
            className={composeClasses(
              styles.iconText,
              styles.tabletAndAboveOnly
            )}
            onClick={() => handleClick()}
          >
            <div>
              <Icon name="hardDrive" />
              <p className={styles.title}>{showQuickLinks ? "More" : "Back"}</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={composeClasses(styles.mobileOnly, styles.direction)}
        id="scroll"
      >
        <div onClick={() => handleClick()}>
          {showQuickLinks ? (
            <Icon name="arrowRightPink" />
          ) : (
            <Icon name="arrowLeftPink" />
            //Arrow right svg isnt't working for some reason
          )}
        </div>
      </div>
      {/* this code hides gift label when logged in */}
      {/* {!AuthService.GetLoggedInUser() && (
        <WebGiftBox onPopTrigger={props.setPopUpTrigger} />
      )} */}
    </div>
  );
};

export default QuickActions;
