import MenuItem from './MenuItem';
import vector from '../assets/menu/vector.svg';
import allergy from '../assets/menu/allergy.svg';

type Props = {
    foodImg: string;
    topic: string;
}

const MenuTopic = ({ foodImg, topic }: Props) => {

    const vectorImg = vector;
    const allergyImg = allergy;

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

            < MenuItem allergy={ allergyImg } vector={ vectorImg } foodTopic={topic}/>

        </section>
    )
}

export default MenuTopic;