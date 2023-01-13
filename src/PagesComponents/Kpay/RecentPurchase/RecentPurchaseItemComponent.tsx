import Button from "Components/Button/button";
import React from "react";

export interface IRecentPurchaseItemComponentProperty {
  name: string;
  accountNumber: string;

  // eslint-disable-next-line @typescript-eslint/ban-types
  handleChange: Function;
}

const RecentPurchaseItemComponent: React.FunctionComponent<
  IRecentPurchaseItemComponentProperty
> = (props: IRecentPurchaseItemComponentProperty) => (
  <>
    <div className={"list-group-item list-group-item-action"}>
      <div className={"d-flex w-100 justify-content-between"}>
        <h6 className="mb-1">{props.name}</h6>
        <Button
          className={"mt-2"}
          handleClick={props.handleChange}
          title={"Buy Again"}
        />
      </div>
      <small>{props.accountNumber}</small>
    </div>
  </>
);
export default RecentPurchaseItemComponent;
