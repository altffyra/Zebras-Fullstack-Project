import React from 'react'
import { CartItems, MenuItems } from '../models/types';
import {actions as cartActions} from '../features/cartReducer';
import { useDispatch } from 'react-redux';

type Props = {
    item: MenuItems
}

const AdminMenuItem = (props: Props) => {
    const dispatch = useDispatch();

    const AddItemToCart = () => {
        const cartObject: CartItems = {
          name: props.item.name,
          price: props.item.price,
          amount: 1
        }
        dispatch(cartActions.addToCart(cartObject));
      }

  return (
    <div>
        <p>{props.item.name}</p>
        <p onClick={AddItemToCart}>+</p>
    </div>
  )
}

export default AdminMenuItem


