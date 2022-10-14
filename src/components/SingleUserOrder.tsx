import { Order } from '../models/Interface';

type SingleUserOrderProps = {
    order: Order;
}

const SingleUserOrders = (props: SingleUserOrderProps) => {

    return (
      <section className="user-order">
        <p>{}</p>
        <p>{}</p>
        <p>{}</p>
      </section>
    )
  }
  
  export default SingleUserOrders