import React from 'react'
import { useState, ChangeEvent, FormEvent } from 'react';
import { User } from '../../models/Interface';
import '../../styles/signUp.scss'
import { v4 as uuid } from 'uuid';

type Props = {}

const SignUp = (props: Props) => {

  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');


  const handleSubmit: (e: FormEvent) => void = (e) => {
    e.preventDefault();
    addUser();
  }

  async function addUser() {
    const newUser: User = {
      name: userName,
      email: userEmail,
      accountId: uuid(),
      phoneNumber: userPhone,
      admin: false
    }
    const response = await fetch('http://localhost:/user/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json();
    console.log(data)
  }

  

  const handleName: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      setUserName(e.target.value);
  };

  const handleEmail: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      setUserEmail(e.target.value);
  };

  const handlePassword: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      setUserPassword(e.target.value);
  };

  const handlePhone: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
      setUserPhone(e.target.value);
  };



  return (
    <div className='signUp'>
      <button className='smallBtn'>Tillbaka</button>
      <section className="flex-container">
        <figure></figure>
        <form>
          <label htmlFor="username">Användarnamn</label>
          <input type="text" name='username' onChange={(e)=> {handleEmail(e)}} />
          <label htmlFor="password">Lösenord</label>
          <input type="password" name="password" onChange={(e)=>{handlePassword(e)}} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={(e)=>{handleEmail(e)}} />
          <button type="submit" className='bigBtn'>Skapa konto</button>
        </form>
      </section>
    </div>
  )
}

export default SignUp

