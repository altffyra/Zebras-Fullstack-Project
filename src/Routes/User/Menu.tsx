import './Menu.scss';
import menu from '../../assets/menu.svg';
import mainmeal from '../../assets/mainmeal.svg';

type Props = {}

const Menu = (props: Props) => {
  return (
    <div className="menu-wrapper">

      <section className="menu-header--container">
        <figure className="menu-header--info">
          <img src={menu} alt="" />
          <section className="menu-header--text">
            <section className="menu-header--flex">
              <h1>MENY</h1>
            </section>
          </section>
        </figure>
        <section className="menu-header--category">
          <p>KÖTT</p>
          <p>FISK</p>
          <p>VEGETARISKT</p>
        </section>
      </section>

      <section className="menu-header--container">
        <figure className="menu-header--info">
          <img src={menu} alt="" />
          <section className="menu-header--text">
            <section className="menu-header--flex">
              <p>FÖRRÄTTER</p>
            </section>
          </section>
        </figure>
      </section>

      <section className="menu-header--container">
        <figure className="menu-header--info">
          <img src={mainmeal} alt="" />
          <section className="menu-header--text">
            <section className="menu-header--flex">
              <p>HUVUDRÄTTER</p>
            </section>
          </section>
        </figure>
        <section className="menu-title--text">
          <p className="menu-title--margin">KÖTT</p>
        </section>
        <section> HÄR LOOPAS KÖTT </section>

        <section className="menu-title--text">
          <p className="menu-title--margin"> FISK</p>
        </section>
        <section> HÄR LOOPAS FISK </section>

        <section className="menu-title--text">
          <p className="menu-title--margin">VEGETARISKT</p>
        </section>
        <section> HÄR LOOPAS VEGETARISKT </section>

      </section>

      <figure className="menu-desserts--container">
        <img src="" alt="" />
        <section className="menu-dessert--text">
          <p className="menu-title-margin">EFTERRÄTTER</p>
        </section>
      </figure>

    </div>
  )
}

export default Menu