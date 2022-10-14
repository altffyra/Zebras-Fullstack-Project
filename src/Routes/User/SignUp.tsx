import React from 'react'
import '../../styles/signUp.scss'


type Props = {}

const SignUp = (props: Props) => {


  return (
    <div className='signUp'>
      <button className='smallBtn'>Tillbaka</button>
      <section className="flex-container">
        <figure></figure>
        <form>
          <label htmlFor="username">Användarnamn</label>
          <input type="text" name='username' />
          <label htmlFor="password">Lösenord</label>
          <input type="password" name="password" />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" />
          <button type="submit" className='bigBtn'>Skapa konto</button>
        </form>
      </section>
    </div>
  )
}

export default SignUp