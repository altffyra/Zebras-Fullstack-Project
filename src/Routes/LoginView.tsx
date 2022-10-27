import React from 'react'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { actions as userActions } from '../features/userReducer'
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../models/types'
import '../styles/_userForm.scss'
import formLogo from '../assets/formLogo.svg'
import Alert from '../components/Alert'
import "../styles/_alert.scss";




  const LoginView = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('')
    const [userPassword, setUserPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<boolean>(false)

    const navigate = useNavigate()

    const [errorElement, showError] = useState<boolean>(false)
    const [errorMessages, makeError] = useState({title:"" ,message:""})
    const showAlert = errorElement? <Alert errorTitle={errorMessages.title}  errorMessage={errorMessages.message} showError={showError}/>:"";
    let tempObject = {title:"" ,message:""}

    async function userLogin() {
      setLoading(true)

      

      let userCreds = {
        name: userName,
        password: userPassword
      }
      if (userCreds.name == '' || userCreds.password== ''){
        tempObject.title = "Inga personuppgifter"
        tempObject.message = "Kan inte logga in utan personuppgifer"
        makeError(tempObject)
        showError(true)
        setLoading(false)
        return
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
            navigate('/menu')
      } else {
        setLoading(false)
        setErrorMsg(true)
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
    <div className='login'>
      {loading ? 
            <div className='loading'></div>
            : ''
        }
       <button className='small__btn' onClick={()=>navigate(-1)}>Tillbaka</button>
      <figure className='form__logo'>
        <img src={ formLogo } alt="logo" />
      </figure>
      <form className='userForm'>
        <div>
          <input className='form__input' placeholder=' ' type="text" name='username' required onChange={(e)=> {handleName(e)}} />
          <label className='form__label form__label--info' placeholder=' ' htmlFor="username">Användarnamn</label>
        </div>
        <div>
          <input className='form__input' placeholder=' ' type="password" name="password" required onChange={(e)=>{handlePassword(e)}} />
          <label className='form__label form__label--info' placeholder=' ' htmlFor="password">Lösenord</label>
        </div>
        <p>Inget konto? <a href="/SignUp"> Skapa </a></p>
        <div>
          <button className='big__btn login__btn' onClick={(e)=>{handleSubmit(e)}}>Logga in</button>
        </div>
      </form>
      {errorMsg ? 
        <p>Inloggning misslyckades</p>
        : ''
      }
      {showAlert}
    </div>
  )
}

export default LoginView