import React, { ChangeEvent, useState , useEffect, FormEventHandler, FormEvent } from "react";
import Nav from "../../components/Nav";
import mainmeal from "../../assets/menu/mainmeal.svg";
import "../../styles/_checkout.scss";
import NotLoggedIn from "../../components/NotLoggedIn";
import { useSelector, useDispatch} from "react-redux";
import { RootState } from "../../store";
import { CartProps, MenuItems, User, Order } from "../../models/types";
import { useNavigate } from "react-router-dom";
import { actions as orderActions } from "../../features/orderReducer";
import { actions as setTempOrder } from "../../features/tempOrderReducer";
import { actions as userActions} from "../../features/userReducer";

type Props = {};

const CheckOut = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [userMessage, setMessage] = useState<string>('');
  const [orderLocked, setOrderLocked] = useState<boolean>(false);

  const user: User = useSelector((state: RootState) => state.user);
  const cart: CartProps = useSelector((state: RootState) => state.cart);
  const tempOrder: Order[] = useSelector((state: RootState) => state.tempOrder);

  const cartItemEl = cart.cartItems.map((item, index) => (
    <div key={item.name} className="cartmodule">
      <div  className="cart-item">
        <p className="item-name">{item.name}</p>{" "}
        <p className="item-amount">{item.amount} st</p> {" "}
        <p className="item-price">{item.price} kr</p>{" "}
      </div>
      <div className="divider"></div>
    </div>
  ));
 

    const [userCredentials, setUser] = useState<User>({
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    accountId:user.accountId
  })
 
const orderCheck:Boolean =  tempOrder.length> 0 ? true :false 

useEffect(() => {
  if(orderCheck){
    
    setUser(tempOrder[0].user)
    if(tempOrder[0].userComment) {
      console.log('hej');
      setMessage(tempOrder[0].userComment)
    }
  } else {
    setUser(user)
  }

}, [])

console.log(user);



async function updateOrder(e:FormEvent) {
  e.preventDefault();
  setOrderLocked(false)

  if(userCredentials.name.length < 1 || userCredentials.email.length < 1 || userCredentials.phoneNumber.length < 1) {
    return
  }
  const updatedOrder:Order = {
    cart: cart,
    user: userCredentials,
    orderPlaced: tempOrder[0].orderPlaced,
    orderCompleted: tempOrder[0].orderCompleted, 
    id: tempOrder[0].id,
    userComment: userMessage,
    adminComment: tempOrder[0].adminComment,
    locked: tempOrder[0].locked,
    completed: tempOrder[0].completed
  }   
    const tempOrderId = tempOrder[0].id
    const response = await fetch(`/api/order/${tempOrderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });
    console.log(response)
    const datasave = await response.json();
    console.log(datasave.locked);
    if (datasave.locked){
      
      setOrderLocked(true)
      
    } else {
      dispatch(orderActions.makeOrders(datasave));
      navigate("/OrderConfirm");

    }
  
}

  async function sendOrder(e:FormEvent) {
    e.preventDefault();
    if(userCredentials.name.length < 1 || userCredentials.email.length < 1 || userCredentials.phoneNumber.length < 1) {
      return
    }
      let data = {
        cart: cart,
        user: userCredentials,
        userComment: userMessage,
      };


      const response = await fetch("/api/order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const datasave = await response.json();
      console.log(datasave.user);
      
      dispatch(orderActions.makeOrders(datasave));
      navigate("/OrderConfirm");

    } 
  

  function changeCredentials(e: ChangeEvent<HTMLInputElement>) {
    console.log(userCredentials)
    setUser({
      ...userCredentials,
      [e.target.name]: e.target.value
     
    })      
  }

  function changeMessages(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.target.value);
  }



  function backBtn(){
    navigate("/Menu")
  }

  const notLoggedInElem =
    user.accountId == "" ? (
      <NotLoggedIn setUser={setUser} />
    ) : (
      <form className="LoggedIn">
        <div className="Account-info">
          <div className="Account-top">
            <p className="Account-top-p">Mina uppgifter</p>
          </div>
          <div className="Account-info-main">
            <p className="User-info">Namn: <input name="name" value={userCredentials.name} required onChange={(e) => changeCredentials(e)}></input></p>
            <div className="divider"></div>
            <p className="User-info">E-post: <input name="email" value={userCredentials.email} required onChange={(e) => changeCredentials(e)}></input></p>
            <div className="divider"></div>
            <p className="User-info">Telefonnummer: <input type="number" name="phoneNumber" required value={userCredentials.phoneNumber} onChange={(e) => changeCredentials(e)}></input></p>
          </div>
        </div>
        <div className="Comment-wrapper">
          <div className="Comment-top">
            <p className="Comment-top-p">Kommentar</p>
          </div>
          <textarea
            onChange={(e) => changeMessages(e)}
            value={userMessage}
            className="input-comment"
            placeholder="Är det något vi behöver veta? Här kan du lämna en kommentar till personalen."
          ></textarea>
        </div>
        <div className="buttonsDiv">
          <button type="submit" onClick={backBtn} className="back-btn">Tillbaka </button>
          { orderCheck? (<button onClick={updateOrder} className="order-btn">
            Updatera{" "}
          </button>): <button type="submit" onClick={sendOrder} className="order-btn">
            Beställ{" "}
          </button> } 

        </div>
      </form>
    );

  return (
    <main>
      <Nav />
      {orderLocked ?
        <p>DEN ÄR LÅST HAHAHAH too slow</p>
        : ''
      }
      <div className="checkout-wrapper">
        <figure className="checkout-header--info">
          <img src={mainmeal} alt="" />

          <section className="checkout-header--text">
            <h1>Kassa</h1>
          </section>
        </figure>

        <section className="current-order">
          <section className="order-top"> Order</section>
          {cartItemEl}
          <section className="total-wrapper">
            <p className="total">Totalt:</p>{" "}
            <p className="total-sum">{cart.totalPrice} kr.</p>
          </section>
        </section>

        {notLoggedInElem}
      </div>
    </main>
  );
};

export default CheckOut;
