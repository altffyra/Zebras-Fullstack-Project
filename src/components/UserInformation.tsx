import '../styles/_userInformation.scss';
import { useDispatch } from 'react-redux';
import { User } from '../models/types';
import { useState, ChangeEvent, FormEvent } from 'react';
import {actions as userActions} from '../features/userReducer';

type UserInformationProps = {
    user : User;
}

const UserInformation = (props: UserInformationProps) => {
    const dispatch = useDispatch();

    const [update, setUpdate] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPhone, setUserPhone] = useState<string>('');


    const handleUpdate: () => void = () => {
        setUpdate(true);
    };

    const handleSubmit: (e: FormEvent) => void = (e) => {
        e.preventDefault();
        updateUser();
    }

    async function updateUser() {

        setLoading(true);
        const updatedUser: User = {
            name: userName,
            email: userEmail,
            phoneNumber : userPhone,
            accountId : props.user.accountId,
        };


        const response = await fetch(`/api/user/${props.user.accountId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        if (data.success) {
            setUpdate(false);
            setLoading(false);
            dispatch(userActions.setUser(updatedUser));           
        };
    };

    const handleName: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setUserName(e.target.value);
    };

    const handleEmail: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setUserEmail(e.target.value);
    };

    const handlePhone: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        setUserPhone(e.target.value);
    };

    const handleCancel: (e:FormEvent) => void = (e) => {
        e.preventDefault();
        setUpdate(false);
    };

    return (
      <section className='user-information'>
        {loading ? 
            <div className='loading'></div>
            : ''
        }
        <h2>Mina Uppgifter</h2>
        {!update 
            ?
            <section className='user-container'>
                <div className='user-info'>
                    <p>Namn : </p>
                    <p>{props.user.name}</p>
                </div>
                <div className='user-info'>
                    <p>Email : </p>
                    <p>{props.user.email}</p>
                </div>
                <div className='user-info'>
                    <p>Tel.nr : </p>
                    <p>{props.user.phoneNumber}</p>
                </div>
                <button className='change-btn' onClick={handleUpdate}>Ändra</button>
            </section>    
            
            :
            <form className='user-container' onSubmit={(e) => handleSubmit(e) }>
                <div className='user-info'>
                    <label htmlFor="username">Namn : </label>
                    <input type="text" name="username" id="username" defaultValue={props.user.name} onChange={(e) => handleName(e)} />
                </div>
                <div className='user-info'>
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" id="email" defaultValue={props.user.email} onChange={(e) => handleEmail(e)} />
                </div>
                <div className='user-info'>
                    <label htmlFor="username">Tel.nr : </label>
                    <input type="number" name="phonenum" id="phonenum" defaultValue={props.user.phoneNumber} onChange={(e) => handlePhone(e)} />
                </div>
                <div className="button-container">
                    <button className='cancel-btn' onClick={(e) => handleCancel(e)}>Avbryt</button>
                    <button type='submit' className='update-btn'>Uppdatera</button>
                </div>
            </form>
        }
      </section>
    )
  }
  
  export default UserInformation