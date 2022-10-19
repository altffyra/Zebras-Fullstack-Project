import { Order } from '../models/Interface';
import lockedIcon from '../assets/locked.png'
import unlockedIcon from '../assets/unlocked.png'

type SingleUserOrderProps = {
    order: Order;
}

const SingleUserOrders = (props: SingleUserOrderProps) => {

    const lockOrder: () => void = async () => {
      // FETCHA PUT LÅS ORDER

      // DISPATCHA LÅST
    }

    return (
      <section className="single-order">
        <p>Order {props.order.orderPlaced}</p>
        {props.order.completed 
        ? 
            <img src={lockedIcon} alt="locked icon" />
        :
            <img src={unlockedIcon} alt="unlocked icon" onClick={lockOrder} />
        }
      </section>
    )
  }
  
  export default SingleUserOrders