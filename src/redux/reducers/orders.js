/**
 *  The context redux reducer.
 *
 *  @param {any} state - The current state.
 *  @param {any} action - The action.
 */

import {OrderActionTypes} from '../types/index';

const initialState = {
    loading: false,
    error: null,
    section: 1,
    setSelectedCompras: 0,
    compras: '',
    mis_compras: '',
    // OBSERVACIONES
    observaciones: '',
    // PEDIDO
    pedido: {},
    pedidosTodos: {},
    pedidosTodosItemSelected: {},
    pedidosUser: {},
    pedidosUserItemSelected: {},
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        // SECTION
        case OrderActionTypes.SET_SECTION:
            return Object.assign({}, state, {
                section: action.payload,
            });
        // COMPRAS
        case OrderActionTypes.SET_SELECTED_COMPRAS:
            return Object.assign({}, state, {
                setSelectedCompras: action.payload,
            });
        case OrderActionTypes.GET_COMPRAS:
            return Object.assign({}, state, {
                compras: action.payload,
            });
        case OrderActionTypes.GET_PEDIDOS_START:
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });
        case OrderActionTypes.GET_PEDIDOS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: null,
            });
        case OrderActionTypes.GET_PEDIDOS_TODOS:
            return Object.assign({}, state, {
                pedidosTodos: action.payload,
            });
        case OrderActionTypes.GET_PEDIDOS_USER:
            return Object.assign({}, state, {
                pedidosUser: action.payload,
            });
        case OrderActionTypes.SET_PEDIDO_SELECTED_TODOS:
            return Object.assign({}, state, {
                pedidosTodosItemSelected: action.payload,
            });
        case OrderActionTypes.SET_PEDIDO_SELECTED_BY_USER:
            return Object.assign({}, state, {
                pedidosUserItemSelected: action.payload,
            });
        default:
            return state;
    }
}
