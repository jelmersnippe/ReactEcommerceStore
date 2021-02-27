export type UserState = {
    accessToken?: string;
    name?: string;
    id?: string;
}

export enum UserAction {
    RESET = 'RESET',
    SET = 'SET'
}

interface ResetAction {
    type: UserAction.RESET;
}

interface SetAction {
    type: UserAction.SET;
    payload: UserState;
}

export type UserActionTypes = ResetAction | SetAction;
