import { User } from "../../utils/models/AuthData";
import { SET_USER, CLEAR_USER } from "../actions/auth";

const initialState = {
    user: null as User | null
};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case CLEAR_USER:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};