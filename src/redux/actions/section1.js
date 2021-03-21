import {FirstSectionActionTypes} from '../types/index';
import axios from 'axios';
import {
    getRemitenteURL,
    getProvinciasURL,
    getLocalidadesURL,
    getPlazosURL,
    addRemitenteURL,
} from '../../net/Connector';

// Remitente
const getRemitentes = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        dispatch({type: FirstSectionActionTypes.GET_REMITENTES_START});
        try {
            await axios({
                method: 'GET',
                url: getRemitenteURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    dispatch({
                        type: FirstSectionActionTypes.GET_REMITENTES_SUCCESS,
                    });
                    dispatch({
                        type: FirstSectionActionTypes.GET_REMITENTES,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: FirstSectionActionTypes.GET_REMITENTES_FAILURE,
                    });
                    console.log('Respuesta incorrecta getRemitentes: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getRemitentes: ', err);
        }
    };
};
const setSelectedRemitente = (remit) => {
    return {
        type: FirstSectionActionTypes.SET_SELECTED_REMITENTES,
        payload: remit,
    };
};
const setSearchRemitente = (remit) => {
    return {
        type: FirstSectionActionTypes.SET_SEARCH_REMITENTES,
        payload: remit,
    };
};
const addRemitente = (remitente, accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        console.log('remitente: ', remitente);
        try {
            await axios({
                method: 'POST',
                url: addRemitenteURL(),
                headers: {
                    Authorization: token,
                },
                params: {
                    descripcion: remitente,
                },
            })
                .then((response) => {
                    debugger;
                    console.log(
                        'Respuesta correcta addRemitenteURL: ',
                        response,
                    );
                    let newRemitente = {
                        Descripcion: response.data.Descripcion,
                        Id: response.data.Id,
                    };
                    dispatch({
                        type: FirstSectionActionTypes.SET_SELECTED_REMITENTES,
                        payload: newRemitente,
                    });
                    getRemitentes(accessToken);
                })
                .catch((error) => {
                    debugger;
                    console.log(
                        'Respuesta incorrecta addRemitenteURL: ',
                        error,
                    );
                });
        } catch (error) {
            debugger;
            console.log('Catch error addRemitente');
        }
    };
};
// Provincias
const getProvincias = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        dispatch({type: FirstSectionActionTypes.GET_PROVINCIAS_START});
        try {
            await axios({
                method: 'GET',
                url: getProvinciasURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    dispatch({
                        type: FirstSectionActionTypes.GET_PROVINCIAS_SUCCESS,
                    });
                    dispatch({
                        type: FirstSectionActionTypes.GET_PROVINCIAS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    dispatch({
                        type: FirstSectionActionTypes.GET_PROVINCIAS_FAILURE,
                    });
                    console.log('Respuesta incorrecta getProvincias: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getProvincias: ', err);
        }
    };
};
const setProvincia = (provincia) => {
    return {
        type: FirstSectionActionTypes.SET_PROVINCIAS,
        payload: provincia,
    };
};
// Localidades
const getLocalidades = (id, accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'GET',
                url: getLocalidadesURL(id),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    dispatch({
                        type: FirstSectionActionTypes.GET_LOCALIDADES,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getLocalidades: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getLocalidades: ', err);
        }
    };
};
const setSelectedLocalidad = (localidad) => {
    return {
        type: FirstSectionActionTypes.SET_LOCALIDADES,
        payload: localidad,
    };
};
const setSearchLocalidades = (localidad) => {
    return {
        type: FirstSectionActionTypes.SET_SEARCH_LOCALIDADES,
        payload: localidad,
    };
};
// Plazos
const getPlazos = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'GET',
                url: getPlazosURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    // console.log('Respuesta correcta getPlazos: ', response);

                    dispatch({
                        type: FirstSectionActionTypes.GET_PLAZOS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getPlazos: ', err);
                });
        } catch (err) {
            console.log('Error getPlazos :', err);
        }
    };
};
const setPlazoSelected = (plazos) => {
    return {
        type: FirstSectionActionTypes.SET_SELECTED_PLAZO,
        payload: plazos,
    };
};
const setOtherPlazo = (plazos) => {
    return {
        type: FirstSectionActionTypes.SET_OTHER_PLAZO,
        payload: plazos,
    };
};
const setOtherPlazoId = (id) => {
    return {
        type: FirstSectionActionTypes.SET_OTHER_PLAZO_ID,
        payload: id,
    };
};
const clearSection1 = () => {
    return {
        type: FirstSectionActionTypes.CLEAR_SECTION_1,
    };
};

export default {
    // Remitentes => ADD
    getRemitentes,
    setSelectedRemitente,
    setSearchRemitente,
    addRemitente,
    // Provincias
    getProvincias,
    setProvincia,
    // Localidades
    getLocalidades,
    setSelectedLocalidad,
    setSearchLocalidades,
    // Plazos
    getPlazos,
    setPlazoSelected,
    setOtherPlazo,
    setOtherPlazoId,
    //Clear
    clearSection1,
};
