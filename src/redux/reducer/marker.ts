import { IParty } from "../../utils/models/MarkerData";
import { CREATE_PARTY, CREATE_PARTY_SUCCESS, CREATE_PARTY_FAILURE } from "../actions/marker";


type PartyState = {
    createLoading: boolean;
    createError: string | null;
    createdParty: IParty | null;
};

const initialState: PartyState = {
    createLoading: false,
    createError: null,
    createdParty: null,
};

export const partyReducer = (state = initialState, action: any): PartyState => {
    switch (action.type) {
        case CREATE_PARTY:
            return {
                ...state,
                createLoading: true,
                createError: null,
                createdParty: null,
            };

        case CREATE_PARTY_SUCCESS:
            return {
                ...state,
                createLoading: false,
                createError: null,
                createdParty: action.payload,
            };

        case CREATE_PARTY_FAILURE:
            return {
                ...state,
                createLoading: false,
                createError: action.payload,
                createdParty: null,
            };

        default:
            return state;
    }
};