import { MenuItems, CartItems } from "../models/types";
// import vector from "../assets/menu/vector.svg";
// import allergyActive from "../assets/menu/allergy-active.svg";
// import allergy from "../assets/menu/allergy.svg";
import { useState } from "react";
import { actions as cartActions } from "../features/cartReducer";
import { useDispatch } from "react-redux";

type Props = {
  item: MenuItems;
};

const MenuItem = ({ item }: Props) => {
  const [tabbed, setTabbed] = useState<boolean>(true);
  const [allergies, setAllergies] = useState<boolean>(false);
  const dispatch = useDispatch();

  let allergyImg;
  {/*
  if (!tabbed && allergies) {
    allergyImg = allergy;
  } else {
    allergyImg = allergyActive;
  }*/}

  const AddItemToCart = () => {
    const cartObject: CartItems = {
      name: item.name,
      price: item.price,
      amount: 1,
    };
    dispatch(cartActions.addToCart(cartObject));
  };

  const tabFood = () => {
    /*
    setTabbed(!tabbed);
    setAllergies(false);
    */
  };
  
  const seeAllergies = () => {
    /*
    setAllergies(!allergies);
    */
  };

  return (
    <section className="menu-item">
      <section className="menu-item--info">
        <section className="menu-item--left">
          <section className="menu-item--flex">
            <p>
              {item.name}{" "}
              {item.allergies ? (
                <img
                  className="allergy-img"
                  src={allergyImg}
                  alt=""
                  onClick={seeAllergies}
                />
              ) : (
                ""
              )}
            </p>
            {!tabbed && allergies ? (
              <div className="allergy-info">
                <p>
                  Rätten innehåller allergener.<br></br>Klicka på pilen för att
                  läsa mer.
                </p>
              </div>
            ) : (
              ""
            )}
          </section>
          <p>{item.price} kr</p>
        </section>
        <section className="menu-item--right">
          <p className="menu-item--add" onClick={AddItemToCart}>
            +
          </p>
        </section>
      </section>
      <section className="menu-item--vector" onClick={tabFood}>
        {tabbed ? (
          <section className="tab-container">
            <p className="desc">{item.desc}</p>
            {item.allergies ? (
              <p className="allergies">Allergener: {item.allergies}</p>
            ) : (
              ""
            )}
          </section>
        ) : (
          ""
        )}
        {/*
        <section className="menu-item--img">
          {tabbed ? (
            <img className="rotated" src={vector} alt="" />
          ) : (
            <img src={vector} alt="" />
          )}
        </section>
        */}
      </section>
    </section>
  );
};

export default MenuItem;
