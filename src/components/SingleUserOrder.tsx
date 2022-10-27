import { Order } from '../models/types';
import lockedIcon from '../assets/locked.png';
import unlockedIcon from '../assets/unlocked.png';
import OrderItem from '../components/OrderItem';
import { useState } from 'react';

type SingleUserOrderProps = {
    order: Order;
}

const SingleUserOrders = (props: SingleUserOrderProps) => {
  const [showOrder, setShowOrder] = useState<boolean>(false);

  const showOrderOverlay: () => void = () => {
    setShowOrder(!showOrder);
  };

    return (
      <section className="single-order">
        <p onClick={showOrderOverlay} > Order {props.order.orderPlaced}</p>
        {props.order.completed 
        ? 
            <img src={lockedIcon} alt="locked icon" />
        :
            <img src={unlockedIcon} alt="unlocked icon" />
        }
      {showOrder ? 
        <OrderItem order={props.order} showOrderOverlay={showOrderOverlay} />  
        : ''
      }
      </section>
    )
  };
  
  export default SingleUserOrders;