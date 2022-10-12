import './Menu.scss';

type Props = {}

const Menu = (props: Props) => {
  return (
    <div className="menu-wrapper">

      <section className="menu-header--text">
        <h1>MENY</h1>
      </section>

      <section className="menu-header-category">
        <p>KÖTT</p>
        <p>FISK</p>
        <p>VEGETARISKT</p>
      </section>

      <figure className="menu-appetizers-container">
        <img src="" alt="" />
        <section className="menu-appetizers-text">
          <p>FÖRRÄTTER</p>
        </section>
      </figure>

      <section className="menu-mainmeals-wrapper">

        <figure className="menu-mainmeals-container">
          <img src="" alt="" />
          <section className="menu-mainmeal-text">
            <p>HUVUDRÄTTER</p>
          </section>
        </figure>
        <section className="menu-mainmeal-meat">
          <p>KÖTT</p>
        </section>
        <section> HÄR LOOPAS KÖTT </section>

        <section className="menu-mainmeal-fish">
          <p>FISK</p>
        </section>
        <section> HÄR LOOPAS FISK </section>

        <section className="menu-mainmeal-veg">
          <p>VEGETARISKT</p>
        </section>
        <section> HÄR LOOPAS VEGETARISKT </section>

      </section>

      <figure className="menu-desserts-container">
        <img src="" alt="" />
        <section className="menu-dessert-text">
          <p>EFTERRÄTTER</p>
        </section>
      </figure>

    </div>
  )
}

export default Menu