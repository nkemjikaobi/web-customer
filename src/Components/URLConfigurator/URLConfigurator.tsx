import React, { Fragment, useEffect, useState } from "react";
import { isExternalUrl, omit, urlMapsToInternalRoute } from "libs/utils/utils";
import { Link } from "react-router-dom";
import config from "Configurations/configurations";

interface IProps {
  to: string;
  children: React.ReactNode;
  [propName: string]: any;
}

const URLConfigurator: React.FunctionComponent<IProps> = ({
  to,
  children,
  props,
}: IProps) => {
  const filteredProps = omit(props, ["to", "children"]);
  const [routing, setRouting] = useState<string>("");

  const tempUrlRedirect = urlMapsToInternalRoute(to);
  let urlRedirect = "";

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      try {
        if (tempUrlRedirect) {
          if (tempUrlRedirect === "/download") {
            urlRedirect = "/pay-bills";
          } else if (tempUrlRedirect === "https://new.konga.com/") {
            urlRedirect = "/";
          } else if (tempUrlRedirect === "/konga-prime") {
            urlRedirect = "/konga-prime";
          } else if (tempUrlRedirect.startsWith("/travel")) {
            urlRedirect = tempUrlRedirect;
          } else if (tempUrlRedirect === "/stores") {
            urlRedirect = "/send-package/stores";
          } else if (tempUrlRedirect.startsWith("https://blog.konga.com/")) {
            urlRedirect = "https://blog.konga.com/";
          } else if (tempUrlRedirect.includes("food.konga")) {
            urlRedirect = tempUrlRedirect;
          } else if (tempUrlRedirect.includes("901")) {
            urlRedirect = "tel:*901*5#";
          } else if (tempUrlRedirect.includes("forms.gle")) {
            urlRedirect = tempUrlRedirect;
          } else if (tempUrlRedirect.includes("diamond")) {
            urlRedirect = tempUrlRedirect;
          } else {
            urlRedirect = `/online-shopping${tempUrlRedirect.replaceAll(
              config.api.kongaOnline,
              ""
            )}`;
          }
        }
      } catch (exception: unknown) {}
    }

    setRouting(urlRedirect);
    return () => {
      mounted = false;
    };
  }, [tempUrlRedirect]);

  return isExternalUrl(routing) ? (
    <Fragment>
      <a
        href={routing}
        rel="noopener noreferrer"
        target={`${routing.includes("901") ? "_self" : "_blank"}`}
        {...filteredProps}
      >
        {children}
      </a>
    </Fragment>
  ) : (
    <Fragment>
      <Link to={routing} {...filteredProps}>
        {children}
      </Link>
    </Fragment>
  );
};

export default URLConfigurator;
