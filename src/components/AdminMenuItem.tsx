import { FormEvent } from 'react'
import { CartItems, MenuItems } from '../models/types';
import {actions as cartActions} from '../features/cartReducer';
import { useDispatch } from 'react-redux';

type Props = {
    item: MenuItems
    toggleMenu: (e:FormEvent) => void;
}

const AdminMenuItem = (props: Props) => {
    const dispatch = useDispatch();

    const AddItemToCart: (e:FormEvent) => void = (e) => {
        props.toggleMenu(e)
        const cartObject: CartItems = {
          name: props.item.name,
          price: props.item.price,
          amount: 1
        }
        dispatch(cartActions.addToCart(cartObject));
      }

  return (
    <div className='menu-item'>
        <p>{props.item.name}</p>
        <p className='add-plus' onClick={(e) => AddItemToCart(e)}>+</p>
    </div>
  )
}

export default AdminMenuItem


