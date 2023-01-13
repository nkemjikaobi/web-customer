/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect, useState } from "react";
import styles from "./foodVendorListingCard.module.scss";
import { CURRENCIES } from "Helpers/Constants";
import { connect } from "react-redux";
import IProduct from "dto/KongaOnline/IProduct";
import { AddFoodItemCartAction } from "Http/Redux/Actions/Cart/IFoodCartAction";
import { SelectedFoodProduct } from "Http/Redux/Actions/Food/FoodAction";
import { SetCartToOpenAction } from "Http/Redux/Actions/Cart/ICartAction";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import FoodModal from "Components/FoodModal/foodModal";
import FoodOptions from "Components/FoodOptions/foodOptions";
import FoodService from "Http/Services/FoodService";

interface IProps {
  cart_id?: number | null;
  products: Array<IProduct>;
  store_id: number;
  AddFoodItemCartAction: Function;
  AddFoodItemToCart: any;
  selectedFoodProduct: any;
  SelectedFoodProduct: Function;
}

const FoodVendorListingCard: React.FunctionComponent<IProps> = ({
  cart_id,
  products,
  store_id,
  AddFoodItemCartAction,
  selectedFoodProduct,
  AddFoodItemToCart,
  SelectedFoodProduct,
}: IProps) => {
  const [cart, setCart] = useState<IMarketplaceCartForm>({
    cart_id: null,
    product: null,
    quantity: 1,
  });
  const [foodExtras, setFoodExtras] = useState<any>();
  const handleAddtoCartEvent = async (event: any, product: any) => {
    event.preventDefault();
    if (product && product.product_extras) {
      const prdExtra = product.product_extras;
      const extras = (
        <div className={styles.foodModalWrapper}>
          <FoodModal
            key={Math.random().toString(36).substr(2, 9)}
            product={product}
            title={"Extra Option"}
          >
            <div>
              <FoodOptions
                amount={prdExtra[0].options[0].option_price}
                key={Math.random().toString(36).substr(2, 9)}
                name={prdExtra[0].title}
              />
            </div>
          </FoodModal>
        </div>
      );
      setFoodExtras(extras);
    } else {
      setCart({ ...cart, product: product });
      SelectedFoodProduct(product);
    }
  };

  const addCartItem = async () => {
    if (cart.product !== null) {
      const response = await AddFoodItemCartAction(cart);
      if (response === true) {
        SetCartToOpenAction(store_id);
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    if (!cart.cart_id && AddFoodItemToCart?.id) {
      setCart({ ...cart, cart_id: AddFoodItemToCart.id });
    }

    addCartItem();

    return () => {
      mounted = false;
    };
  }, [cart]);

  return (
    <div>
      <h4>{products[0].categories![0].name}</h4>
      <div className={styles.foodListingCard}>
        {products.map((product) => (
          <div className={styles.vendorListingCard} key={product.sku}>
            <img
              className={styles.imgList}
              src={
                "https://www-konga-com-res.cloudinary.com/image/upload/v1583424361/media/catalog/product/" +
                product.image_thumbnail
              }
            />
            <div className={styles.listContainer}>
              <div className={styles.cardDetail}>
                <div>{product.name}</div>
                <div>
                  <small className={styles.lightText}>
                    {product.description}
                  </small>
                </div>
                <div className={styles.amount}>
                  {CURRENCIES.NAIRA + product.price}
                </div>
              </div>
              <div className={styles.addCartContainer}>
                {product.open_store ? (
                  <div
                    className={styles.addCartButton}
                    onClick={(e) => handleAddtoCartEvent(e, product)}
                  >
                    <a href="#">Add to Cart</a>
                  </div>
                ) : (
                  <div className={styles.addCartButton}>
                    <a href="#">CLOSED</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {foodExtras}
    </div>
  );
};

FoodVendorListingCard.defaultProps = {
  cart_id: null,
};

const mapStateToProps = (state: any) => ({
  AddFoodItemToCart: state.cart.Food,
  selectedFoodProduct: state.food.SelectedFoodProduct,
});

export default connect(mapStateToProps, {
  AddFoodItemCartAction,
  SelectedFoodProduct,
  SetCartToOpenAction,
})(FoodVendorListingCard);
