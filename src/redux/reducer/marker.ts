import { IParty } from "../../utils/models/MarkerData";
import {
    CREATE_PARTY,
    CREATE_PARTY_SUCCESS,
    CREATE_PARTY_FAILURE,
    RESET_CREATED_PARTY,
    GET_ALL_PARTIES,
    GET_ALL_PARTIES_FAILURE,
    GET_ALL_PARTIES_SUCCESS,
    GET_PARTY_BY_ID,
    GET_PARTY_BY_ID_FAILURE,
    GET_PARTY_BY_ID_SUCCESS,
    ADD_MEMBER_TO_PARTY,
    ADD_MEMBER_TO_PARTY_SUCCESS,
    ADD_MEMBER_TO_PARTY_FAILURE
} from "../actions/marker";

type PartyState = {
    createLoading: boolean;
    createError: string | null;
    createdParty: IParty | null;

    allParties: IParty[];
    getAllLoading: boolean;
    getAllError: string | null;

    currentParty: IParty | null;
    currentPartyLoading: boolean;
    currentPartyError: string | null;

    addMemberLoading: boolean;
    addMemberError: string | null;
};

const initialState: PartyState = {
    createLoading: false,
    createError: null,
    createdParty: null,

    allParties: [],
    getAllLoading: false,
    getAllError: null,

    currentParty: null,
    currentPartyLoading: false,
    currentPartyError: null,

    addMemberLoading: false,
    addMemberError: null,
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

        case GET_PARTY_BY_ID:
            return {
                ...state,
                currentPartyLoading: true,
                currentPartyError: null,
                currentParty: null,
            };

        case GET_PARTY_BY_ID_SUCCESS:
            return {
                ...state,
                currentPartyLoading: false,
                currentParty: action.payload,
            };

        case GET_PARTY_BY_ID_FAILURE:
            return {
                ...state,
                currentPartyLoading: false,
                currentPartyError: action.payload,
            };

        case ADD_MEMBER_TO_PARTY:
            return {
                ...state,
                addMemberLoading: true,
                addMemberError: null,
            };

        case ADD_MEMBER_TO_PARTY_SUCCESS:
            return {
                ...state,
                addMemberLoading: false,
                currentParty: action.payload,
                allParties: state.allParties.map(party =>
                    party._id === action.payload._id ? action.payload : party
                ),
            };

        case ADD_MEMBER_TO_PARTY_FAILURE:
            return {
                ...state,
                addMemberLoading: false,
                addMemberError: action.payload,
            };

        default:
            return state;
    }
};
