import MenuItem from './MenuItem';
import MenuMainCourse from './MenuMainCourse';
import { MenuItems } from '../models/Interface';

type Props = {
    foodImg: string;
    topic: string;
    menuArray: MenuItems[]
}

const MenuTopic = ({ foodImg, topic, menuArray }: Props) => {

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
                    <MenuMainCourse menuArr={menuArray} type={'Kött'} />
                    <MenuMainCourse menuArr={menuArray} type={'Fisk'}/>
                    <MenuMainCourse menuArr={menuArray} type={'Fågel'}/>
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