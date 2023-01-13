/* eslint-disable @typescript-eslint/ban-types */
import React, { Fragment, useEffect, useState } from "react";
import ClassTypeComponent from "./ClassType/ClassType";
import styles from "./ClassType.module.scss";
import IClassType from "dto/KongaTravel/IClassType";
import useClickOutside from "CustomHooks/useClickOutSide";
import { Select } from "Components/Form/inputs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { composeClasses } from "libs/utils/utils";

export interface IClassTypeInfo {
  checkClassType: Function;
  onChange: Function;
}

const ClassType: React.FunctionComponent<IClassTypeInfo> = (
  props: IClassTypeInfo
) => {
  const [ariaExpanded, setAriaExpanded] = useState<boolean>(false);
  const [economy, setEconomy] = useState<boolean>(true);
  const [premiumEconomy, setPremiumEconomy] = useState<boolean>(false);
  const [business, setBusiness] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  useEffect(() => {
    let mounted: IClassType | null = {
      economy: economy,
      premiumEconomy: premiumEconomy,
      business: business,
    };
    props.onChange(mounted);
    return () => {
      mounted = null;
    };
  }, [economy, premiumEconomy, business]);

  const handleButtonClickeEvent = () => {
    setAriaExpanded(!ariaExpanded);
  };

  const travellerNode = useClickOutside(() => {
    setAriaExpanded(false);
  });

  const handleSelect = (event: any) => {
    setSelectedValue(event.target.value);
    props.checkClassType(event.target.value);
  };

  return (
    <Fragment>
      <div ref={travellerNode}>
        <div className={"dropdown"}>
          <div aria-expanded={ariaExpanded} onClick={handleButtonClickeEvent}>
            <div className="pt-3">
              <Select
                className={composeClasses("px-2", styles.dropdownButton)}
                name={"passport_issuing_country"}
                onChange={handleSelect}
                options={[
                  { value: "Economy", text: "Economy" },
                  { value: "Premium Economy", text: "Premium Economy" },
                  { value: "Business", text: "Business" },
                ]}
                placeholder={"  Class Type"}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ClassType;
