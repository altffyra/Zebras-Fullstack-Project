import '../../styles/_orderConfirm.scss';
import Nav from '../../components/Nav';
import OrderItems from '../../components/OrderItems';
import { Order } from '../../models/types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { actions as cartActions } from '../../features/cartReducer';
import { actions as tempOrderActions } from '../../features/tempOrderReducer';

const OrderConfirm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(cartActions.clearCart())
  }, [])

  const confirmedOrder: Order = useSelector((state: RootState) => state.orders)[0];
  const qwe: Order[] = useSelector((state: RootState) => state.orders)
  console.log(qwe);
  
  const orderItemsEl = confirmedOrder.cart.cartItems.map(item => <OrderItems item={item} key={item.name} />)
  const orderDone:string | undefined = confirmedOrder.orderCompleted?.slice(10)

  const changeOrder: () => void = () => {
    dispatch(cartActions.changeOrder(confirmedOrder.cart));
    dispatch(tempOrderActions.setTempOrder(confirmedOrder))
    navigate('/menu');
  }
  
  return (
    <section className="confirmed">
      <Nav />
        <div className='headline'>
          <h1>Orderbekräftelse</h1>
        </div>
        <div className='time-container'>
          <p>Maten klar att hämtas : Kl. {orderDone}</p>
        </div>

        <div className="order-user">
          <p className='user-headline'>Beställare</p>
          <div className="user">
            <p>Namn : {confirmedOrder.user.name}</p>
            <p>Email : {confirmedOrder.user.email}</p>
            <p>Tel.nr : {confirmedOrder.user.phoneNumber}</p>
          </div>
        </div>
        
        
        <div className='order-cart'>
          <div className='order-header'>
            <p className='order-title'>Order ID: {confirmedOrder.id}</p>
            <div className='list-titles'>
              <p>Rätt</p>
              <p>Antal</p>
              <p>Pris</p>
            </div>
          </div>

          <div className='order-information'>
            {orderItemsEl}
          </div>
          <div className="order-price">
            <p>Totalt</p>
            <p>{confirmedOrder.cart.totalPrice} kr</p>
          </div>
        </div>
          <p className='change-order'>Blev det något tokigt? <span onClick={changeOrder}>Tryck här!</span></p>
        {confirmedOrder.userComment ? 
        <div className='order-comment'>
          <p>Kommentar</p>
          <p>{confirmedOrder.userComment}</p>
        </div>
        :
        ''
      }

      <div className='location'>
        <p>Hämtas på : </p>
        <div>
          <p>Lambergskajen</p>
          <p>652 21 Karlstad</p>
        </div>
      </div>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8131.132788853451!2d13.520668944233146!3d59.369957206767886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb19d87d4c3c7%3A0x300ad4aa5764fa28!2sLambergskajen%2C%20652%2021%20Karlstad!5e0!3m2!1ssv!2sse!4v1665738091678!5m2!1ssv!2sse" loading="lazy" ></iframe>
      
    </section>
  )
}

export default OrderConfirm