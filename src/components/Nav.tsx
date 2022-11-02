import "../styles/_nav.scss";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logoDark from "../assets/logoDark.svg";
import logoLight from "../assets/logoLight.svg";
import { actions as userActions } from "../features/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState } from "../store";
import cartIcon from '../assets/cart-icon.png'
import cartIconLight from '../assets/cart-icon-light.png'
import { CartProps } from "../models/types";

type NavProps = {
  scrollTop?: boolean;
  setActive: any;
  handleCart: () => void;
  active: boolean;
}

const Nav = (props: NavProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const accountId = localStorage.getItem("accountId");
  useEffect(() => {
    if (accountId) {
      setLoggedIn(true);
    }
  }, [accountId]);


  const handleMenu: () => void = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout: () => void = () => {
    dispatch(userActions.logOut());
    setLoggedIn(false);
    localStorage.removeItem('accountId')
    if(location.pathname == '/Account') {
      navigate('/menu')      
    }
  }

  const handleCart: () => void = () => {
    navigate('/menu')
    props.setActive(!props.active)
  }

  let amountOfProducts: number = 0;
  const cart: CartProps = useSelector((state: RootState) => state.cart);

  cart.cartItems.forEach((item) => {
    amountOfProducts = amountOfProducts + item.amount;
  });

  const navCss = props.scrollTop ? 'nav-top' : ''
  return (
    <header className={navCss}      >
      <div className="menu-btn" onClick={handleMenu}>
        <span className={menuOpen ? "menu-btn--top" : ""} ></span>
        <span className={menuOpen ? "menu-btn--mid" : ""}></span>
        <span className={menuOpen ? "menu-btn--bottom" : ""}></span>
      </div>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <ul className="link-container" >
          
          <NavLink className="link" to="/">
            Hem
          </NavLink>
          <div className="divider"></div>
          <NavLink className="link" to="/Menu">
            Meny
          </NavLink>
          <div className="divider"></div>
          {loggedIn ? (
            <NavLink className="link" to="/Account">
              Konto
            </NavLink>
          ) : (
            <NavLink className="link" to="/Login">
              Logga In
            </NavLink>
          )}
          <div className="divider"></div>
          <NavLink className="link" to="/Search">
            Sök Order
          </NavLink>
          <div className="divider"></div>
          {loggedIn ? 
            <p className="link" onClick={handleLogout}>
              Logga ut
            </p>
            : ''
          }
        </ul>
      </nav>
      <div className="logo-container">
        <h2 className="nav-headline">Rocksalt</h2>
        <img className="logo" src={navCss ? logoLight : logoDark} alt="Rocksalt logo" />
      </div>
      {amountOfProducts > 0 ? 
        <div className="cart-icon">
          <img src={navCss ? cartIconLight : cartIcon}  alt="cart icon dark" onClick={handleCart} />
          <div onClick={handleCart} className="cart-amount">
              <p>{amountOfProducts}</p>
          </div>
        </div>
        : ''
      }
    </header>
  );
};

export default Nav;
