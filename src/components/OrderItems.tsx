import { CartItems } from '../models/Interface';

type OrderItemProps = {
    item: CartItems
}

const OrderItems = (props: OrderItemProps) => {
    return (
      <section className="order-item">
        <p className='item-name'>{props.item.name}</p>
        <p>{props.item.amount}</p>
        <p>{props.item.price} kr</p>
      </section>
    )
  }
  
  export default OrderItems