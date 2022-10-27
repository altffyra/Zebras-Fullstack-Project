import appertizer from '../../assets/menu/appertizer.svg';
import '../../styles/_handleOrder.scss';
import AdminOrderAccordian from '../../components/AdminOrderAccordian';
import { Order } from '../../models/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const AdminPage = () => {
    const navigate = useNavigate();
    const foodImg = appertizer;

    const [ loading, setLoading ] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>();
    
    let checkId: string | null = localStorage.getItem('accountId');
    let finishedOrders: Order[] = [];
    let activeOrders: Order[] = [];
    let notPickedUpOrders: Order[] = [];

    useEffect(() => {
        async function getOrders() {
            if (checkId === 'null') {
                return
            } else {
                setLoading(true)
                const response = await fetch('api/order/admin/orders',
                {
                    headers: {
                        "accountID": `${checkId}`
                    }
                });
                const data = await response.json();     
                setLoading(true)
                // dispatcha ordrar
                setOrders(data);
            } 
        }
        getOrders();
        
    }, []);

  if (orders !== undefined) {
    activeOrders = orders.filter((order) => !order.completed);
    notPickedUpOrders = orders.filter((order) => order.locked && !order.completed);
    finishedOrders = orders.filter((order) => order.completed);

  }

  const handleLogout: () => void = () => {
    localStorage.removeItem('accountId')
    navigate('/')
}

  return (
    <div className="admin_page--wrapper">
        {loading ? <div className="loading"></div> : ""}

        <section className="menu-header" style={{'backgroundImage':`url(${foodImg})`}}>
            <h1>ADMINISTRATION </h1>
        </section>

        <button className='admin-buttonSmall' onClick={handleLogout}>Logga ut </button>

        <div className="search-container">
            <input type="text" name="search" id="search-user" placeholder="Sök ordernummer" />
            <label htmlFor="search" >SÖK</label>
            {/* state för ta emot 
                funktion att söka och visa hittad
              */}
        </div>
        <section className="user-orders">
            < AdminOrderAccordian  orderType={'Ohanterade'} orders={ activeOrders }/> 
            < AdminOrderAccordian  orderType={'Ej hämtade'} orders={ notPickedUpOrders }/> 
            < AdminOrderAccordian  orderType={'Avslutade'} orders={ finishedOrders }/> 
        </section>

    </div>
  );
};

export default AdminPage;
