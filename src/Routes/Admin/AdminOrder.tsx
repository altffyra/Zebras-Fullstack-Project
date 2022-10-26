import '../../styles/_adminorder.scss';
import { useParams } from 'react-router-dom';
import { User, Order, CartProps, MenuItems } from '../../models/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import CartItem from '../../components/CartItem';
import AdminMenu from '../../components/AdminMenu';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {actions as cartActions} from '../../features/cartReducer';
import {actions as menuActions} from '../../features/menuReducer';
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
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ adminComment, setAdminComment ] = useState<string>('');
  const [ orderLocked, setOrderLocked ] = useState<boolean>(false);
  const [ showMenu, setShowMenu ] = useState<boolean>(false);


  const { id } = useParams<keyof MyParams>() as MyParams;
  const dispatch = useDispatch();

  let order:Order | undefined = useSelector((state: RootState) => state.orders.find(order => order.id === id));
  let cart:CartProps | undefined = useSelector((state: RootState) => state.cart);
  let menu:MenuItems [] | undefined = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    if (order?.cart) {
      dispatch(cartActions.clearCart());
      dispatch(cartActions.changeOrder(order?.cart));
      setUser(order.user)
    }
    async function getMenu() {
      const response = await fetch('/api/menu');
      const data = await response.json();      
      dispatch(menuActions.getMenu(data));
    }
    getMenu();
  }, [])

const toggleMenu: (e:FormEvent) => void = (e) => {
  setShowMenu(!showMenu);
  e.preventDefault();
}
  

  const handleAmount: (e:ChangeEvent<HTMLSelectElement>, itemName: string) => void = (e, itemName) => {

    const updatedItem: UpdatedItemProps = {
        name : itemName,
        amount : parseInt(e.target.value)
    }        

    dispatch(cartActions.updateAmount(updatedItem));
}

function changeCredentials(e: ChangeEvent<HTMLInputElement>) {
  setUser({
    ...user,
    [e.target.name]: e.target.value 
  })
  console.log(user);
   
}

function makeAdminComment(e: ChangeEvent<HTMLTextAreaElement>) {
  setAdminComment(e.target.value )
  console.log(adminComment);
}
async function updateOrder(e:FormEvent) {
  e.preventDefault();

  if (cart) {

    setOrderLocked(false)
  
    if(user.name.length < 1 || user.email.length < 1 || user.phoneNumber.length < 1) {
      return
    }
    const updatedOrder:Order = {
      cart: cart,
      user: user,
      orderPlaced: order?.orderPlaced,
      orderCompleted: order?.orderCompleted, 
      id: order?.id,
      userComment: order?.userComment,
      adminComment: adminComment,
      locked: true,
      completed: order?.completed
    }   

    console.log(updatedOrder);
      const orderId = order?.id
      // const response = await fetch(`/api/order/${orderId}`, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(updatedOrder),
      // });
      // console.log(response)
      // const datasave = await response.json();
      // console.log(datasave.locked);
      // if (datasave.locked){
        
      //   setOrderLocked(true)
        
      // } else {
        // dispatch(orderActions.makeOrders(datasave));
        // navigate("/OrderConfirm");
  
      }
  // }

  
}
  const entreeArry = menu.filter(item => item.type == 'Förrätt')
  const vegArr = menu.filter(item => item.type == 'Veg')
  const mainCourseArr = menu.filter(item => item.type != 'Förrätt' && item.type != 'Veg' && item.type != 'Efterrätt')
  const desertArr = menu.filter(item => item.type == 'Efterrätt')


  const cartItemEl = cart.cartItems.map((item, index) => <CartItem item={item} key={index} handleAmount={handleAmount} />);
  

  return (
    <form>
      <div>
        <button>Tillbaka</button>
        {order?.locked ? <img src={locked} alt="" /> : ''}
      </div>
      <h1>Order {order?.id}</h1>
      <div>
        <h3>Maträtt</h3>
        {cartItemEl}
        <p>Totalt: {cart.totalPrice} kr</p>
      </div>
      <div>
        <button onClick={(e) => toggleMenu(e)}>Lägg till</button>
        {showMenu ? 
        <div>
          <AdminMenu menu={entreeArry} type='Förrätt'/>
          <AdminMenu menu={mainCourseArr} type='Huvudrätt'/>
          <AdminMenu menu={vegArr} type='Vegetariskt'/>
          <AdminMenu menu={desertArr} type='Efterrätt'/>
        </div>
        : ''
        }
      </div>
      <div>
        <p>Beställare</p>
        <div>
          <label htmlFor="">Namn</label>
          <input type="text" name="name" id="" value={user.name} onChange={(e) => changeCredentials(e)}/>
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="text" name="email" id="" value={user.email} onChange={(e) => changeCredentials(e)}/>
        </div>
        <div>
          <label htmlFor="">Tel.nr</label>
          <input type="number" name="phoneNumber" id="" value={user.phoneNumber} onChange={(e) => changeCredentials(e)} />
        </div>
      </div>

      <div>
        <h2>Kundkommentar</h2>
        <textarea name="" id="" readOnly value={order?.userComment}></textarea>
      </div>

      <div>
        <p>Lägg kommentar till kocken?</p>
        <textarea name="admin-comment" id="admin-comment" onChange={(e) => makeAdminComment(e)}></textarea>
      </div>

      <button type='submit' onClick={updateOrder}>Lås & skicka</button>
    </form>
  )
}


export default AdminOrder