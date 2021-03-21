import axios from 'axios';
import {ThirdSectionActionTypes} from '../types/index';
import {
    getComisionistasURL,
    getDestinosURL,
    addComisionistaURL,
    getDestinoDisponibilidadURL,
} from '../../net/Connector';

// Comisionista
const getComisionistas = (accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'GET',
                url: getComisionistasURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    dispatch({
                        type: ThirdSectionActionTypes.GET_COMISIONISTA,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getRemitentes: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getRemitentes: ', err);
        }
    };
};
const setSearchComisionista = (comisionista) => {
    return {
        type: ThirdSectionActionTypes.SET_SEARCH_COMISIONISTA,
        payload: comisionista,
    };
};
const setSelectedComisionista = (comisionista) => {
    return {
        type: ThirdSectionActionTypes.SET_SELECTED_COMISIONISTA,
        payload: comisionista,
    };
};
const setSwitchComisionista = (bool) => {
    return {
        type: ThirdSectionActionTypes.COMISIONISTA_SWITCH,
        payload: bool,
    };
};
const addComisionista = (comisio, accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'POST',
                url: addComisionistaURL(),
                headers: {
                    Authorization: token,
                },
                params: {
                    descripcion: comisio,
                },
            })
                .then((response) => {
                    debugger;
                    console.log('Response correcta addComisionista', response);
                    let newComisionista = {
                        Descripcion: response.data.Descripcion,
                        Id: response.data.Id,
                    };
                    dispatch({
                        type: ThirdSectionActionTypes.SET_SELECTED_COMISIONISTA,
                        payload: newComisionista,
                    });
                    getComisionistas(accessToken);
                })
                .catch((err) => {
                    debugger;
                    console.log('Response incorrecta addComisionista: ', err);
                });
        } catch (err) {
            console.log('Error catch addComisionista: ', err);
        }
    };
};
// Destinos
const getDestinos = (accessToken) => {
    return async (dispatch) => {
        // console.log('getRemitentes tokn: ', accessToken);
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'GET',
                url: getDestinosURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    // console.log('Respuesta correcta getDestinos: ', response);
                    dispatch({
                        type: ThirdSectionActionTypes.GET_DESTINOS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getDestinos: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getDestinos: ', err);
        }
    };
};
const setSelectedDestino = (destino) => {
    return {
        type: ThirdSectionActionTypes.SET_SELECTED_DESTINO,
        payload: destino,
    };
};
const setSearchDestino = (destino) => {
    return {
        type: ThirdSectionActionTypes.SET_SEARCH_DESTINO,
        payload: destino,
    };
};
// Destino Disponibilidad
const getDestinoDisponibilidad = (destinoID, fecha, accessToken) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            await axios({
                method: 'GET',
                url: getDestinoDisponibilidadURL(destinoID, fecha),
                headers: {
                    Authorization: token,
                },
            })
                .then((response) => {
                    console.log('Response OK getDDisponibilidad', response);
                    dispatch({
                        type: ThirdSectionActionTypes.SHOW_FECHAS,
                        payload: true,
                    });
                    dispatch({
                        type: ThirdSectionActionTypes.DESTINO_FECHAS,
                        payload: response.data,
                    });
                })
                .catch((err) => {
                    console.log(
                        'Response incorrecta getDestinoDisponibilidad: ',
                        err,
                    );
                });
        } catch (err) {
            console.log('Error catch getDestinoDisponibilidad: ', err);
        }
    };
};
const setDestinoFecha = (fecha) => {
    return {
        type: ThirdSectionActionTypes.SET_SELECTED_FECHA,
        payload: fecha,
    };
};
const setDestinoId = (id) => {
    return {
        type: ThirdSectionActionTypes.SET_DESTINO_ID,
        payload: id,
    };
};
const setColorDay = (day) => {
    return {
        type: ThirdSectionActionTypes.DESTINO_COLOR_DAY,
        payload: day,
    };
};

const clearSection3 = () => {
    return {
        type: ThirdSectionActionTypes.CLEAR_SECTION_3,
    };
};

export default {
    // Comisionista => ADD
    getComisionistas,
    setSearchComisionista,
    setSelectedComisionista,
    setSwitchComisionista,
    addComisionista,
    // Destino
    getDestinos,
    setSelectedDestino,
    setSearchDestino,
    // Destino Disponibilidad
    setDestinoFecha,
    setDestinoId,
    getDestinoDisponibilidad,
    setColorDay,
    // Clear
    clearSection3,
};
