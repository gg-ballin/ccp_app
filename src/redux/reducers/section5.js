import {FifthSectionActionTypes} from '../types/index';

const initialState = {
    observaciones: '',
    pedidoStatus: null,
    pedidoStatusMsg: '',
    loading: false,
    modalNoData: false,
    showModalRespOrder: false,
    pedidoSuccess: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FifthSectionActionTypes.SET_OBSERVACIONES:
            return Object.assign({}, state, {
                observaciones: action.payload,
            });
        case FifthSectionActionTypes.SET_PEDIDO:
            return Object.assign({}, state, {
                pedido: action.payload,
            });
        case FifthSectionActionTypes.POST_PEDIDO_START:
            return Object.assign({}, state, {
                loading: true,
            });
        case FifthSectionActionTypes.POST_PEDIDO_SUCCESS:
            debugger;
            return Object.assign({}, state, {
                pedidoSuccess: action.payload,
                loading: false,
                showModalRespOrder: true,
            });
        case FifthSectionActionTypes.POST_PEDIDO_FAILURE:
            return Object.assign({}, state, {
                pedidoSuccess: action.payload,
                loading: false,
                showModalRespOrder: true,
            });

        case FifthSectionActionTypes.MODAL_NO_DATA:
            return Object.assign({}, state, {
                modalNoData: action.payload,
            });
        case FifthSectionActionTypes.PEDIDO_STATUS_RESPONSE:
            return Object.assign({}, state, {
                pedidoStatus: action.payload,
                loading: false,
            });
        case FifthSectionActionTypes.PEDIDO_STATUS_MESSAGE:
            return Object.assign({}, state, {
                pedidoStatusMsg: action.payload,
            });
        case FifthSectionActionTypes.GET_PEDIDOS_TODOS:
            return Object.assign({}, state, {
                pedidosTodos: action.payload,
            });
        case FifthSectionActionTypes.GET_PEDIDOS_USER:
            return Object.assign({}, state, {
                pedidosUser: action.payload,
            });
        case FifthSectionActionTypes.SET_PEDIDO_SELECTED_TODOS:
            return Object.assign({}, state, {
                pedidosTodosItemSelected: action.payload,
            });
        case FifthSectionActionTypes.SHOW_MODAL_RESPONSE_ORDER:
            return Object.assign({}, state, {
                showModalRespOrder: action.payload,
            });
        case FifthSectionActionTypes.SET_PEDIDO_SELECTED_BY_USER:
            return Object.assign({}, state, {
                pedidosUserItemSelected: action.payload,
            });
        case FifthSectionActionTypes.CLEAR_SECTION_5:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}
