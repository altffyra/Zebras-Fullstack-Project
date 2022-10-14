import '../../styles/_account.scss';
import UserInformation from '../../components/UserInformation';
import Nav from '../../components/Nav';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { User } from '../../models/Interface';

const Account = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const accountId = localStorage.getItem('accountId');
  //   if(!accountId) {
  //     navigate('/');
  //   }
  // }, [])
  
 const user:User = useSelector((state: RootState) => state.user);

  return (
    <section className='account-page'>
      <Nav />
      <div>
        <UserInformation user={user} />
      </div>
    </section>
  )
}

export default Account