import { MenuItems } from "../models/types";
import MenuItem from "./MenuItem";

type Props = {
    menuArr: MenuItems[],
    type: string;
}

const MenuMainCouse = ({ menuArr, type }: Props) => {
    const filteredArray = menuArr.filter(item => item.type == type)
    const menuItems = filteredArray.map((item, index) => <MenuItem item={item} key={index}/>)

    return (
        <section>
            <h2 className="menu-subheader--text">{type}</h2>
            {menuItems}
        </section>
    )
}

export default MenuMainCouse;