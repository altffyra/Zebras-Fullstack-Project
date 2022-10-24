import React, { ChangeEvent, useState } from "react";
import Nav from "../../components/Nav";
import mainmeal from "../../assets/menu/mainmeal.svg";
import "../../styles/_checkout.scss";
import NotLoggedIn from "../../components/NotLoggedIn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { CartProps, MenuItems, User, Order } from "../../models/types";
import { useNavigate } from "react-router-dom";
import { actions as orderActions } from "../../features/orderReducer";
import { actions as setTempOrder } from "../../features/tempOrderReducer";

type Props = {};

const CheckOut = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [userMessage, setMessage] = useState<string>();
  const user: User = useSelector((state: RootState) => state.user);
  const cart: CartProps = useSelector((state: RootState) => state.cart);
  const tempOrder: Order[] = useSelector((state: RootState) => state.tempOrder);
  const cartItemEl = cart.cartItems.map((item, index) => (
    <div className="cartmodule">
      <div key={index} className="cart-item">
        <p className="item-name">{item.name}</p>{" "}
        <p className="item-amount">{item.amount} st</p> {" "}
        <p className="item-price">{item.price} kr</p>{" "}
      </div>
      <div className="divider"></div>
    </div>
  ));

  async function sendOrder() {

    if (tempOrder.length <= 0) {
      const data = {
        cart: cart,
        user: user,
        userComment: userMessage,
      };

      const response = await fetch("/api/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datasave = await response.json();

      dispatch(orderActions.makeOrders(datasave));
      navigate("/OrderConfirm");
    } else {
      const data = tempOrder;
      const tempOrderId = tempOrder[0].id
      const response = await fetch(`/api/order/${tempOrderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datasave = await response.json();

      dispatch(orderActions.makeOrders(datasave));
      navigate("/OrderConfirm");
    }
  }

  function changeMessages(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }

  const notLoggedInElem =
    user.name == "" ? (
      <NotLoggedIn />
    ) : (
      <div className="LoggedIn">
        <div className="Account-info">
          <div className="Account-top">
            <p className="Account-top-p">Mina uppgifter</p>
          </div>
          <div className="Account-info-main">
            <p className="User-info">Namn: {user.name}</p>
            <div className="divider"></div>
            <p className="User-info">E-post: {user.email}</p>
            <div className="divider"></div>
            <p className="User-info">Telefonnummer: {user.phoneNumber}</p>
          </div>
        </div>
        <div className="Comment-wrapper">
          <div className="Comment-top">
            <p className="Comment-top-p">Kommentar</p>
          </div>
          <textarea
            onChange={(e) => changeMessages(e)}
            className="input-comment"
            placeholder="Är det något vi behöver veta? Här kan du lämna en kommentar till personalen."
          ></textarea>
        </div>
        <div className="buttonsDiv">
          <button className="back-btn">Tillbaka </button>
          <button onClick={sendOrder} className="order-btn">
            Beställ{" "}
          </button>
        </div>
      </div>
    );

  return (
    <main>
      <Nav />
      <div className="checkout-wrapper">
        <figure className="checkout-header--info">
          <img src={mainmeal} alt="" />

          <section className="checkout-header--text">
            <h1>Kassa</h1>
          </section>
        </figure>

        <section className="current-order">
          <section className="order-top"> Order</section>
          {cartItemEl}
          <section className="total-wrapper">
            <p className="total">Totalt:</p>{" "}
            <p className="total-sum">{cart.totalPrice} kr.</p>
          </section>
        </section>

        {notLoggedInElem}
      </div>
    </main>
  );
};

export default CheckOut;
