import { Order } from "../lowDb/dbinterface";

export function isValidOrder(order:Order) : boolean  {
	if (order.hasOwnProperty('id')) {
		if ((typeof order.id !== 'string') || order.id === '') {
			return false
		}
	} else {
		return false
	}
	if(order.hasOwnProperty('cart')) {
		if (typeof order.cart !== 'object') {
			return false
		}
	} else {
		return false
	}
	if(order.cart.hasOwnProperty('cartItems')) {
		if (order.cart.cartItems.length <= 0) {
			return false
		}
	} else {
		return false
	}
	if(order.cart.hasOwnProperty('totalPrice')) {
		if ((typeof order.cart.totalPrice !== 'number') || order.cart.totalPrice <= 0) {
			return false
		}
	} else {
		return false
	}

	return true
} 

export function isValidUpdatedOrder(order:Order) : boolean {
	if(order.hasOwnProperty('locked')) {
		if (typeof order.locked !== 'boolean') {
			return false
		}
	} else {
		return false
	}
	if (order.hasOwnProperty('orderPlaced')) {
		if ((typeof order.orderPlaced !== 'string') || order.orderPlaced === '') {
			return false
		}
	} else {
		return false
	}
	if(order.hasOwnProperty('completed')) {
		if (typeof order.completed !== 'boolean' || order.completed == true) {
			return false
		}
	} else {
		return false
	}
	
	return true
}