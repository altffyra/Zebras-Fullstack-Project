export interface MenuItems {
    name: string;
    desc: string;
    price: number;
    allergies: string;
    type: string;
    amount?: number;
}

export interface CartProps {
    cartItems: MenuItems[];
    totalPrice: number;
}

export interface User {
    name: string;
    email: string;
    accountId: string;
    phoneNumber: string;
    admin?: boolean;
}

export interface Order {
    cartItems: MenuItems[];
    totalPrice: number;
    user: User;
    userComment: string;
    adminComment: string;
    locked: boolean;
    completed: boolean;
    orderPlaced: string;
    id: string;
}


