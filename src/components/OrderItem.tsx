import '../styles/_orderItem.scss';
import { Order } from '../models/types';
import OrderItems from '../components/OrderItems';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";
import {actions as cartActions} from '../features/cartReducer';
import { actions as setTempOrderaction } from "../features/tempOrderReducer";
import { RootState } from "../store";


type OrderItemProps = {
  order: Order;
  showOrderOverlay?: () => void;
}

const OrderItem = (props: OrderItemProps) => {

  const { order } = props;
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderItem = order.cart.cartItems.map(item => <OrderItems key={item.name} item={item} />)

  const changeOrder: () => void = async () => {
    dispatch(cartActions.changeOrder(order.cart))
    dispatch(setTempOrderaction.setTempOrder(order));
    navigate('/menu')
  }

  return (
    <section className='order-overlay'>
      <div className="order-container">
        <h2>Order {order.id}</h2>
        <div className='user-information'>
          <p>Beställare</p>
          <p>Namn : {order.user.name}</p>
          <p>Email : {order.user.email}</p>
          <p>Tel.nr : {order.user.phoneNumber}</p>
        </div>
        <div className='divider'></div>
        <div className='order-information'>
          <p className='order-title'>Order {order.id}</p>
            {orderItem}
            <p>Totalt : {order.cart.totalPrice} kr</p>
        </div>
            <div className='button-container'>
        <button className='btn-close' onClick={props.showOrderOverlay}>Stäng</button>
        {!order.locked
          ?
            <button className='btn-change' onClick={changeOrder}>Ändra</button>
          :
            ''
        }
            </div>
      </div>
    </section>
  )
}

export default OrderItem