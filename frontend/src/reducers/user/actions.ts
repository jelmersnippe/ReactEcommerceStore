import {UserAction, UserActionTypes, UserState} from './types';

export const resetUser = (): UserActionTypes => {
    return {
        type: UserAction.RESET
    }
}

export const setUser = (payload: UserState): UserActionTypes => {
    return {
        type: UserAction.SET,
        payload: payload
    }
}
