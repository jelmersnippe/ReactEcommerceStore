import {CartAction, CartActionTypes} from './types';
import {ProductDTO} from '../../generated';

export const resetCart = (): CartActionTypes => {
    return {
        type: CartAction.RESET
    }
}

export const addItemToCart = (product: ProductDTO, qty: number): CartActionTypes => {
    return {
        type: CartAction.ADD_ITEM,
        payload: {product, qty}
    }
}

export const removeItemFromCart = (id: string): CartActionTypes => {
    return {
        type: CartAction.REMOVE_ITEM,
        payload: {id}
    }
}

export const updateQty = (id: string, qty: number): CartActionTypes => {
    return {
        type: CartAction.UPDATE_QTY,
        payload: {id, qty}
    }
}
