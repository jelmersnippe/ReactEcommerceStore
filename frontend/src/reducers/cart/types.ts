import {ProductDTO} from '../../generated';

export interface CartItem {
    name: string;
    price: number;
    qty: number;
    id: string;
    image: string;
}

export type CartState = {
    items: Array<CartItem>
}

export enum CartAction {
    RESET = 'RESET',
    ADD_ITEM = 'ADD_ITEM',
    UPDATE_QTY = 'UPDATE_QTY'
}

interface ResetAction {
    type: CartAction.RESET;
}

interface AddItemAction {
    type: CartAction.ADD_ITEM;
    payload: {
        product: ProductDTO;
        qty: number;
    }
}

interface UpdateQtyAction {
    type: CartAction.UPDATE_QTY;
    payload: {
        id: string;
        qty: number;
    }
}

export type CartActionTypes = ResetAction | AddItemAction | UpdateQtyAction;
