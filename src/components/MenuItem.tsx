type Props = {
    allergy: string;
    vector: string;
    foodTopic: string;
}

const MenuItem = ({ allergy, vector, foodTopic }: Props) => {
    return (
        <section className="menu-item">
          <section className="menu-item--left">
            <section className="menu-item--flex">
              <p>{ foodTopic }</p>
              <img src={allergy} alt="" />
            </section>
            <p>10 kr </p>
          </section>
          <section className="menu-item--vector">
            <section className="menu-item--img">
              <img src={vector} alt="" />
            </section>
          </section>
          <section className="menu-item--right">
            <p className="menu-item--add">+</p>
          </section>
        </section>
    )
}

export default MenuItem;