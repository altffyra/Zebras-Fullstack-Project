import { FormEvent } from "react";
import { MenuItems } from "../models/types";
import "../styles/_adminmenu.scss";
import AdminMenuItem from "./AdminMenuItem";

type Props = {
  menu: MenuItems[];
  type: string;
  toggleMenu: (e: FormEvent) => void;
};

const AdminMenu = (props: Props) => {
  const menuItem = props.menu.map((item) => (
    <AdminMenuItem item={item} key={item.name} toggleMenu={props.toggleMenu} />
  ));

  return (
    <section className="menu-list">
      <p className="list-header">{props.type}</p>
      {menuItem}
    </section>
  );
};

export default AdminMenu;
