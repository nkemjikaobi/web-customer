/**
 * Component to diplay the products on a category on the home page
 */

import config from "Configurations/configurations";
import React, { Fragment } from "react";
import CategoriesComponentModel from "Models/ComponentModels/Home/CategoriesComponentModel";
import CategoriesComponentProps from "Models/ComponentModels/Home/ICategoriesComponentProps";

const CategoriesComponent: React.FunctionComponent<CategoriesComponentProps> = (
  props: CategoriesComponentProps
) => {
  const { Title, Products } = props;

  return (
    <Fragment>
      <div className={"row my-4"}>
        <div className={"col pe-0"}>
          <h6 className={"h6"}>{Title}</h6>
          <div className={"card"}>
            <div className={"card-body"}>
              <div className={"row"}>
                {Products.map((product: CategoriesComponentModel, index) => (
                  <div className={"col text-center"} key={index}>
                    <img
                      alt={product.Title}
                      className={"dash-icon"}
                      src={config.web.public_url + `/icons/${product.Icon}`}
                    />
                    <p className={"fs-7"}>{product.Title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CategoriesComponent;
