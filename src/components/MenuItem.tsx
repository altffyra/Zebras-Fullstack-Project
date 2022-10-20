import { MenuItems } from "../models/types";
import vector from '../assets/menu/vector.svg';
import allergy from '../assets/menu/allergy.svg';
import { useState } from 'react';

type Props = {
    // allergy: string;
    // vector: string;
    // foodTopic: string;
    item: MenuItems
}

const MenuItem = ({ item }: Props) => {

    const [tabbed, setTabbed] = useState<boolean>(false);


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
              <p>Pris: {item.price}</p>
            </section>

            <section className="menu-item--right">
              <p className="menu-item--add">+</p>
            </section>

          </section>

          <section className="menu-item--vector" onClick={ tabFood }>

            { tabbed ? 
            <section className="tab-container">
              <p>Beskrivning:</p>
              <section>{ item.desc }</section>
              <p>Allergier:</p>
              <section>{ item.allergies }</section>
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