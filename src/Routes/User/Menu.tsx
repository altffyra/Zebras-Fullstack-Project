import "../../styles/_menu.scss";
import appertizer from "../../assets/menu/appertizer.svg";
import mainmeal from "../../assets/menu/mainmeal.svg";
import veg from "../../assets/menu/veg.svg";
import dessert from "../../assets/menu/dessert.svg";
import MenuTopic from "../../components/MenuTopic";
import Cart from "../../components/Cart";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { CartProps, MenuItems } from "../../models/types";
import { actions as menuActions } from "../../features/menuReducer";
import Nav from "../../components/Nav";
import { useDraggable } from "react-use-draggable-scroll"; 


const Menu = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const root:any = document.querySelector('#root');
        root.scrollIntoView({
        behavior: 'instant'
      });
    async function getMenu() {
      setLoading(true);
      const response = await fetch("/api/menu");
      const data = await response.json();
      dispatch(menuActions.getMenu(data));
      setLoading(false);
    }
    getMenu();

  }, []);

  const cart: CartProps = useSelector((state: RootState) => state.cart);
  const menu: MenuItems[] = useSelector((state: RootState) => state.menu);
  const entreeArry:MenuItems[] = menu.filter((item) => item.type == "Förrätt");
  const vegArr:MenuItems[] = menu.filter((item) => item.type == "Veg");
  const mainCourseArr:MenuItems[] = menu.filter(
    (item) =>
      item.type != "Förrätt" && item.type != "Veg" && item.type != "Efterrätt"
  );
  const desertArr:MenuItems[] = menu.filter((item) => item.type == "Efterrätt");

  const handleLink: (id: string) => void = (id) => {
    const elemendId: Element | null = document.querySelector(`#${id}`);
    if (elemendId) {
      const y = elemendId.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };


  const ref =
  useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    activeMouseButton: "Left"
});


  return (
    <div className="menu-wrapper">
      <Nav / >
      {loading ? <div className="loading"></div> : ""}
      <section
        className="menu-header"
        style={{ backgroundImage: `url(${mainmeal})` }}
      >
        <h1>Meny</h1>
      </section>
      <section className="menu-header--category" {...events}
ref={ref}>
        <h2 onClick={() => handleLink("entree")}>Förrätter</h2>
        <h2 onClick={() => handleLink("meat")}>Kött</h2>
        <h2 onClick={() => handleLink("fish")}>Fisk</h2>
        <h2 onClick={() => handleLink("bird")}>Fågel</h2>
        <h2 onClick={() => handleLink("veg")}>Vegetariskt</h2>
        <h2 onClick={() => handleLink("desert")}>Efterrätter</h2>
      </section>

      <MenuTopic
        topic={"Förrätt"}
        foodImg={appertizer}
        menuArray={entreeArry}
      />
      <MenuTopic
        topic={"Huvudrätt"}
        foodImg={mainmeal}
        menuArray={mainCourseArr}
      />
      <MenuTopic topic={"Vegetariskt"} foodImg={veg} menuArray={vegArr} />
      <MenuTopic topic={"Efterrätt"} foodImg={dessert} menuArray={desertArr} />

      {cart.cartItems.length > 0 ? <Cart cart={cart} /> : ""}
    </div>
  );
};

export default Menu;
