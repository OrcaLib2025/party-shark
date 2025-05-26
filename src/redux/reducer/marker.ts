import { IParty } from "../../utils/models/MarkerData";
import { CREATE_PARTY, CREATE_PARTY_SUCCESS, CREATE_PARTY_FAILURE, RESET_CREATED_PARTY, GET_ALL_PARTIES, GET_ALL_PARTIES_FAILURE, GET_ALL_PARTIES_SUCCESS } from "../actions/marker";


type PartyState = {
    createLoading: boolean;
    createError: string | null;
    createdParty: IParty | null;

    allParties: IParty[];
    getAllLoading: boolean;
    getAllError: string | null;
};

const initialState: PartyState = {
    createLoading: false,
    createError: null,
    createdParty: null,

    allParties: [],
    getAllLoading: false,
    getAllError: null,
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
        case RESET_CREATED_PARTY:
            return {
                ...state,
                createdParty: null,
            };

        case GET_ALL_PARTIES:
            return {
                ...state,
                getAllLoading: true,
                getAllError: null,
            };

        case GET_ALL_PARTIES_SUCCESS:
            return {
                ...state,
                getAllLoading: false,
                allParties: action.payload,
            };

        case GET_ALL_PARTIES_FAILURE:
            return {
                ...state,
                getAllLoading: false,
                getAllError: action.payload,
            };

        default:
            return state;
    }
};
