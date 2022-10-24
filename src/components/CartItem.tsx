import { CartItems} from '../models/types';
import { ChangeEvent } from 'react';

type CartItemsProps = {
    item: CartItems;
    handleAmount: (e: ChangeEvent<HTMLSelectElement>, itemName: string) => void;
}

const CartItem = (props:CartItemsProps) => {
    
    return (
        <section className="cart-item">
            <p>{props.item.name}</p>
            <select name="amount" id="" value={props.item.amount} onChange={(e) => props.handleAmount(e, props.item.name)}>
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
            <p>{props.item.price} kr</p>
        </section>

    
    )
}

export default CartItem;