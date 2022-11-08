import "../styles/_userOrders.scss";
import { Order } from "../models/types";
import UserOrderAccordian from "./UserOrderAccordian";

type errorObj = {
  title: string;
  message: string;
};

type UserOrdersProps = {
  orders: Order[];
  alertMessage: (errorMsg: errorObj ) => void;
};

const UserOrders = (props: UserOrdersProps) => {
  const activeOrders: Order[] = props.orders.filter(
    (order) => order.completed != true
  );
  const completedOrders: Order[] = props.orders.filter(
    (order) => order.completed == true
  );

  return (
    <section className="user-orders">
      <UserOrderAccordian orderType={"Aktiva ordrar"} orders={activeOrders} alertMessage={props.alertMessage} />
      <UserOrderAccordian
        orderType={"Tidigare ordrar"}
        orders={completedOrders}
        alertMessage={props.alertMessage}
      />
    </section>
  );
};

export default UserOrders;
