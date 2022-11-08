import { Order } from "../models/types";
import lockedIcon from "../assets/locked.png";
import unlockedIcon from "../assets/unlocked.png";
import OrderItem from "../components/OrderItem";
import { useState } from "react";

type errorObj = {
  title: string;
  message: string;
};

type SingleUserOrderProps = {
  order: Order;
  setOrder?: <SetStateAction>(order: Order | undefined) => any;
  alertMessage: (errorMsg: errorObj ) => void;
};

const SingleUserOrders = (props: SingleUserOrderProps) => {
  const [showOrder, setShowOrder] = useState<boolean>(false);

  const showOrderOverlay: () => void = () => {  
    setShowOrder(!showOrder);
  };


  return (
    <section className="single-order">
      <p onClick={showOrderOverlay}> Order {props.order.orderPlaced}</p>
      {props.order.locked ? (
        <img src={lockedIcon} alt="locked icon" />
      ) : (
        <img src={unlockedIcon} alt="unlocked icon" />
      )}
      {showOrder ? (
        <OrderItem order={props.order} showOrderOverlay={showOrderOverlay} setOrder={props.setOrder} alertMessage={props.alertMessage} />
      ) : (
        ""
      )}
    </section>
  );
};

export default SingleUserOrders;
