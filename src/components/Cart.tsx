import "../styles/_cart.scss";
import dropDownLight from "../assets/dropDownLight.svg";
import { CartProps, Order } from "../models/types";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as cartActions } from "../features/cartReducer";
import { actions as tempOrderActions } from "../features/tempOrderReducer";
import { RootState } from "../store";

type CartProp = {
  cart: CartProps;
  setActive: any;
  handleCart: () => void;
  active: boolean;
};


const Cart = (props: CartProp) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const tempOrder: Order[] = useSelector((state: RootState) => state.tempOrder);



  useEffect(() => {
    if (props.cart.cartItems.length == 0) {
      props.setActive(false);
    }
  }, [props.cart.cartItems.length]);

  const activeCss: string = props.active ? "active" : "";
  const cartCss: string = props.active ? "active-cart" : "closed-cart";

  const handleCheckout: () => void = () => {
    navigate("/checkout");
  };

  const handleCancelUpdate: () => void = () => {
    dispatch(tempOrderActions.clearTempOrder());
    dispatch(cartActions.clearCart());
  };

  const handleRemoveAll: () => void = () => {
    dispatch(cartActions.clearCart());
  };



  let amountOfProducts: number = 0;

  props.cart.cartItems.forEach((item) => {
    amountOfProducts = amountOfProducts + item.amount;
  });

  const cartItemEl = props.cart.cartItems.map((item, index) => (
    <CartItem item={item} key={index} />
  ));

  return (
    <section className="cart">
      <div className="cart-dropdown" onClick={props.handleCart}>
        <img src={dropDownLight} className={activeCss} alt="drop down icon" />
        {props.cart.cartItems.length > 0 && !props.active ? (
          <div className="cart-headline">
            <p>{amountOfProducts} produkter</p>
            <p>{props.cart.totalPrice} kr</p>
          </div>
        ) : (
          ""
          )}
      </div>
      <div className={cartCss}>
        <p className="remove-all" onClick={handleRemoveAll}>Töm varukorg</p>
        {cartItemEl}
        <p className="total-price">Totalt: {props.cart.totalPrice} kr</p>
        <div className="button-container">
          {tempOrder.length > 0 ? (
            <button className="btn-cancel" onClick={handleCancelUpdate}>
              Avbryt
            </button>
          ) : (
            ""
          )}

          {tempOrder.length > 0 ? (
            <button className="btn-checkout" onClick={handleCheckout}>
              Uppdatera
            </button>
          ) : (
            <button className="btn-checkout" onClick={handleCheckout}>
            Kassa
          </button>
          )}
          
        </div>
      </div>
    </section>
  );
};

export default Cart;
