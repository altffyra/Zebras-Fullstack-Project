import React from 'react'
import '../styles/_notloggedin.scss'

type Props = {}

const NotLoggedIn = (props: Props) => {

    event?.preventDefault()

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
            <button className='guest-btn'>Fortsätt som gäst</button>
        </div>
      </form>
    </section>
  </div>
  )
}

export default NotLoggedIn