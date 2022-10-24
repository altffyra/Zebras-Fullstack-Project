import React from 'react'
import '../styles/_notloggedin.scss'
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {User, Order} from "../models/types";
import {actions as userActions} from '../features/userReducer';



type Props = {}

const NotLoggedIn = (props: Props) => {

    event?.preventDefault()
    const user: User = useSelector((state: RootState) => state.user);
    const tempOrder: Order[] = useSelector((state: RootState) => state.tempOrder);


    const dispatch = useDispatch();

  function loginGuest(){
    dispatch(userActions.setGuest())
      if (tempOrder !== undefined && tempOrder.length > 0  ){
        dispatch(userActions.setUser(tempOrder[0].user))
       };
    
    }
  

  return (
    <div className='login'>
    <section className="flex-container">
      <form className='form' onSubmit={() => console.log('loggain')}>
        <div>
            <input className='form__input' placeholder=' ' type="text" name='username' onChange={() => console.log('namn')} />
            <label className='form__label form--name' htmlFor="username">Användarnamn</label>
        </div>
        <div>
            <input className='form__input' placeholder=' ' type="password" name="password" onChange={() => console.log('lösen')} />
            <label className='form__label form--password' htmlFor="password">Lösenord</label>
        </div>
        <p>Inget konto? <a href="/SignUp"> Skapa </a></p>
        <div>
            <button type="submit" className='login-btn'>Logga in</button>
            <button onClick={loginGuest} className='guest-btn'>Fortsätt som gäst</button>
        </div>
      </form>
    </section>
  </div>
  )
}

export default NotLoggedIn