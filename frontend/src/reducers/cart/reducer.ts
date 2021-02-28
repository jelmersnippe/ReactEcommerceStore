import {CartAction, CartActionTypes, CartState} from './types';

const initialState: CartState = {
    items: [],
    count: 0
};

const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
    switch (action.type) {
        case CartAction.UPDATE_QTY:
            const itemToUpdate = state.items.find((item) => item.id === action.payload.id);

            if (!itemToUpdate) {
                return state;
            }

            const filteredItems = state.items.filter((item) => item.id !== action.payload.id);
            const filteredCount = filteredItems.map((item) => item.qty).reduce((acc, cur) => {
                return acc + cur
            }, 0)

            if (action.payload.qty <= 0) {
                return {
                    ...state,
                    items: filteredItems,
                    count: filteredCount
                }
            }

            return {
                ...state,
                items: [
                    ...filteredItems,
                    {...itemToUpdate, qty: action.payload.qty}
                ],
                count: filteredCount + action.payload.qty
            };
        case CartAction.REMOVE_ITEM:
            const newItems = state.items.filter((item) => item.id !== action.payload.id)

            return {
                ...state,
                items: newItems,
                count: newItems.map((item) => item.qty).reduce((acc, cur) => {
                    return acc + cur
                }, 0)
            }
        case CartAction.ADD_ITEM:
            const existingItem = state.items.find((item) => item.id === action.payload.product.id);

            if (existingItem) {
                return {
                    ...state,
                    items: [...state.items.filter((item) => item.id !== action.payload.product.id), {...existingItem, qty: existingItem.qty + action.payload.qty}],
                    count: state.count + action.payload.qty
                }
            }

            return {
                ...state,
                items: [...state.items, {...action.payload.product, qty: action.payload.qty}],
                count: state.count + action.payload.qty
            };
        case CartAction.RESET:
            return initialState;
        default:
            return state;
    }
};

export default cartReducer;
