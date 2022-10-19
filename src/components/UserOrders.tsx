import '../styles/_userOrders.scss';
import { Order } from '../models/types';
import UserOrderAccordian from './UserOrderAccordian';

type UserOrdersProps = {
    orders: Order[];
}

const UserOrders = (props: UserOrdersProps) => {

    const activeOrders: Order[] = props.orders.filter(order => order.completed != true);
    const completedOrders: Order[] = props.orders.filter(order => order.completed == true);


    return (
      <section className="user-orders">
        <div className="headline">
            <h1>Mina Ordrar</h1>
        </div>
        <UserOrderAccordian orderType={'Aktiva'} orders={activeOrders} />
        <UserOrderAccordian orderType={'Tidigare'} orders={completedOrders} />
      </section>
    )
  }
  
  export default UserOrders