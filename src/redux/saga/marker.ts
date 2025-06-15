import { call, put, takeEvery } from 'redux-saga/effects';
import { IParty } from '../../utils/models/MarkerData';
import Request from '../../utils/request';
import {
    createPartySuccess,
    createPartyFailure,
    CREATE_PARTY,
    getAllPartiesSuccess,
    getAllPartiesFailure,
    GET_ALL_PARTIES,
    getPartyByIdFailure,
    getPartyByIdSuccess,
    GET_PARTY_BY_ID,
} from '../actions/marker';

interface CreatePartyResponse {
    success: boolean;
    data: IParty;
    message?: string;
}

interface GetPartyByIdResponse {
    success: boolean;
    data?: IParty;
    message?: string;
}

const request = new Request('http://localhost:3003/api');

export function* createPartySaga(action: { type: string; payload: Omit<IParty, 'createdAt' | 'membersCount'> }): Generator<any, void, any> {
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

export function* getAllPartiesSaga(): Generator<any, void, any> {
    try {
        const response = yield call(request.get, '/parties/all-parties');
        if (response.success) {
            yield put(getAllPartiesSuccess(response.data));
        } else {
            yield put(getAllPartiesFailure(response.message || 'Не удалось загрузить список вечеринок'));
        }
    } catch (error: any) {
        yield put(getAllPartiesFailure(error.message || 'Ошибка при получении списка вечеринок'));
    }
}

export function* getPartyByIdSaga(action: { type: string; payload: string }): Generator<any, void, any> {
    try {
        const response: GetPartyByIdResponse = yield call(request.get, `/parties/party-by-id/${action.payload}`);
        if (response.success && response.data) {
            yield put(getPartyByIdSuccess(response.data));
        } else {
            yield put(getPartyByIdFailure(response.message || 'Вечеринка не найдена'));
        }
    } catch (error: any) {
        yield put(getPartyByIdFailure(error.message || 'Ошибка при получении данных вечеринки'));
    }
}

export  function* partySaga() {
    yield takeEvery(CREATE_PARTY, createPartySaga);
    yield takeEvery(GET_ALL_PARTIES, getAllPartiesSaga);
    yield takeEvery(GET_PARTY_BY_ID, getPartyByIdSaga);
}
