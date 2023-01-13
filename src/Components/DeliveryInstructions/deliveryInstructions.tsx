/* eslint-disable @typescript-eslint/ban-types */
import { setComponent } from "Http/Redux/Actions/ActionCreators/Modal/modalActionCreator";
import React, { Fragment, useState } from "react";
import styles from "./deliveryInstructions.module.scss";
interface IProps {
  setComment: Function;
}
const DeliveryInstructions: React.FunctionComponent<IProps> = ({
  setComment,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <Fragment>
      <div className={styles.mainContainer}>
        <label className={styles.container}>
          <input
            defaultChecked={checked}
            onChange={() => setChecked(!checked)}
            type="checkbox"
          />
          Check this box if you have any instruction regarding this order
          <span className={styles.checkmark} />
        </label>

        {checked && (
          <>
            <h1>Delivery Instruction</h1>
            <textarea
              className={styles.textarea}
              onChange={(e) => setComment(e.target.value)}
              placeholder="(If you want to add comment e.g delivery instruction)"
              // value={this.props.commentValue}
            />
          </>
        )}
      </div>
    </Fragment>
  );
};

export default DeliveryInstructions;
