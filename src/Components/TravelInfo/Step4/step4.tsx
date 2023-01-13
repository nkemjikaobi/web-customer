import React, { Fragment } from "react";
import { composeClasses } from "libs/utils/utils";
import styles from "./step4.module.scss";
import Icon from "Components/Icons";
import { Input } from "Components/Form/inputs";

interface IProps {
  currentStep: number;
}
const data = ["Source Address", "Destination Address", "Finished"];

const step4: React.FunctionComponent<IProps> = ({ currentStep }) => {
  return (
    <Fragment>
      <div>
        <h1>Traveller’s Informations</h1>
        <div className={styles.form}>
          <div>
            <div>
              <Input label="First Name" type="text" />
            </div>
            <div>
              <Input label="First Name" type="text" />
            </div>
          </div>
          <div>
            <div>
              <Input label="First Name" type="text" />
            </div>
            <div>
              <Input label="First Name" type="text" />
            </div>
            <div>
              <Input type="radio" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default step4;
