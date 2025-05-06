/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_AUTH } from "../actions/auth";

type AuthState = {
    isAuth: boolean;
};

const initialState: AuthState = {
    isAuth: false,
};

export const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.payload,
            }
        default:
            return state;
    }
}