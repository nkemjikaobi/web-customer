import ICategory from "dto/KongaOnline/ICategory";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import ProductDetailContentBody from "./ProductDetailContentBody";

export interface IProductDetailByUrl {
  selectedCategory?: ICategory;
}

const ProductDetailByUrl: React.FunctionComponent<IProductDetailByUrl> = (
  props: IProductDetailByUrl
) => {
  const { productUrl }: any = useParams();
  const [product, setProduct] = useState(0);

  useEffect(() => {
    let mounted = true;

    if (mounted && productUrl) {
      const urls = productUrl.split("-")?.splice(-1);
      urls && urls.length > 0 && setProduct(urls[0]);
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ProductDetailContentBody
      breadCrumb={[]}
      product={product}
      selectedCategory={props.selectedCategory}
    />
  );
};

const mapStatesToProps = (state: any) => ({
  selectedCategory: state.marketplace.SelectedCategory,
});

ProductDetailByUrl.defaultProps = {
  selectedCategory: undefined,
};

export default connect(mapStatesToProps, null)(ProductDetailByUrl);
