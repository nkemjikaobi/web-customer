import React from "react";

import Icon from "Components/Icons/icon";

interface Props {
  icon: string;
  styles: any;
  header: string;
  contact: string;
}
const SupportLink: React.FunctionComponent<Props> = ({
  contact,
  styles,
  icon,
  header,
}) => {
  return (
    <div className={styles.support}>
      <div className={styles.icon}>
        <Icon name={icon} />
      </div>
      <div className={styles.text}>
        <h1>{header}</h1>
        <p>{contact}</p>
      </div>
    </div>
  );
};
export default SupportLink;
