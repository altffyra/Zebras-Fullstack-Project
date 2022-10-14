import { Order } from '../models/Interface';
import lockedIcon from '../assets/locked.png'

type SingleUserOrderProps = {
    order: Order;
}

const SingleUserOrders = (props: SingleUserOrderProps) => {

    return (
      <section className="single-order">
        <p>Order {props.order.orderPlaced}</p>
        {props.order.completed 
        ? 
            <img src={lockedIcon} alt="locked icon" />
        :
            ''
        }
        <img src='' alt="info icon" />
      </section>
    )
  }
  
  export default SingleUserOrders