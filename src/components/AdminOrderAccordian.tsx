import { Order } from '../models/types';
import { useState } from 'react';
import dropArrowLight from '../assets/dropDownLight.svg';
import AdminSingleUserOrders from './AdminSingleUserOrder';
import symbol_green from '../assets/order_symbol--green.svg';
import symbol_orange from '../assets/order_symbol--orange.svg';
import symbol_red from '../assets/order_symbol--red.svg';

type UserOrderAccordian = {
    orderType: string;
    orders: Order[];
    updateAllOrders: (orders: Order[]) => void;
}

const UserOrderAccordian = (props: UserOrderAccordian) => {
    const [dropActive, setDropActive] = useState<boolean>(true);
    const cssActive = dropActive ? 'active' : '';

    const ordersEl = props.orders.map(order => <AdminSingleUserOrders key={order.id} order={order} updateAllOrders={ props.updateAllOrders }/>);

    const handleDropDown: () => void = () => {
        setDropActive(!dropActive);
    };

    let symbol_img = '';
    if (props.orderType === 'Ohanterade') {
        symbol_img = symbol_green;
    } else if (props.orderType === 'Ej hämtade' ) {
        symbol_img = symbol_orange;
    } else if (props.orderType === 'Avslutade' ) {
        symbol_img = symbol_red;
    }

    return (
        <div className='orderlist'>
            <div className="accordian-header" onClick={handleDropDown}>
                <h2>{props.orderType}</h2>
                <img className="order-symbol" src={ symbol_img } alt="" />
                <img src={dropArrowLight} className={cssActive+'-icon'} alt="drop down icon" />
            </div>
            <div className={cssActive + ' dropdown'}>
                {props.orders.length > 0 
                ? 
                    ordersEl
                : 
                    'No orders'
                }
            </div>
        </div>
    )
  }
  
  export default UserOrderAccordian