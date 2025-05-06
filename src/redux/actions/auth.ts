export const SET_AUTH = 'SET_AUTH';

export const setAuth = (isAuth: boolean) => ({
    type: SET_AUTH,
    payload: isAuth,
});
