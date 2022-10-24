import { MenuItems } from "../models/types";
import vector from '../assets/menu/vector.svg';
import allergy from '../assets/menu/allergy.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CartItems } from '../models/types';
import {actions as cartActions} from '../features/cartReducer';
import { useDispatch } from 'react-redux';


type Props = {
    // allergy: string;
    // vector: string;
    // foodTopic: string;
    item: MenuItems
}

const MenuItem = ({ item }: Props) => {

    const [tabbed, setTabbed] = useState<boolean>(false);
    const dispatch = useDispatch();

    //const cartItems: CartItems[] = useSelector((state: RootState) => state.cart);

    const AddItemToCart = () => {
      const cartObject: CartItems = {
        name: item.name,
        price: item.price,
        amount: 1
      }
      dispatch(cartActions.addToCart(cartObject));
    }


    const tabFood = () => {
      setTabbed(!tabbed);
    }

    return (
        <section className="menu-item">
          <section className="menu-item--info">

            <section className="menu-item--left">
              <section className="menu-item--flex">
                <p>{item.name} {item.allergies ?
                <img src={allergy} alt="" />
                : ''
              }</p>
              </section>
              <p>{item.price} kr</p>
            </section>

            <section className="menu-item--right">
              <p className="menu-item--add" onClick={AddItemToCart} >+</p>
            </section>

          </section>

          <section className="menu-item--vector" onClick={ tabFood }>

            { tabbed ? 
            <section className="tab-container">
              <p className="desc">{ item.desc }</p>
              {item.allergies ? <p className="allergies">Allergener: { item.allergies }</p>
              : '' }
              </section>
               : '' }

            <section className="menu-item--img">
              { tabbed ? <img className="rotated" src={vector} alt="" /> :  <img src={vector} alt="" />}
            </section>

          </section>

        </section>

        
    )
}

export default MenuItem;