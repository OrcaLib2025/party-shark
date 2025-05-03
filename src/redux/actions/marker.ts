import { IParty } from "../../utils/models/MarkerData";

export const CREATE_PARTY = 'CREATE_PARTY';
export const CREATE_PARTY_SUCCESS = 'CREATE_PARTY_SUCCESS';
export const CREATE_PARTY_FAILURE = 'CREATE_PARTY_FAILURE';

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