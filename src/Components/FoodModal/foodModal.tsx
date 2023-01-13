/* eslint-disable @typescript-eslint/ban-types */
import ItemQuantity from "Components/ItemQuantity/itemQuantity";
import React, { Fragment, useState, useEffect } from "react";
import Button from "Components/Button/button";
import styles from "./foodModal.module.scss";
import Icon from "Components/Icons";
import { connect } from "react-redux";
import IProduct from "dto/KongaOnline/IProduct";
import IMarketplaceCartForm from "Models/FormModels/Cart/Marketplace/IMarketplaceCartForm";
import { AddFoodItemCartAction } from "Http/Redux/Actions/Cart/IFoodCartAction";
import { SelectedFoodProduct } from "Http/Redux/Actions/Food/FoodAction";
import { SetCartToOpenAction } from "Http/Redux/Actions/Cart/ICartAction";
import FoodService from "Http/Services/FoodService";

export interface IFoodModal {
  title: string;
  product: IProduct;
  AddFoodItemCartAction: Function;
  AddFoodItemToCart: any;
  selectedFoodProduct: any;
  SelectedFoodProduct: Function;
  children: React.ReactNode;
}
const FoodModal: React.FunctionComponent<IFoodModal> = ({
  title,
  product,
  AddFoodItemCartAction,
  AddFoodItemToCart,
  SelectedFoodProduct,
  children,
}) => {
  const [foodQuantity, setFoodQuantity] = useState<number>(1);
  const [cart, setCart] = useState<IMarketplaceCartForm>({
    cart_id: null,
    product: null,
    quantity: foodQuantity,
    options: {
      option_id: null,
      option_type_id: null,
    },
  });

  //Monitor the product quantity change
  useEffect(() => {
    let mounted = true;

    setCart({ ...cart, quantity: foodQuantity });

    return () => {
      mounted = false;
    };
  }, [foodQuantity]);

  const handleAddtoCartEvent = (event: any) => {
    event.preventDefault();
    const extras = product.product_extras[0].options[0];
    const cartOptions = {
      option_id: extras.option_id,
      option_type_id: extras.option_type_id,
    };
    setCart({ ...cart, product: product, options: cartOptions });
    SelectedFoodProduct(product);
    setCloseModal(true);
  };

  const addCartItem = async () => {
    if (cart.product !== null) {
      const response = await AddFoodItemCartAction(cart);
      if (response === true) {
        SetCartToOpenAction(FoodService.STORE_ID);
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

  const [closeModal, setCloseModal] = useState(false);
  const handleBackdropClick = (event: any, backdropRef: any, handler: any) => {
    if (event.target && event.target === backdropRef) {
      if (typeof handler === "function") handler();
      setCloseModal(true);
    }
  };
  let backdropRef: HTMLDivElement | null;
  const handleModalClose = (e: any) => {
    e.preventDefault();
    setCloseModal(true);
  };
  return (
    <Fragment>
      <div
        className={!closeModal ? styles.overlay : undefined}
        onClick={(event) =>
          handleBackdropClick(event, backdropRef, () => {
            // console.log("clicked");
          })
        }
        ref={(node) => (backdropRef = node)}
      />
      {!closeModal && (
        <div className={styles.foodModal}>
          <div className={styles.foodModal_header}>
            <h1>{title}</h1>
            <div className={styles.close} onClick={(e) => handleModalClose(e)}>
              <Icon name="close2" />
            </div>
          </div>
          <div>{children}</div>
          <div className={styles.foodModal_bottom}>
            <ItemQuantity
              availableQty={10}
              onChange={(newQty: number) => setFoodQuantity(newQty)}
              type="food"
              value={1}
            />
            <div className={styles.button}>
              <Button
                btnClass={"btn-primary text-white"}
                handleClick={(e: any) => handleAddtoCartEvent(e)}
                title={`Add to Order ${product.price}`}
              />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state: any) => ({
  AddFoodItemToCart: state.cart.Food,
  selectedFoodProduct: state.food.SelectedFoodProduct,
});

export default connect(mapStateToProps, {
  AddFoodItemCartAction,
  SelectedFoodProduct,
  SetCartToOpenAction,
})(FoodModal);
