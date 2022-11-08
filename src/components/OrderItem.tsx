import "../styles/_orderItem.scss";
import { Order } from "../models/types";
import OrderItems from "../components/OrderItems";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions as cartActions } from "../features/cartReducer";
import { actions as orderActions } from "../features/orderReducer";
import { actions as setTempOrderaction } from "../features/tempOrderReducer";
import { useState } from "react";
import Alert from "./Alert";

type errorObj = {
  title: string;
  message: string;
};

type OrderItemProps = {
  order: Order;
  showOrderOverlay?: () => void;
  setOrder: <SetStateAction>(order: Order | undefined) => any;
};

const OrderItem = (props: OrderItemProps) => {
  const { order } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [deleteOverlay, setDeleteOverlay] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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

  const orderItem = order.cart.cartItems.map((item) => (
    <OrderItems key={item.name} item={item} />
  ));

  const changeOrder: () => void = async () => {
    dispatch(cartActions.changeOrder(order.cart));
    dispatch(setTempOrderaction.setTempOrder(order));
    navigate("/menu");
  };

  async function deleteOrder() {
    setLoading(true);
    setDeleteOverlay(false);
    const response = await fetch(`/api/order/delete/${order.id}`, {
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
      if (order.id) {
        dispatch(orderActions.deleteOrder(order.id));
        props.setOrder(undefined)
        props.showOrderOverlay
      }
    }
    setLoading(false);
  }

  const toggleDeleteOverlay: () => void = () => {
    setDeleteOverlay(!deleteOverlay);
  };

  return (
    <section className="order-overlay">
      {loading ? <div className="loading"></div> : ""}
      <div className="order-container">
        <div className="order-header">
          <h2 className="order-id">Order {order.id}</h2>
          {!order.locked ? (
            <button className="delete-btn" onClick={toggleDeleteOverlay}>
              Ta bort
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="order-time">
          <p>Order lagd: {order.orderPlaced}</p>
          <p>Order klar cirka: {order.orderCompleted}</p>
        </div>
        <div className="user-info">
          <p>Beställare</p>
          <p>Namn: {order.user.name}</p>
          <p>E-mail: {order.user.email}</p>
          <p>Tel.nr: {order.user.phoneNumber}</p>
        </div>
        <div className="divider"></div>
        <div className="order-information">
          <p className="order-title">Maträtter</p>
          {orderItem}
          <p>Totalt: {order.cart.totalPrice} kr</p>
        </div>
        <div className="comment">
          <h3>Kundkommentar</h3>
          {order.userComment ? <p>{order?.userComment}</p> : "-"}
        </div>

        <div className="button-container">
          <button className="btn-close" onClick={props.showOrderOverlay}>
            Stäng
          </button>
          {!order.locked ? (
            <button className="btn-change" onClick={changeOrder}>
              Ändra
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
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

export default OrderItem;
