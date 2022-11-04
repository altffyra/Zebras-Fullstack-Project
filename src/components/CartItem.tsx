import { CartItems } from "../models/types";
import { ChangeEvent } from "react";
import removeItem from '../assets/remove-item.svg';
import { useDispatch } from "react-redux";
import { actions as cartActions } from "../features/cartReducer";

type CartItemsProps = {
  item: CartItems;
  locked?: boolean;
};

type UpdatedItemProps = {
  name: string;
  amount: number;
};

const CartItem = (props: CartItemsProps) => {
  const dispatch = useDispatch();
  // const itemPrice: number = props.item.price * props.item.amount;
  const dotsCss: string = props.locked ? "cart-dots" : "cart-item";

  const handleAmount: (
    e: ChangeEvent<HTMLSelectElement>,
    itemName: string
  ) => void = (e, itemName) => {
    const updatedItem: UpdatedItemProps = {
      name: itemName,
      amount: parseInt(e.target.value),
    };
    dispatch(cartActions.updateAmount(updatedItem));
  };

  const handleRemoveItem: () => void = () => {
    const updatedItem: UpdatedItemProps = {
      name: props.item.name,
      amount: 0,
    };
    dispatch(cartActions.updateAmount(updatedItem));
  }
  return (
    <section className={dotsCss}>
      <p className="item-name">{props.item.name} {props.locked ? `x ${props.item.amount}` : ''}</p>
      {props.locked ? <div className="dots"></div> : ""}
      {!props.locked ? (
        <select
          name="amount"
          id=""
          value={props.item.amount}
          onChange={(e) => handleAmount(e, props.item.name)}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      ) : (
        ""
      )}
      <div onClick={handleRemoveItem} className="remove-item" style={{backgroundImage: `url(${removeItem})`}}></div>
      <p className="item-price">à {props.item.price} kr</p>
    </section>
  );
};

export default CartItem;
