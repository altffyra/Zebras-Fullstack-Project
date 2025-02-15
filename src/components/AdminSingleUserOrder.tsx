import { Order } from '../models/types';
import unlockedIcon from '../assets/unlocked.png'
import completeIcon from '../assets/complete.svg'
import { useState } from 'react';
import message from '../assets/message.png';
import messageLock from '../assets/message-lock.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { actions as orderActions } from '../features/orderReducer'
import Alert from './Alert'
import { stringify } from 'querystring';


type SingleUserOrderProps = {
    order: Order;
    updateAllOrders: (orders: Order[]) => void;
}
type errorType = {
  title: string,
  message: string
}

const SingleUserOrders = (props: SingleUserOrderProps) => {

  const [ loading, setLoading ] = useState<boolean>(false);
  const [errorElement, showError] = useState<boolean>(false);
  const [errorMessages, makeError] = useState<errorType>({ title: "", message: "" });
  const showAlert = errorElement ? (
    <Alert
      errorTitle={errorMessages.title}
      errorMessage={errorMessages.message}
      showError={showError}
    />
  ) : (
    " "
  );
  let tempObject:errorType = { title: "", message: "" };
  let checkId: string | null = localStorage.getItem('accountId');

  const navigate = useNavigate();
  const dispatch = useDispatch();




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

      const orderId:string|undefined = props.order?.id
      const response = await fetch(`/api/order/admin/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "accountID": `${checkId}`,
        },
        body: JSON.stringify(completedOrder),
      });

      const datasave = await response.json();

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
          "Content-Type": "application/json",
          "accountID": `${checkId}`
      },
        
        body: JSON.stringify(completedOrder),
      });

      const datasave = await response.json();
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
    return <p  key={ item.name }>{ item.name }  x {item.amount}</p>
  });

  const navigateOrder = () => {
    navigate(`/AdminOrder/${ props.order.id }`);
  }
  const [comment, setComment] = useState<boolean>(false)
  const orderComment = () => {
    setTimeout(() => {
      setComment(false)      
    }, 400);
    setComment(true)
  }

    return (
      <section className="single-order" >
        {showAlert}
        {loading ? <div className="loading"></div> : ""}
          <div className='single-order__left' onClick={navigateOrder}>
            <section className="single-order__id">
              <div>
                <p>Order {props.order.id}</p>
                <p className='person'>Beställare: {props.order.user.name}</p>
              </div>
              { props.order.userComment !== ""
              ?
                <img className={comment ? 'check-message' : ''} src={comment ? messageLock : message} alt="" />
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
                <img src={unlockedIcon} alt="unlocked icon" onClick={props.order.userComment?.length == 0 ? lockOrder : orderComment}/>
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