import '../../styles/_adminorder.scss';
import { useParams } from 'react-router-dom';
import { User, Order, CartProps } from '../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import CartItem from '../../components/CartItem';
import { ChangeEvent, useEffect, useState } from 'react';
import {actions as cartActions} from '../../features/cartReducer';
import locked from '../../assets/locked.png';



type MyParams = {
  id: string;
};
type UpdatedItemProps = {
  name: string;
  amount: number;
}


const AdminOrder = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phoneNumber: '',
    accountId: ''
  });

  const { id } = useParams<keyof MyParams>() as MyParams;
  const dispatch = useDispatch();

  let order:Order | undefined = useSelector((state: RootState) => state.orders.find(order => order.id === id));
  console.log(order);
  let cart:CartProps | undefined = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (order?.cart) {
      dispatch(cartActions.clearCart());
      dispatch(cartActions.changeOrder(order?.cart));
      setUser(order.user)
    }
  }, [])

  const handleAmount: (e:ChangeEvent<HTMLSelectElement>, itemName: string) => void = (e, itemName) => {

    const updatedItem: UpdatedItemProps = {
        name : itemName,
        amount : parseInt(e.target.value)
    }        

    dispatch(cartActions.updateAmount(updatedItem));
}
  const cartItemEl = cart.cartItems.map((item, index) => <CartItem item={item} key={index} handleAmount={handleAmount} />);
  

  return (
    <section>
      <div>
        <button>Tillbaka</button>
        {order?.locked ? <img src={locked} alt="" /> : ''}
      </div>
      <h1>Order {order?.id}</h1>
      <div>
        <h3>Maträtt</h3>
        {cartItemEl}
        {cart.totalPrice}
      </div>

      <div>
        <p>Beställare</p>
        <div>
          <label htmlFor="">Namn</label>
          <input type="text" name="" id="" value={user.name}/>
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" name="" id="" value={user.email} />
        </div>
        <div>
          <label htmlFor="">Tel.nr</label>
          <input type="text" name="" id="" value={user.phoneNumber} />
        </div>
      </div>

      <div>
        <h2>Kundkommentar</h2>
        <textarea name="" id="" readOnly value={order?.userComment}></textarea>
      </div>

      <div>
        <p>Lägg kommentar till kocken?</p>
        <textarea name="admin-comment" id="admin-comment"></textarea>
      </div>

      <button>Lås & skicka</button>
    </section>
  )
}


export default AdminOrder