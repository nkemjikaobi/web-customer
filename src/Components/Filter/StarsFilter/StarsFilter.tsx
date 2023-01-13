import StarFilterRating from "Components/StarRating/StarFilterRating";
import { range } from "lodash";
import React, { Fragment, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import RadioFilter from "../RadioFilter/radioFilter";

interface IStarsFilter {
  name: string;
  value: any;

  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange: Function;
}

const StarsFilter: React.FunctionComponent<IStarsFilter> = (
  props: IStarsFilter
) => {
  return (
    <Fragment>
      {range(5).map((item: any, index: number, array: Array<number>) => (
        <div key={index}>
          <RadioFilter
            isText={false}
            name={props.name}
            onChange={props.onChange}
            value={index}
          >
            <StarFilterRating
              numStars={array.length - (index + 1)}
              successCount={index + 1}
            />
          </RadioFilter>
        </div>
      ))}
    </Fragment>
  );
};

export default StarsFilter;
