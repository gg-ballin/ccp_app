import {LoginActionTypes} from '../types/index';

const initialState = {
    loading: false,
    loginEmail: '',
    loginPassword: '',
    loggedStatus: false,
    accessToken: '',
    userData: {},
    error: null,
    expiresIn: '',
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LoginActionTypes.LOGIN_START:
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });
        case LoginActionTypes.LOGIN_EMAIL:
            return Object.assign({}, state, {
                loginEmail: action.payload,
            });
        case LoginActionTypes.LOGIN_PASSWORD:
            return Object.assign({}, state, {
                loginPassword: action.payload,
            });
        case LoginActionTypes.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
            });
        case LoginActionTypes.LOGIN_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload,
            });
        case LoginActionTypes.LOGGED_STATUS:
            return Object.assign({}, state, {
                loggedStatus: action.payload,
            });
        case LoginActionTypes.ACCESS_TOKEN:
            return Object.assign({}, state, {
                accessToken: action.payload,
            });
        case LoginActionTypes.EXPIRES_IN:
            return Object.assign({}, state, {
                expiresIn: action.payload,
            });
        case LoginActionTypes.USER_DATA:
            return Object.assign({}, state, {
                userData: action.payload,
            });
        default:
            return state;
    }
}
