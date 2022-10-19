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
            <label htmlFor="username">Användarnamn</label>
            <input type="text" name='username' onChange={() => console.log('namn')} />
        </div>
        <div>
            <label htmlFor="password">Lösenord</label>
            <input type="password" name="password" onChange={() => console.log('lösen')} />
        </div>
        <p>Inget konto? <a href=""> Skapa </a></p>
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