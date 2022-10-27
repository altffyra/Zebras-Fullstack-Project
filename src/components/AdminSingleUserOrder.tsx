import { Order } from '../models/types';
import lockedIcon from '../assets/locked.png'
import unlockedIcon from '../assets/unlocked.png'
import OrderItem from './OrderItem'
import { useState } from 'react';

type SingleUserOrderProps = {
    order: Order;
}

const SingleUserOrders = (props: SingleUserOrderProps) => {
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);

  const showOrderOverlay: () => void = () => {
    setShowOrder(!showOrder)
  }


  async function lockOrder() {
    
        setLoading(true)

        let updatedOrder = props.order
    
        const orderId = props.order.id
        const response = await fetch(`/api/order/admin/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        });
        const datasave = await response.json();

        if (datasave.locked) {
          updatedOrder.locked = true
        }

        {/*
        if(!response.ok){
          setLoading(false)
          tempObject.title = "Ordern ej ändrad"
            tempObject.message = "Något gick fel, försök igen"
            makeError(tempObject)
            showError(true)
          }
        */}
    
        if (response.ok) {
          setLoading(false)
  
        }
    
      }

    return (
      <section className="single-order">
        <p onClick={showOrderOverlay} >Order {props.order.orderPlaced}</p>
        {props.order.locked 
        ? 
            <img src={lockedIcon} alt="locked icon" onClick={lockOrder}/>
        :
            <img src={unlockedIcon} alt="unlocked icon" onClick={lockOrder}/>
        }
      {showOrder ? 
        <OrderItem order={props.order} showOrderOverlay={showOrderOverlay} />  
        : ''
      }
      </section>
    )
  }
  
  export default SingleUserOrders