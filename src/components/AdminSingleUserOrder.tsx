import { Order } from '../models/types';
import lockedIcon from '../assets/locked.png'
import unlockedIcon from '../assets/unlocked.png'
import OrderItem from './OrderItem'
import { useState } from 'react';
import message from '../assets/message.png';
import { useNavigate } from 'react-router-dom';

type SingleUserOrderProps = {
    order: Order;
}

const SingleUserOrders = (props: SingleUserOrderProps) => {
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);

  const navigate = useNavigate();


  const showOrderOverlay: () => void = () => {
    setShowOrder(!showOrder)
  }


  async function lockOrder() {
    
        setLoading(true)

        let updatedOrder = props.order
        updatedOrder.locked = true
    
        const orderId = props.order.id

        const response = await fetch(`/api/order/admin/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        });
        const datasave = await response.json();

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
  
  const allItems = props.order.cart.cartItems.map((item) => {
    return <p key={ item.name }>{ item.name }</p>
  });

  const navigateOrder = () => {
    navigate(`/AdminOrder/${ props.order.id }`);
  }



    return (
      <section className="single-order" onClick={navigateOrder}>

        <section className="single-order__top">

          <section className="single-order__id">
            <p onClick={showOrderOverlay} >Order {props.order.id}</p>
            { props.order.userComment !== ""
            ?
              <img src={message} alt="" />
            :
            '' }
          </section>

          <section className="single-order__locks">
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

        </section>

        <section className="single-order__bottom">
          <p>{ allItems }</p>
        </section>

      </section>
    )
  }
  
  export default SingleUserOrders