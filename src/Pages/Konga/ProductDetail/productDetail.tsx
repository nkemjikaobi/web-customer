import React from "react";
import { IBreadcrumbProp } from "PagesComponents/Navbar/Breadcrumb";
import { connect } from "react-redux";
import ICategory from "dto/KongaOnline/ICategory";
import { useParams } from "react-router-dom";
import ProductDetailContentBody from "./ProductDetailContentBody";

export interface IProductDetail {
  selectedCategory?: ICategory;
  breadCrumb?: Array<IBreadcrumbProp>;
}

const ProductDetail: React.FunctionComponent<IProductDetail> = ({
  breadCrumb,
  selectedCategory,
}: IProductDetail) => {
  const { product }: any = useParams();

  return (
    <ProductDetailContentBody
      breadCrumb={breadCrumb}
      product={product}
      selectedCategory={selectedCategory}
    />
  );
};

const mapStatesToProps = (state: any) => ({
  selectedCategory: state.marketplace.SelectedCategory,
});

ProductDetail.defaultProps = {
  selectedCategory: undefined,
  breadCrumb: [],
};

export default connect(mapStatesToProps, null)(ProductDetail);
