import React, { Fragment, useState, useEffect } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import styles from "./Executives.module.scss";
import { teamMembers } from "../aboutUsData";
import { useParams, useHistory } from "react-router-dom";
import { composeClasses, getSanitizedHtml } from "libs/utils/utils";
import Icon from "Components/Icons";
import { isMobile } from "react-device-detect";

const breadcrumb: Array<IBreadcrumbProp> = [
  { Text: "Home", Url: "/" },
  { Text: "About Us", Url: "/about-us" },
  { Text: "Our Team", Url: "/about-us/our-team" },
];

const Executives: React.FunctionComponent = () => {
  const [teamMember, setTeamMember] = useState<any>({});
  const { id }: any = useParams();
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const team = teamMembers.filter((member) => member.id === parseInt(id));
      console.log(team);
      setTeamMember(team);
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Fragment>
      <BasePageLayout
        breadcrumbs={breadcrumb}
        hideFooterOnMobile={"false"}
        hideNavigation={0}
        showNavigation={"no"}
      >
        <div className={styles.container}>
          {!isMobile && (
            <div className={styles.back} onClick={() => history.goBack()}>
              <Icon name="arrowLeft" />
            </div>
          )}
          {teamMember.length > 0 && (
            <div className={styles.content}>
              <div className={styles.top}>
                <div className={styles.img}>
                  <img
                    alt="A smiling man in suit and glasses"
                    loading="lazy"
                    src={teamMember[0].image}
                    width="300px"
                  />
                </div>
                <h5>{teamMember[0].name}</h5>
                <h6>{teamMember[0].title}</h6>
              </div>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={getSanitizedHtml(teamMember[0].about)}
              />
            </div>
          )}
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default Executives;
