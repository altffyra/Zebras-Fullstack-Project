import "../styles/_nav.scss";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logoDark from "../assets/logoDark.svg";
import logoLight from "../assets/logoLight.svg";

type NavProps = {
  scrollTop?: boolean;
}

const Nav = (props: NavProps) => {
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
const navCss = props.scrollTop ? 'nav-top' : ''
  return (
    <header className={navCss}>
      <div className="menu-btn" onClick={handleMenu}>
        <span className={menuOpen ? "menu-btn--top" : ""}></span>
        <span className={menuOpen ? "menu-btn--mid" : ""}></span>
        <span className={menuOpen ? "menu-btn--bottom" : ""}></span>
      </div>
      <nav className={menuOpen ? "nav open" : "nav"}>
        <ul className="link-container">
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
        </ul>
      </nav>
      <div className="logo-container">
        <h2 className="nav-headline">Rocksalt</h2>
        <img className="logo" src={navCss ? logoLight : logoDark} alt="Rocksalt logo" />
      </div>
    </header>
  );
};

export default Nav;
