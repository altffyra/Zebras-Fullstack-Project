import { IncomingHttpHeaders } from 'http'


export interface MenuItems {
    name: string;
    desc: string;
    price: number;
    allergies: string;
    type: string;
}

export interface CartItems {
    name: string;
    price: number;
    amount: number;
}

export interface CartProps {
    cartItems: CartItems[];
    totalPrice: number;
}

export interface User {
    name: string;
    email: string;
    accountId: string;
    phoneNumber: string;
    admin?: boolean;
    password: string;
}

export interface Order {
    cart: CartProps;
    user: User;
    userComment?: string;
    adminComment?: string;
    locked: boolean;
    completed: boolean;
    orderPlaced: string;
    id: string;
}
export type headersType = {
    headers : IncomingHttpHeaders & {
      "accountID": string
    }
  }