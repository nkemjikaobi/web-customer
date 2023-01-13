import ServicesCard from "Components/ServicesCard/servicesCard";
import { servicesData } from "Pages/Home/data";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./ServicesDataComponent.module.scss";

const ServicesDataComponent: React.FunctionComponent = () => {
  const [services, setServices] = useState<any>(<Fragment />);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setServices(
        servicesData.map((e, i: number) => (
          <div className={styles.socialIcons} key={i}>
            <ServicesCard icon={e.icon} key={i} text={e.text} title={e.title} />
          </div>
        ))
      );
    }

    return () => {
      mounted = false;
    };
  }, []);

  return <Fragment>{services}</Fragment>;
};

export default ServicesDataComponent;
