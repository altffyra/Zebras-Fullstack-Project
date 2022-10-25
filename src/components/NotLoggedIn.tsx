import React from 'react'
import '../styles/_userForm.scss'
import '../styles/_checkout.scss'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { actions as userActions } from '../features/userReducer'
import { useSelector, useDispatch } from 'react-redux';

type Props = {}

const NotLoggedIn = (props: Props) => {

  const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')

    const navigate = useNavigate()


    async function userLogin() {
      setLoading(true)

      let userCreds = {
        name: userName,
        password: userPassword
      }

      const response = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        body: JSON.stringify(userCreds),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json();
      console.log('response data: ', data)
      if( data.success ) {
            setLoading(false);
            dispatch(userActions.setUser(data.user))
            localStorage.setItem('accountId', JSON.stringify(data.user.accountId))
            if( data.user.admin) {
              navigate('/AdminPage')
            }
      } else {
        setLoading(false)
        
      }

    }

    const handleName: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      if( e.target.value !== ' ') {
        setUserName(e.target.value);
      }
    };
    const handlePassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      setUserPassword(e.target.value);
    };

    const handleSubmit: (e: FormEvent) => void = (e) => {
      e.preventDefault();
      userLogin();
    }

  return (
    <div className='login--checkout'>
      <form className='userForm' onSubmit={() => console.log('loggain')}>
        <div>
          <input className='form__input' placeholder=' ' type="text" name='username' required onChange={(e)=> {handleName(e)}} />
          <label className='form__label form__label--info' htmlFor="username">Användarnamn</label>
        </div>
        <div>
          <input className='form__input' placeholder=' ' type="password" name="password" required onChange={(e)=>{handlePassword(e)}} />
          <label className='form__label form__label--info' htmlFor="password">Lösenord</label>
        </div>
        <p>Inget konto? <a href="/SignUp"> Skapa </a></p>
        <div className='button__container'>
          <button className='big__btn login__btn' onClick={(e)=>{handleSubmit(e)}}>Logga in</button>
          <button className='big__btn guest__btn'>Fortsätt som gäst</button>
        </div>
      </form>
  </div>
  )
}

export default NotLoggedIn