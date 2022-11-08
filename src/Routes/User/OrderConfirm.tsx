import "../../styles/_orderConfirm.scss";
import Nav from "../../components/Nav";
import OrderItems from "../../components/OrderItems";
import { Order } from "../../models/types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { actions as cartActions } from "../../features/cartReducer";
import { actions as tempOrderActions } from "../../features/tempOrderReducer";
import { actions as orderActions } from "../../features/orderReducer";
import Alert from "../../components/Alert";

type errorObj = {
  title: string;
  message: string;
};

const OrderConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [deleteOverlay, setDeleteOverlay] = useState<boolean>(false);
  const [errorElement, showError] = useState<boolean>(false);
  const [errorMessages, makeError] = useState<errorObj>({
    title: "",
    message: "",
  });
  const showAlert = errorElement ? (
    <Alert
      errorTitle={errorMessages.title}
      errorMessage={errorMessages.message}
      showError={showError}
    />
  ) : (
    ""
  );
  let tempObject: errorObj = { title: "", message: "" };

  useEffect(() => {
    dispatch(cartActions.clearCart());
    const root: any = document.querySelector("#root");
    root.scrollIntoView({
      behavior: "instant",
    });
  }, []);

  const confirmedOrder: Order = useSelector(
    (state: RootState) => state.orders
  )[0];

  let orderItemsEl: JSX.Element[] | undefined
  let orderDone: string | undefined = ''
  if(confirmedOrder) {
    orderItemsEl = confirmedOrder.cart.cartItems.map((item) => (
      <OrderItems item={item} key={item.name} />
      ));
      orderDone = confirmedOrder.orderCompleted?.slice(10);

  }

  const changeOrder: () => void = () => {
    dispatch(cartActions.changeOrder(confirmedOrder.cart));
    dispatch(tempOrderActions.setTempOrder(confirmedOrder));
    navigate("/menu");
  };

  async function deleteOrder() {
    setLoading(true);
    setDeleteOverlay(false);
    const response = await fetch(`/api/order/delete/${confirmedOrder.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      tempObject.title = "Något gick fel";
      tempObject.message = "Ordern togs inte bort. Försök igen.";
      makeError(tempObject);
      showError(true);
    } else {
      if (confirmedOrder.id) {
        navigate('/menu')
        dispatch(orderActions.deleteOrder(confirmedOrder.id));
      }
    }
    setLoading(false);
  }

  const toggleDeleteOverlay: () => void = () => {
    setDeleteOverlay(!deleteOverlay);
  };

  return (
    <section className="confirmed">
      <Nav />
      {loading ? <div className="loading"></div> : ""}

      <div className="headline">
        <h1>Orderbekräftelse</h1>
      </div>
      <div className="time-container">
        <p>Maten klar att hämtas: Kl. {orderDone}</p>
      </div>

      <div className="order-user">
        <p className="user-headline">Beställare</p>
        <div className="user">
          <p>Namn: &emsp; {confirmedOrder?.user.name}</p>
          <p>E-mail: &emsp; {confirmedOrder?.user.email}</p>
          <p>Tel.nr: &emsp; {confirmedOrder?.user.phoneNumber}</p>
        </div>
      </div>

      <div className="order-cart">
        <div className="order-header">
          <p className="order-title">Order ID: {confirmedOrder?.id}</p>
          <div className="list-titles">
            <p>Rätt</p>
            <p>Pris</p>
          </div>
        </div>

        <div className="order-information">{orderItemsEl}</div>
        <div className="order-price">
          <p>Totalt</p>
          <p>{confirmedOrder?.cart.totalPrice} kr</p>
        </div>
      </div>
      <p className="change-order">
        Blev något fel?{" "}
        <span onClick={changeOrder}>Tryck här för att ändra din order!</span>
      </p>
      <p className="change-order">
        Ångrat dig?{" "}
        <span onClick={toggleDeleteOverlay}>
          Tryck här för att ta bort ordern.
        </span>
      </p>
      {confirmedOrder?.userComment ? (
        <div className="order-comment">
          <p>Kommentar</p>
          <p>{confirmedOrder?.userComment}</p>
        </div>
      ) : (
        ""
      )}

      <div className="location">
        <p>Hämtas på: </p>
        <div>
          <p>Lambergskajen 56</p>
          <p>652 21 Karlstad</p>
          <br />
          <p className="open-text">Vi har öppet dygnet runt!</p>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8131.132788853451!2d13.520668944233146!3d59.369957206767886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb19d87d4c3c7%3A0x300ad4aa5764fa28!2sLambergskajen%2C%20652%2021%20Karlstad!5e0!3m2!1ssv!2sse!4v1665738091678!5m2!1ssv!2sse"
        loading="lazy"
      ></iframe>
      {deleteOverlay ? (
        <div className="delete-overlay">
          <div className="delete-container">
            <h3>Bekräftelse på att ta bort en order</h3>
            <div className="btn-container">
              <button className="btn-cancel" onClick={toggleDeleteOverlay}>
                Avbryt
              </button>
              <button className="btn-delete" onClick={deleteOrder}>
                Ta bort
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {showAlert}
    </section>
  );
};

export default OrderConfirm;
