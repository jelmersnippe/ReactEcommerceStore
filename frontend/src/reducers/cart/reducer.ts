import {CartAction, CartActionTypes, CartState} from './types';

const initialState: CartState = {
    items: []
};

const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
    console.log(state);
    switch (action.type) {
        case CartAction.UPDATE_QTY:
            const itemToUpdate = state.items.find((item) => item.id === action.payload.id);

            if (!itemToUpdate) {
                return state;
            }

            return {
                ...state,
                items: [
                    ...state.items.filter((item) => item.id !== action.payload.id),
                    {...itemToUpdate, qty: action.payload.qty}
                ]
            };
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
