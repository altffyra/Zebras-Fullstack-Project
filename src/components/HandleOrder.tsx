import appertizer from '../assets/menu/appertizer.svg';
import '../styles/_handleOrder.scss';
import UserOrderAccordian from './UserOrderAccordian';
import { Order } from '../models/types';
import { useEffect, useState } from 'react';


type Props = {}

const HandleOrder = (props: Props) => {

    const foodImg = appertizer;

    const [orders, setOrders] = useState<Order[]>();
    
    let checkId: string | null = localStorage.getItem('accountId');
    let activeOrders: Order[] = [];
    let finishedOrders: Order[] = [];

    async function getOrders() {
        if (checkId === 'null') {
            return
        } else {
            const response = await fetch('api/order/admin/orders',
            {
                headers: {
                    "accountID": `${checkId}`
                }
            });
            const data = await response.json();     
            setOrders(data);
        } 
    }

    if (orders !== undefined) {
        activeOrders = orders.filter(order => !order.completed);
        //  ON HOLD:                const notPickedUp: Order[] | undefined = orders?.filter(order => ??? );
        finishedOrders = orders.filter(order => order.completed);
    }




  return (
    <div className="admin_page--wrapper">
        <div className="menu-wrapper">
            <section className="menu-header" style={{'backgroundImage':`url(${foodImg})`}}>
                <h1>ADMINISTRATION: </h1>
            </section>
        </div>

        <div className="admin_button--container">
            <button className='admin-buttonSmall'>Logga ut </button>
        </div>

        <section className="user-search">
            <div className="search-container">
                <input type="text" name="search" id="search-user" placeholder="Sök ordernummer" />
                <label htmlFor="search" >SÖK</label>
            </div>
        </section>
        <button onClick={ getOrders }>hej</button>

        < UserOrderAccordian orderType={'Ohanterade'} orders={activeOrders}/>
        {/* ON HOLD:   < UserOrderAccordian orderType={'Ej hämtade'} orders={notPickedUp}/>*/}
        < UserOrderAccordian orderType={'Avslutade'} orders={finishedOrders}/>

        <div className='informationTitles'> <p>Order</p> <p>Info</p> </div>
        <article >
            <div className='classification'> 
                <h1>Ohanterade</h1> 
                <div className='dot-green'></div>  
            </div>
            Här mappas ohanterade ut
        </article>

        <article >
            <div className='classification'> 
                <h1>Ej hämtade</h1> 
                <div className='dot-orange'></div>  
            </div>
            Här mappas hanterade ut
        </article>

        <article >
            <div className='classification'> 
                <h1>Avslutade</h1> 
                <div className='dot-red'></div>  
            </div>
            Här mappas avslutade ut
            
        </article>




    </div>
  )
}

export default HandleOrder