import '../../styles/_account.scss';
import UserInformation from '../../components/UserInformation';
import Nav from '../../components/Nav';
import SearchUser from '../../components/SearchUser';
import UserOrders from '../../components/UserOrders';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';
import { User, Order } from '../../models/types';
import {actions as orderActions} from '../../features/orderReducer';

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accountId = localStorage.getItem('accountId');
    if(accountId) {
      // FETCHA USER ORDRAR
      // dispatch(orderActions.getOrders(data));
    } else {
      // navigate('/');
    }
  }, [])
  
 const user:User = useSelector((state: RootState) => state.user);
 const orders:Order[] = useSelector((state: RootState) => state.orders);

  return (
    <section className='account-page'>
      <Nav />
      <div className='account-top'>
        <UserInformation user={user} />
        <div className='divider'></div>
        <SearchUser orders={orders} />
      </div>
      <UserOrders orders={orders} />
    </section>
  )
}

export default Account