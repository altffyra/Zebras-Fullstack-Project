import { CartItems} from '../models/Interface';
import { ChangeEvent } from 'react';

type CartItemsProps = {
    item: CartItems;
    handleAmount: (e: ChangeEvent<HTMLSelectElement>, itemName: string) => void;
}

const CartItem = (props:CartItemsProps) => {
    console.log(props.item.amount);
    
    return (
        <section className="cart-item">
            <p>{props.item.name}</p>
            <select name="amount" id="" value={props.item.amount} onChange={(e) => props.handleAmount(e, props.item.name)}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <p>{props.item.price} kr</p>
        </section>
    )
}

export default CartItem;