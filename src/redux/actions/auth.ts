import { User } from "../../utils/models/AuthData";

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const setUser = (user: User) => ({
    type: SET_USER,
    payload: user
});

export const clearUser = () => ({
    type: CLEAR_USER
});