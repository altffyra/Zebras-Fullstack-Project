import './Menu.scss';
import appertizer from '../../assets/menu/appertizer.svg';
import mainmeal from '../../assets/menu/mainmeal.svg';
import veg from '../../assets/menu/veg.svg';
import dessert from '../../assets/menu/dessert.svg';
import vector from '../../assets/menu/vector.svg';
import allergy from '../../assets/menu/allergy.svg';
import MenuTopic from '../../components/MenuTopic';
import MenuItem from '../../components/MenuItem';
import Cart from '../../components/Cart';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { CartProps, MenuItems } from '../../models/Interface';
import {actions as menuActions} from '../../features/menuReducer';
import Nav from '../../components/Nav';

type Props = {}

const Menu = (props: Props) => {
const dispatch = useDispatch();
  const appertizerTopic = "FÖRRÄTT";
  const appertizerImg = appertizer;
  const vegTopic = "VEGETARISKT";
  const vegImg = veg;
  const dessTopic = "DESSERT";
  const dessImg = dessert;

  useEffect(() => {
    async function getMenu() {
      const response = await fetch('http://localhost:8000/menu/');
      const data = await response.json();      
      dispatch(menuActions.getMenu(data.menu));

    }
    getMenu();
  }, []);

  const cart: CartProps = useSelector((state: RootState) => state.cart);
  const menu: MenuItems[] = useSelector((state: RootState) => state.menu);
  const entreeArry = menu.filter(item => item.type == 'Förrätt')
  const vegArr = menu.filter(item => item.type == 'Veg')
  const mainCourseArr = menu.filter(item => item.type != 'Förrätt' && item.type != 'Veg' && item.type != 'Efterrätt')
  const desertArr = menu.filter(item => item.type == 'Efterrätt')

  return (
    <div className="menu-wrapper">
      <Nav />
      <section className="menu-header--container">

        <figure className="menu-header--info">
          <img src={mainmeal} alt="" />
          <section className="menu-header--text">
            <section className="menu-header--flex">
              <h1>MENY</h1>
            </section>
          </section>
        </figure>

        <section className="menu-header--category">
          <h2>KÖTT</h2>
          <h2>FISK</h2>
          <h2>FÅGEL</h2>
        </section>
      </section>

      < MenuTopic topic={'Förrätt'} foodImg={appertizerImg} menuArray={entreeArry}/>
      < MenuTopic topic={'Huvudrätt'} foodImg={mainmeal} menuArray={mainCourseArr}/>
      < MenuTopic topic={'Vegetarisk'} foodImg={vegImg} menuArray={vegArr}/>
      < MenuTopic topic={'Efterrätt'} foodImg={dessImg} menuArray={desertArr}/>

      {cart.cartItems.length > 0 
      ?
        <Cart cart={cart}/>
      : 
        ''
      }
    </div>
  )
}

export default Menu