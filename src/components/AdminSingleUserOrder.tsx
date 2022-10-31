import { Order } from '../models/types';
import lockedIcon from '../assets/locked.png'
import unlockedIcon from '../assets/unlocked.png'
import completeIcon from '../assets/complete.svg'
import OrderItem from './OrderItem'
import { useState } from 'react';
import message from '../assets/message.png';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { actions as orderActions } from '../features/orderReducer'
import Alert from './Alert'


type SingleUserOrderProps = {
    order: Order;
    updateAllOrders: (orders: Order[]) => void;
}

const SingleUserOrders = (props: SingleUserOrderProps) => {
  const [showOrder, setShowOrder] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [errorElement, showError] = useState<boolean>(false);
  const [errorMessages, makeError] = useState({ title: "", message: "" });
  const showAlert = errorElement ? (
    <Alert
      errorTitle={errorMessages.title}
      errorMessage={errorMessages.message}
      showError={showError}
    />
  ) : (
    " "
  );
  let tempObject = { title: "", message: "" };
  let checkId: string | null = localStorage.getItem('accountId');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showOrderOverlay: () => void = () => {
    setShowOrder(!showOrder)
  }


  async function lockOrder() {
    setLoading(true);
    if (props.order) {
      const completedOrder: Order = {
        cart: props.order.cart,
        user: props.order.user,
        adminComment: props.order.adminComment,
        userComment: props.order.userComment,
        locked: true,
        orderPlaced: props.order.orderPlaced,
        orderCompleted: props.order.orderCompleted,
        id: props.order.id,
        completed : props.order.completed,
      }

      const orderId = props.order?.id
      const response = await fetch(`/api/order/admin/${orderId}`, {
        method: "PUT",
        headers: {
          "accountID": `${checkId}`,
        },
        body: JSON.stringify(completedOrder),
      });

      const datasave = await response.json();
      if(datasave.error) {

        navigate('/')
        
      }
      if (!response.ok) {
        setLoading(false);
        tempObject.title = "Ordern ej ändrad";
        tempObject.message = "Något gick fel, försök igen";
        makeError(tempObject);
        showError(true);
      }

      if (response.ok) {
        dispatch(orderActions.getOrders(datasave));
        props.updateAllOrders(datasave)

        setLoading(false);
      };
    };
  }
  
    async function handleComplete() {
  
      setLoading(true);
      if (props.order) {
        const completedOrder: Order = {
          cart: props.order.cart,
          user: props.order.user,
          adminComment: props.order.adminComment,
          userComment: props.order.userComment,
          locked: props.order.locked,
          orderPlaced: props.order.orderPlaced,
          orderCompleted: props.order.orderCompleted,
          id: props.order.id,
          completed : true,
        }

      const orderId = props.order?.id
      const response = await fetch(`/api/order/admin/${orderId}`, {
        method: "PUT",
        headers: {
          "accountID": `${checkId}`
      },
        body: JSON.stringify(completedOrder),
      });

      const datasave = await response.json();
      if(datasave.error) {

        navigate('/')
        
      }
      if (!response.ok) {
        setLoading(false);
        tempObject.title = "Ordern ej ändrad";
        tempObject.message = "Något gick fel, försök igen";
        makeError(tempObject);
        showError(true);
      }

      if (response.ok) {
        dispatch(orderActions.getOrders(datasave));
        setLoading(false);
        props.updateAllOrders(datasave)
      };
    };
  }
  
  const allItems = props.order.cart.cartItems.map((item) => {
    return <p key={ item.name }>{ item.name }  x {item.amount}</p>
  });

  const navigateOrder = () => {
    navigate(`/AdminOrder/${ props.order.id }`);
  }



    return (
      <section className="single-order" >
        {showAlert}
        {loading ? <div className="loading"></div> : ""}
          <div className='single-order__left' onClick={navigateOrder}>
            <section className="single-order__id">
              <p onClick={showOrderOverlay} >Order {props.order.id}</p>
              { props.order.userComment !== ""
              ?
                <img src={message} alt="" />
              :
                '' }
              </section>
              <section className="single-order__bottom">
                { allItems }
            </section>
          </div>
          <section className="single-order__locks">
            {!props.order.locked && !props.order.completed
            ? 
                <img src={unlockedIcon} alt="unlocked icon" onClick={lockOrder}/>
            :
                ''
            }
            {props.order.locked && !props.order.completed
              ? 
              <img src={completeIcon} alt="complete icon" onClick={handleComplete}/>
              :
                ''
            }
            {props.order.locked && props.order.completed
              ? 
                ''
              :
                ''
            }
          </section>
      </section>
    )
  }
  
  export default SingleUserOrders