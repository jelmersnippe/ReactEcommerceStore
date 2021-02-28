import {CartAction, CartActionTypes, CartState} from './types';

const initialState: CartState = {
    items: []
};

const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
    switch (action.type) {
        case CartAction.UPDATE_QTY:
            const itemToUpdate = state.items.find((item) => item.id === action.payload.id);

            if (!itemToUpdate) {
                return state;
            }

            const filteredItems = state.items.filter((item) => item.id !== action.payload.id);

            if (action.payload.qty <= 0) {
                return {
                    ...state,
                    items: filteredItems
                }
            }

            return {
                ...state,
                items: [
                    ...filteredItems,
                    {...itemToUpdate, qty: action.payload.qty}
                ]
            };
        case CartAction.REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id)
            }
        case CartAction.ADD_ITEM:
            return {
                ...state,
                items: [...state.items, {...action.payload.product, qty: action.payload.qty}]
            };
        case CartAction.RESET:
            return initialState;
        default:
            return state;
    }
};

export default cartReducer;
