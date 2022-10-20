import '../../styles/_search.scss';

import OrderItems from "../../components/OrderItems"
import Nav from "../../components/Nav";
import { Order } from '../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { actions as orderActions } from '../../features/orderReducer';
import { actions as cartActions } from '../../features/cartReducer';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const [searchId, setSearchId] = useState<string>('');

    async function getOrder() {
      const response = await fetch(`/api/order/${searchId}`);
      const data = await response.json();      
      dispatch(orderActions.getOrders(data));
    }

    const handleInput: (e:ChangeEvent<HTMLInputElement>) => void = (e) => {
      setSearchId(e.target.value)
      
    }

    const searchOrder: () => void = () => {
      console.log(searchId);
      
    }

    const changeOrder: () => void = async () => {
      dispatch(cartActions.changeOrder(searchedOrder.cart))
      navigate('/menu')
    }

  const searchedOrder: Order = useSelector((state: RootState) => state.orders)[0];
  let orderItem: JSX.Element[] | null = null;
  if(searchedOrder) {
    orderItem = searchedOrder.cart.cartItems.map(item => <OrderItems key={item.name} item={item} />)
  }
  return (
    <section className="search">
      <Nav />
      <div className="search-container">
        <input type="text" name='search' placeholder='Sök ordernummer' value={searchId} id="search" onChange={(e) => handleInput(e)}/>
        <label htmlFor="search" onClick={searchOrder}>Sök</label>
        {searchedOrder ? 
                <div className="order-container">
                <h2>Order {searchedOrder.id}</h2>
                <div className='user-information'>
                  <p>Beställare</p>
                  <p>Namn : {searchedOrder.user.name}</p>
                  <p>Email : {searchedOrder.user.email}</p>
                  <p>Tel.nr : {searchedOrder.user.phoneNumber}</p>
                </div>
                <div className='divider'></div>
                <div className='order-information'>
                  <p className='order-title'>Order {searchedOrder.id}</p>
                    {orderItem}
                    <p>Totalt : {searchedOrder.cart.totalPrice} kr</p>
                </div>
                    <div className='button-container'>
                {!searchedOrder.locked
                  ?
                    <button className='btn-change' onClick={changeOrder}>Ändra</button>
                  :
                    ''
                }
                    </div>
              </div>
          :
          ''
      }
      </div>
    </section>
  )
}

export default Search