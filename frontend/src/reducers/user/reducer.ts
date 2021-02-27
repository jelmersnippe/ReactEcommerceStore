import {UserAction, UserActionTypes, UserState} from './types';

const initialState: UserState = {};

const userReducer = (state = initialState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case UserAction.SET:
            return {
                ...state,
                ...action.payload
            }
        case UserAction.RESET:
            return initialState;
        default:
            return state;
    }
};

export default userReducer;
