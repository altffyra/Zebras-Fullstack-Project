import React from 'react'
import Nav from '../../components/Nav';
import OrderItem from '../../components/OrderItem';
import mainmeal from '../../assets/menu/mainmeal.svg';
import '../../styles/_checkout.scss'
import NotLoggedIn from '../../components/NotLoggedIn';

type Props = {}

const CheckOut = (props: Props) => {
  return (
    <main>
      <Nav />
      <div className='checkout-wrapper'>

        <figure className="checkout-header--info">
            <img src={mainmeal} alt="" />

              <section className="checkout-header--text">
                <h1>varukorg</h1>
              </section>

          </figure>

          <section className='current-order'>
            <OrderItem />
          </section>

          <NotLoggedIn />

      </div>
    </main>
  )
}

export default CheckOut