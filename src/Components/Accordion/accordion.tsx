import React, { Fragment, useState } from "react";

import { composeClasses } from "libs/utils/utils";
import styles from "./accordion.module.scss";
import Icon from "Components/Icons/icon";

export interface IAccordion {
  content?: any;
  children?: any;
  renderHeader?: any;
  customWrapperClass?: any;
  title?: string;
}

export interface IAccordionContent {
  content?: any;
  children?: any;
}

/**
 * Accordion Content
 * @param {*} props Props
 * @returns {React.Component} Accordion content
 */
const AccordionContent: React.FunctionComponent<IAccordionContent> = ({
  content,
  children,
}) => <div className={styles.style}>{content || children}</div>;

AccordionContent.defaultProps = {
  content: undefined,
  children: undefined,
};

/**
 * Accordion Component
 */
const Accordion: React.FunctionComponent<IAccordion> = (props: IAccordion) => {
  const [isHidden, setIsHidden] = useState(true);

  /**
   * Toggle the visibility of the accordion
   * @returns {null} null
   */
  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  /**
   * Render method
   * @returns {React.Component} Accordion component
   */
  const { renderHeader, customWrapperClass } = props;
  const isFrame = false;
  const wrapperClass = composeClasses(styles.accordion, customWrapperClass);
  const wrapperClassOpen = composeClasses(
    wrapperClass,
    !isFrame && styles.open
  );
  const titleClass = composeClasses(!isFrame && styles.accordionTitle);
  const titleOpenClass = composeClasses(titleClass, !isFrame && styles.open);

  return (
    <div className={isHidden ? wrapperClass : wrapperClassOpen}>
      <div
        className={isHidden ? titleClass : titleOpenClass}
        onClick={() => toggleVisibility()}
      >
        {typeof renderHeader === "function" ? (
          renderHeader()
        ) : (
          <Fragment>
            <span>{props.title}</span>
            <Icon name="chevron2" />
          </Fragment>
        )}
      </div>
      {!isHidden && (
        <AccordionContent content={props.content}>
          {props.children}
        </AccordionContent>
      )}
    </div>
  );
};

Accordion.defaultProps = {
  customWrapperClass: "",
  content: "",
  title: "",
  renderHeader: null,
  children: <></>,
};

export default Accordion;
