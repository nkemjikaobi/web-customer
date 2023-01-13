/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import React, { Fragment, useEffect, useState } from "react";
import BasePageLayout from "Components/BasePageLayout/basePageLayout";
import styles from "./Home.module.scss";
import { composeClasses } from "libs/utils/utils";
import { VariantOne, VariantEight, VariantEighteen } from "./sectionVariants";
import CustomPageService from "Http/Services/CustomPageService";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { range } from "lodash";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";

const CustomPageHome: React.FunctionComponent = () => {
  const [sectionData, setsectionData] = useState([]);
  const { pageSlug }: any = useParams();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      CustomPageService.GetCustomPages(pageSlug).then((response: any) => {
        return setsectionData(response);
      });
    }

    return () => {
      mounted = false;
    };
  }, []);

  const renderSection = (sectionData: any) => {
    switch (sectionData.variant) {
      case 1:
        return <VariantOne sectionData={sectionData} />;
      case 8:
        return <VariantEight sectionData={sectionData} />;
      case 18:
        return <VariantEighteen sectionData={sectionData} />;
      default:
        return null;
    }
  };

  const breadCrumb: Array<IBreadcrumbProp> = [{ Text: "Home", Url: "/" }, { Text: pageSlug }];

  return (
    <Fragment>
      <BasePageLayout breadcrumbs={breadCrumb}
hideFooterOnMobile={"false"}
hideNavigation={0}
showNavigation={"no"}>
        <div className={styles.home}>
          <section className={composeClasses(styles.mainContainer)}>
            {sectionData.length > 0
              ? sectionData.map((section, index) => <Fragment key={index}>{renderSection(section)}</Fragment>)
              : range(5).map((index: number) => <Skeleton className={"w-100"}
key={index} />)}
          </section>
        </div>
      </BasePageLayout>
    </Fragment>
  );
};

export default CustomPageHome;
