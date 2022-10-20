import React from 'react'
import Nav from '../../components/Nav';
import OrderItem from '../../components/OrderItem';
import mainmeal from '../../assets/menu/mainmeal.svg';
import '../../styles/_checkout.scss'
import NotLoggedIn from '../../components/NotLoggedIn';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { CartProps, MenuItems, User } from '../../models/types';



type Props = {}

const CheckOut = (props: Props) => {



  const user: User = useSelector((state: RootState) => state.user);
  const cart: CartProps = useSelector((state: RootState) => state.cart);
  console.log(cart)
  const cartItemEl = cart.cartItems.map((item, index) => <div key={index} className='cart-item' ><p className='item-name'>{item.name }</p> <p className='item-price'>{item.price }</p> <div className='divider'></div></div> );

  const notLoggedInElem = user.name==''? 
  <div></div>
  // <NotLoggedIn/>
  : <div className='LoggedIn'>
      <div className='Account-info'> 
        <div className='Account-top'>
          <p className='Account-top-p'>Mina Uppgifter</p>
      
        </div>
        <div className='Account-info-main'>
          <p className='User-info'>{user.name}</p>
          <p className='User-info'>{user.email}</p>
          <p className='User-info'>{user.phoneNumber}</p>
        </div>
        <div className='Comment-wrapper'>
          <div className='Comment-top'>
            <p className='Comment-top-p'>Kommentar</p>      
        </div>

        </div>
      </div>
      <button className='back-btn'>Tillbaka </button>
      <button className='order-btn'>Beställ </button>
    </div>
  

  return (
    <main>
      <Nav />
      <div className='checkout-wrapper'>

        <figure className="checkout-header--info">
            <img src={mainmeal} alt="" />

              <section className="checkout-header--text">
                <h1>Kassa</h1>
              </section>

          </figure>

          <section className='current-order'>
            <section className='order-top'> Order</section>
            {cartItemEl}
            <section className='total-wrapper'> 
            <p className='total'>Totalt:</p> <p className='total-sum'>{cart.totalPrice} Kr.</p>
            </section>
          </section>

          <NotLoggedIn />

      </div>
    </main>
  )
}

export default CheckOut