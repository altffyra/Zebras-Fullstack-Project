import MenuItem from './MenuItem';
import MenuMainCourse from './MenuMainCourse';
import { MenuItems } from '../models/types';

type Props = {
    foodImg: string;
    topic: string;
    menuArray: MenuItems[]
}

const MenuTopic = ({ foodImg, topic, menuArray }: Props) => {

    const menuItemsEl = menuArray.map((item, index) => <MenuItem item={item} key={index} />)
    let cssId : string = ''
    
    if(topic == 'Förrätt') {
        cssId = 'entree'
    } else if(topic == 'Vegetarisk') {
        cssId = 'veg'
    } else if(topic == 'Efterrätt') {
        cssId = 'desert'
    }


    return (
        <section className="menu-header--container">
            <section className='menu-topic' style={{'backgroundImage':`url(${foodImg})`}}>
                <h1 id={cssId}>{topic}</h1>
            </section>
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