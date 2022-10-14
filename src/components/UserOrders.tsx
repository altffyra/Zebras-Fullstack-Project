import '../styles/_userOrders.scss';
import dropArrowLight from '../assets/dropDownLight.svg';
import { Order } from '../models/Interface';
import SingleUserOrders from './SingleUserOrder';
import { useState } from 'react';

type UserOrdersProps = {
    orders: Order[];
}

const UserOrders = (props: UserOrdersProps) => {
    const [dropActive, setDropActive] = useState<boolean>(false);

    const handleDropDown: () => void = () => {
        setDropActive(!dropActive);
    };

    const cssActive = dropActive ? 'active' : '';

    const activeOrders: Order[] = props.orders.filter(order => order.completed != true);
    const completedOrders: Order[] = props.orders.filter(order => order.completed == true);

    const activeOrdersEl = activeOrders.map(order => <SingleUserOrders order={order} />);
    const completedOrdersEl = completedOrders.map(order => <SingleUserOrders order={order} />);

    return (
      <section className="user-orders">
        <div className="headline">
            <h1>Mina Ordrar</h1>
        </div>
        <div className='orderlist' onClick={handleDropDown}>
            <div className="accordian-header">
                <h2>Aktiva</h2>
                <img src={dropArrowLight} className={cssActive+'-icon'} alt="drop down icon" />
            </div>
            <div className={cssActive + ' dropdown'}>
                {activeOrdersEl}
            </div>
        </div>
        <div className='orderlist' onClick={handleDropDown}>
            <div className="accordian-header">
                <h2>Tidigare</h2>
                <img src={dropArrowLight} className={cssActive+'-icon'} alt="drop down icon" />
            </div>
            <div className={cssActive + ' dropdown'}>
                {completedOrdersEl}
            </div>
        </div>
      </section>
    )
  }
  
  export default UserOrders