import React, { useEffect, useState } from "react";
import styles from "./kongaServices.module.scss";
import URLConfigurator from "Components/URLConfigurator";
import { range } from "lodash";
import KongaServiceSkeleton from "./KongaServiceSkeleton";

/**
 * Konga Services
 */

interface IKongaServices {
  services: Array<any>;
}

const KongaServices: React.FunctionComponent<IKongaServices> = (
  props: IKongaServices
) => {
  const [data, setData] = useState<Array<any>>([]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setData(props.services ?? []);
    }

    return () => {
      mounted = false;
    };
  }, [props]);

  return (
    <section className={styles.itemContainer}>
      {data.length === 0
        ? range(7).map((index: number) => <KongaServiceSkeleton key={index} />)
        : data.length > 0 &&
          data.map((service: any, index: any) => (
            <span className={styles.itemWrapper} key={index}>
              <URLConfigurator to={service.link}>
                <img
                  alt={service.alt_text}
                  className={styles.item}
                  src={service.image}
                />
              </URLConfigurator>
            </span>
          ))}
    </section>
  );
};

export default KongaServices;
