import React, { useEffect } from 'react'
import { CartItems, MenuItems } from '../models/types';
import '../styles/_adminmenu.scss';
import AdminMenuItem from './AdminMenuItem';

type Props = {
    menu: MenuItems []
    type: string
}

const AdminMenu = (props: Props) => {


    const menuItem = props.menu.map(item => <AdminMenuItem item={item} key={item.name}/>)

    return (
        <section>
            <p>{props.type}</p>
            {menuItem}
        </section>
    )
}

export default AdminMenu

