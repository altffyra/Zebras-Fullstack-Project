import '../../styles/_search.scss';

import OrderItems from "../../components/OrderItems"
import Nav from "../../components/Nav";
import { Order } from '../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { actions as orderActions } from '../../features/orderReducer';
import { actions as cartActions } from '../../features/cartReducer';


const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const [searchId, setSearchId] = useState<string>('');
  const [searchError, setSearchError] = useState<boolean>(false);
  const [found, setFound] = useState<boolean>(false);

    async function getOrder(search:string) {
      setLoading(true)
      setSearchError(false)
      setFound(false)
      const response = await fetch(`/api/order/${search}`);
      const data = await response.json();      
      if(data.found == false) {
        setSearchError(true)
        dispatch(orderActions.clearOrders())
      } else {
        setFound(true)
        dispatch(orderActions.getOrders(data));
      }      
      setLoading(false)
    }

    const handleInput: (e:ChangeEvent<HTMLInputElement>) => void = (e) => {
      setSearchId(e.target.value)      
    }

    const searchOrder: () => void = () => {
      if(searchId.length <= 1) {
        return
      }
      getOrder(searchId)      
    }

    const handleEnter: (e: KeyboardEvent) => void = (e) => { 
      if(e.key == 'Enter') {
        searchOrder();
      };
    };

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
      {loading ? 
            <div className='loading'></div>
            : ''
        }
      <div className="search-container">
        <input type="text" name='search' placeholder='Sök ordernummer' value={searchId} id="search" onKeyUp={(e) => handleEnter(e)} onChange={(e) => handleInput(e)}/>
        <label htmlFor="search" onClick={searchOrder}>Sök</label>
      </div>
      {searchError ? 
      <p>Ingen order hittades på det ordernumret.</p>
    :
    ''}
        {found 
          ? 
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
            {!searchedOrder.locked
              ?
                <button className='btn-change' onClick={changeOrder}>Ändra</button>
              :
                ''
            }
          </div>
        :
          ''
      }
    </section>
  )
}

export default Search