import React, { ChangeEvent, useState } from "react";
import Nav from "../../components/Nav";
import OrderItem from "../../components/OrderItem";
import mainmeal from "../../assets/menu/mainmeal.svg";
import "../../styles/_checkout.scss";
import NotLoggedIn from "../../components/NotLoggedIn";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { CartProps, MenuItems, User } from "../../models/types";

type Props = {};

const CheckOut = (props: Props) => {
  const [userMessage, setMessage] = useState<string>();
  const user: User = useSelector((state: RootState) => state.user);
  const cart: CartProps = useSelector((state: RootState) => state.cart);
  console.log(cart);
  const cartItemEl = cart.cartItems.map((item, index) => (
    <div className="cartmodule">
      <div key={index} className="cart-item">
        <p className="item-name">{item.name}</p>{" "}
        <p className="item-price">{item.price} kr</p>{" "}
      </div>
      <div className="divider"></div>
    </div>
  ));
  const data = {
    cart: cart,
    user: user,
    userComment: userMessage,
  };

  async function sendOrder() {
    console.log(data);

    const response = await fetch("/api/order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const datasave = await response.json();
    
    
  }

  function changeMessages(e: ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
    console.log(userMessage);
  }

  const notLoggedInElem =
    user.name == "" ? (
      <NotLoggedIn />
    ) : (
      <div className="LoggedIn">
        <div className="Account-info">
          <div className="Account-top">
            <p className="Account-top-p">Mina Uppgifter</p>
          </div>
          <div className="Account-info-main">
            <p className="User-info">Namn: {user.name}</p>
            <p className="User-info">Epost: {user.email}</p>
            <p className="User-info">Telefon nummer: {user.phoneNumber}</p>
          </div>
        </div>
        <div className="Comment-wrapper">
          <div className="Comment-top">
            <p className="Comment-top-p">Kommentar</p>
          </div>
          <input
            onChange={(e) => changeMessages(e)}
            className="input-comment"
            type="text"
          ></input>
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
            <p className="total-sum">{cart.totalPrice} Kr.</p>
          </section>
        </section>

        {notLoggedInElem}
      </div>
    </main>
  );
};

export default CheckOut;
