export type MenuItems = {
    name: string;
    desc: string;
    price: number;
    allergies: string;
    type: string;
}

export type CartItems = {
    name: string;
    price: number;
    amount: number;
}

export type CartProps = {
    cartItems: CartItems[];
    totalPrice: number;
}

export type User = {
    name: string;
    email: string;
    accountId: string;
    phoneNumber: string;
    admin?: boolean;
    password?: string;
}

export type Order = {
    cart: CartProps;
    user: User;
    userComment?: string;
    adminComment?: string;
    locked?: boolean;
    completed?: boolean;
    orderPlaced?: string;
    orderCompleted?: string
    id?: string;
}


