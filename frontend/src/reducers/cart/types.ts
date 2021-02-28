import {ProductDTO} from '../../generated';

export interface CartItem {
    name: string;
    price: number;
    qty: number;
    id: string;
    image: string;
}

export type CartState = {
    items: Array<CartItem>,
    count: number
}

export enum CartAction {
    RESET_CART = 'RESET_CART',
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    UPDATE_QTY = 'UPDATE_QTY'
}

interface ResetAction {
    type: CartAction.RESET_CART;
}

interface AddItemAction {
    type: CartAction.ADD_ITEM;
    payload: {
        product: ProductDTO;
        qty: number;
    }
}

interface RemoveItemAction {
    type: CartAction.REMOVE_ITEM;
    payload: {
        id: string
    }
}

interface UpdateQtyAction {
    type: CartAction.UPDATE_QTY;
    payload: {
        id: string;
        qty: number;
    }
}

export type CartActionTypes = ResetAction | AddItemAction | RemoveItemAction | UpdateQtyAction;
