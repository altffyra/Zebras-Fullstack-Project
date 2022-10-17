import { MenuItems} from '../models/Interface';

type CartItemsProps = {
    item: MenuItems;
}

const CartItem = (props:CartItemsProps) => {

    return (
        <section className="cart-item">
            <p>{props.item.name}</p>
            <select name="amount" id="" defaultValue={props.item.amount}>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
        </section>
    )
}

export default CartItem;