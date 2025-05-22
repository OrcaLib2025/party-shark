import { User } from "../../utils/models/AuthData";
export const SET_AUTH = 'SET_AUTH';
export const SET_USER = 'SET_USER';

export const setAuth = (isAuth: boolean) => ({
    type: SET_AUTH,
    payload: isAuth,
});

export const setUser = (user: User | null) => ({
    type: SET_USER,
    payload: user,
})
