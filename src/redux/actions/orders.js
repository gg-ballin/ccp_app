/* eslint-disable prettier/prettier */
import axios from 'axios';
import {OrderActionTypes} from '../types/index';
import {
    postPedido,
    getPedidosTodosURL,
} from '../../net/Connector';
// Section
const setSection = (section) => {
    return {
        type: OrderActionTypes.SET_SECTION,
        payload: section,
    };
};
// Compras
// Ver que onda esto
const setSelectedCompras = (screen) => {
    return {
        type: OrderActionTypes.SET_SELECTED_COMPRAS,
        payload: screen,
    };
};
const setCompras = (compra) => {
    return {
        type: OrderActionTypes.SET_COMPRAS,
        payload: compra,
    };
};
const getCompras = (compra) => {
    return {
        type: OrderActionTypes.GET_COMPRAS,
        payload: compra,
    };
};
// Mis Compras
const setMyCompras = (compra) => {
    return {
        type: OrderActionTypes.SET_MY_COMPRAS,
        payload: compra,
    };
};
const getMyCompras = (compra) => {
    return {
        type: OrderActionTypes.GET_MY_COMPRAS,
        payload: compra,
    };
};

// Oberservaciones
const setObservaciones = (obs) => {
    return {
        type: OrderActionTypes.SET_OBSERVACIONES,
        payload: obs,
    };
};
const clearNewOrder = () => {
    return {
        type: OrderActionTypes.CLEAR_NEW_ORDER,
    };
};
const getPedidosTodos = (accessToken) => {
    return async (dispatch, getState) => {
        dispatch({type: OrderActionTypes.GET_PEDIDOS_START});
        const token = 'Bearer ' + accessToken;
        const {login} = await getState();
        // console.log('ESTA LOADEANDO: ', token);
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
                    // debugger;
                    console.log(
                        'Respuesta correcta getPedidosTodos: ',
                        response,
                    );
                    // console.log('userData: ', login.userData.username);
                    const userLoggedIn = login.userData.username;
                    const allPedidos = response.data;
                    const filteredByUser = allPedidos.filter((item) => {
                        return item.Comprador === userLoggedIn;
                    });
                    // console.log('filteredByUser: ', filteredByUser);
                    dispatch({
                        type: OrderActionTypes.GET_PEDIDOS_TODOS,
                        payload: allPedidos,
                    });
                    dispatch({
                        type: OrderActionTypes.GET_PEDIDOS_USER,
                        payload: filteredByUser,
                    });
                    dispatch({type: OrderActionTypes.GET_PEDIDOS_SUCCESS});
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
        type: OrderActionTypes.SET_PEDIDO_SELECTED_TODOS,
        payload: pedido,
    };
};
const setSelectedItemPedidosByUser = (pedido) => {
    return {
        type: OrderActionTypes.SET_PEDIDO_SELECTED_BY_USER,
        payload: pedido,
    };
};

export default {
    setSection,
    setCompras,
    getCompras,
    setMyCompras,
    getMyCompras,
    setSelectedCompras,
    // Observaciones
    setObservaciones,
    // Clear
    clearNewOrder,
    // Pedido
    getPedidosTodos,
    setSelectedItemPedidosTodos,
    setSelectedItemPedidosByUser,
};
