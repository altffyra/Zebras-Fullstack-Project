import React from 'react'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { actions as userActions } from '../features/userReducer'
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../models/types'
import '../styles/_userForm.scss'
import formLogo from '../assets/formLogo.svg'




  const LoginView = () => {
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
    <div className='userForm'>
      {loading ? 
            <div className='loading'></div>
            : ''
        }
       <button className='small__btn' onClick={()=>navigate(-1)}>Tillbaka</button>
      <figure className='form__logo'>
        <img src={ formLogo } alt="logo" />
      </figure>
      <form className='form' onSubmit={() => console.log('loggain')}>
      <div>
          <label className='form__label' htmlFor="username">Användarnamn</label>
          <input className='form__input' type="text" name='username' required onChange={(e)=> {handleName(e)}} />
        </div>
        <div>
          <label className='form__label' htmlFor="password">Lösenord</label>
          <input className='form__input' type="password" name="password" required onChange={(e)=>{handlePassword(e)}} />
        </div>
        <p>Inget konto? <a href="/SignUp"> Skapa </a></p>
        <div>
            <button type="submit" className='big__btn login__btn'>Logga in</button>
        </div>
      </form>
    </div>
  )
}

export default LoginView