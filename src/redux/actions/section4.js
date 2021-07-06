/* eslint-disable prettier/prettier */
import axios from 'axios';
import {FourthSectionActionTypes} from '../types/index';
import {
    getTransportesURL,
    getTransporteTipoURL,
    addTransporteURL,
    getTransporteTipoByIdURL,
} from '../../net/Connector';

// Transportes
const getTransportes = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        dispatch({ type: FourthSectionActionTypes.GET_TRANSPORTES_START });
        try {
            await axios({
                method: 'GET',
                url: getTransportesURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    // console.log('Respuesta OK getTransportes: ', response);
                    dispatch({
                        type: FourthSectionActionTypes.GET_TRANSPORTES_SUCCESS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getTransportes: ', err);
                });
        } catch (err) {
            dispatch({ type: FourthSectionActionTypes.GET_TRANSPORTES_FAILURE });
            console.log('Error en el catch getTransportes: ', err);
        }
    };
};
const getTransporteTipoById = (id, accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        dispatch({
            type: FourthSectionActionTypes.GET_TRANSPORTE_JAULAS_START });
        await axios({
            method: 'GET',
            url: getTransporteTipoByIdURL(id),
            headers: {
                'content-type': 'application/json',
                Authorization: token,
            },
        })
            .then((response) => {
                // console.log(
                //     'Response correcta getTransporteTipoById: ',
                //     response,
                // );
                const emptyDetalle = [
                    {
                        TransporteTipo: 'Jaula Doble',
                        TransporteTipoId: 3,
                    },
                    {
                        TransporteTipo: 'Jaula Simple',
                        TransporteTipoId: 2,
                    },
                ];
                const transpDetalle = response.data.TransporteDetalle.length > 0
                                    ? response.data.TransporteDetalle
                                    : emptyDetalle;
                if (transpDetalle) {
                    dispatch({
                        type: FourthSectionActionTypes.GET_TRANSPORTE_JAULAS_SUCCESS,
                        payload: transpDetalle,
                    });
                }
            })
            .catch((err) => {
                dispatch({ type: FourthSectionActionTypes.GET_TRANSPORTE_JAULAS_FAILURE });
                console.log('Response incorrecta getTransporteTipoById: ', err);
            });
    };
};
const setSelectedTransporte = (transporte) => {
    return {
        type: FourthSectionActionTypes.SET_SELECTED_TRANSPORTE,
        payload: transporte,
    };
};
const setSelectedTransporteId = (transpId) => {
    return {
        type: FourthSectionActionTypes.SET_SELECTED_TRANSPORTE_ID,
        payload: transpId,
    };
};
const setSearchTransporte = (transporte) => {
    return {
        type: FourthSectionActionTypes.SET_SEARCH_TRANSPORTE,
        payload: transporte,
    };
};
const setTransporte = (transporte) => {
    return {
        type: FourthSectionActionTypes.SET_TRANSPORTES,
        payload: transporte,
    };
};
const addTransporte = (transporte, accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'POST',
                url: addTransporteURL(),
                headers: {
                    Authorization: token,
                },
                params: {
                    descripcion: transporte,
                },
            })
                .then((response) => {
                    console.log('Response correcta addTransporte', response);
                    let newTransporte = {
                        Descripcion: response.data.Descripcion,
                        Id: response.data.Id,
                    };
                    dispatch({
                        type: FourthSectionActionTypes.SET_SELECTED_TRANSPORTE,
                        payload: newTransporte,
                    });
                })
                .catch((err) => {
                    console.log('Response incorrecta addTransporte: ', err);
                });
        } catch (err) {
            console.log('Error catch addTransporte: ', err);
        }
    };
};
// deberia ser addNewTransporteToList
const addNewTransporte = (
    transporte,
    tipoDeJaula,
    transporteTipoId,
    transporteId,
    PKM,
    cantJaulas,
) => {
    return async (dispatch, getState) => {
        // chequear transporte id y transporte tipo id estan mal
        // los id, darlos vuelta.
        // Jaula doble = 3
        // Jaula simple = 2
        const payload = {
            TransporteTipoId: transporteTipoId, // Jaulas ID
            PrecioKm: PKM,
            TransporteId: transporteId, // Ej: Pees, Juan Pedro
            Cantidad: cantJaulas,
            Transporte: transporte,
            TransporteTipo: tipoDeJaula,
            Activo: true,
        };
        const {section4} = await getState();
        const newList = [...section4.transportesArray];
        newList.push(payload);
        dispatch({
            type: FourthSectionActionTypes.ADD_NEW_TRANSPORTE,
            payload: newList,
        });
        dispatch({type: FourthSectionActionTypes.CLEAR_NEW_TRANSPORTE});
    };
};
// Transporte Tipo
const getTransporteTipo = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'GET',
                url: getTransporteTipoURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    // console.log('Respuesta OK getTransporteTipo: ', response);
                    // debugger;
                    dispatch({
                        type: FourthSectionActionTypes.GET_TRANSPORTES_TIPO_SUCCESS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log(
                        'Respuesta incorrecta getTransporteTipo: ',
                        err,
                    );
                });
        } catch (err) {
            console.log('Error en el catch getTransporteTipo: ', err);
        }
    };
};
const setTransporteTipo = (transporte) => {
    return {
        type: FourthSectionActionTypes.SET_SELECTED_TRANSPORTE_TIPO,
        payload: transporte,
    };
};
const setTransportePKM = (text) => {
    return {
        type: FourthSectionActionTypes.SET_TRANSP_PKM,
        payload: text,
    };
};
const setTransporteCantJaulas = (text) => {
    return {
        type: FourthSectionActionTypes.SET_TRANSP_CANT_JAULAS,
        payload: text,
    };
};

const clearSection4 = () => {
    return {
        type: FourthSectionActionTypes.CLEAR_SECTION_4,
    };
};
export default {
    // Transporte => ADD
    getTransportes,
    getTransporteTipoById,
    setSelectedTransporte,
    setSelectedTransporteId,
    setSearchTransporte,
    addTransporte,
    addNewTransporte,
    // Transporte Tipo
    getTransporteTipo,
    setTransporteTipo,
    setTransporte,
    setTransportePKM,
    setTransporteCantJaulas,
    // Clear
    clearSection4,
};
