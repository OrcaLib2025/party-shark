/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_AUTH, SET_USER } from "../actions/auth";
import { User } from "../../utils/models/AuthData";

type AuthState = {
    isAuth: boolean;
    user: User | null;
};

const initialState: AuthState = {
    isAuth: false,
    user: null,
};

export const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.payload,
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }
}