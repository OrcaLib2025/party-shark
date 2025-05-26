import { IParty } from "../../utils/models/MarkerData";

export const CREATE_PARTY = 'CREATE_PARTY';
export const CREATE_PARTY_SUCCESS = 'CREATE_PARTY_SUCCESS';
export const CREATE_PARTY_FAILURE = 'CREATE_PARTY_FAILURE';
export const RESET_CREATED_PARTY = 'RESET_CREATED_PARTY';

export const GET_ALL_PARTIES = 'GET_ALL_PARTIES';
export const GET_ALL_PARTIES_SUCCESS = 'GET_ALL_PARTIES_SUCCESS';
export const GET_ALL_PARTIES_FAILURE = 'GET_ALL_PARTIES_FAILURE';


export const createParty = (partyData: Omit<IParty, 'createdAt' | 'membersCount'>) => ({
  type: CREATE_PARTY,
  payload: partyData,
});

export const createPartySuccess = (party: IParty) => ({
  type: CREATE_PARTY_SUCCESS,
  payload: party,
});

export const createPartyFailure = (error: string) => ({
  type: CREATE_PARTY_FAILURE,
  payload: error,
});

export const resetCreatedParty = () => ({
  type: RESET_CREATED_PARTY,
});

export const getAllParties = () => ({
  type: GET_ALL_PARTIES,
});

export const getAllPartiesSuccess = (parties: IParty[]) => ({
  type: GET_ALL_PARTIES_SUCCESS,
  payload: parties,
});

export const getAllPartiesFailure = (error: string) => ({
  type: GET_ALL_PARTIES_FAILURE,
  payload: error,
});
