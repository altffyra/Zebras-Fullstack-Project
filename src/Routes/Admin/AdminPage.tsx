import appertizer from '../../assets/menu/appertizer.svg';
import '../../styles/_handleOrder.scss';
import AdminOrderAccordian from '../../components/AdminOrderAccordian';
import { Order } from '../../models/types';
import { ChangeEvent, useEffect, useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom'
import { actions as orderActions } from "../../features/orderReducer";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import locked from '../../assets/locked.png';
import unlocked from '../../assets/unlocked.png';
import { actions as userActions } from "../../features/userReducer";

const AdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const foodImg = appertizer;

    const [ loading, setLoading ] = useState<boolean>(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchId, setSearchId] = useState<string>("");
    const [searchError, setSearchError] = useState<boolean>(false);
    const [found, setFound] = useState<Order | undefined>();
    
    let checkId: string | null = localStorage.getItem('accountId');
    let finishedOrders: Order[] = [];
    let activeOrders: Order[] = [];
    let notPickedUpOrders: Order[] = [];

    const updateAllOrders:(orders: Order[]) => void = (orders) => {
      setOrders(orders)
    }

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

                if(data.error) {

                  navigate('/')
                  
                } else {
                  setLoading(true);
                  dispatch(orderActions.getOrders(data));
                  setOrders(data);

                }
            } 
        }
        getOrders();
        
    }, []);

  if (orders !== undefined) {
    activeOrders = orders.filter((order) => !order.completed && !order.locked);
    notPickedUpOrders = orders.filter((order) => order.locked && !order.completed);
    finishedOrders = orders.filter((order) => order.completed);

  }

  const handleLogout: () => void = () => {
    localStorage.removeItem('accountId')
    dispatch(userActions.logOut())
    navigate('/')
  }

  const searchOrder: () => void = () => {
    if (searchId.length <= 1) {
      return;
    }
    setFound(undefined)

    setSearchError(false)
    const foundOrder: Order | undefined = orders.find(order => order.id == searchId)
    if(foundOrder) {
      setFound(foundOrder)
    } else {
      setSearchError(true)
    }
  };

  const handleInput: (e: ChangeEvent<HTMLInputElement>) => void = (e) => {
    setSearchId(e.target.value);
  };

  const handleEnter: (e: KeyboardEvent) => void = (e) => {
    if (e.key == "Enter") {
      searchOrder();
    }
  };

  return (
    <div className="admin_page--wrapper">
        {loading ? <div className="loading"></div> : ""}

        <section className="menu-header" style={{'backgroundImage':`url(${foodImg})`}}>
            <h1>ADMINISTRATION </h1>
        </section>

        <button className='admin-buttonSmall' onClick={handleLogout}>Logga ut </button>

        <div className="search-container">
            <input type="text" name="search" id="search-user" placeholder="Sök ordernummer" onKeyUp={(e) => handleEnter(e)} onChange={(e) => handleInput(e)}/>
            <label htmlFor="search" onClick={searchOrder}>SÖK</label>
        </div>
            {searchError ? <p>Ingen order hittades på det ordernumret.</p> : ""}
            {found ? 
              <div className='search-order'>
                <p onClick={(() => navigate(`/AdminOrder/${found.id}`))}>Order {found.id}</p>
                {found.locked ?
                 <img src={locked} alt="locked icon" />
                
                :
                  <img src={unlocked} alt="unlocked icon" />
                }
              </div>
            : ''}
        <section className="user-orders">
            < AdminOrderAccordian  orderType={'Ohanterade'} orders={ activeOrders } updateAllOrders={ updateAllOrders }/> 
            < AdminOrderAccordian  orderType={'Ej hämtade'} orders={ notPickedUpOrders } updateAllOrders={ updateAllOrders }/> 
            < AdminOrderAccordian  orderType={'Avslutade'} orders={ finishedOrders } updateAllOrders={ updateAllOrders }/> 
        </section>

    </div>
  );
};

export default AdminPage;
