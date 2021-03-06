import {UserAction, UserActionTypes, UserState} from './types';

export const resetUser = (): UserActionTypes => {
    return {
        type: UserAction.RESET_USER
    }
}

export const setUser = (payload: UserState): UserActionTypes => {
    return {
        type: UserAction.SET_USER,
        payload: payload
    }
}
