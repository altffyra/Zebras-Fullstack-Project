import '../styles/_cart.scss';
import dropDownLight from '../assets/dropDownLight.svg';
import { CartProps } from '../models/Interface';
import CartItem from './CartItem';

type CartProp = {
    cart: CartProps;
}

const Cart = (props: CartProp) => {

    const cartItemEl = props.cart.cartItems.map((item, index) => <CartItem item={item} key={index} />)
    return (
        <section className="cart">
            <img src={dropDownLight} alt="drop down icon" />

            <div className="cart-headline">
                <p>{props.cart.cartItems.length} produkter</p>
                <p>{props.cart.totalPrice} kr</p>
            </div>
            {cartItemEl}
        </section>
    )
}

export default Cart;