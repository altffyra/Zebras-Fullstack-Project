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

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { CartProps } from '../../models/Interface';
// import {actions as cartActions} from '../../features/cartReducer';

type Props = {}

const Menu = (props: Props) => {

  const appertizerTopic = "FÖRRÄTT";
  const appertizerImg = appertizer;
  const vegTopic = "VEGETARISKT";
  const vegImg = veg;
  const dessTopic = "DESSERT";
  const dessImg = dessert;

  const cart: CartProps = useSelector((state: RootState) => state.cart);

  return (
    <div className="menu-wrapper">

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

      < MenuTopic topic={appertizerTopic} foodImg={appertizerImg}/>

      <section className="menu-header--container">
        <figure className="menu-header--info">
          <img src={mainmeal} alt="" />
          <section className="menu-header--text">
            <section className="menu-header--flex">
              <h1>HUVUDRÄTTER</h1>
            </section>
          </section>
        </figure>

        <section className="menu-title--text">
          <h2 className="menu-title--margin">KÖTT</h2>
        </section>
        <MenuItem vector={vector} allergy={ allergy } foodTopic={ "kött-namn" }/>

        <section className="menu-title--text">
          <h2 className="menu-title--margin"> FISK</h2>
        </section>
        <MenuItem vector={vector} allergy={ allergy } foodTopic={ "fisk-namn" }/>
        <MenuItem vector={vector} allergy={ allergy } foodTopic={ "fisk-namn" }/>


        <section className="menu-title--text">
          <h2 className="menu-title--margin">FÅGEL</h2>
        </section>
        <MenuItem vector={vector} allergy={ allergy } foodTopic={ "fågel-namn" }/>
      </section>

      < MenuTopic topic={vegTopic} foodImg={vegImg}/>
      < MenuTopic topic={dessTopic} foodImg={dessImg}/>
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