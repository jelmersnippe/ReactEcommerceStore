import {UserAction, UserActionTypes, UserState} from './types';

const initialState: UserState = {};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case UserAction.SET_USER:
            return {
                ...state,
                ...action.payload
            }
        case UserAction.RESET_USER:
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
