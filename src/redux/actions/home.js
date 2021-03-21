import {HomeActionTypes} from '../types/index';
import axios from 'axios';
import {getPCP7Days_URL, getPCP30Days_URL} from '../../net/Connector';

const getPCP7Days = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'GET',
                url: getPCP7Days_URL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    console.log('Respuesta OK getPCP7Days: ', response);
                    dispatch({
                        type: HomeActionTypes.GET_PCP_7DAYS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getPCP7Days: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getPCP7Days: ', err);
        }
    };
};
const getPCP30Days = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        debugger;
        try {
            await axios({
                method: 'GET',
                url: getPCP30Days_URL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    console.log('Respuesta OK getPCP30Days: ', response);
                    dispatch({
                        type: HomeActionTypes.GET_PCP_7DAYS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getPCP30Days: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getPCP30Days: ', err);
        }
    };
};
const getPFP7Days = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        debugger;
        try {
            await axios({
                method: 'GET',
                url: getPCP7Days_URL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    console.log('Respuesta OK getPCP7Days: ', response);
                    dispatch({
                        type: HomeActionTypes.GET_PCP_7DAYS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getPCP7Days: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getPCP7Days: ', err);
        }
    };
};
const getPFP30Days = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        debugger;
        try {
            await axios({
                method: 'GET',
                url: getPCP7Days_URL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    console.log('Respuesta OK getPCP7Days: ', response);
                    dispatch({
                        type: HomeActionTypes.GET_PCP_7DAYS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getPCP7Days: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getPCP7Days: ', err);
        }
    };
};

export default {
    getPCP7Days,
};
