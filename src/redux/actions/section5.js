import axios from 'axios';
import {FifthSectionActionTypes} from '../types/index';
import {postPedido, getPedidosTodosURL} from '../../net/Connector';

const setObservaciones = (obs) => {
    return {
        type: FifthSectionActionTypes.SET_OBSERVACIONES,
        payload: obs,
    };
};
const clearNewOrder = () => {
    return {
        type: FifthSectionActionTypes.CLEAR_NEW_ORDER,
    };
};
const showModalResponseOrder = (bool) => {
    return {
        type: FifthSectionActionTypes.SHOW_MODAL_RESPONSE_ORDER,
        payload: bool,
    };
};
const getPedidosTodos = (accessToken) => {
    return async (dispatch, getState) => {
        dispatch({type: FifthSectionActionTypes.GET_PEDIDOS_START});
        const token = 'Bearer ' + accessToken;
        const {login} = await getState();
        try {
            await axios({
                method: 'GET',
                url: getPedidosTodosURL(),
                headers: {
                    'content-type': 'application/json',
                    Authorization: token,
                },
            })
                .then((response) => {
                    // console.log('Respuesta correcta getPedidosTodos: ', response);
                    // console.log('userData: ', login.userData.username);
                    const userLoggedIn = login.userData.username;
                    const allPedidos = response.data;
                    const filteredByUser = allPedidos.filter((item) => {
                        return item.Comprador === userLoggedIn;
                    });
                    // console.log('filteredByUser: ', filteredByUser);
                    dispatch({
                        type: FifthSectionActionTypes.GET_PEDIDOS_TODOS,
                        payload: allPedidos,
                    });
                    dispatch({
                        type: FifthSectionActionTypes.GET_PEDIDOS_USER,
                        payload: filteredByUser,
                    });
                    dispatch({
                        type: FifthSectionActionTypes.GET_PEDIDOS_SUCCESS,
                    });
                })
                .catch((err) => {
                    console.log('Respuesta incorrecta getPedidosTodos: ', err);
                });
        } catch (err) {
            console.log('Error en el catch getPedidosTodos: ', err);
        }
    };
};
const setSelectedItemPedidosTodos = (pedido) => {
    return {
        type: FifthSectionActionTypes.SET_PEDIDO_SELECTED_TODOS,
        payload: pedido,
    };
};
const setSelectedItemPedidosByUser = (pedido) => {
    return {
        type: FifthSectionActionTypes.SET_PEDIDO_SELECTED_BY_USER,
        payload: pedido,
    };
};
const sendPedidoKgVivo = (
    kgVivoList,
    pedidoTransportesList,
    remitenteId,
    destinoId,
    fecha,
    provinciaId,
    localidadId,
    comisionistaId,
    condicionPagoId,
    plazoOther,
    observaciones,
    accessToken,
) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        debugger;
        try {
            let newParams = {};
            let parsedObs = observaciones ? observaciones : '';
            if (condicionPagoId !== 4) {
                const all =
                    kgVivoList &&
                    pedidoTransportesList &&
                    remitenteId &&
                    destinoId &&
                    fecha &&
                    provinciaId &&
                    localidadId &&
                    comisionistaId &&
                    condicionPagoId &&
                    observaciones;
                const noObs =
                    kgVivoList &&
                    pedidoTransportesList &&
                    remitenteId &&
                    destinoId &&
                    fecha &&
                    provinciaId &&
                    localidadId &&
                    comisionistaId &&
                    condicionPagoId;
                const noComisio =
                    kgVivoList &&
                    pedidoTransportesList &&
                    remitenteId &&
                    destinoId &&
                    fecha &&
                    provinciaId &&
                    localidadId &&
                    condicionPagoId &&
                    observaciones;
                if (all) {
                    newParams = {
                        PedidoDetalles: kgVivoList,
                        PedidoTransportes: pedidoTransportesList,
                        RemitenteId: remitenteId,
                        DestinoId: destinoId,
                        Fecha: fecha,
                        ProvinciaId: provinciaId,
                        LocalidadId: localidadId,
                        ComisionistaId: comisionistaId,
                        CondicionPagoId: condicionPagoId,
                        Observaciones: parsedObs,
                    };
                } else if (noObs) {
                    newParams = {
                        PedidoDetalles: kgVivoList,
                        PedidoTransportes: pedidoTransportesList,
                        RemitenteId: remitenteId,
                        DestinoId: destinoId,
                        Fecha: fecha,
                        ProvinciaId: provinciaId,
                        LocalidadId: localidadId,
                        ComisionistaId: comisionistaId,
                        CondicionPagoId: condicionPagoId,
                    };
                } else if (noComisio) {
                    newParams = {
                        PedidoDetalles: kgVivoList,
                        PedidoTransportes: pedidoTransportesList,
                        RemitenteId: remitenteId,
                        DestinoId: destinoId,
                        Fecha: fecha,
                        ProvinciaId: provinciaId,
                        LocalidadId: localidadId,
                        CondicionPagoId: condicionPagoId,
                        Observaciones: parsedObs,
                    };
                } else if (!noComisio && !noObs) {
                    newParams = {
                        PedidoDetalles: kgVivoList,
                        PedidoTransportes: pedidoTransportesList,
                        RemitenteId: remitenteId,
                        DestinoId: destinoId,
                        Fecha: fecha,
                        ProvinciaId: provinciaId,
                        LocalidadId: localidadId,
                        CondicionPagoId: condicionPagoId,
                    };
                }
                console.log('Will send: ', newParams);
                await axios({
                    method: 'POST',
                    url: postPedido(),
                    headers: {
                        'content-type': 'application/json',
                        Accept: 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwianRpIjoiNDBjYjU2ZGMtYmI0Yy00ZDcyLTgyZTEtMTA1N2I1ZTk1ZTY5IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiIxIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImZ0b3Jpbm8iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJmcmFuY2lzY290b3Jpbm9AZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZG5zIjoiMTgxLjE3MC4yMDMuMiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjE2NjY3Mjk4LCJpc3MiOiJLYWl0c29mdFN5c3RlbXMiLCJhdWQiOiJLYWl0c29mdFN5c3RlbXMifQ.6YbucDm7EpJnIKbP7TAS19Jr4I5dsHUoM-pIgdusXuUaeomv0NX-WIDgFdvNf9Mq6fKGQ1q8G6fm_HR3rTqptQ',
                    },
                    data: newParams,
                })
                    .then((response) => {
                        debugger;
                        console.log(
                            'Respuesta correcta sendPedidoKgVivo: ',
                            response,
                        );
                        dispatch({
                            type:
                                FifthSectionActionTypes.SHOW_MODAL_RESPONSE_ORDER,
                            payload: true,
                        });
                        dispatch({
                            type: FifthSectionActionTypes.PEDIDO_SUCCESS,
                            payload: true,
                        });
                    })
                    .catch((err) => {
                        debugger;
                        console.log(
                            'Respuesta incorrecta sendPedidoKgVivo: ',
                            err,
                        );
                    });
            } else {
                const all =
                    kgVivoList &&
                    pedidoTransportesList &&
                    remitenteId &&
                    destinoId &&
                    fecha &&
                    provinciaId &&
                    localidadId &&
                    comisionistaId &&
                    condicionPagoId &&
                    plazoOther &&
                    observaciones;
                const noObs =
                    kgVivoList &&
                    pedidoTransportesList &&
                    remitenteId &&
                    destinoId &&
                    fecha &&
                    provinciaId &&
                    localidadId &&
                    comisionistaId &&
                    condicionPagoId &&
                    plazoOther;
                const noComisio =
                    kgVivoList &&
                    pedidoTransportesList &&
                    remitenteId &&
                    destinoId &&
                    fecha &&
                    provinciaId &&
                    localidadId &&
                    condicionPagoId &&
                    plazoOther &&
                    observaciones;
                if (all) {
                    newParams = {
                        PedidoDetalles: kgVivoList,
                        PedidoTransportes: pedidoTransportesList,
                        RemitenteId: remitenteId,
                        DestinoId: destinoId,
                        Fecha: fecha,
                        ProvinciaId: provinciaId,
                        LocalidadId: localidadId,
                        ComisionistaId: comisionistaId,
                        CondicionPagoId: condicionPagoId,
                        CondicionPago: plazoOther,
                        Observaciones: parsedObs,
                    };
                } else if (noObs) {
                    newParams = {
                        PedidoDetalles: kgVivoList,
                        PedidoTransportes: pedidoTransportesList,
                        RemitenteId: remitenteId,
                        DestinoId: destinoId,
                        Fecha: fecha,
                        ProvinciaId: provinciaId,
                        LocalidadId: localidadId,
                        ComisionistaId: comisionistaId,
                        CondicionPagoId: condicionPagoId,
                        CondicionPago: plazoOther,
                    };
                } else if (noComisio) {
                    newParams = {
                        PedidoDetalles: kgVivoList,
                        PedidoTransportes: pedidoTransportesList,
                        RemitenteId: remitenteId,
                        DestinoId: destinoId,
                        Fecha: fecha,
                        ProvinciaId: provinciaId,
                        LocalidadId: localidadId,
                        CondicionPagoId: condicionPagoId,
                        CondicionPago: plazoOther,
                        Observaciones: parsedObs,
                    };
                } else if (!noComisio && !noObs) {
                    newParams = {
                        PedidoDetalles: kgVivoList,
                        PedidoTransportes: pedidoTransportesList,
                        RemitenteId: remitenteId,
                        DestinoId: destinoId,
                        Fecha: fecha,
                        ProvinciaId: provinciaId,
                        LocalidadId: localidadId,
                        CondicionPagoId: condicionPagoId,
                        CondicionPago: plazoOther,
                    };
                }
                console.log('Will send: ', newParams);
                await axios({
                    method: 'POST',
                    url: postPedido(),
                    headers: {
                        'content-type': 'application/json',
                        // Accept: 'application/json',
                        Authorization: token,
                    },
                    data: newParams,
                })
                    .then((response) => {
                        debugger;
                        console.log(
                            'Respuesta correcta sendPedidoKgVivo: ',
                            response,
                        );
                        dispatch({
                            type:
                                FifthSectionActionTypes.SHOW_MODAL_RESPONSE_ORDER,
                            payload: true,
                        });
                        dispatch({
                            type: FifthSectionActionTypes.PEDIDO_SUCCESS,
                            payload: true,
                        });
                    })
                    .catch((err) => {
                        debugger;
                        console.log(
                            'Respuesta incorrecta sendPedidoKgVivo: ',
                            err,
                        );
                    });
            }
        } catch (error) {
            console.log('Respuesta CATCH incorrecta sendPedidoKgVivo: ', error);
        }
    };
};

const sendPedidoAlRinde = (
    alRindeList,
    pedidoTransportesList,
    remitenteId,
    destinoId,
    fecha,
    provinciaId,
    localidadId,
    comisionistaId,
    condicionPagoId,
    plazoOther,
    observaciones,
    accessToken,
) => {
    return async (dispatch) => {
        const token = 'Bearer ' + accessToken;
        try {
            let newParams = {};
            // CHEQUEAR VALOR SWITCH
            let parsedObs = observaciones ? observaciones : '';
            // const parsedComisio = comisionistaId === 'undefined' ? null : comisionistaId;
            const all =
                alRindeList &&
                pedidoTransportesList &&
                remitenteId &&
                destinoId &&
                fecha &&
                provinciaId &&
                localidadId &&
                comisionistaId &&
                condicionPagoId &&
                observaciones;
            const noObs =
                alRindeList &&
                pedidoTransportesList &&
                remitenteId &&
                destinoId &&
                fecha &&
                provinciaId &&
                localidadId &&
                comisionistaId &&
                condicionPagoId;
            const noComisio =
                alRindeList &&
                pedidoTransportesList &&
                remitenteId &&
                destinoId &&
                fecha &&
                provinciaId &&
                localidadId &&
                condicionPagoId &&
                observaciones;
            if (all) {
                newParams = {
                    PedidoDetalles: alRindeList,
                    PedidoTransportes: pedidoTransportesList,
                    RemitenteId: remitenteId,
                    DestinoId: destinoId,
                    Fecha: fecha,
                    ProvinciaId: provinciaId,
                    LocalidadId: localidadId,
                    ComisionistaId: comisionistaId,
                    CondicionPagoId: condicionPagoId,
                    Observaciones: parsedObs,
                };
            } else if (noObs) {
                newParams = {
                    PedidoDetalles: alRindeList,
                    PedidoTransportes: pedidoTransportesList,
                    RemitenteId: remitenteId,
                    DestinoId: destinoId,
                    Fecha: fecha,
                    ProvinciaId: provinciaId,
                    LocalidadId: localidadId,
                    ComisionistaId: comisionistaId,
                    CondicionPagoId: condicionPagoId,
                };
            } else if (noComisio) {
                newParams = {
                    PedidoDetalles: alRindeList,
                    PedidoTransportes: pedidoTransportesList,
                    RemitenteId: remitenteId,
                    DestinoId: destinoId,
                    Fecha: fecha,
                    ProvinciaId: provinciaId,
                    LocalidadId: localidadId,
                    CondicionPagoId: condicionPagoId,
                    Observaciones: parsedObs,
                };
            } else if (!noComisio && !noObs) {
                newParams = {
                    PedidoDetalles: alRindeList,
                    PedidoTransportes: pedidoTransportesList,
                    RemitenteId: remitenteId,
                    DestinoId: destinoId,
                    Fecha: fecha,
                    ProvinciaId: provinciaId,
                    LocalidadId: localidadId,
                    CondicionPagoId: condicionPagoId,
                };
            }
            await axios({
                method: 'POST',
                url: postPedido(),
                headers: {
                    'content-type': 'application/json',
                    // Accept: 'application/json',
                    Authorization: token,
                },
                data: newParams,
            })
                .then((response) => {
                    debugger;
                    console.log(
                        'Respuesta correcta sendPedidoAlRinde: ',
                        response,
                    );
                    dispatch({
                        type: FifthSectionActionTypes.SHOW_MODAL_RESPONSE_ORDER,
                        payload: true,
                    });
                    dispatch({
                        type: FifthSectionActionTypes.PEDIDO_SUCCESS,
                        payload: true,
                    });
                })
                .catch((err) => {
                    debugger;
                    console.log(
                        'Respuesta incorrecta sendPedidoAlRinde: ',
                        err,
                    );
                });
        } catch (error) {
            console.log(
                'Respuesta CATCH incorrecta sendPedidoAlRinde: ',
                error,
            );
        }
    };
};

const clearSection5 = () => {
    return {
        type: FifthSectionActionTypes.CLEAR_SECTION_5,
    };
};

export default {
    // Observaciones
    setObservaciones,
    // Clear
    clearNewOrder,
    // Pedido
    getPedidosTodos,
    sendPedidoKgVivo,
    sendPedidoAlRinde,
    showModalResponseOrder,
    setSelectedItemPedidosTodos,
    setSelectedItemPedidosByUser,
    // Clear
    clearSection5,
};
