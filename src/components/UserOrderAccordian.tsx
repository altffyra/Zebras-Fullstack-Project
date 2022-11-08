import { Order } from "../models/types";
import { useState } from "react";
import dropArrowLight from "../assets/dropDownLight.svg";
import SingleUserOrders from "./SingleUserOrder";

type errorObj = {
  title: string;
  message: string;
};

type UserOrderAccordian = {
  orderType: string;
  orders: Order[];
  alertMessage: (errorMsg: errorObj ) => void;
};

const UserOrderAccordian = (props: UserOrderAccordian) => {
  const [dropActive, setDropActive] = useState<boolean>(true);
  const cssActive = dropActive ? "active" : "";

  const ordersEl = props.orders.map((order) => (
    <SingleUserOrders key={order.id} order={order} alertMessage={props.alertMessage} />
  ));

  const handleDropDown: () => void = () => {
    setDropActive(!dropActive);
  };

  return (
    <div className="orderlist">
      <div className="accordian-header" onClick={handleDropDown}>
        <h2>{props.orderType}</h2>
        <img
          src={dropArrowLight}
          className={cssActive + "-icon"}
          alt="drop down icon"
        />
      </div>
      <div className={cssActive + " dropdown"}>
        {props.orders.length > 0 ? ordersEl : "Inga ordrar"}
      </div>
    </div>
  );
};

export default UserOrderAccordian;
