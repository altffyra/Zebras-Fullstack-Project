import "../styles/_cart.scss";
import dropDownLight from "../assets/dropDownLight.svg";
import { CartProps, Order } from "../models/types";
import CartItem from "./CartItem";
import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as cartActions } from "../features/cartReducer";
import { actions as tempOrderActions } from "../features/tempOrderReducer";
import { RootState } from "../store";

type CartProp = {
  cart: CartProps;
};

type UpdatedItemProps = {
  name: string;
  amount: number;
};

const Cart = (props: CartProp) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState<boolean>(false);

  const tempOrder: Order[] = useSelector((state: RootState) => state.tempOrder);

  const handleCart: () => void = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (props.cart.cartItems.length == 0) {
      setActive(false);
    }
  }, [props.cart.cartItems.length]);

  const activeCss: string = active ? "active" : "";
  const cartCss: string = active ? "active-cart" : "closed-cart";

  const handleCheckout: () => void = () => {
    navigate("/checkout");
  };

  const handleCancelUpdate: () => void = () => {
    dispatch(tempOrderActions.clearTempOrder());
    dispatch(cartActions.clearCart());
  };

  const handleAmount: (
    e: ChangeEvent<HTMLSelectElement>,
    itemName: string
  ) => void = (e, itemName) => {
    const updatedItem: UpdatedItemProps = {
      name: itemName,
      amount: parseInt(e.target.value),
    };
    dispatch(cartActions.updateAmount(updatedItem));
  };

  let amountOfProducts: number = 0;

  props.cart.cartItems.forEach((item) => {
    amountOfProducts = amountOfProducts + item.amount;
  });

  const cartItemEl = props.cart.cartItems.map((item, index) => (
    <CartItem item={item} key={index} handleAmount={handleAmount} />
  ));

  return (
    <section className="cart">
      <div className="cart-dropdown" onClick={handleCart}>
        <img src={dropDownLight} className={activeCss} alt="drop down icon" />
        {props.cart.cartItems.length > 0 && !active ? (
          <div className="cart-headline">
            <p>{amountOfProducts} produkter</p>
            <p>{props.cart.totalPrice} kr</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={cartCss}>
        {cartItemEl}
        <p className="total-price">Totalt : {props.cart.totalPrice} kr</p>
        <div className="button-container">
          {tempOrder.length > 0 ? (
            <button className="btn-cancel" onClick={handleCancelUpdate}>
              Avbryt
            </button>
          ) : (
            ""
          )}
          <button className="btn-checkout" onClick={handleCheckout}>
            Kassa
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
