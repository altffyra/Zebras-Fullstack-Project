import MenuItem from './MenuItem';
import MenuMainCouse from './MenuMainCourse';
import vector from '../assets/menu/vector.svg';
import allergy from '../assets/menu/allergy.svg';
import { MenuItems } from '../models/types';

type Props = {
    foodImg: string;
    topic: string;
    menuArray: MenuItems[]
}

const MenuTopic = ({ foodImg, topic, menuArray }: Props) => {

    const vectorImg = vector;
    const allergyImg = allergy;

    const menuItemsEl = menuArray.map((item, index) => <MenuItem item={item} key={index} />)
    


    return (
        <section className="menu-header--container">

            <figure className="menu-header--info">
            <img src={foodImg} alt="" />
            <section className="menu-header--text">
                <section className="menu-header--flex">
                <h1>{topic}</h1>
                </section>
            </section>
            </figure>
            {topic == 'Huvudrätt' ? 
                <>
                    <MenuMainCouse menuArr={menuArray} type={'Kött'} />
                    <MenuMainCouse menuArr={menuArray} type={'Fisk'}/>
                    <MenuMainCouse menuArr={menuArray} type={'Fågel'}/>
                </>
                : 
                <>
                    {menuItemsEl}
                </>
            }
            

        </section>
    )
}

export default MenuTopic;