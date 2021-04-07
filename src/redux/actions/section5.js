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
                    // console.log('Respuesta incorrecta getPedidosTodos: ', err);
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
// PedidoDetalles: alRindeList,
// PedidoTransportes: pedidoTransportesList,
// RemitenteId: remitenteId,
// DestinoId: destinoId,
// Fecha: fecha,
// ProvinciaId: provinciaId,
// LocalidadId: localidadId,
// ComisionistaId: comisionistaId,
// CondicionPagoId: condicionPagoId,
// Observaciones: parsedObs,
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
        debugger;
        try {
            let newParams = {};
            // CHEQUEAR VALOR SWITCH
            let parsedObs = observaciones ? observaciones : '';
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
                plazoOther &&
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
                condicionPagoId &&
                plazoOther;
            const noComisio =
                alRindeList &&
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
            debugger;
            await axios({
                method: 'POST',
                url: postPedido(),
                headers: {
                    'content-type': 'application/json',
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
