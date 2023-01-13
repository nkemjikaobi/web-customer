import config from "Configurations/configurations";
import React from "react";
import styles from "./listItem.module.scss";
import { Link } from "react-router-dom";
import { composeClasses } from "libs/utils/utils";

interface ListItemProperties {
  icon?: string;
  text: string;
  route?: string;
}

const ListItem: React.FunctionComponent<ListItemProperties> = (
  properties: ListItemProperties
) => {
  const iconImage = properties.icon ? (
    <>
      <img
        alt={properties.text}
        className={"pe-2"}
        src={config.web.public_url + `/icons/${properties.icon}`}
      />{" "}
    </>
  ) : (
    ""
  );

  const content = (
    <>
      <div>
        {iconImage}
        {properties.text}
      </div>
      <svg
        className="bi bi-chevron-right"
        fill="currentColor"
        height="16"
        viewBox="0 0 16 16"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          fillRule="evenodd"
        />
      </svg>
    </>
  );

  const className = composeClasses(
    "d-flex justify-content-between align-items-center",
    styles.listItem
  );
  return (
    <>
      {properties.route ? (
        <Link className={className} to={properties.route}>
          {content}
        </Link>
      ) : (
        <li className={className}>{content}</li>
      )}
    </>
  );
};

ListItem.defaultProps = {
  icon: "",
  route: "",
};

export default ListItem;
