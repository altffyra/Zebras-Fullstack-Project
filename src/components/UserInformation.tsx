import '../styles/_userInformation.scss';
import { useDispatch } from 'react-redux';
import { User } from '../models/Interface';
import { useState, ChangeEvent } from 'react';
import {actions as userActions} from '../features/userReducer';

type UserInformationProps = {
    user : User;
}

const UserInformation = (props: UserInformationProps) => {
    const dispatch = useDispatch();

    const [update, setUpdate] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [userUpdate, setUserUpdate] = useState<User>(props.user);


    const handleUpdate: () => void = () => {
        setUpdate(true);
    };



    async function updateUser() {

        setLoading(true);
        const updatedUser: User = {
            name: userUpdate.name,
            email: userUpdate.email,
            phoneNumber : userUpdate.phoneNumber,
            accountId : props.user.accountId,
        };
        
        const response = await fetch(`${props.user.accountId}`, {
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

    const handleInput: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
        const {name, value} = e.target;
                
        setUserUpdate(prevUserUpdate => ({...prevUserUpdate, [name]: value}) );
    };

    const handleCancel: () => void = () => {
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
                <button onClick={handleUpdate}>Ändra</button>
            </section>    
            
            :
            <form className='user-container'>
                <div className='user-info'>
                    <label htmlFor="username">Name : </label>
                    <input type="text" name="username" id="username" defaultValue={props.user.name} onChange={(e) => handleInput(e)} />
                </div>
                <div className='user-info'>
                    <label htmlFor="email">Email : </label>
                    <input type="email" name="email" id="email" defaultValue={props.user.email} onChange={(e) => handleInput(e)} />
                </div>
                <div className='user-info'>
                    <label htmlFor="username">Tel. nr : </label>
                    <input type="number" name="phonenum" id="phonenum" defaultValue={props.user.phoneNumber} onChange={(e) => handleInput(e)} />
                </div>
                <div className="button-container">
                    <button onClick={handleCancel}>Avbryt</button>
                    <button onClick={updateUser}>Uppdatera</button>
                </div>
            </form>
        }
      </section>
    )
  }
  
  export default UserInformation