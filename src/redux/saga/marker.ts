/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeEvery } from 'redux-saga/effects';
import { IParty } from '../../utils/models/MarkerData';
import Request from '../../utils/request';
import { createPartySuccess, createPartyFailure, CREATE_PARTY } from '../actions/marker';

interface CreatePartyResponse {
    success: boolean;
    data: IParty;
    message?: string;
}

const request = new Request('http://localhost:3003/api');

function* createPartySaga(action: { type: string; payload: Omit<IParty, 'createdAt' | 'membersCount'> }): Generator<any, void, any> {
    try {
        const response: CreatePartyResponse = yield call(request.post, '/parties', action.payload);
        if (response.success) {
            yield put(createPartySuccess(response.data));
        } else {
            yield put(createPartyFailure(response.message || 'Ошибка при создании вечеринки'));
        }
    } catch (error: any) {
        yield put(createPartyFailure(error.message || 'Ошибка при создании вечеринки'));
    }
}

export  function* partySaga() {
    yield takeEvery(CREATE_PARTY, createPartySaga);
}