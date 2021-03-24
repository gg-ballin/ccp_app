import {LoginActionTypes} from '../types/index';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {loginURL, userDataURL} from '../../net/Connector';
import moment from 'moment';

const executeLogin = (email, password, navigation) => {
    return async (dispatch) => {
        dispatch({type: LoginActionTypes.LOGIN_START});
        try {
            await axios({
                method: 'POST',
                url: loginURL(),
                data: {
                    username: email,
                    password: password,
                },
            })
                .then((response) => {
                    debugger;
                    const token = response.data.access_token;
                    const userData = response.data;
                    const expiresIn = moment(
                        response.data.expires_in,
                        'YYYY-MM-DD',
                    );
                    const parsedExpiresIn = expiresIn.format(
                        'DD, MMM YYYY HH:mm:ss',
                    );
                    const accessToken = token;
                    // console.log('Expires in: ', parsedExpiresIn);
                    console.log('Response login TOKEN: ', accessToken);
                    AsyncStorage.setItem('accessToken', accessToken);
                    dispatch({
                        type: LoginActionTypes.EXPIRES_IN,
                        payload: parsedExpiresIn,
                    });
                    dispatch({
                        type: LoginActionTypes.LOGGED_STATUS,
                        payload: true,
                    });
                    dispatch({
                        type: LoginActionTypes.ACCESS_TOKEN,
                        payload: accessToken,
                    });
                    dispatch({
                        type: LoginActionTypes.USER_DATA,
                        payload: userData,
                    });
                    dispatch({type: LoginActionTypes.LOGIN_SUCCESS});
                    axios({
                        method: 'GET',
                        url: userDataURL(),
                        headers: {
                            Authorization: accessToken,
                        },
                    })
                        .then((res) => {
                            console.log('Respuesta USUARIO: ', res);
                            // esto trae una data, consultar fran
                        })
                        .catch((error) => {
                            console.log('Respuesta USUARIO: ', error);
                        });
                    navigation.navigate('APP');
                })
                .catch((errResp) => {
                    debugger;
                    console.log('errResp login: ', errResp);
                    dispatch({
                        type: LoginActionTypes.LOGIN_FAILURE,
                        payload: 'Credenciales incorrectas',
                    });
                });
        } catch (error) {
            debugger;
            console.log('error catch: ', error);
            dispatch({
                type: LoginActionTypes.LOGIN_FAILURE,
                payload: 'Credenciales incorrectas',
            });
        }
    };
};

const setLoggedStatus = (bool) => {
    return {
        type: LoginActionTypes.LOGGED_STATUS,
        payload: bool,
    };
};

const setLoginEmail = (email) => {
    return {
        type: LoginActionTypes.LOGIN_EMAIL,
        payload: email,
    };
};

const setLoginPassword = (password) => {
    return {
        type: LoginActionTypes.LOGIN_PASSWORD,
        payload: password,
    };
};

const logout = (navigation) => {
    return async (dispatch) => {
        AsyncStorage.removeItem('accessToken');
        dispatch({
            type: LoginActionTypes.LOGGED_STATUS,
            payload: false,
        });
        dispatch({
            type: LoginActionTypes.ACCESS_TOKEN,
            payload: '',
        });
        dispatch({
            type: LoginActionTypes.USER_DATA,
            payload: {},
        });
        navigation.navigate('AUTH');
    };
};

export default {
    executeLogin,
    setLoginEmail,
    setLoginPassword,
    setLoggedStatus,
    logout,
};
