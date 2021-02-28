export type UserState = {
    accessToken?: string;
    name?: string;
    id?: string;
}

export enum UserAction {
    RESET_USER = 'RESET_USER',
    SET_USER = 'SET_USER'
}

interface ResetAction {
    type: UserAction.RESET_USER;
}

interface SetAction {
    type: UserAction.SET_USER;
    payload: UserState;
}

export type UserActionTypes = ResetAction | SetAction;
